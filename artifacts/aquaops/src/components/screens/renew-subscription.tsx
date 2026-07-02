import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  PLANS,
  PlanName,
  getFlutterwavePublicKey,
} from "@/lib/flutterwave"

interface RenewSubscriptionProps {
  setActiveTab: (tab: string) => void
}

// TEMP: disable payments while Flutterwave merchant branding is being updated
const PAYMENTS_DISABLED = true

export function RenewSubscription({
  setActiveTab,
}: RenewSubscriptionProps) {

  const [selectedPlan, setSelectedPlan] =
    useState<PlanName>("Standard")

  const [loading, setLoading] =
    useState(false)

  const [userEmail, setUserEmail] =
    useState("")

  const [userName, setUserName] =
    useState("")

  const [userId, setUserId] =
    useState("")

  const [scriptLoaded, setScriptLoaded] =
    useState(false)

  const [status, setStatus] =
    useState<"idle" | "success" | "failed">(
      "idle"
    )

  useEffect(() => {
    loadUser()
    loadFlutterwaveScript()
  }, [])

  const loadUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      setUserEmail(user.email ?? "")
      setUserId(user.id)

      const { data: factory } =
        await supabase
          .from("factories")
          .select("name")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle()

      if (factory?.name) {
        setUserName(factory.name)
      }

    } catch (err) {
      console.error("loadUser error:", err)
    }
  }

  const loadFlutterwaveScript = () => {
    if (
      document.getElementById(
        "flutterwave-script"
      )
    ) {
      setScriptLoaded(true)
      return
    }

    const script =
      document.createElement("script")

    script.id = "flutterwave-script"

    script.src =
      "https://checkout.flutterwave.com/v3.js"

    script.onload = () =>
      setScriptLoaded(true)

    document.head.appendChild(script)
  }

  const handlePayNow = () => {
    if (!scriptLoaded) {
      alert(
        "Payment system is still loading. Please wait a moment and try again."
      )
      return
    }

    if (!userId || !userEmail) {
      alert(
        "Unable to load your account details. Please refresh and try again."
      )
      return
    }

    const plan = PLANS[selectedPlan]

    const txRef = `aquaops-${userId.slice(0, 8)}-${Date.now()}`

    ;(window as any).FlutterwaveCheckout({
      public_key:
        getFlutterwavePublicKey(),

      tx_ref: txRef,

      amount: plan.price,

      currency: plan.currency,

      payment_options:
        "card,banktransfer,ussd",

      customer: {
        email: userEmail,
        name:
          userName || userEmail,
      },

      customizations: {
        title:
          "AquaOps Subscription",
        description:
          `${plan.name} Plan · ${plan.description}`,
      },

      callback: async (
        data: any
      ) => {
        if (
          data.status ===
            "successful" ||
          data.status ===
            "completed"
        ) {
          await handlePaymentSuccess(
            data,
            plan
          )
        } else {
          setStatus("failed")
        }
      },

      onclose: () => {},
    })
  }

  const handlePaymentSuccess =
    async (
      data: any,
      plan: (typeof PLANS)[PlanName]
    ) => {
      setLoading(true)

      try {
        const now = new Date()

        const expiry = new Date()
        expiry.setMonth(
          expiry.getMonth() + 1
        )

        const { error } =
          await supabase
            .from("subscriptions")
            .update({
              plan: plan.name,
              status: "Active",
              user_limit:
                plan.user_limit,
              renewal_status:
                "completed",
              flutterwave_reference:
                data.flw_ref,
              transaction_id: String(
                data.transaction_id
              ),
              amount_paid: plan.price,
              started_at:
                now.toISOString(),
              expires_at:
                expiry.toISOString(),
            })
            .eq("user_id", userId)

        if (error) {
          console.error(
            "Subscription update error:",
            error
          )
          setStatus("failed")
          return
        }

        setStatus("success")

      } catch (err) {
        console.error(err)
        setStatus("failed")
      } finally {
        setLoading(false)
      }
    }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#eef0f5]">

        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm p-8 text-center space-y-6">

          <div className="text-6xl">
            🎉
          </div>

          <h1 className="text-2xl font-bold text-[#0d1b3e]">
            Subscription Activated!
          </h1>

          <p className="text-gray-600">
            Your{" "}
            {PLANS[selectedPlan].name}{" "}
            plan is now active.
            Welcome back!
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 text-sm space-y-2">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Plan
              </span>
              <span className="font-medium">
                {PLANS[selectedPlan].name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Users
              </span>
              <span className="font-medium">
                Up to{" "}
                {
                  PLANS[selectedPlan]
                    .user_limit
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Valid for
              </span>
              <span className="font-medium">
                1 month
              </span>
            </div>

          </div>

          <Button
            className="w-full h-12 bg-[#2563eb] text-white font-semibold"
            onClick={() =>
              setActiveTab("dashboard")
            }
          >
            Go to Dashboard
          </Button>

        </div>

      </div>
    )
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* HEADER */}
      <div>
        <button
          onClick={() =>
            setActiveTab("account")
          }
          className="text-sm text-gray-500 mb-3 flex items-center gap-1"
        >
          ← Back to Account
        </button>

        <h1 className="text-2xl font-bold text-[#0d1b3e]">
          Renew Subscription
        </h1>

        <p className="text-sm text-gray-500">
          Choose a plan to continue
        </p>
      </div>

      {/* PLAN SELECTOR */}
      <div className="space-y-3">

        {(
          Object.keys(
            PLANS
          ) as PlanName[]
        ).map((planKey) => {

          const plan = PLANS[planKey]
          const isSelected =
            selectedPlan === planKey

          return (
            <button
              key={planKey}
              onClick={() =>
                setSelectedPlan(planKey)
              }
              className={`w-full text-left rounded-2xl p-5 shadow-sm border-2 transition ${
                isSelected
                  ? "border-[#2563eb] bg-blue-50"
                  : "border-transparent bg-white"
              }`}
            >

              <div className="flex justify-between items-start">

                <div>
                  <p className="font-bold text-[#0d1b3e] text-base">
                    {plan.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {plan.description}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-[#2563eb] text-lg">
                    ₦
                    {plan.price.toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-400">
                    per month
                  </p>
                </div>

              </div>

              {isSelected && (
                <p className="mt-2 text-xs text-[#2563eb] font-semibold">
                  ✓ Selected
                </p>
              )}

            </button>
          )
        })}

      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">

        <h2 className="font-semibold text-[#0d1b3e]">
          Order Summary
        </h2>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">
              Plan
            </span>
            <span className="font-medium">
              {PLANS[selectedPlan].name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Users allowed
            </span>
            <span className="font-medium">
              Up to{" "}
              {
                PLANS[selectedPlan]
                  .user_limit
              }
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Duration
            </span>
            <span className="font-medium">
              1 month
            </span>
          </div>

          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold">
              Total
            </span>
            <span className="font-bold text-[#2563eb] text-base">
              ₦
              {PLANS[
                selectedPlan
              ].price.toLocaleString()}
            </span>
          </div>

        </div>

      </div>

      {/* PAY BUTTON */}
      {PAYMENTS_DISABLED ? (
        <Button
          disabled
          className="w-full h-12 bg-gray-100 text-gray-400 text-base font-semibold cursor-not-allowed"
        >
          Payments Temporarily Unavailable
        </Button>
      ) : (
        <Button
          className="w-full h-12 bg-[#2563eb] text-white text-base font-semibold"
          onClick={handlePayNow}
          disabled={loading || !scriptLoaded}
        >
          {loading
            ? "Processing..."
            : !scriptLoaded
            ? "Loading payment system..."
            : `Pay ₦${PLANS[selectedPlan].price.toLocaleString()}`}
        </Button>
      )}

      {status === "failed" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-sm text-red-600">
            Payment was cancelled or
            failed. Please try again.
          </p>
        </div>
      )}

      <p className="text-center text-xs text-gray-400">
        Secured by Flutterwave ·
        SSL Encrypted
      </p>

    </div>
  )
}