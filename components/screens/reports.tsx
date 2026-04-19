"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId, getFactoryName } from "@/lib/factory"

export function Reports() {
  const [filter, setFilter] = useState("today")
  const [view, setView] = useState("summary")

  const [summary, setSummary] = useState({
    production: 0,
    sales: 0,
    expenses: 0,
    profit: 0,
    debt: 0,
  })

  const [productionList, setProductionList] = useState<any[]>([])
  const [salesList, setSalesList] = useState<any[]>([])
  const [expensesList, setExpensesList] = useState<any[]>([])

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
      .select("*")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    const { data: sales } = await supabase
      .from("sales")
      .select("*")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    const { data: expenses } = await supabase
      .from("expenses")
      .select("*")
      .eq("factory_id", factoryId)
      .gte("date", start)
      .lte("date", end)

    setProductionList(production || [])
    setSalesList(sales || [])
    setExpensesList(expenses || [])

    const totalProduction =
      production?.reduce((sum, p) => sum + p.bags_produced, 0) || 0

    const totalSales =
      sales?.reduce((sum, s) => sum + s.total_amount, 0) || 0

    const totalDebt =
      sales?.reduce((sum, s) => sum + s.balance, 0) || 0

    const totalExpenses =
      expenses?.reduce((sum, e) => sum + e.amount, 0) || 0

    const profit = totalSales - totalExpenses

    setSummary({
      production: totalProduction,
      sales: totalSales,
      expenses: totalExpenses,
      profit,
      debt: totalDebt,
    })
  }

  const shareWhatsApp = () => {
    const factoryName = getFactoryName() || "My Factory"

    const report = `
📊 AquaOps Report

Factory: ${factoryName}
Period: ${filter.toUpperCase()}

Production: ${summary.production}
Sales: ₦${summary.sales.toLocaleString()}
Expenses: ₦${summary.expenses.toLocaleString()}
Profit: ₦${summary.profit.toLocaleString()}
Debt: ₦${summary.debt.toLocaleString()}
`

    const encoded = encodeURIComponent(report)
    window.open(`https://wa.me/?text=${encoded}`, "_blank")
  }

  const sendEmail = () => {
    const factoryName = getFactoryName() || "My Factory"

    const subject = `AquaOps Report - ${factoryName}`

    const body = `
AquaOps Report

Factory: ${factoryName}
Period: ${filter.toUpperCase()}

Production: ${summary.production}
Sales: ₦${summary.sales.toLocaleString()}
Expenses: ₦${summary.expenses.toLocaleString()}
Profit: ₦${summary.profit.toLocaleString()}
Debt: ₦${summary.debt.toLocaleString()}
`

    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink
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
              filter === f ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* VIEW SWITCH */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("summary")}
          className={`px-4 py-2 rounded ${
            view === "summary" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setView("history")}
          className={`px-4 py-2 rounded ${
            view === "history" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          History
        </button>
      </div>

      {/* SUMMARY */}
      {view === "summary" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              Production: {summary.production}
            </div>
            <div className="bg-white p-4 rounded shadow">
              Sales: ₦{summary.sales.toLocaleString()}
            </div>
            <div className="bg-white p-4 rounded shadow">
              Expenses: ₦{summary.expenses.toLocaleString()}
            </div>
            <div className="bg-white p-4 rounded shadow">
              Profit: ₦{summary.profit.toLocaleString()}
            </div>
            <div className="bg-white p-4 rounded shadow col-span-2">
              Debt: ₦{summary.debt.toLocaleString()}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={shareWhatsApp}
              className="w-full bg-green-600 text-white py-3 rounded"
            >
              Send via WhatsApp
            </button>

            <button
              onClick={sendEmail}
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              Send via Email
            </button>
          </div>
        </>
      )}

      {/* HISTORY */}
      {view === "history" && (
        <div className="space-y-4">
          <h2 className="font-bold">Production</h2>
          {productionList.map((p, i) => (
            <div key={i} className="bg-white p-3 rounded shadow">
              {p.date} - {p.bags_produced} bags
            </div>
          ))}

          <h2 className="font-bold">Sales</h2>
          {salesList.map((s, i) => (
            <div key={i} className="bg-white p-3 rounded shadow">
              {s.customer_name} - ₦{s.total_amount.toLocaleString()}
            </div>
          ))}

          <h2 className="font-bold">Expenses</h2>
          {expensesList.map((e, i) => (
            <div key={i} className="bg-white p-3 rounded shadow">
              {e.description} - ₦{e.amount.toLocaleString()}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}