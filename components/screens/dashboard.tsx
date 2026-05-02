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

export function Dashboard({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void
}) {
  const [sales, setSales] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [production, setProduction] = useState<any[]>([])
  const [loans, setLoans] = useState<any[]>([])
  const [bank, setBank] = useState<any[]>([])
  const [debts, setDebts] = useState<any[]>([])
  const [factoryName, setFactoryName] = useState("")

  useEffect(() => {
    setSales(JSON.parse(localStorage.getItem("sales") || "[]"))
    setExpenses(JSON.parse(localStorage.getItem("expenses") || "[]"))
    setProduction(JSON.parse(localStorage.getItem("production") || "[]"))
    setLoans(JSON.parse(localStorage.getItem("loans") || "[]"))
    setBank(JSON.parse(localStorage.getItem("bank") || "[]"))
    setDebts(JSON.parse(localStorage.getItem("debts") || "[]"))

    const name = localStorage.getItem("factoryName")
    if (name) setFactoryName(name)
  }, [])

  const totalSales = sales.reduce((s, i) => s + (i.amount || 0), 0)
  const totalExpenses = expenses.reduce((s, i) => s + (i.amount || 0), 0)
  const totalProduction = production.reduce((s, i) => s + (i.quantity || 0), 0)
  const totalDebts = debts.reduce((s, d) => s + (d.amount || 0), 0)

  const profit = totalSales - totalExpenses

  const { insights, alerts } = generateInsights({
    sales: totalSales,
    expenses: totalExpenses,
    debt: totalDebts,
    cash: profit,
  })

  return (
    <div className="space-y-5 p-3 pb-20">

      {/* 🔥 PRIMARY CARD */}
      <div className="bg-[#0d1b3e] text-white rounded-2xl p-5 shadow-md">

        <p className="text-xs opacity-70 tracking-wide">
          {factoryName || "Factory"} Overview
        </p>

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
            <p className="font-semibold text-base">
              {formatCurrency(totalSales)}
            </p>
          </div>

          <div>
            <p className="opacity-70">Expenses</p>
            <p className="font-semibold text-base">
              {formatCurrency(totalExpenses)}
            </p>
          </div>

          <div>
            <p className="opacity-70">Debt</p>
            <p className="font-semibold text-base">
              {formatCurrency(totalDebts)}
            </p>
          </div>

          <div>
            <p className="opacity-70">Production</p>
            <p className="font-semibold text-base">
              {totalProduction} bags
            </p>
          </div>

        </div>
      </div>

      {/* ⚡ QUICK ACTIONS */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Quick Actions
        </p>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => setActiveTab("expenses")}
            className="flex items-center gap-3 bg-[#2563eb] text-white py-3 px-3 rounded-xl font-medium shadow-sm active:scale-[0.97]"
          >
            <Wallet size={16} />
            Add Expense
          </button>

          <button
            onClick={() => setActiveTab("sales")}
            className="flex items-center gap-3 bg-blue-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium active:scale-[0.97]"
          >
            <ShoppingCart size={16} />
            Add Sale
          </button>

          <button
            onClick={() => setActiveTab("production")}
            className="flex items-center gap-3 bg-blue-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium active:scale-[0.97]"
          >
            <Factory size={16} />
            Production
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className="flex items-center gap-3 bg-orange-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium active:scale-[0.97]"
          >
            <BarChart3 size={16} />
            Reports
          </button>

        </div>
      </div>

      {/* 📊 PERFORMANCE SNAPSHOT */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
        <p className="text-sm font-semibold text-gray-700">
          Performance Snapshot
        </p>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Profit</span>
            <span className="font-medium">
              {formatCurrency(profit)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Debt Level</span>
            <span className="text-red-600 font-medium">
              {formatCurrency(totalDebts)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Efficiency</span>
            <span className="font-medium">
              {totalSales > 0
                ? `${Math.round((1 - totalExpenses / totalSales) * 100)}%`
                : "0%"}
            </span>
          </div>

        </div>
      </div>

      {/* 🧠 INTELLIGENCE */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">

        <p className="text-sm font-semibold text-gray-700">
          Business Insights
        </p>

        {alerts.map((a, i) => (
          <div key={i} className="text-sm text-red-600">
            {a}
          </div>
        ))}

        {insights.map((i, index) => (
          <div key={index} className="text-sm text-green-600">
            {i}
          </div>
        ))}

      </div>

    </div>
  )
}