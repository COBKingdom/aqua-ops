"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { formatCurrency } from "@/lib/format"

export function Reports() {
  const [data, setData] = useState<any>({
    sales: 0,
    expenses: 0,
    production: 0,
    debt: 0,
  })

  const [period, setPeriod] = useState("today")

  const getDateFilter = () => {
    const now = new Date()

    if (period === "today") return now.toISOString().split("T")[0]

    if (period === "week")
      return new Date(now.getTime() - 7 * 86400000)
        .toISOString()
        .split("T")[0]

    if (period === "month")
      return new Date(now.getTime() - 30 * 86400000)
        .toISOString()
        .split("T")[0]
  }

  const loadReport = async () => {
    const factoryId = getFactoryId()
    if (!factoryId) return

    const dateFilter = getDateFilter()

    const { data: sales } = await supabase
      .from("sales")
      .select("*")
      .eq("factory_id", factoryId)
      .gte("date", dateFilter)

    const { data: expenses } = await supabase
      .from("expenses")
      .select("*")
      .eq("factory_id", factoryId)
      .gte("date", dateFilter)

    const { data: production } = await supabase
      .from("production")
      .select("*")
      .eq("factory_id", factoryId)
      .gte("date", dateFilter)

    const { data: debts } = await supabase
      .from("sales")
      .select("*")
      .eq("factory_id", factoryId)
      .gt("balance", 0)

    const totalSales =
      sales?.reduce((s, i) => s + Number(i.total_amount || 0), 0) || 0

    const totalExpenses =
      expenses?.reduce((s, i) => s + Number(i.amount || 0), 0) || 0

    const totalProduction =
      production?.reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0

    const totalDebt =
      debts?.reduce((s, i) => s + Number(i.balance || 0), 0) || 0

    setData({
      sales: totalSales,
      expenses: totalExpenses,
      production: totalProduction,
      debt: totalDebt,
    })
  }

  useEffect(() => {
    loadReport()
  }, [period])

  const profit = data.sales - data.expenses

  // 🔥 PREMIUM REPORT TEXT
  const generateReportText = () => {
    return `📊 BUSINESS REPORT — ${period.toUpperCase()}

━━━━━━━━━━━━━━━━━━━

💰 Revenue
Sales: ${formatCurrency(data.sales)}

💸 Expenses
Total: ${formatCurrency(data.expenses)}

📦 Operations
Production: ${data.production} bags

⚠️ Risk
Outstanding Debt: ${formatCurrency(data.debt)}

━━━━━━━━━━━━━━━━━━━

📈 Net Result: ${formatCurrency(profit)}

━━━━━━━━━━━━━━━━━━━

Generated via AquaOps`
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateReportText())
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const handleEmail = () => {
    const subject = encodeURIComponent("Business Report")
    const body = encodeURIComponent(generateReportText())
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">Reports</h1>
        <p className="text-xs text-gray-500">
          Professional business summary
        </p>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {[
          { key: "today", label: "Today" },
          { key: "week", label: "Week" },
          { key: "month", label: "Month" },
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={`px-3 py-1 rounded-lg text-sm ${
              period === p.key
                ? "bg-[#2563eb] text-white"
                : "bg-gray-100"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

{/* 🔥 HERO CARD */}
<div className="bg-gradient-to-r from-black to-gray-800 text-white p-5 rounded-xl shadow-md">
  <p className="text-xs opacity-80">Net Result</p>

  <p className="text-3xl font-bold mt-2">
    {formatCurrency(profit)}
  </p>

  <p className="text-xs mt-1 opacity-90">
    {profit > 0 && "Profit — Business is growing"}
    {profit < 0 && "Loss — Business is declining"}
    {profit === 0 && "Break-even"}
  </p>
</div>

{/* GRID SUMMARY */}
<div className="grid grid-cols-2 gap-3">

  <div className="bg-white p-3 rounded-xl shadow-sm">
    <p className="text-sm font-semibold text-[#0d1b3e]">Sales</p>
    <p className="text-lg font-bold mt-1">
      {formatCurrency(data.sales)}
    </p>
  </div>

  <div className="bg-white p-3 rounded-xl shadow-sm">
    <p className="text-sm font-semibold text-[#0d1b3e]">Expenses</p>
    <p className="text-lg font-bold mt-1">
      {formatCurrency(data.expenses)}
    </p>
  </div>

  <div className="bg-white p-3 rounded-xl shadow-sm">
    <p className="text-sm font-semibold text-[#0d1b3e]">Production</p>
    <p className="text-lg font-bold mt-1">
      {data.production} bags
    </p>
  </div>

  <div className="bg-white p-3 rounded-xl shadow-sm">
    <p className="text-sm font-semibold text-[#0d1b3e]">Debt</p>
    <p className="text-lg font-bold text-red-600 mt-1">
      {formatCurrency(data.debt)}
    </p>
  </div>

</div>

      {/* SHARE BUTTONS */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleWhatsApp}
          className="w-full h-11 bg-green-600 text-white rounded-lg font-semibold"
        >
          Share WhatsApp
        </button>

        <button
          onClick={handleEmail}
          className="w-full h-11 bg-gray-800 text-white rounded-lg font-semibold"
        >
          Share Email
        </button>
      </div>

    </div>
  )
}