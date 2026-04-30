"use client"

import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/format"
import {
  Wallet,
  ShoppingCart,
  Factory,
  BarChart3
} from "lucide-react"

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

  // 💰 CALCULATIONS

  const totalSales = sales.reduce((s, i) => s + (i.amount || 0), 0)
  const totalExpenses = expenses.reduce((s, i) => s + (i.amount || 0), 0)
  const totalProduction = production.reduce((s, i) => s + (i.quantity || 0), 0)

  const totalLoans = loans.reduce((s, l) => s + (l.amount || 0), 0)
  const totalLoanPaid = loans.reduce((s, l) => s + (l.amountPaid || 0), 0)
  const outstandingLoans = totalLoans - totalLoanPaid

  const totalDebts = debts.reduce((s, d) => s + (d.amount || 0), 0)

  const deposits = bank
    .filter((t) => t.type === "deposit")
    .reduce((s, t) => s + (t.amount || 0), 0)

  const withdrawals = bank
    .filter((t) => t.type === "withdraw")
    .reduce((s, t) => s + (t.amount || 0), 0)

  const bankBalance = deposits - withdrawals

const cashOnHand =
  totalSales -
  totalExpenses -
  totalLoanPaid -
  deposits

  const netPosition =
    cashOnHand + bankBalance + totalDebts - outstandingLoans

  return (
    <div className="space-y-4">

      {/* 🔵 PRIMARY CARD */}
      <div className="bg-[#0d1b3e] text-white rounded-2xl p-5 shadow-md">
        <p className="text-xs opacity-80">
          {factoryName || "Factory"} Financial Overview
        </p>

        <p className="text-2xl font-bold mt-2">
          {formatCurrency(cashOnHand)}
        </p>

        <p className="text-xs opacity-70">Cash on Hand</p>

        <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

          <div>
            <p className="opacity-70">Bank</p>
            <p className="font-semibold">
              {formatCurrency(bankBalance)}
            </p>
          </div>

          <div>
            <p className="opacity-70">Loans</p>
            <p className="font-semibold">
              {formatCurrency(outstandingLoans)}
            </p>
          </div>

          <div>
            <p className="opacity-70">Debts</p>
            <p className="font-semibold">
              {formatCurrency(totalDebts)}
            </p>
          </div>

          <div>
            <p className="opacity-70">Net Position</p>
            <p className="font-semibold">
              {formatCurrency(netPosition)}
            </p>
          </div>

        </div>
      </div>

{/* ⚡ QUICK ACTIONS */}
<div>
  <p className="text-sm font-semibold text-gray-700 mb-2">
    Quick Actions
  </p>

  <div className="grid grid-cols-2 gap-3">

    {/* PRIMARY ACTION — EXPENSE */}
<button
  onClick={() => setActiveTab("expenses")}
  className="flex items-center gap-3 bg-[#2563eb] text-white py-3 px-3 rounded-xl font-medium shadow-sm transition active:scale-[0.97]"
>
  <div className="bg-white/20 p-1.5 rounded-lg">
    <Wallet size={16} />
  </div>
  Add Expense
</button>

    {/* SECONDARY — SALE */}
    <button
      onClick={() => setActiveTab("sales")}
      className="flex items-center gap-3 bg-blue-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium transition active:scale-[0.97]"
    >
      <div className="bg-blue-100 p-1.5 rounded-lg">
        <ShoppingCart size={16} />
      </div>
      Add Sale
    </button>

    {/* SECONDARY — PRODUCTION */}
    <button
      onClick={() => setActiveTab("production")}
      className="flex items-center gap-3 bg-blue-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium transition active:scale-[0.97]"
    >
      <div className="bg-blue-100 p-1.5 rounded-lg">
        <Factory size={16} />
      </div>
      Production
    </button>

    {/* INSIGHT — REPORTS */}
    <button
      onClick={() => setActiveTab("reports")}
      className="flex items-center gap-3 bg-orange-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium transition active:scale-[0.97]"
    >
      <div className="bg-orange-100 p-1.5 rounded-lg">
        <BarChart3 size={16} />
      </div>
      Reports
    </button>

  </div>
</div>

{/* 📊 SUMMARY */}
<div className="bg-white p-4 rounded-xl shadow-sm">
  <p className="text-sm font-semibold text-gray-700 mb-2">
    Summary
  </p>

  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span>Sales</span>
      <span>{formatCurrency(totalSales)}</span>
    </div>

    <div className="flex justify-between">
      <span>Expenses</span>
      <span>{formatCurrency(totalExpenses)}</span>
    </div>

    <div className="flex justify-between">
      <span>Production</span>
      <span>{totalProduction} bags</span>
    </div>
  </div>
</div>

{/* 🧾 RECENT ACTIVITY */}
<div className="bg-white p-4 rounded-xl shadow-sm">
  <p className="text-sm font-semibold text-gray-700 mb-3">
    Recent Activity
  </p>

  {[
    ...sales.map((s) => ({
      type: "sale",
      label: "Sale",
      amount: s.amount,
      date: s.date || new Date().toISOString(),
    })),
    ...expenses.map((e) => ({
      type: "expense",
      label: e.note || "Expense",
      amount: e.amount,
      date: e.date || "",
    })),
    ...production.map((p) => ({
      type: "production",
      label: `${p.quantity || 0} bags produced`,
      amount: p.quantity || 0,
      date: p.date || "",
    })),
  ]
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 6)
    .map((item, index) => {
      const isSale = item.type === "sale"
      const isExpense = item.type === "expense"
      const isProduction = item.type === "production"

      return (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b last:border-none"
        >
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg ${
                isSale
                  ? "bg-green-100 text-green-600"
                  : isExpense
                  ? "bg-red-100 text-red-500"
                  : "bg-blue-100 text-[#0d1b3e]"
              }`}
            >
              {isSale && <span>📈</span>}
              {isExpense && <span>📉</span>}
              {isProduction && <span>📦</span>}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                {item.label}
              </p>
              <p className="text-xs text-gray-400">
                {item.date || "No date"}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <p
            className={`text-sm font-semibold ${
              isSale
                ? "text-green-600"
                : isExpense
                ? "text-red-500"
                : "text-[#0d1b3e]"
            }`}
          >
            {isProduction
              ? `${item.amount} bags`
              : `${isExpense ? "-" : "+"}${formatCurrency(item.amount)}`
            }
          </p>
        </div>
      )
    })}
</div>

</div>
  )
}