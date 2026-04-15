"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId, getFactoryName } from "@/lib/factory"

export function Reports() {
  const [filter, setFilter] = useState("today")
  const [data, setData] = useState({
    production: 0,
    sales: 0,
    expenses: 0,
    profit: 0,
    debt: 0,
  })

  useEffect(() => {
    fetchReport()
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

  async function fetchReport() {
    const factoryId = getFactoryId()
    const range = getDateRange()
    if (!range) return

    const { start, end } = range

    // Production
    const { data: production } = await supabase
      .from("production")
      .select("bags_produced")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    // Sales
    const { data: sales } = await supabase
      .from("sales")
      .select("total_amount, balance")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    // Expenses
    const { data: expenses } = await supabase
      .from("expenses")
      .select("amount")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    const totalProduction =
      production?.reduce((sum, p) => sum + p.bags_produced, 0) || 0

    const totalSales =
      sales?.reduce((sum, s) => sum + s.total_amount, 0) || 0

    const totalDebt =
      sales?.reduce((sum, s) => sum + s.balance, 0) || 0

    const totalExpenses =
      expenses?.reduce((sum, e) => sum + e.amount, 0) || 0

    const profit = totalSales - totalExpenses

    setData({
      production: totalProduction,
      sales: totalSales,
      expenses: totalExpenses,
      profit,
      debt: totalDebt,
    })
  }

  const copyReport = () => {
    const factoryName = getFactoryName() || "My Factory"

    const report = `
📊 AquaOps Report

Factory: ${factoryName}
Period: ${filter.toUpperCase()}

Production: ${data.production} bags
Sales: ₦${data.sales.toLocaleString()}
Expenses: ₦${data.expenses.toLocaleString()}
Profit: ₦${data.profit.toLocaleString()}
Debt: ₦${data.debt.toLocaleString()}
`

    navigator.clipboard.writeText(report)
    alert("Report copied! You can paste on WhatsApp 📲")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 pb-24">
      <h1 className="text-2xl font-bold">Reports</h1>

      {/* FILTER */}
      <div className="flex gap-2">
        {["today", "week", "month"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full ${
              filter === f
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* REPORT CARDS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Production</p>
          <p className="text-xl font-bold">
            {data.production.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Sales</p>
          <p className="text-xl font-bold">
            ₦{data.sales.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Expenses</p>
          <p className="text-xl font-bold">
            ₦{data.expenses.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Profit</p>
          <p className="text-xl font-bold text-green-600">
            ₦{data.profit.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <p className="text-gray-500">Debt</p>
          <p className="text-xl font-bold text-red-600">
            ₦{data.debt.toLocaleString()}
          </p>
        </div>
      </div>

      {/* COPY BUTTON */}
      <button
        onClick={copyReport}
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        Copy Report (WhatsApp Ready)
      </button>
    </div>
  )
}