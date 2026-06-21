

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function AdminCustomers() {
  const [loading, setLoading] =
    useState(true)

  const [customers, setCustomers] =
    useState<any[]>([])

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
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

      setCustomers(
        customerData || []
      )
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const activeCustomers =
    customers.filter(
      (c) =>
        c.status === "Active"
    ).length

  const trialCustomers =
    customers.filter(
      (c) =>
        c.status === "Trial"
    ).length

  const expiredCustomers =
    customers.filter(
      (c) =>
        c.trial_state ===
        "Expired"
    ).length

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    )
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      <div>
        <h1 className="text-2xl font-bold">
          Customers
        </h1>

        <p className="text-sm text-gray-500">
          AquaOps Customer Management
        </p>
      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-2 gap-3">

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Total Customers
          </p>

          <p className="text-2xl font-bold text-[#0d1b3e]">
            {customers.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Active Customers
          </p>

          <p className="text-2xl font-bold text-green-600">
            {activeCustomers}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Trial Customers
          </p>

          <p className="text-2xl font-bold text-blue-600">
            {trialCustomers}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Expired
          </p>

          <p className="text-2xl font-bold text-red-600">
            {expiredCustomers}
          </p>
        </div>

      </div>

      {/* CUSTOMER LIST */}

      <div className="space-y-3">

        {customers.map(
          (
            customer,
            index
          ) => (
            <div
              key={`${customer.factory_id}-${index}`}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-semibold text-lg">
                    {
                      customer.factory_name
                    }
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Joined{" "}
                    {new Date(
                      customer.signup_date
                    ).toLocaleDateString()}
                  </p>

                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    customer.status ===
                    "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {customer.status}
                </span>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                <div>
                  <p className="text-gray-500">
                    Plan
                  </p>

                  <p className="font-medium">
                    {customer.plan}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Trial Status
                  </p>

                  <p className="font-medium">
                    {
                      customer.trial_state
                    }
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Started
                  </p>

                  <p className="font-medium">
                    {customer.started_at
                      ? new Date(
                          customer.started_at
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Expiry
                  </p>

                  <p className="font-medium">
                    {customer.expires_at
                      ? new Date(
                          customer.expires_at
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  )
}