"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"

export function Dashboard() {
  const [filter, setFilter] = useState("today")

  const [totalBags, setTotalBags] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [totalDebt, setTotalDebt] = useState(0)
  const [cashReceived, setCashReceived] = useState(0)

  useEffect(() => {
    fetchData()
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

  async function fetchData() {
    const factoryId = getFactoryId()
    const range = getDateRange()
    if (!range) return

    const { start, end } = range

    const { data: production } = await supabase
      .from("production")
      .select("bags_produced")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    if (production) {
      setTotalBags(
        production.reduce((sum, item) => sum + item.bags_produced, 0)
      )
    }

    const { data: sales } = await supabase
      .from("sales")
      .select("total_amount, balance, amount_paid")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    if (sales) {
      setTotalSales(
        sales.reduce((sum, item) => sum + item.total_amount, 0)
      )

      setTotalDebt(
        sales.reduce((sum, item) => sum + item.balance, 0)
      )

      setCashReceived(
        sales.reduce((sum, item) => sum + item.amount_paid, 0)
      )
    }

    const { data: expenses } = await supabase
      .from("expenses")
      .select("amount")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    if (expenses) {
      setTotalExpenses(
        expenses.reduce((sum, item) => sum + item.amount, 0)
      )
    }
  }

  const profit = totalSales - totalExpenses

  return (
    <div className="max-w-md mx-auto space-y-6 p-4 pb-24">

      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Factory overview
        </p>
      </header>

      {/* FILTER */}
      <div className="flex gap-2 justify-between">
        {["today", "week", "month"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-full text-sm shadow-sm ${
              filter === f
                ? "bg-black text-white shadow-md"
                : "bg-gray-200"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🔥 GRID FIXED (2 PER ROW) */}
      <div className="grid grid-cols-2 gap-3">

        <div className="bg-white p-4 rounded-xl shadow-md border">
          <p className="text-xs text-gray-500">Bags</p>
          <h2 className="text-lg font-bold mt-1">
            {totalBags.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border">
          <p className="text-xs text-gray-500">Sales</p>
          <h2 className="text-lg font-bold mt-1">
            ₦{totalSales.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border">
          <p className="text-xs text-gray-500">Expenses</p>
          <h2 className="text-lg font-bold mt-1">
            ₦{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl shadow-md border">
          <p className="text-xs text-yellow-700">Debt</p>
          <h2 className="text-lg font-bold mt-1 text-yellow-800">
            ₦{totalDebt.toLocaleString()}
          </h2>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl shadow-md border">
          <p className="text-xs text-blue-700">Cash</p>
          <h2 className="text-lg font-bold mt-1 text-blue-800">
            ₦{cashReceived.toLocaleString()}
          </h2>
        </div>

        <div className="bg-green-50 p-4 rounded-xl shadow-md border">
          <p className="text-xs text-green-700">Profit</p>
          <h2 className="text-lg font-bold mt-1 text-green-800">
            ₦{profit.toLocaleString()}
          </h2>
        </div>

      </div>
    </div>
  )
}