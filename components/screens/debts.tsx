"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { formatCurrency } from "@/lib/format"
import { AlertCircle } from "lucide-react"

export function Debts() {
  const [debts, setDebts] = useState<any[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [payment, setPayment] = useState("")

  const loadDebts = async () => {
    const factoryId = getFactoryId()
    if (!factoryId) return

    const { data } = await supabase
      .from("sales")
      .select("*")
      .eq("factory_id", factoryId)
      .gt("balance", 0)

    if (!data) return

    const grouped: any = {}

    data.forEach((sale) => {
      const name = sale.customer_name || "Unknown"

      if (!grouped[name]) grouped[name] = 0

      grouped[name] += Number(sale.balance || 0)
    })

    const result = Object.keys(grouped).map((name) => ({
      customer: name,
      amount: grouped[name],
    }))

    setDebts(result)
  }

  useEffect(() => {
    loadDebts()
  }, [])

  // 💰 COLLECT PAYMENT
  const handleCollect = async () => {
    const factoryId = getFactoryId()
    if (!factoryId || !selectedCustomer || !payment) return

    let remaining = Number(payment)

    const { data: sales } = await supabase
      .from("sales")
      .select("*")
      .eq("factory_id", factoryId)
      .eq("customer_name", selectedCustomer)
      .gt("balance", 0)
      .order("created_at", { ascending: true })

    if (!sales) return

    for (const sale of sales) {
      if (remaining <= 0) break

      const balance = Number(sale.balance)
      const pay = Math.min(balance, remaining)

      const newPaid = Number(sale.amount_paid) + pay
      const newBalance = balance - pay

      await supabase
        .from("sales")
        .update({
          amount_paid: newPaid,
          balance: newBalance,
        })
        .eq("id", sale.id)

      remaining -= pay
    }

    setPayment("")
    setSelectedCustomer(null)
    loadDebts()
  }

  const totalDebt = debts.reduce((s, d) => s + d.amount, 0)

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">Debts</h1>
        <p className="text-xs text-gray-500">
          Track money owed by customers
        </p>
      </div>

      {/* TOTAL */}
      <div className="bg-[#0d1b3e] text-white p-5 rounded-xl shadow-md">
        <p className="text-xs opacity-80">Total Outstanding Debt</p>
        <p className="text-2xl font-bold mt-1">
          {formatCurrency(totalDebt)}
        </p>
      </div>

      {/* LIST */}
      <div className="bg-white p-4 rounded-xl shadow-sm">

        {debts.length === 0 ? (
          <p className="text-sm text-gray-500">
            No outstanding debts 🎉
          </p>
        ) : (
          debts.map((d, index) => (
            <div
              key={index}
              className="py-3 border-b last:border-none space-y-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {d.customer}
                  </p>
                  <p className="text-xs text-gray-400">
                    Outstanding
                  </p>
                </div>

                <p className="text-red-600 font-semibold">
                  {formatCurrency(d.amount)}
                </p>
              </div>

              {/* COLLECT BUTTON */}
              <button
                onClick={() => setSelectedCustomer(d.customer)}
                className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg"
              >
                Collect Payment
              </button>

              {/* INPUT BOX */}
              {selectedCustomer === d.customer && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    className="flex-1 h-9 border rounded px-2 text-sm"
                  />
                  <button
                    onClick={handleCollect}
                    className="bg-green-600 text-white px-3 rounded text-sm"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ALERT CARD */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="bg-red-500 text-white p-2 rounded-lg">
            <AlertCircle size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-700">
              Cash Flow Alert
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Follow up on unpaid balances to improve your cash flow.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}