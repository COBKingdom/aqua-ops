"use client"

import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/format"

export function Dashboard() {
  const [sales, setSales] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [production, setProduction] = useState<any[]>([])
  const [loans, setLoans] = useState<any[]>([])
  const [bank, setBank] = useState<any[]>([])

  useEffect(() => {
    setSales(JSON.parse(localStorage.getItem("sales") || "[]"))
    setExpenses(JSON.parse(localStorage.getItem("expenses") || "[]"))
    setProduction(JSON.parse(localStorage.getItem("production") || "[]"))
    setLoans(JSON.parse(localStorage.getItem("loans") || "[]"))
    setBank(JSON.parse(localStorage.getItem("bank") || "[]"))
  }, [])

  // 💰 CALCULATIONS

  const totalSales = sales.reduce((s, i) => s + (i.amount || 0), 0)
  const totalExpenses = expenses.reduce((s, i) => s + (i.amount || 0), 0)
  const totalProduction = production.reduce((s, i) => s + (i.cost || 0), 0)

  const totalLoans = loans.reduce((s, l) => s + (l.amount || 0), 0)
  const totalLoanPaid = loans.reduce((s, l) => s + (l.amountPaid || 0), 0)
  const outstandingLoans = totalLoans - totalLoanPaid

  const deposits = bank
    .filter((t) => t.type === "deposit")
    .reduce((s, t) => s + (t.amount || 0), 0)

  const withdrawals = bank
    .filter((t) => t.type === "withdraw")
    .reduce((s, t) => s + (t.amount || 0), 0)

  const bankBalance = deposits - withdrawals

  const profit = totalSales - totalExpenses - totalProduction

  const cashOnHand =
    totalSales -
    totalExpenses -
    totalProduction -
    totalLoanPaid -
    deposits

  return (
    <div className="space-y-4">

      {/* CASH */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Cash on Hand</p>
        <p className="text-xl font-bold">
          {formatCurrency(cashOnHand)}
        </p>
      </div>

      {/* BANK */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Bank Balance</p>
        <p className="text-xl font-bold">
          {formatCurrency(bankBalance)}
        </p>
      </div>

      {/* LOANS */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Outstanding Loans</p>
        <p className="text-xl font-bold">
          {formatCurrency(outstandingLoans)}
        </p>
      </div>

      {/* PROFIT */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Profit</p>
        <p className="text-xl font-bold">
          {formatCurrency(profit)}
        </p>
      </div>

    </div>
  )
}