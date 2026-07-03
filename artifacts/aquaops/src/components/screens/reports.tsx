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

  const [factoryName, setFactoryName]     = useState("")

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

      // Load factory name for export headers
      const fid = await getFactoryId()
      if (fid) {
        const { data: fData } = await supabase
          .from("factories")
          .select("name")
          .eq("id", fid)
          .single()
        if (fData?.name) setFactoryName(fData.name)
      }

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
    const sym   = currencySymbol
    const fmt   = (n: number | string) => `${sym}${Number(n).toLocaleString()}`
    const today = new Date().toLocaleDateString("en-GB")
    const label = period.charAt(0).toUpperCase() + period.slice(1)

    // ── COVER SHEET ──────────────────────────────────────────────
    const coverData = [
      ["AquaOps Operational Report"],
      [""],
      ["Factory",          factoryName || "—"],
      ["Reporting Period", label],
      ["Generated Date",   today],
      ["Generated By",     "AquaOps by TrueOps"],
      [""],
      ["─── Summary ───────────────────────────"],
      ["Total Sales",    fmt(data.sales)],
      ["Total Costs",    fmt(data.costs)],
      ["Net Profit",     fmt(profit)],
      ["Debt Exposure",  fmt(data.debt)],
      [""],
      ["Support",  "support@trueops.app"],
      ["Website",  "trueops.app"],
      [""],
      ["Powered by AquaOps by TrueOps — Run Your Water Business Smarter."],
    ]
    const coverWs = XLSX.utils.aoa_to_sheet(coverData)
    coverWs["!cols"] = [{ wch: 24 }, { wch: 32 }]
    XLSX.utils.book_append_sheet(XLSX.utils.book_new(), coverWs, "Report Summary")

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, coverWs, "Report Summary")

    // ── SALES SHEET ───────────────────────────────────────────────
    const salesData = [
      [`AquaOps — Sales Report`],
      [`Period: ${label}   |   Generated: ${today}   |   support@trueops.app`],
      [],
      ["Date", "Customer", "Product Type", "Bags Sold", "Price Per Bag", "Total Amount", "Amount Paid", "Balance"],
      ...rawSales.map((s) => [
        s.date, s.customer_name, s.product_type,
        s.bags_sold,
        fmt(s.price_per_bag), fmt(s.total_amount), fmt(s.amount_paid), fmt(s.balance),
      ]),
      [],
      ["Generated by AquaOps by TrueOps  |  support@trueops.app  |  trueops.app"],
    ]
    const salesWs = XLSX.utils.aoa_to_sheet(salesData)
    salesWs["!cols"] = [
      { wch: 13 }, { wch: 22 }, { wch: 14 },
      { wch: 11 }, { wch: 14 }, { wch: 15 }, { wch: 13 }, { wch: 13 },
    ]
    salesWs["!autofilter"] = { ref: "A4:H4" }
    XLSX.utils.book_append_sheet(wb, salesWs, "Sales")

    // ── PRODUCTION SHEET ─────────────────────────────────────────
    const prodData = [
      [`AquaOps — Production Report`],
      [`Period: ${label}   |   Generated: ${today}   |   support@trueops.app`],
      [],
      ["Date", "Product Type", "Bags Produced", "Pieces Per Bag", "Shift"],
      ...rawProduction.map((p) => [
        p.date, p.product_type, p.bags_produced, p.pieces_per_bag, p.shift,
      ]),
      [],
      ["Generated by AquaOps by TrueOps  |  support@trueops.app  |  trueops.app"],
    ]
    const prodWs = XLSX.utils.aoa_to_sheet(prodData)
    prodWs["!cols"] = [{ wch: 13 }, { wch: 16 }, { wch: 15 }, { wch: 15 }, { wch: 11 }]
    prodWs["!autofilter"] = { ref: "A4:E4" }
    XLSX.utils.book_append_sheet(wb, prodWs, "Production")

    // ── EXPENSES SHEET ───────────────────────────────────────────
    const expData = [
      [`AquaOps — Expenses Report`],
      [`Period: ${label}   |   Generated: ${today}   |   support@trueops.app`],
      [],
      ["Date", "Cost Group", "Category", "Amount", "Notes"],
      ...rawExpenses.map((e) => [
        e.date || (e.created_at || "").split("T")[0],
        e.cost_group, e.category, fmt(e.amount), e.notes || "",
      ]),
      [],
      ["Generated by AquaOps by TrueOps  |  support@trueops.app  |  trueops.app"],
    ]
    const expWs = XLSX.utils.aoa_to_sheet(expData)
    expWs["!cols"] = [{ wch: 13 }, { wch: 18 }, { wch: 24 }, { wch: 15 }, { wch: 30 }]
    expWs["!autofilter"] = { ref: "A4:E4" }
    XLSX.utils.book_append_sheet(wb, expWs, "Expenses")

    // ── DEBTS SHEET ──────────────────────────────────────────────
    const debtMap: Record<string, number> = {}
    rawDebts.forEach((d) => {
      const name = d.customer_name || "Unknown"
      debtMap[name] = (debtMap[name] || 0) + Number(d.balance || 0)
    })
    const debtData = [
      [`AquaOps — Outstanding Debts`],
      [`Period: ${label}   |   Generated: ${today}   |   support@trueops.app`],
      [],
      ["Customer", "Outstanding Balance"],
      ...Object.entries(debtMap).map(([name, bal]) => [name, fmt(bal)]),
      [],
      ["Generated by AquaOps by TrueOps  |  support@trueops.app  |  trueops.app"],
    ]
    const debtWs = XLSX.utils.aoa_to_sheet(debtData)
    debtWs["!cols"] = [{ wch: 30 }, { wch: 22 }]
    debtWs["!autofilter"] = { ref: "A4:B4" }
    XLSX.utils.book_append_sheet(wb, debtWs, "Debts")

    XLSX.writeFile(wb, `AquaOps_Report_${label}_${today.replace(/\//g, "-")}.xlsx`)
  }

  const handlePdfExport = () => {
    const sym   = currencySymbol
    const fmt   = (n: number | string) => `${sym}${Number(n).toLocaleString()}`
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    const label = period.charAt(0).toUpperCase() + period.slice(1)

    const buildTable = (
      headers: string[],
      rows: string[][],
      hColor: string,
      numCols: number[] = [],
    ) => {
      const ths = headers.map((h) => `<th>${h}</th>`).join("")
      const trs =
        rows.length > 0
          ? rows.map((row, i) =>
              `<tr class="${i % 2 === 0 ? "z-even" : "z-odd"}">${row.map((c, ci) =>
                `<td class="${numCols.includes(ci) ? "num" : ""}">${c}</td>`
              ).join("")}</tr>`
            ).join("")
          : `<tr><td colspan="${headers.length}" class="empty">No records for this period</td></tr>`
      return `<table style="--hc:${hColor}"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`
    }

    const salesRows = rawSales.map((s) => [
      s.date || "", s.customer_name || "", s.product_type || "",
      String(s.bags_sold || 0), fmt(s.total_amount), fmt(s.amount_paid), fmt(s.balance),
    ])
    const prodRows = rawProduction.map((p) => [
      p.date || "", p.product_type || "", String(p.bags_produced || 0),
      String(p.pieces_per_bag || ""), p.shift || "",
    ])
    const expRows = rawExpenses.map((e) => [
      e.date || (e.created_at || "").split("T")[0],
      e.cost_group || "", e.category || "", fmt(e.amount),
    ])
    const debtMap: Record<string, number> = {}
    rawDebts.forEach((d) => {
      const name = d.customer_name || "Unknown"
      debtMap[name] = (debtMap[name] || 0) + Number(d.balance || 0)
    })
    const debtRows = Object.entries(debtMap).map(([name, bal]) => [name, fmt(bal as number)])

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AquaOps Report — ${label}</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:13px;color:#1a1a2e;background:#f1f5f9}

/* HEADER */
.hdr{background:#0d1b3e;color:#fff;padding:28px 32px;display:flex;justify-content:space-between;align-items:flex-start}
.hdr-brand-name{font-size:24px;font-weight:800;letter-spacing:-0.5px}
.hdr-brand-tag{font-size:12px;opacity:.7;margin-top:3px}
.hdr-meta{text-align:right;font-size:12px;opacity:.85;line-height:2}

/* CONTENT */
.content{padding:28px 32px;max-width:980px;margin:0 auto}

/* INFO BAR */
.infobar{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:24px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.infobar .lbl{font-size:10.5px;color:#64748b;text-transform:uppercase;letter-spacing:.05em}
.infobar .val{font-size:14px;font-weight:600;color:#0d1b3e;margin-top:2px}

/* KPI GRID */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px}
.kpi{background:#fff;border-radius:10px;padding:16px 18px;border:1px solid #e2e8f0}
.kpi-bar{height:4px;border-radius:2px;margin-bottom:12px}
.kpi .lbl{font-size:10.5px;color:#64748b;text-transform:uppercase;letter-spacing:.05em}
.kpi .val{font-size:19px;font-weight:800;margin-top:4px}
.kpi.sales .kpi-bar{background:#2563eb}.kpi.sales .val{color:#2563eb}
.kpi.costs .kpi-bar{background:#7c3aed}.kpi.costs .val{color:#7c3aed}
.kpi.profit .kpi-bar{background:#059669}.kpi.profit .val{color:#059669}
.kpi.debts  .kpi-bar{background:#dc2626}.kpi.debts  .val{color:#dc2626}

/* SECTIONS */
.section{margin-bottom:28px}
.sec-title{font-size:13px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.dot{width:10px;height:10px;border-radius:50%;display:inline-block;flex-shrink:0}

/* TABLES */
table{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;font-size:12.5px}
thead tr th{background:var(--hc,#0d1b3e);color:#fff;padding:10px 13px;text-align:left;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em}
tbody td{padding:9px 13px;border-bottom:1px solid #f1f5f9;vertical-align:middle}
tr.z-even td{background:#f8fafc}
tr.z-odd  td{background:#fff}
td.num{text-align:right;font-variant-numeric:tabular-nums;font-weight:500}
td.empty{text-align:center;color:#94a3b8;padding:20px}

/* FOOTER */
.ftr{background:#0d1b3e;color:#fff;padding:20px 32px;margin-top:32px;display:flex;justify-content:space-between;align-items:center;font-size:12px}
.ftr-name{font-weight:700;font-size:14px}
.ftr-tag{opacity:.7;font-size:11px;margin-top:2px}
.ftr-links{text-align:right;opacity:.85;line-height:2}

/* PRINT */
.print-btn{display:block;margin:24px auto 0;padding:12px 32px;background:#2563eb;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600}
@media print{
  body{background:#fff}
  .print-btn{display:none!important}
  .hdr,.ftr,.kpi-bar,.kpi .val{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  thead tr th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:12mm 10mm}
}
</style>
</head>
<body>

<div class="hdr">
  <div>
    <div class="hdr-brand-name">&#x1F4A7; AquaOps</div>
    <div class="hdr-brand-tag">by TrueOps &nbsp;&middot;&nbsp; Water Business Management</div>
  </div>
  <div class="hdr-meta">
    <div><strong>Operational Report</strong></div>
    <div>Generated: ${today}</div>
    <div>support@trueops.app</div>
    <div>trueops.app</div>
  </div>
</div>

<div class="content">

  <div class="infobar">
    <div><div class="lbl">Reporting Period</div><div class="val">${label}</div></div>
    <div><div class="lbl">Factory</div><div class="val">${factoryName || "—"}</div></div>
    <div><div class="lbl">Generated By</div><div class="val">AquaOps by TrueOps</div></div>
  </div>

  <div class="kpi-grid">
    <div class="kpi sales"><div class="kpi-bar"></div><div class="lbl">Total Sales</div><div class="val">${fmt(data.sales)}</div></div>
    <div class="kpi costs"><div class="kpi-bar"></div><div class="lbl">Total Costs</div><div class="val">${fmt(data.costs)}</div></div>
    <div class="kpi profit"><div class="kpi-bar"></div><div class="lbl">Net Profit</div><div class="val">${fmt(profit)}</div></div>
    <div class="kpi debts"><div class="kpi-bar"></div><div class="lbl">Debt Exposure</div><div class="val">${fmt(data.debt)}</div></div>
  </div>

  <div class="section">
    <div class="sec-title"><span class="dot" style="background:#2563eb"></span><span style="color:#2563eb">Sales</span></div>
    ${buildTable(["Date","Customer","Product","Bags Sold","Total","Paid","Balance"], salesRows, "#1d4ed8", [4,5,6])}
  </div>

  <div class="section">
    <div class="sec-title"><span class="dot" style="background:#059669"></span><span style="color:#059669">Production</span></div>
    ${buildTable(["Date","Product Type","Bags Produced","Pcs / Bag","Shift"], prodRows, "#047857")}
  </div>

  <div class="section">
    <div class="sec-title"><span class="dot" style="background:#7c3aed"></span><span style="color:#7c3aed">Expenses</span></div>
    ${buildTable(["Date","Cost Group","Category","Amount"], expRows, "#6d28d9", [3])}
  </div>

  <div class="section">
    <div class="sec-title"><span class="dot" style="background:#dc2626"></span><span style="color:#dc2626">Outstanding Debts</span></div>
    ${buildTable(["Customer","Outstanding Balance"], debtRows, "#b91c1c", [1])}
  </div>

  <button class="print-btn" onclick="window.print()">&#x1F5A8; Print / Save as PDF</button>

</div>

<div class="ftr">
  <div>
    <div class="ftr-name">&#x1F4A7; AquaOps by TrueOps</div>
    <div class="ftr-tag">Run Your Water Business Smarter.</div>
  </div>
  <div class="ftr-links">
    <div>support@trueops.app</div>
    <div>trueops.app</div>
  </div>
</div>

</body></html>`

    const blob = new Blob([html], { type: "text/html;charset=utf-8" })
    const url  = URL.createObjectURL(blob)
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