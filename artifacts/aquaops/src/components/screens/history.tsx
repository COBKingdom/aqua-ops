import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

import {
  getFactoryId,
  getFactoryCurrency,
} from "@/lib/factory"

import { formatCurrency } from "@/lib/format"

import { isPremiumUser } from "@/lib/premium"

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
  })

  const [period, setPeriod] = useState("today")

  const [isPremium, setIsPremium] = useState(false)

  const [currencyCode, setCurrencyCode] = useState("NGN")

  const [currencySymbol, setCurrencySymbol] = useState("₦")

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    product: "all",
    shift: "all",
  })

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

    if (period === "week") {
      return new Date(now.getTime() - 7 * 86400000)
        .toISOString()
        .split("T")[0]
    }

    if (period === "month") {
      return new Date(now.getTime() - 30 * 86400000)
        .toISOString()
        .split("T")[0]
    }
  }

  const loadReport = async () => {
    try {
      const factoryId = await getFactoryId()

      if (!factoryId) return

      const currency = await getFactoryCurrency()

      setCurrencyCode(currency.code)
      setCurrencySymbol(currency.symbol)

      const dateFilter = getDateFilter()

      // SALES
      const { data: sales } = await supabase
        .from("sales")
        .select("*")
        .eq("factory_id", factoryId)
        .gte("date", dateFilter)

      // COSTS
      const { data: expenses } = await supabase
        .from("expenses")
        .select("*")
        .eq("factory_id", factoryId)
        .gte("created_at", dateFilter)

      // PRODUCTION
      const { data: production } = await supabase
        .from("production")
        .select("*")
        .eq("factory_id", factoryId)
        .gte("date", dateFilter)

      // DEBTS
      const { data: debts } = await supabase
        .from("sales")
        .select("*")
        .eq("factory_id", factoryId)
        .gt("balance", 0)

      const totalSales =
        sales?.reduce(
          (s, i) => s + Number(i.total_amount || 0),
          0
        ) || 0

      const totalCosts =
        expenses?.reduce(
          (s, i) => s + Number(i.amount || 0),
          0
        ) || 0

      const totalDebt =
        debts?.reduce(
          (s, i) => s + Number(i.balance || 0),
          0
        ) || 0

      // COST BREAKDOWN
      const materialCost =
        expenses
          ?.filter((e) => e.cost_group === "Material Cost")
          .reduce((s, i) => s + Number(i.amount || 0), 0) || 0

      const productionCost =
        expenses
          ?.filter((e) => e.cost_group === "Production Cost")
          .reduce((s, i) => s + Number(i.amount || 0), 0) || 0

      const otherExpense =
        expenses
          ?.filter((e) => e.cost_group === "Other Expense")
          .reduce((s, i) => s + Number(i.amount || 0), 0) || 0

      // SACHET PRODUCTION
      const sachetProduction =
        production
          ?.filter((p) => p.product_type === "sachet")
          .reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0

      // BOTTLE PRODUCTION
      const bottleProduction =
        production
          ?.filter((p) => p.product_type === "bottle")
          .reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0

      // SACHET SOLD
      const sachetSold =
        sales
          ?.filter((s) => s.product_type === "sachet")
          .reduce((s, i) => s + Number(i.bags_sold || 0), 0) || 0

      // BOTTLE SOLD
      const bottleSold =
        sales
          ?.filter((s) => s.product_type === "bottle")
          .reduce((s, i) => s + Number(i.bags_sold || 0), 0) || 0

      // STOCK
      const sachetStock = sachetProduction - sachetSold
      const bottleStock = bottleProduction - bottleSold

      setData({
        sales: totalSales,
        costs: totalCosts,
        debt: totalDebt,
        materialCost,
        productionCost,
        otherExpense,
        sachetProduction,
        bottleProduction,
        sachetStock,
        bottleStock,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadReport()
  }, [period])

  const profit = data.sales - data.costs

  const netCashProfit = profit - data.debt

  // REPORT GENERATOR
  const generateReportText = () => {
    const text = `📊 OPERATIONAL REPORT — ${period.toUpperCase()}

━━━━━━━━━━━━━━━━━━━

💰 Revenue
Sales: ${formatCurrency(data.sales, currencyCode, currencySymbol)}

💸 Operational Costs
Total: ${formatCurrency(data.costs, currencyCode, currencySymbol)}

• Material Cost: ${formatCurrency(data.materialCost, currencyCode, currencySymbol)}

• Production Cost: ${formatCurrency(data.productionCost, currencyCode, currencySymbol)}

• Other Expense: ${formatCurrency(data.otherExpense, currencyCode, currencySymbol)}

📦 Sachet Production
${data.sachetProduction} bags

📦 Sachet Stock
${data.sachetStock} bags

📦 Bottle Production
${data.bottleProduction} crates

📦 Bottle Stock
${data.bottleStock} crates

⚠️ Debt Exposure
${formatCurrency(data.debt, currencyCode, currencySymbol)}

━━━━━━━━━━━━━━━━━━━

📈 Net Result
${formatCurrency(profit, currencyCode, currencySymbol)}
`
    return text
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateReportText())
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const handleEmail = () => {
    const subject = encodeURIComponent("Operational Report")
    const body = encodeURIComponent(generateReportText())
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">
          Reports
        </h1>
        <p className="text-xs text-gray-500">
          Business Intelligence Dashboard
        </p>
      </div>

      {/* PERIOD SELECTOR */}
      <div className="flex gap-2 flex-wrap">

        {[
          { key: "today", label: "Today" },
          { key: "week",  label: "Week"  },
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

        <button
          onClick={() => setActiveTab("history")}
          className="px-3 py-1 rounded-lg text-sm bg-black text-white"
        >
          History
        </button>

      </div>

      {/* REPORT FILTERS */}
      <div className="bg-white p-3 rounded-xl shadow-sm space-y-2">

        <h2 className="text-sm font-semibold text-[#0d1b3e]">
          Report Filters
        </h2>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">From Date</p>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) =>
                setFilters({ ...filters, fromDate: e.target.value })
              }
              className="w-full h-9 border border-gray-200 rounded-lg px-2 text-sm"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">To Date</p>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) =>
                setFilters({ ...filters, toDate: e.target.value })
              }
              className="w-full h-9 border border-gray-200 rounded-lg px-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">Product</p>
            <select
              value={filters.product}
              onChange={(e) =>
                setFilters({ ...filters, product: e.target.value })
              }
              className="w-full h-9 border border-gray-200 rounded-lg px-2 text-sm bg-white"
            >
              <option value="all">All Products</option>
              <option value="sachet">Sachet</option>
              <option value="bottle">Bottle</option>
            </select>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Shift</p>
            <select
              value={filters.shift}
              onChange={(e) =>
                setFilters({ ...filters, shift: e.target.value })
              }
              className="w-full h-9 border border-gray-200 rounded-lg px-2 text-sm bg-white"
            >
              <option value="all">All Shifts</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => loadReport()}
          className="w-full h-10 bg-[#2563eb] text-white rounded-lg text-sm font-semibold"
        >
          Apply Filters
        </button>

      </div>

      {/* HERO — Net Result */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-5 rounded-xl shadow-md">

        <p className="text-xs opacity-80">
          Net Result
        </p>

        <p className="text-3xl font-bold mt-2">
          {formatCurrency(profit, currencyCode, currencySymbol)}
        </p>

        <p className="text-xs mt-1 opacity-90">
          {profit > 0 && "Profit — Business is growing"}
          {profit < 0 && "Loss — Business is declining"}
          {profit === 0 && "Break-even"}
        </p>

        <div className="mt-4 border-t border-white/20 pt-3 flex justify-between items-center">
          <div>
            <p className="text-xs opacity-70">Net Cash Profit</p>
            <p
              className={`text-lg font-semibold ${
                netCashProfit < 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              {formatCurrency(netCashProfit, currencyCode, currencySymbol)}
            </p>
          </div>
          <p className="text-xs opacity-70">
            {netCashProfit < 0 ? "Loss" : "Cash Profit"}
          </p>
        </div>

      </div>

      {/* EXECUTIVE SUMMARY GRID */}
      <div className="grid grid-cols-2 gap-3">

        {/* Sales → Green */}
        <div className="bg-white border border-blue-100 border-l-4 border-l-green-500 p-3 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#0d1b3e]">Sales</p>
          <p className="text-lg font-bold mt-1">
            {formatCurrency(data.sales, currencyCode, currencySymbol)}
          </p>
        </div>

        {/* Operational Costs → Red */}
        <div className="bg-white border border-blue-100 border-l-4 border-l-red-500 p-3 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#0d1b3e]">Operational Costs</p>
          <p className="text-lg font-bold mt-1">
            {formatCurrency(data.costs, currencyCode, currencySymbol)}
          </p>
        </div>

        {/* Gross Sachet Production → Blue */}
        <div className="bg-white border border-blue-100 border-l-4 border-l-blue-500 p-3 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#0d1b3e]">Gross Sachet Production</p>
          <p className="text-lg font-bold mt-1">
            {data.sachetProduction} bags
          </p>
        </div>

        {/* Production Losses → Orange */}
        <div className="bg-white border border-blue-100 border-l-4 border-l-orange-500 p-3 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#0d1b3e]">Production Losses</p>
          <p className="text-lg font-bold mt-1">
            0 bags
          </p>
        </div>

        {/* Net Sachet Production → Green */}
        <div className="bg-white border border-blue-100 border-l-4 border-l-green-500 p-3 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#0d1b3e]">Net Sachet Production</p>
          <p className="text-lg font-bold mt-1">
            {data.sachetProduction} bags
          </p>
        </div>

        {/* Sachet Stock → Purple */}
        <div className="bg-white border border-blue-100 border-l-4 border-l-purple-500 p-3 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#0d1b3e]">Sachet Stock</p>
          <p className="text-lg font-bold mt-1">
            {data.sachetStock} bags
          </p>
        </div>

        {/* Bottle Production → Blue */}
        <div className="bg-white border border-blue-100 border-l-4 border-l-blue-500 p-3 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#0d1b3e]">Bottle Production</p>
          <p className="text-lg font-bold mt-1">
            {data.bottleProduction} crates
          </p>
        </div>

        {/* Bottle Stock → Purple */}
        <div className="bg-white border border-blue-100 border-l-4 border-l-purple-500 p-3 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#0d1b3e]">Bottle Stock</p>
          <p className="text-lg font-bold mt-1">
            {data.bottleStock} crates
          </p>
        </div>

      </div>

      {/* COST BREAKDOWN */}
      <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-4 space-y-3">

        <h2 className="font-semibold text-[#2563eb]">
          Cost Breakdown
        </h2>

        <div className="flex justify-between text-sm">
          <span>Material Cost</span>
          <span>{formatCurrency(data.materialCost, currencyCode, currencySymbol)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Production Cost</span>
          <span>{formatCurrency(data.productionCost, currencyCode, currencySymbol)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Other Expense</span>
          <span>{formatCurrency(data.otherExpense, currencyCode, currencySymbol)}</span>
        </div>

        <div className="flex justify-between text-sm text-red-600">
          <span>Debt Exposure</span>
          <span>{formatCurrency(data.debt, currencyCode, currencySymbol)}</span>
        </div>

      </div>

      {/* EXPORT REPORT */}
      <div className="bg-white p-3 rounded-xl shadow-sm space-y-2">

        <h2 className="text-sm font-semibold text-[#0d1b3e]">
          Export Report
        </h2>

        <button
          onClick={() => alert("Coming Soon")}
          className="w-full h-10 bg-blue-50 text-[#2563eb] rounded-lg text-sm font-semibold"
        >
          📊 Export Excel
        </button>

        <button
          onClick={() => alert("Coming Soon")}
          className="w-full h-10 bg-blue-50 text-[#2563eb] rounded-lg text-sm font-semibold"
        >
          📄 Export PDF
        </button>

      </div>

      {/* PREMIUM / SHARE */}
      {isPremium ? (
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
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-sm text-center space-y-2">
          <p className="text-sm font-semibold text-[#0d1b3e]">🔒 Premium Feature</p>
          <p className="text-xs text-gray-500">
            Upgrade to unlock reports & history
          </p>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
            Upgrade
          </button>
        </div>
      )}

    </div>
  )
}