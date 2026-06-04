"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function AdminPayments() {
  const [loading, setLoading] =
    useState(false)

  const [saved, setSaved] =
    useState(false)

  const [authorized, setAuthorized] =
    useState(false)

  const [factories, setFactories] =
    useState<any[]>([])

  const [form, setForm] =
    useState({
      factoryId: "",

      plan: "Monthly",

      amount: 10000,

      paymentMethod:
        "Bank Transfer",

      paymentReference: "",

      notes: "",
    })

  useEffect(() => {
    initialize()
  }, [])

  const initialize =
    async () => {
      try {
        const {
          data: { user },
        } =
          await supabase.auth.getUser()

        if (!user?.email)
          return

        const {
          data: admin,
        } = await supabase
          .from("admin_users")
          .select("*")
          .eq(
            "email",
            user.email
          )
          .single()

        if (!admin) {
          alert(
            "Unauthorized"
          )
          return
        }

        setAuthorized(true)

        const {
          data: factoryData,
        } = await supabase
          .from("factories")
          .select(
            "id,name,user_id"
          )
          .eq(
            "is_internal",
            false
          )
          .order("name")

        setFactories(
          factoryData || []
        )

      } catch (err) {
        console.error(err)
      }
    }

  const handlePlanChange = (
    plan: string
  ) => {
    setForm({
      ...form,

      plan,

      amount:
        plan === "Annual"
          ? 108000
          : 10000,
    })
  }

  const savePayment =
    async () => {
      try {
        setLoading(true)

        if (
          !form.factoryId
        ) {
          alert(
            "Select factory"
          )
          return
        }

        if (
          !form.paymentReference
        ) {
          alert(
            "Enter payment reference"
          )
          return
        }

        const factory =
          factories.find(
            (f) =>
              f.id ===
              form.factoryId
          )

        if (!factory) {
          alert(
            "Factory not found"
          )
          return
        }

        const now =
          new Date()

        // SAVE PAYMENT
        const {
          error:
            paymentError,
        } = await supabase
          .from("payments")
          .insert([
            {
              factory_id:
                factory.id,

              amount:
                Number(
                  form.amount
                ),

              payment_method:
                form.paymentMethod,

              payment_reference:
                form.paymentReference,

              subscription_period:
                form.plan,

              payment_date:
                now.toISOString(),

              currency_code:
                "NGN",

              status:
                "Confirmed",

              notes:
                form.notes,
            },
          ])

        if (
          paymentError
        ) {
          console.error(
            paymentError
          )

          alert(
            "Failed to save payment"
          )

          return
        }

        // GET CURRENT SUBSCRIPTION

        const {
          data:
            currentSub,
        } = await supabase
          .from(
            "subscriptions"
          )
          .select("*")
          .eq(
            "user_id",
            factory.user_id
          )
          .single()

        let baseDate =
          new Date()

        if (
          currentSub?.expires_at
        ) {
          const expiry =
            new Date(
              currentSub.expires_at
            )

          if (
            expiry >
            new Date()
          ) {
            baseDate =
              expiry
          }
        }

        const newExpiry =
          new Date(
            baseDate
          )

        if (
          form.plan ===
          "Annual"
        ) {
          newExpiry.setFullYear(
            newExpiry.getFullYear() +
              1
          )
        } else {
          newExpiry.setMonth(
            newExpiry.getMonth() +
              1
          )
        }

 const {
  error:
    subscriptionError,
} = await supabase
  .from("subscriptions")
  .update({
    plan: form.plan,

    status: "Active",

    started_at:
      now.toISOString(),

    expires_at:
      newExpiry.toISOString(),
  })
  .eq(
    "user_id",
    factory.user_id
  )

        if (
          subscriptionError
        ) {
          console.error(
            subscriptionError
          )

          alert(
            "Payment saved but subscription update failed"
          )

          return
        }

setSaved(true)

setTimeout(() => {
  setSaved(false)

  setForm({
    factoryId: "",
    plan: "Monthly",
    amount: 10000,
    paymentMethod:
      "Bank Transfer",
    paymentReference: "",
    notes: "",
  })
}, 1500)

      } catch (err) {
        console.error(err)

        alert(
          "Something went wrong"
        )

      } finally {
        setLoading(false)
      }
    }

  if (!authorized) {
    return (
      <div className="p-4">
        Loading...
      </div>
    )
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">
          Admin Payments
        </h1>

        <p className="text-xs text-gray-500">
          Record subscription payments
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        {/* FACTORY */}

        <select
          value={
            form.factoryId
          }
          onChange={(e) =>
            setForm({
              ...form,
              factoryId:
                e.target.value,
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        >
          <option value="">
            Select Factory
          </option>

          {factories.map(
            (factory) => (
              <option
                key={
                  factory.id
                }
                value={
                  factory.id
                }
              >
                {
                  factory.name
                }
              </option>
            )
          )}
        </select>

        {/* PLAN */}

        <div className="grid grid-cols-2 gap-2">

          <button
            onClick={() =>
              handlePlanChange(
                "Monthly"
              )
            }
            className={`h-11 rounded-lg text-sm font-medium ${
              form.plan ===
              "Monthly"
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() =>
              handlePlanChange(
                "Annual"
              )
            }
            className={`h-11 rounded-lg text-sm font-medium ${
              form.plan ===
              "Annual"
                ? "bg-green-600 text-white"
                : "bg-green-50 text-green-600"
            }`}
          >
            Annual
          </button>

        </div>

        {/* AMOUNT */}

        <input
          type="number"
          value={
            form.amount
          }
          onChange={(e) =>
            setForm({
              ...form,
              amount:
                Number(
                  e.target.value
                ),
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* METHOD */}

        <select
          value={
            form.paymentMethod
          }
          onChange={(e) =>
            setForm({
              ...form,
              paymentMethod:
                e.target.value,
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        >
          <option>
            Bank Transfer
          </option>

          <option>
            Flutterwave
          </option>
        </select>

        {/* REFERENCE */}

        <input
          type="text"
          placeholder="Payment Reference"
          value={
            form.paymentReference
          }
          onChange={(e) =>
            setForm({
              ...form,
              paymentReference:
                e.target.value,
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* NOTES */}

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes:
                e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm min-h-[100px]"
        />

        {/* SUMMARY */}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

          <div className="flex justify-between text-sm">

            <span>
              Subscription
            </span>

            <span className="font-semibold">
              {form.plan}
            </span>

          </div>

          <div className="flex justify-between text-sm mt-2">

            <span>
              Amount
            </span>

            <span className="font-semibold">
              ₦
              {Number(
                form.amount
              ).toLocaleString()}
            </span>

          </div>

        </div>

        {/* SAVE */}

        <button
          onClick={
            savePayment
          }
          disabled={
            loading
          }
          className={`w-full h-11 rounded-lg text-sm font-semibold ${
            saved
              ? "bg-green-600 text-white"
              : "bg-[#2563eb] text-white"
          }`}
        >
         {loading
          ? "Saving..."
          : saved
          ? "Payment Recorded"
          : "Record Payment"}
        </button>

      </div>

    </div>
  )
}