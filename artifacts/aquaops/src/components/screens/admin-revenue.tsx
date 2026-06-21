

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function AdminRevenue() {
  const [loading, setLoading] =
    useState(true)

  const [revenue, setRevenue] =
    useState<any>(null)

  const [payments, setPayments] =
    useState<any[]>([])

  useEffect(() => {
    loadRevenue()
  }, [])

  const loadRevenue = async () => {
    try {
      const {
        data: revenueData,
      } = await supabase
        .from("saas_revenue")
        .select("*")
        .single()

      const {
        data: paymentData,
      } = await supabase
        .from("saas_payments")
        .select("*")
        .order(
          "payment_date",
          {
            ascending: false,
          }
        )
        .limit(20)

      setRevenue(
        revenueData
      )

      setPayments(
        paymentData || []
      )
    } catch (err) {
      console.error(err)
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

  return (
    <div className="p-4 space-y-5 pb-24">

      <div>
        <h1 className="text-2xl font-bold">
          Revenue
        </h1>

        <p className="text-sm text-gray-500">
          AquaOps Revenue Center
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Total Revenue
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₦
            {Number(
              revenue?.total_revenue || 0
            ).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Total Payments
          </p>

          <p className="text-2xl font-bold text-[#0d1b3e]">
            {revenue?.total_payments || 0}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">

        <h2 className="font-semibold mb-3">
          Recent Payments
        </h2>

        <div className="space-y-3">

          {payments.map(
            (
              payment,
              index
            ) => (
              <div
                key={index}
                className="border-b pb-3"
              >
                <div className="flex justify-between">

                  <div>

                    <p className="font-medium">
                      {
                        payment.factory_name
                      }
                    </p>

                    <p className="text-xs text-gray-500">
                      {
                        payment.payment_method
                      }
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold text-green-600">
                      ₦
                      {Number(
                        payment.amount
                      ).toLocaleString()}
                    </p>

                    <p className="text-xs text-gray-500">
                      {
                        payment.status
                      }
                    </p>

                  </div>

                </div>
              </div>
            )
          )}

        </div>

      </div>

    </div>
  )
}