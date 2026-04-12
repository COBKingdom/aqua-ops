"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function Debts() {
  const [debts, setDebts] = useState<any[]>([])
  const [filter, setFilter] = useState("today")

  useEffect(() => {
    fetchDebts()
  }, [filter])

  function getDateRange() {
    const today = new Date()
    const format = (date: Date) => date.toISOString().split("T")[0]

    if (filter === "today") {
      const d = format(today)
      return { start: d, end: d }
    }

    if (filter === "week") {
      const firstDay = new Date(
        today.setDate(today.getDate() - today.getDay())
      )
      return {
        start: format(firstDay),
        end: format(new Date()),
      }
    }

    if (filter === "month") {
      const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
      return {
        start: format(firstDay),
        end: format(new Date()),
      }
    }
  }

  async function fetchDebts() {
    const range = getDateRange()
    if (!range) return

    const { start, end } = range

    const { data } = await supabase
      .from("sales")
      .select("*")
      .gte("date", start)
      .lte("date", end)

    const grouped: any = {}

    data?.forEach((item: any) => {
      if (!grouped[item.customer_name]) {
        grouped[item.customer_name] = {
          customer_name: item.customer_name,
          total_amount: 0,
          amount_paid: 0,
          balance: 0,
        }
      }

      grouped[item.customer_name].total_amount += item.total_amount
      grouped[item.customer_name].amount_paid += item.amount_paid
      grouped[item.customer_name].balance += item.balance
    })

    setDebts(Object.values(grouped))
  }

  async function recordPayment(customerName: string) {
    const amount = prompt("Enter amount paid")
    if (!amount) return

    let payment = parseInt(amount)

    const { data } = await supabase
      .from("sales")
      .select("*")
      .eq("customer_name", customerName)

    for (const sale of data || []) {
      if (sale.balance > 0 && payment > 0) {
        const deduction = Math.min(payment, sale.balance)

        await supabase
          .from("sales")
          .update({
            amount_paid: sale.amount_paid + deduction,
            balance: sale.balance - deduction,
          })
          .eq("id", sale.id)

        payment -= deduction
      }
    }

    fetchDebts()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 pb-24">
      
      <header>
        <h1 className="text-2xl font-bold">Customer Debts</h1>
      </header>

      {/* FILTER */}
      <div className="flex gap-2">
        {["today", "week", "month"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full shadow-sm ${
              filter === f
                ? "bg-black text-white shadow-md"
                : "bg-gray-200"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {debts.map((d, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-md border flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{d.customer_name}</p>
              <p className="text-sm text-gray-500">
                Total: ₦{d.total_amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Paid: ₦{d.amount_paid.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-red-600 font-bold">
                ₦{d.balance.toLocaleString()}
              </p>

              <button
                onClick={() => recordPayment(d.customer_name)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded shadow-sm"
              >
                Record Payment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}