import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Overview = {
  total_factories: number
  active_trials: number
  expiring_soon: number
  expired_trials: number
  premium_factories: number
  total_payments: number
  total_revenue: number
}

interface AdminDashboardProps {
  onNavigate?: (tab: string) => void
}

export function AdminDashboard({
  onNavigate,
}: AdminDashboardProps) {
  const [authorized, setAuthorized] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const [overview, setOverview] =
    useState<Overview | null>(null)

  const [customers, setCustomers] =
    useState<any[]>([])

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { data: adminUser } =
        await supabase
          .from("admin_users")
          .select("email")
          .eq("email", user?.email)
          .single()

      if (!adminUser) {
        setLoading(false)
        return
      }

      setAuthorized(true)

      const {
        data: overviewData,
      } = await supabase
        .from("saas_overview")
        .select("*")
        .single()

      const {
        data: customerData,
      } = await supabase
        .from("saas_customers")
        .select("*")
        .order(
          "signup_date",
          {
            ascending: false,
          }
        )
        .limit(10)

      setOverview(
        overviewData as Overview
      )

      setCustomers(
        customerData || []
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="p-6">
        Unauthorized
      </div>
    )
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      <div>
        <h1 className="text-2xl font-bold">
          SaaS Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          AquaOps Control Center
        </p>
      </div>

      {/* OVERVIEW */}

      <div className="grid grid-cols-2 gap-3">

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Factories
          </p>

          <p className="text-2xl font-bold text-[#0d1b3e]">
            {overview?.total_factories || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Active Trials
          </p>

          <p className="text-2xl font-bold text-green-600">
            {overview?.active_trials || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Premium Factories
          </p>

          <p className="text-2xl font-bold text-purple-600">
            {overview?.premium_factories || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Payments
          </p>

          <p className="text-2xl font-bold text-[#0d1b3e]">
            {overview?.total_payments || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Revenue
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₦
            {Number(
              overview?.total_revenue || 0
            ).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Expiring Soon
          </p>

          <p className="text-2xl font-bold text-orange-500">
            {overview?.expiring_soon || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Expired Trials
          </p>

          <p className="text-2xl font-bold text-red-600">
            {overview?.expired_trials || 0}
          </p>
        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="bg-white rounded-2xl p-4 shadow-sm">

        <h2 className="font-semibold mb-3">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => onNavigate?.("admin-customers")}
            className="bg-blue-600 text-white rounded-xl py-3 font-medium"
          >
            Customers
          </button>

          <button
            onClick={() => onNavigate?.("admin-subscriptions")}
            className="bg-purple-600 text-white rounded-xl py-3 font-medium"
          >
            Subscriptions
          </button>

          <button
            onClick={() => onNavigate?.("admin-payments")}
            className="bg-green-600 text-white rounded-xl py-3 font-medium"
          >
            Payments
          </button>

          <button
            onClick={() => onNavigate?.("admin-revenue")}
            className="bg-[#0d1b3e] text-white rounded-xl py-3 font-medium"
          >
            Revenue
          </button>

        </div>

      </div>

      {/* RECENT SIGNUPS */}

      <div className="bg-white rounded-2xl p-4 shadow-sm">

        <h2 className="font-semibold mb-3">
          Recent Signups
        </h2>

        <div className="space-y-3">

          {customers.map(
            (customer, index) => (
              <div
                key={`${customer.factory_name}-${index}`}
                className="border-b pb-2"
              >
                <p className="font-medium">
                  {customer.factory_name}
                </p>

                <p className="text-xs text-gray-500">
                  Joined{" "}
                  {new Date(
                    customer.signup_date
                  ).toLocaleDateString()}
                </p>
              </div>
            )
          )}

        </div>

      </div>

      {/* TRIAL STATUS */}

      <div className="bg-white rounded-2xl p-4 shadow-sm">

        <h2 className="font-semibold mb-3">
          Trial Status
        </h2>

        <div className="space-y-3">

          {customers.map(
            (customer, index) => (
              <div
                key={`${customer.factory_name}-trial-${index}`}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {customer.factory_name}
                  </p>

                  <p className="text-xs text-gray-500">
                    Ends{" "}
                    {new Date(
                      customer.trial_end_date
                    ).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    customer.trial_state ===
                    "Active Trial"
                      ? "bg-green-100 text-green-700"
                      : customer.trial_state ===
                        "Expiring Soon"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {customer.trial_state}
                </span>
              </div>
            )
          )}

        </div>

      </div>

    </div>
  )
}