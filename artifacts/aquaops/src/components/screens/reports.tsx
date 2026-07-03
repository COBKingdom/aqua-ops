import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId, getFactoryCurrency } from "@/lib/factory"
import { formatCurrency } from "@/lib/format"
import { isPremiumUser } from "@/lib/premium"
import * as XLSX from "xlsx"
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  Zap,
  BarChart3,
  FileText,
  FileSpreadsheet,
  History,
} from "lucide-react"

export function Reports({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void
}) {
  const [data, setData] = useState<any>({
    sales: 0,
    costs: 0,
    debt: 0,
    materialCost: 0,
    productionCost: 0,
    otherExpense: 0,
    sachetProduction: 0,
    bottleProduction: 0,
    sachetStock: 0,
    bottleStock: 0,
    productionLosses: 0,
  })

  const [period, setPeriod] = useState("today")
  const [isPremium, setIsPremium] = useState(false)
  const [currencyCode, setCurrencyCode] = useState("NGN")
  const [currencySymbol, setCurrencySymbol] = useState("₦")

  // PHASE 14.1 — filter state, ready for Phase 14.2 queries
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    product: "all",
    shift: "all",
  })

  const [rawSales, setRawSales]           = useState<any[]>([])
  const [rawExpenses, setRawExpenses]     = useState<any[]>([])
  const [rawProduction, setRawProduction] = useState<any[]>([])
  const [rawDebts, setRawDebts]           = useState<any[]>([])

  useEffect(() => {
    const checkPremium = async () => {
      const result = await isPremiumUser()
      setIsPremium(result)
    }
    checkPremium()
  }, [])

  const getDateFilter = () => {
    const now = new Date()
    if (period === "today") {
      const startOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      return startOfDay.toISOString().split("T")[0]
    }
    if (period === "week")
      return new Date(now.getTime() - 7 * 86400000).toISOString().split("T")[0]
    if (period === "month")
      return new Date(now.getTime() - 30 * 86400000).toISOString().split("T")[0]
  }

  const loadReport = async () => {
    try {
      const factoryId = await getFactoryId()
      if (!factoryId) return

      const currency = await getFactoryCurrency()
      setCurrencyCode(currency.code)
      setCurrencySymbol(currency.symbol)

      const dateFilter = getDateFilter()

      const { data: sales } = await supabase
        .from("sales").select("*").eq("factory_id", factoryId).gte("date", dateFilter)

      const { data: expenses } = await supabase
        .from("expenses").select("*").eq("factory_id", factoryId).gte("created_at", dateFilter)

      const { data: production } = await supabase
        .from("production").select("*").eq("factory_id", factoryId).gte("date", dateFilter)

      const { data: debts } = await supabase
        .from("sales").select("*").eq("factory_id", factoryId).gt("balance", 0)

      const { data: losses } = await supabase
        .from("production_losses").select("quantity").eq("factory_id", factoryId).gte("created_at", dateFilter)

      const totalSales   = sales?.reduce((s, i) => s + Number(i.total_amount || 0), 0) || 0
      const totalCosts   = expenses?.reduce((s, i) => s + Number(i.amount || 0), 0) || 0
      const totalDebt    = debts?.reduce((s, i) => s + Number(i.balance || 0), 0) || 0
      const totalLosses  = losses?.reduce((s, i) => s + Number(i.quantity || 0), 0) || 0

      const materialCost   = expenses?.filter((e) => e.cost_group === "Material Cost")
        .reduce((s, i) => s + Number(i.amount || 0), 0) || 0
      const productionCost = expenses?.filter((e) => e.cost_group === "Production Cost")
        .reduce((s, i) => s + Number(i.amount || 0), 0) || 0
      const otherExpense   = expenses?.filter((e) => e.cost_group === "Other Expense")
        .reduce((s, i) => s + Number(i.amount || 0), 0) || 0

      const sachetProduction = production?.filter((p) => p.product_type === "sachet")
        .reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0
      const bottleProduction = production?.filter((p) => p.product_type === "bottle")
        .reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0

      const sachetSold = sales?.filter((s) => s.product_type === "sachet")
        .reduce((s, i) => s + Number(i.bags_sold || 0), 0) || 0
      const bottleSold = sales?.filter((s) => s.product_type === "bottle")
        .reduce((s, i) => s + Number(i.bags_sold || 0), 0) || 0

      setData({
        sales:            totalSales,
        costs:            totalCosts,
        debt:             totalDebt,
        materialCost,
        productionCost,
        otherExpense,
        sachetProduction,
        bottleProduction,
        sachetStock:      sachetProduction - sachetSold,
        bottleStock:      bottleProduction - bottleSold,
        productionLosses: totalLosses,
      })
      setRawSales(sales || [])
      setRawExpenses(expenses || [])
      setRawProduction(production || [])
      setRawDebts(debts || [])

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { loadReport() }, [period])

  const profit       = data.sales - data.costs
  const netCash      = profit - data.debt
  const grossProd    = data.sachetProduction + data.bottleProduction
  const netProd      = grossProd - data.productionLosses

  const fc = (n: number) => formatCurrency(n, currencyCode, currencySymbol)

  const periodLabel =
    period === "today" ? "Today" : period === "week" ? "This Week" : "This Month"

  // ── REPORT INSIGHTS ─────────────────────────────────────
  const insights: { type: "positive" | "warning" | "action"; text: string }[] = []

  if (profit > 0)
    insights.push({ type: "positive", text: "Factory is operating profitably this period." })

  if (profit < 0)
    insights.push({ type: "action", text: "Expenses are exceeding sales income. Review costs." })

  if (data.debt > 0)
    insights.push({ type: "warning", text: `Outstanding customer debt of ${fc(data.debt)} requires attention.` })

  if (data.productionLosses > 0)
    insights.push({ type: "warning", text: `Production losses of ${data.productionLosses} bags recorded this period.` })

  if (grossProd > 0 && data.sales > 0)
    insights.push({ type: "positive", text: "Production is active with sales recorded this period." })

  if (grossProd === 0)
    insights.push({ type: "action", text: "No production recorded for this period." })

  // ── REPORT TEXT GENERATOR ────────────────────────────────
  const generateReportText = () =>
    `📊 OPERATIONAL REPORT — ${period.toUpperCase()}

━━━━━━━━━━━━━━━━━━━

💰 Revenue
Sales: ${fc(data.sales)}

💸 Operational Costs
Total: ${fc(data.costs)}
• Material Cost: ${fc(data.materialCost)}
• Production Cost: ${fc(data.productionCost)}
• Other Expense: ${fc(data.otherExpense)}

📦 Gross Production: ${grossProd} bags
📦 Production Losses: ${data.productionLosses} bags
📦 Net Production: ${netProd} bags
📦 Sachet Stock: ${data.sachetStock} bags
📦 Bottle Stock: ${data.bottleStock} crates

⚠️ Debt Exposure: ${fc(data.debt)}

━━━━━━━━━━━━━━━━━━━

📈 Net Result: ${fc(profit)}
`

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateReportText())
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const handleEmail = () => {
    const subject = encodeURIComponent("Operational Report")
    const body = encodeURIComponent(generateReportText())
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleExcelExport = () => {
    const wb = XLSX.utils.book_new()

    const salesRows = [
      ["Date", "Customer", "Product Type", "Bags Sold", "Price Per Bag", "Total Amount", "Amount Paid", "Balance"],
      ...rawSales.map((s) => [
        s.date, s.customer_name, s.product_type,
        s.bags_sold, s.price_per_bag,
        s.total_amount, s.amount_paid, s.balance,
      ]),
    ]
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(salesRows), "Sales")

    const prodRows = [
      ["Date", "Product Type", "Bags Produced", "Pieces Per Bag", "Shift"],
      ...rawProduction.map((p) => [
        p.date, p.product_type, p.bags_produced, p.pieces_per_bag, p.shift,
      ]),
    ]
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(prodRows), "Production")

    const expRows = [
      ["Date", "Cost Group", "Category", "Amount", "Notes"],
      ...rawExpenses.map((e) => [
        e.date || (e.created_at || "").split("T")[0],
        e.cost_group, e.category, e.amount, e.notes || "",
      ]),
    ]
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(expRows), "Expenses")

    const debtMap: Record<string, number> = {}
    rawDebts.forEach((d) => {
      const name = d.customer_name || "Unknown"
      debtMap[name] = (debtMap[name] || 0) + Number(d.balance || 0)
    })
    const debtRows = [
      ["Customer", "Outstanding Balance"],
      ...Object.entries(debtMap).map(([name, bal]) => [name, bal]),
    ]
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(debtRows), "Debts")

    const label = period.charAt(0).toUpperCase() + period.slice(1)
    XLSX.writeFile(wb, `AquaOps_Report_${label}.xlsx`)
  }

  const handlePdfExport = () => {
    const sym = currencySymbol
    const fmt = (n: number) => `${sym}${Number(n).toLocaleString()}`

    const salesHTML = rawSales.map((s) =>
      `<tr><td>${s.date}</td><td>${s.customer_name}</td><td>${s.product_type}</td><td>${s.bags_sold}</td><td>${fmt(s.total_amount)}</td><td>${fmt(s.balance)}</td></tr>`
    ).join("")

    const prodHTML = rawProduction.map((p) =>
      `<tr><td>${p.date}</td><td>${p.product_type}</td><td>${p.bags_produced}</td><td>${p.shift}</td></tr>`
    ).join("")

    const expHTML = rawExpenses.map((e) =>
      `<tr><td>${e.date || (e.created_at || "").split("T")[0]}</td><td>${e.cost_group}</td><td>${e.category}</td><td>${fmt(e.amount)}</td></tr>`
    ).join("")

    const debtMap: Record<string, number> = {}
    rawDebts.forEach((d) => {
      const name = d.customer_name || "Unknown"
      debtMap[name] = (debtMap[name] || 0) + Number(d.balance || 0)
    })
    const debtHTML = Object.entries(debtMap).map(([name, bal]) =>
      `<tr><td>${name}</td><td>${fmt(bal as number)}</td></tr>`
    ).join("")

    const html = `<!DOCTYPE html><html><head><title>AquaOps Report</title>
<style>
  body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
  h1 { color: #0d1b3e; margin-bottom: 4px; }
  h2 { color: #2563eb; margin: 20px 0 8px; }
  .summary { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0; }
  .card { border: 1px solid #e0e7ff; padding: 12px; border-radius: 8px; }
  .lbl { font-size: 11px; color: #666; margin-bottom: 4px; }
  .val { font-size: 18px; font-weight: 700; color: #0d1b3e; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px; }
  th { background: #0d1b3e; color: #fff; padding: 7px 10px; text-align: left; }
  td { padding: 6px 10px; border-bottom: 1px solid #eee; }
  .print-btn { margin-top: 24px; padding: 10px 24px; background: #2563eb; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; }
  @media print { .print-btn { display: none; } }
</style></head><body>
<h1>AquaOps — Operational Report</h1>
<p style="color:#666;font-size:13px">Period: <strong>${period}</strong> &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString()}</p>
<div class="summary">
  <div class="card"><div class="lbl">Total Sales</div><div class="val">${fmt(data.sales)}</div></div>
  <div class="card"><div class="lbl">Total Costs</div><div class="val">${fmt(data.costs)}</div></div>
  <div class="card"><div class="lbl">Net Profit</div><div class="val">${fmt(profit)}</div></div>
  <div class="card"><div class="lbl">Debt Exposure</div><div class="val">${fmt(data.debt)}</div></div>
</div>
<h2>Sales</h2>
<table><tr><th>Date</th><th>Customer</th><th>Product</th><th>Qty</th><th>Total</th><th>Balance</th></tr>${salesHTML || "<tr><td colspan='6'>No records</td></tr>"}</table>
<h2>Production</h2>
<table><tr><th>Date</th><th>Type</th><th>Bags</th><th>Shift</th></tr>${prodHTML || "<tr><td colspan='4'>No records</td></tr>"}</table>
<h2>Expenses</h2>
<table><tr><th>Date</th><th>Group</th><th>Category</th><th>Amount</th></tr>${expHTML || "<tr><td colspan='4'>No records</td></tr>"}</table>
<h2>Outstanding Debts</h2>
<table><tr><th>Customer</th><th>Balance</th></tr>${debtHTML || "<tr><td colspan='2'>No records</td></tr>"}</table>
<button class="print-btn" onclick="window.print()">🖨 Print / Save as PDF</button>
</body></html>`

    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
  }

  const insightStyle = {
    positive: { border: "bg-green-50 border-green-200", dot: "🟢", label: "Positive",        text: "text-green-800", labelColor: "text-green-700" },
    warning:  { border: "bg-yellow-50 border-yellow-200", dot: "🟡", label: "Attention",       text: "text-yellow-800",labelColor: "text-yellow-700"},
    action:   { border: "bg-red-50 border-red-200",    dot: "🔴", label: "Action Required",  text: "text-red-800",  labelColor: "text-red-700"  },
  }

  return (
    <div className="space-y-4 p-3 pb-24">

      {/* ── 1. HEADER ─────────────────────────────────────── */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">Reports</h1>
        <p className="text-xs text-gray-500 mt-0.5">Operational intelligence summary</p>
      </div>

      {/* ── 2. PERIOD + CURRENCY ──────────────────────────── */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "today", label: "Today" },
            { key: "week",  label: "Week"  },
            { key: "month", label: "Month" },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                period === p.key
                  ? "bg-[#2563eb] text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setActiveTab("history")}
            className="px-3 py-1.5 rounded-lg text-sm bg-[#0d1b3e] text-white"
          >
            History
          </button>
        </div>

        <select
          value={currencyCode}
          onChange={(e) => {
            const CURRENCIES: Record<string, string> = {
              NGN: "₦", USD: "$", GBP: "£", EUR: "€", KES: "KSh", GHS: "GH₵", ZAR: "R",
            }
            setCurrencyCode(e.target.value)
            setCurrencySymbol(CURRENCIES[e.target.value] || "₦")
          }}
          className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm shadow-sm"
        >
          <option value="NGN">₦ NGN</option>
          <option value="USD">$ USD</option>
          <option value="GBP">£ GBP</option>
          <option value="EUR">€ EUR</option>
          <option value="KES">KSh KES</option>
          <option value="GHS">GH₵ GHS</option>
          <option value="ZAR">R ZAR</option>
        </select>
      </div>

      {/* ── 3. REPORT SUMMARY HERO ────────────────────────── */}
      <div className={`rounded-2xl p-5 shadow-md text-white ${
        profit >= 0
          ? "bg-gradient-to-r from-green-700 to-green-600"
          : "bg-gradient-to-r from-red-700 to-red-600"
      }`}>
        <div className="flex items-center gap-2 mb-1">
          {profit >= 0
            ? <TrendingUp size={16} className="opacity-80" />
            : <TrendingDown size={16} className="opacity-80" />
          }
          <p className="text-xs opacity-80 uppercase tracking-wide font-semibold">
            Net Result — {periodLabel}
          </p>
        </div>
        <p className="text-4xl font-bold tracking-tight">{fc(profit)}</p>
        <p className="text-sm opacity-90 mt-1">
          {profit > 0 && "Factory is operating profitably."}
          {profit < 0 && "Factory expenses are currently exceeding income."}
          {profit === 0 && "Factory is at break-even."}
        </p>
        <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="opacity-60 text-xs">Sales</p>
            <p className="font-semibold mt-0.5">{fc(data.sales)}</p>
          </div>
          <div>
            <p className="opacity-60 text-xs">Expenses</p>
            <p className="font-semibold mt-0.5">{fc(data.costs)}</p>
          </div>
          <div>
            <p className="opacity-60 text-xs">Net Cash</p>
            <p className={`font-semibold mt-0.5 ${netCash < 0 ? "text-red-300" : "text-green-200"}`}>
              {fc(netCash)}
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. KPI GRID (3 rows × 2 cards) ───────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Gross Production",    value: `${grossProd} bags`,              icon: Package,  accent: "text-green-600",  bg: "bg-green-50 border-green-100"   },
          { label: "Production Losses",   value: `${data.productionLosses} bags`,  icon: Zap,      accent: "text-red-500",    bg: "bg-red-50 border-red-100"       },
          { label: "Net Production",      value: `${netProd} bags`,                icon: Package,  accent: "text-[#2563eb]",  bg: "bg-blue-50 border-blue-100"     },
          { label: "Customer Debts",      value: fc(data.debt),                    icon: Users,    accent: "text-orange-500", bg: "bg-orange-50 border-orange-100" },
          { label: "Sachet Stock",        value: `${data.sachetStock} bags`,       icon: Zap,      accent: "text-purple-500", bg: "bg-purple-50 border-purple-100" },
          { label: "Bottle Stock",        value: `${data.bottleStock} crates`,     icon: BarChart3,accent: "text-teal-600",   bg: "bg-teal-50 border-teal-100"     },
        ].map(({ label, value, icon: Icon, accent, bg }) => (
          <div key={label} className={`border rounded-2xl p-3 shadow-sm ${bg}`}>
            <div className="flex items-center gap-1.5 mb-1">
              <Icon size={13} className={accent} />
              <p className={`text-[11px] font-semibold uppercase tracking-wide ${accent}`}>
                {label}
              </p>
            </div>
            <p className="text-base font-bold text-[#0d1b3e] mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* ── 5. COST BREAKDOWN ─────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <h2 className="font-bold text-[#0d1b3e] text-sm">Cost Breakdown</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { label: "Material Cost",    value: fc(data.materialCost),   color: "text-[#0d1b3e]" },
            { label: "Production Cost",  value: fc(data.productionCost), color: "text-[#0d1b3e]" },
            { label: "Other Expense",    value: fc(data.otherExpense),   color: "text-[#0d1b3e]" },
            { label: "Debt Exposure",    value: fc(data.debt),           color: "text-red-600"   },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between px-4 py-2.5 text-sm">
              <span className="text-gray-500">{label}</span>
              <span className={`font-semibold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. REPORT INSIGHTS ────────────────────────────── */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-[#0d1b3e] px-1">Report Insights</h2>
        {insights.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-4 text-sm text-gray-400 text-center">
            Add transactions to generate insights.
          </div>
        )}
        {insights.map((ins, i) => {
          const s = insightStyle[ins.type]
          return (
            <div
              key={i}
              className={`rounded-2xl p-3 flex items-center gap-3 border ${s.border}`}
            >
              <span className="text-base shrink-0">{s.dot}</span>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wide ${s.labelColor}`}>
                  {s.label}
                </p>
                <p className={`text-sm mt-0.5 ${s.text}`}>{ins.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── 7. REPORT ACTIONS ─────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <h2 className="font-bold text-[#0d1b3e] text-sm">Report Actions</h2>
        </div>
        <div className="p-4 space-y-3">

          {/* EXPORT */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleExcelExport}
              className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-semibold border border-green-100"
            >
              <FileSpreadsheet size={16} />
              Export Excel
            </button>
            <button
              onClick={handlePdfExport}
              className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-[#2563eb] rounded-xl text-sm font-semibold border border-blue-100"
            >
              <FileText size={16} />
              Export PDF
            </button>
          </div>

          {/* HISTORY */}
          <button
            onClick={() => setActiveTab("history")}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0d1b3e] text-white rounded-xl text-sm font-semibold"
          >
            <History size={16} />
            Import Historical Data
          </button>

          {/* SHARE — premium only */}
          {isPremium && (
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-gray-50">
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold"
              >
                Share WhatsApp
              </button>
              <button
                onClick={handleEmail}
                className="flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl text-sm font-semibold"
              >
                Share Email
              </button>
            </div>
          )}

          {!isPremium && (
            <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <p className="text-xs font-semibold text-gray-600">🔒 Share via WhatsApp & Email — Premium Feature</p>
          </div>
        )}

        {/* BUSINESS SETUP WIZARD */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2 mt-3">
          <p className="text-sm font-semibold text-[#0d1b3e]">
            Business Setup Wizard
          </p>
          <p className="text-xs text-gray-500">
            Import existing records — customers, debts, production, sales and expenses.
          </p>
          <button
            onClick={() => setActiveTab("data-setup")}
            className="w-full h-11 bg-[#0d1b3e] text-white rounded-lg text-sm font-semibold active:scale-[0.97]"
          >
            Open Setup Wizard
          </button>
        </div>

      </div>
      </div>

    </div>
  )
}