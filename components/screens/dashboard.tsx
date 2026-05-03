"use client"

import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/format"
import {
  Wallet,
  ShoppingCart,
  Factory,
  BarChart3
} from "lucide-react"

import { generateInsights } from "@/app/modules/intelligence/intelligence.service"
import { isPremiumUser } from "@/lib/premium"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"

export function Dashboard({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void
}) {
  const [factoryName, setFactoryName] = useState("")
  const [isPremium, setIsPremium] = useState(false)

  const [period, setPeriod] = useState("today")

  const [data, setData] = useState({
    sales: 0,
    expenses: 0,
    production: 0,
    debt: 0,
  })

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

  // 🔥 FIXED: LOAD DATA
  useEffect(() => {
    const loadDashboard = async () => {
      const factoryId = getFactoryId()
      if (!factoryId) return

      try {
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

        const name = localStorage.getItem("factoryName")
        if (name) setFactoryName(name)

      } catch (err) {
        console.error("Dashboard load error:", err)
      }
    }

    loadDashboard()
  }, [period])

  // 🔥 FIXED: PREMIUM CHECK
  useEffect(() => {
    const checkPremium = async () => {
      const result = await isPremiumUser()
      setIsPremium(result)
    }

    checkPremium()
  }, [])

  const profit = data.sales - data.expenses
  const netCashProfit = profit - data.debt

  const { insights, alerts } = generateInsights({
    sales: data.sales,
    expenses: data.expenses,
    debt: data.debt,
    cash: profit,
  })

  return (
    <div className="space-y-5 p-3 pb-20">

      {/* FILTER */}
      <div className="flex gap-2 flex-wrap">
        {["today", "week", "month"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded-lg text-sm ${
              period === p ? "bg-[#2563eb] text-white" : "bg-gray-100"
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* PRIMARY CARD */}
      <div className="bg-[#0d1b3e] text-white rounded-2xl p-5 shadow-md">
        <p className="text-xs opacity-70">{factoryName || "Factory"} Overview</p>

        <p className="text-3xl font-bold mt-3">
          {formatCurrency(profit)}
        </p>

        <p className="text-xs mt-1 opacity-80">
          {profit > 0 && "Profit — Business is growing"}
          {profit < 0 && "Loss — Business is declining"}
          {profit === 0 && "Break-even"}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

          <div>
            <p className="opacity-70">Sales</p>
            <p className="font-semibold">{formatCurrency(data.sales)}</p>
          </div>

          <div>
            <p className="opacity-70">Expenses</p>
            <p className="font-semibold">{formatCurrency(data.expenses)}</p>
          </div>

          <div>
            <p className="opacity-70">Debt</p>
            <p className="font-semibold">{formatCurrency(data.debt)}</p>
          </div>

          <div>
            <p className="opacity-70">Net Cash Profit</p>
            <p className={netCashProfit < 0 ? "text-red-400" : "text-green-300"}>
              {formatCurrency(netCashProfit)}
            </p>
          </div>

        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setActiveTab("expenses")} className="bg-blue-600 text-white p-3 rounded-xl flex gap-2">
          <Wallet size={16}/> Add Expense
        </button>

        <button onClick={() => setActiveTab("sales")} className="bg-blue-50 p-3 rounded-xl flex gap-2">
          <ShoppingCart size={16}/> Add Sale
        </button>

        <button onClick={() => setActiveTab("production")} className="bg-blue-50 p-3 rounded-xl flex gap-2">
          <Factory size={16}/> Production
        </button>

        <button onClick={() => setActiveTab("reports")} className="bg-orange-50 p-3 rounded-xl flex gap-2">
          <BarChart3 size={16}/> Reports
        </button>
      </div>

      {/* SNAPSHOT */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Profit</span>
          <span>{formatCurrency(profit)}</span>
        </div>

        <div className="flex justify-between">
          <span>Debt</span>
          <span className="text-red-600">{formatCurrency(data.debt)}</span>
        </div>

        <div className="flex justify-between">
          <span>Production</span>
          <span>{data.production} bags</span>
        </div>
      </div>

      {/* INSIGHTS */}
      {isPremium && (
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
          {alerts.map((a, i) => <div key={i} className="text-red-600">{a}</div>)}
          {insights.map((i, index) => <div key={index} className="text-green-600">{i}</div>)}
        </div>
      )}

    </div>
  )
}