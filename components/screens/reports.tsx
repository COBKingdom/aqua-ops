"use client"

import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/format"

type Filter = "day" | "week" | "month"

export function Reports() {
  const [sales, setSales] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [production, setProduction] = useState<any[]>([])
  const [debts, setDebts] = useState<any[]>([])

  const [filter, setFilter] = useState<Filter>("day")

  useEffect(() => {
    setSales(JSON.parse(localStorage.getItem("sales") || "[]"))
    setExpenses(JSON.parse(localStorage.getItem("expenses") || "[]"))
    setProduction(JSON.parse(localStorage.getItem("production") || "[]"))
    setDebts(JSON.parse(localStorage.getItem("debts") || "[]"))
  }, [])

  const today = new Date()

  const isInRange = (dateStr: string) => {
    if (!dateStr) return false

    const date = new Date(dateStr)

    if (filter === "day") {
      return date.toDateString() === today.toDateString()
    }

    if (filter === "week") {
      const start = new Date()
      start.setDate(today.getDate() - 7)
      return date >= start && date <= today
    }

    if (filter === "month") {
      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    }

    return true
  }

  const filteredSales = sales.filter((s) => isInRange(s.date))
  const filteredExpenses = expenses.filter((e) => isInRange(e.date))
  const filteredProduction = production.filter((p) => isInRange(p.date))
  const filteredDebts = debts.filter((d) => isInRange(d.date))

  const totalSales = filteredSales.reduce((s, i) => s + (i.amount || 0), 0)
  const totalExpenses = filteredExpenses.reduce((s, i) => s + (i.amount || 0), 0)
  const totalProduction = filteredProduction.reduce((s, i) => s + (i.quantity || 0), 0)
  const totalDebts = filteredDebts.reduce((s, i) => s + (i.amount || 0), 0)

  const profit = totalSales - totalExpenses
  const netCash = totalSales - totalExpenses

  const label =
    filter === "day"
      ? "Today"
      : filter === "week"
      ? "This Week"
      : "This Month"

  // 📤 REPORT TEXT
  const reportText = `
${label} Business Report

Sales: ${formatCurrency(totalSales)}
Expenses: ${formatCurrency(totalExpenses)}
Production: ${totalProduction} bags
Debts: ${formatCurrency(totalDebts)}

Profit: ${formatCurrency(profit)}
Net Cash: ${formatCurrency(netCash)}
`

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <header className="pt-1">
        <h1 className="text-lg font-bold text-[#0d1b3e]">Reports</h1>
        <p className="text-xs text-gray-500">{label} Overview</p>
      </header>

      {/* FILTERS */}
      <div className="grid grid-cols-3 gap-2">

        <button
          onClick={() => setFilter("day")}
          className={`h-10 rounded-lg text-sm ${
            filter === "day"
              ? "bg-[#2563eb] text-white"
              : "bg-blue-50 text-[#2563eb]"
          }`}
        >
          Day
        </button>

        <button
          onClick={() => setFilter("week")}
          className={`h-10 rounded-lg text-sm ${
            filter === "week"
              ? "bg-[#2563eb] text-white"
              : "bg-blue-50 text-[#2563eb]"
          }`}
        >
          Week
        </button>

        <button
          onClick={() => setFilter("month")}
          className={`h-10 rounded-lg text-sm ${
            filter === "month"
              ? "bg-[#2563eb] text-white"
              : "bg-blue-50 text-[#2563eb]"
          }`}
        >
          Month
        </button>

      </div>

      {/* SUMMARY */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        <div className="flex justify-between text-sm">
          <span>Sales</span>
          <span>{formatCurrency(totalSales)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Expenses</span>
          <span>{formatCurrency(totalExpenses)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Production</span>
          <span>{totalProduction} bags</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Debts</span>
          <span className="text-red-500">
            {formatCurrency(totalDebts)}
          </span>
        </div>

        <div className="border-t pt-2 flex justify-between text-sm font-semibold">
          <span>Profit</span>
          <span className={profit >= 0 ? "text-green-600" : "text-red-500"}>
            {formatCurrency(profit)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Net Cash</span>
          <span>{formatCurrency(netCash)}</span>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-2">

        <button
          onClick={() => {
            const url = `https://wa.me/?text=${encodeURIComponent(reportText)}`
            window.open(url, "_blank")
          }}
          className="h-11 bg-green-500 text-white rounded-lg text-sm font-semibold active:scale-[0.97]"
        >
          WhatsApp
        </button>

        <button
          onClick={() => {
            const url = `mailto:?subject=Business Report&body=${encodeURIComponent(reportText)}`
            window.location.href = url
          }}
          className="h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97]"
        >
          Email
        </button>

      </div>

    </div>
  )
}