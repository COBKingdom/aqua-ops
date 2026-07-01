import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { signOutUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"

interface AccountScreenProps {
  setActiveTab?: (tab: string) => void
}

export function AccountScreen({
  setActiveTab,
}: AccountScreenProps) {

  const [loading, setLoading] =
    useState(false)

  const [email, setEmail] =
    useState("")

  const [customer, setCustomer] =
    useState<any>(null)

  const [isAdmin, setIsAdmin] =
    useState(false)

  useEffect(() => {
    loadAccount()
  }, [])

  const loadAccount = async () => {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser()

      if (!user) return

      setEmail(user.email || "")

      const { data: admin } =
        await supabase
          .from("admin_users")
          .select("id")
          .eq("email", user.email)
          .single()

      if (admin) {
        setIsAdmin(true)
        return
      }

      const { data: customerData } =
        await supabase
          .from("saas_customers")
          .select("*")
          .eq("user_id", user.id)
          .single()

      setCustomer(customerData)

    } catch (error) {
      console.error(
        "Account load error:",
        error
      )
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      await signOutUser()
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const getDaysRemaining = () => {
    if (!customer?.expires_at)
      return 0

    const expiry = new Date(
      customer.expires_at
    )

    const today = new Date()

    const diff =
      expiry.getTime() -
      today.getTime()

    return Math.max(
      0,
      Math.ceil(
        diff / (1000 * 60 * 60 * 24)
      )
    )
  }

  const daysRemaining =
    getDaysRemaining()

  const handleRenew = () => {
    if (setActiveTab) {
      setActiveTab("renew-subscription")
    }
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* HEADING */}
      <div>
        <h1 className="text-2xl font-bold">
          Account
        </h1>

        <p className="text-sm text-gray-500">
          Manage your AquaOps account
        </p>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-5">

        <div>
          <p className="text-xs text-gray-500">
            Email
          </p>

          <p className="font-medium">
            {email}
          </p>
        </div>

        {isAdmin ? (
          <div>
            <p className="text-xs text-gray-500">
              Role
            </p>

            <p className="font-medium">
              Platform Administrator
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-500">
              Factory
            </p>

            <p className="font-medium">
              {customer?.factory_name ||
                "-"}
            </p>
          </div>
        )}

      </div>

      {/* ADMIN VIEW */}
      {isAdmin ? (

        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <h2 className="font-semibold">
            Platform Administrator
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            This account manages the
            AquaOps platform.
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Subscription information
            is not applicable.
          </p>

        </div>

      ) : (
        <>

          {/* SUBSCRIPTION */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold">
                Subscription
              </h2>

              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  customer?.status ===
                  "Active"
                    ? "bg-green-100 text-green-700"
                    : customer?.status ===
                      "Trial"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {customer?.status ||
                  "Unknown"}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-xs text-gray-500">
                  Plan
                </p>

                <p className="font-semibold">
                  {customer?.plan ||
                    "Starter"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Days Remaining
                </p>

                <p className="font-semibold">
                  {daysRemaining}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Started
                </p>

                <p>
                  {customer?.started_at
                    ? new Date(
                        customer.started_at
                      ).toLocaleDateString()
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Expiry
                </p>

                <p>
                  {customer?.expires_at
                    ? new Date(
                        customer.expires_at
                      ).toLocaleDateString()
                    : "-"}
                </p>
              </div>

              {customer?.user_limit && (
                <div>
                  <p className="text-xs text-gray-500">
                    Users Allowed
                  </p>

                  <p className="font-semibold">
                    Up to{" "}
                    {customer.user_limit}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* TRIAL BANNER */}
          {customer?.status ===
            "Trial" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 shadow-sm">

              <h2 className="font-semibold text-yellow-800">
                Trial Subscription
              </h2>

              <p className="text-sm text-yellow-700 mt-2">
                Your AquaOps trial
                expires in{" "}
                {daysRemaining} day
                {daysRemaining !== 1
                  ? "s"
                  : ""}
                .
              </p>

            </div>
          )}

          {/* RENEWAL */}
          <div className="bg-gradient-to-r from-[#0d1b3e] to-[#2563eb] text-white rounded-2xl p-5 shadow-sm space-y-3">

            <h2 className="text-lg font-semibold">
              Subscription Plans
            </h2>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span>
                  Standard
                </span>

                <span className="font-semibold">
                  ₦10,000/month
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Multi-User
                </span>

                <span className="font-semibold">
                  ₦15,000/month
                </span>
              </div>

            </div>

<Button
  disabled
  className="w-full bg-gray-300 text-gray-600 cursor-not-allowed font-semibold"
>
  Payments Temporarily Unavailable
</Button>

          </div>

        </>
      )}

      {/* SIGN OUT */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">

        <Button
          onClick={handleLogout}
          disabled={loading}
          className="w-full"
          variant="destructive"
        >
          {loading
            ? "Signing out..."
            : "Sign Out"}
        </Button>

      </div>

    </div>
  )
}