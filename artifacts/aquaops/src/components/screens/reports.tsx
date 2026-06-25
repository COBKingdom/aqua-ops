import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId, getFactoryCurrency } from "@/lib/factory"
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
      return new Date(now.getTime() - 7 * 86400000).toISOString().split("T")[0]
    }
    if (period === "month") {
      return new Date(now.getTime() - 30 * 86400000).toISOString().split("T")[0]
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

      const { data: sales } = await supabase
        .from("sales")
        .select("*")
        .eq("factory_id", factoryId)
        .gte("date", dateFilter)

      const { data: expenses } = await supabase
        .from("expenses")
        .select("*")
        .eq("factory_id", factoryId)
        .gte("created_at", dateFilter)

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
      const totalCosts =
        expenses?.reduce((s, i) => s + Number(i.amount || 0), 0) || 0
      const totalDebt =
        debts?.reduce((s, i) => s + Number(i.balance || 0), 0) || 0

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

      const sachetProduction =
        production
          ?.filter((p) => p.product_type === "sachet")
          .reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0
      const bottleProduction =
        production
          ?.filter((p) => p.product_type === "bottle")
          .reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0

      const sachetSold =
        sales
          ?.filter((s) => s.product_type === "sachet")
          .reduce((s, i) => s + Number(i.bags_sold || 0), 0) || 0
      const bottleSold =
        sales
          ?.filter((s) => s.product_type === "bottle")
          .reduce((s, i) => s + Number(i.bags_sold || 0), 0) || 0

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

  const generateReportText = () => {
    return `📊 OPERATIONAL REPORT — ${period.toUpperCase()}

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
    <div className="p-4 space-y-5 pb-24">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">
          Reports
        </h1>
        <p className="text-sm text-gray-500">
          Operational intelligence summary
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
            className={`px-3 py-1.5 rounded-lg text-sm ${
              period === p.key
                ? "bg-[#2563eb] text-white"
                : "bg-white border border-gray-200"
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

      {/* REPORT FILTERS */}
      <div className="bg-white p-3 rounded-2xl shadow-sm space-y-2">

        <h2 className="text-sm font-semibold text-[#0d1b3e]">
          Report Filters
        </h2>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[11px] text-gray-400 mb-1">From</p>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) =>
                setFilters({ ...filters, fromDate: e.target.value })
              }
              className="w-full h-9 border border-gray-200 rounded-xl px-2 text-sm"
            />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 mb-1">To</p>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) =>
                setFilters({ ...filters, toDate: e.target.value })
              }
              className="w-full h-9 border border-gray-200 rounded-xl px-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[11px] text-gray-400 mb-1">Product</p>
            <select
              value={filters.product}
              onChange={(e) =>
                setFilters({ ...filters, product: e.target.value })
              }
              className="w-full h-9 border border-gray-200 rounded-xl px-2 text-sm bg-white"
            >
              <option value="all">All Products</option>
              <option value="sachet">Sachet</option>
              <option value="bottle">Bottle</option>
            </select>
          </div>
          <div>
            <p className="text-[11px] text-gray-400 mb-1">Shift</p>
            <select
              value={filters.shift}
              onChange={(e) =>
                setFilters({ ...filters, shift: e.target.value })
              }
              className="w-full h-9 border border-gray-200 rounded-xl px-2 text-sm bg-white"
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
          className="w-full h-10 bg-[#2563eb] text-white rounded-xl text-sm font-semibold"
        >
          Apply Filters
        </button>

      </div>

      {/* EXECUTIVE SUMMARY GRID */}
      <div className="grid grid-cols-2 gap-3">

        <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">
            Sales
          </p>
          <p className="text-lg font-bold text-[#0d1b3e] mt-1">
            {formatCurrency(data.sales, currencyCode, currencySymbol)}
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 p-3 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">
            Operational Costs
          </p>
          <p className="text-lg font-bold text-[#0d1b3e] mt-1">
            {formatCurrency(data.costs, currencyCode, currencySymbol)}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">
            Gross Sachet Prod.
          </p>
          <p className="text-lg font-bold text-[#0d1b3e] mt-1">
            {data.sachetProduction} bags
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">
            Production Losses
          </p>
          <p className="text-lg font-bold text-[#0d1b3e] mt-1">
            0 bags
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 p-3 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
            Net Sachet Prod.
          </p>
          <p className="text-lg font-bold text-[#0d1b3e] mt-1">
            {data.sachetProduction} bags
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">
            Sachet Stock
          </p>
          <p className="text-lg font-bold text-[#0d1b3e] mt-1">
            {data.sachetStock} bags
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">
            Bottle Production
          </p>
          <p className="text-lg font-bold text-[#0d1b3e] mt-1">
            {data.bottleProduction} crates
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">
            Bottle Stock
          </p>
          <p className="text-lg font-bold text-[#0d1b3e] mt-1">
            {data.bottleStock} crates
          </p>
        </div>

      </div>

      {/* FINANCIAL SUMMARY */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 space-y-3">

        <h2 className="font-semibold text-[#2563eb]">
          Financial Summary
        </h2>

        {[
          { label: "Material Cost",   value: data.materialCost   },
          { label: "Production Cost", value: data.productionCost },
          { label: "Other Expense",   value: data.otherExpense   },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium text-[#0d1b3e]">
              {formatCurrency(value, currencyCode, currencySymbol)}
            </span>
          </div>
        ))}

        <div className="border-t border-gray-100 pt-2 flex justify-between text-sm text-red-600">
          <span>Debt Exposure</span>
          <span className="font-medium">
            {formatCurrency(data.debt, currencyCode, currencySymbol)}
          </span>
        </div>

      </div>

      {/* NET RESULT HERO */}
      <div className="bg-gradient-to-r from-[#0d1b3e] to-gray-800 text-white p-5 rounded-2xl shadow-md">

        <p className="text-xs opacity-70 uppercase tracking-wide">
          Net Operating Result
        </p>

        <p className="text-3xl font-bold mt-2">
          {formatCurrency(profit, currencyCode, currencySymbol)}
        </p>

        <p className="text-xs mt-1 opacity-80">
          {profit > 0 && "Profit — Business is growing"}
          {profit < 0 && "Loss — Business is declining"}
          {profit === 0 && "Break-even"}
        </p>

        <div className="mt-4 border-t border-white/20 pt-3 flex justify-between items-center">
          <div>
            <p className="text-xs opacity-60">Net Cash Profit</p>
            <p className={`text-lg font-semibold ${netCashProfit < 0 ? "text-red-400" : "text-green-400"}`}>
              {formatCurrency(netCashProfit, currencyCode, currencySymbol)}
            </p>
          </div>
          <p className="text-xs opacity-60">
            {netCashProfit < 0 ? "Cash Loss" : "Cash Profit"}
          </p>
        </div>

      </div>

      {/* EXPORT REPORT */}
      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">

        <div>
          <h2 className="font-semibold text-[#0d1b3e]">Export Report</h2>
          <p className="text-xs text-gray-400 mt-0.5">Download or share this report</p>
        </div>

        <button
          onClick={() => alert("Coming Soon")}
          className="w-full h-11 bg-blue-50 text-[#2563eb] rounded-xl text-sm font-semibold"
        >
          📊 Export Excel
        </button>

        <button
          onClick={() => alert("Coming Soon")}
          className="w-full h-11 bg-blue-50 text-[#2563eb] rounded-xl text-sm font-semibold"
        >
          📄 Export PDF
        </button>

        <button
          onClick={() => setActiveTab("migration")}
          className="w-full h-11 bg-[#0d1b3e] text-white rounded-xl text-sm font-semibold"
        >
          📥 Import Historical Data
        </button>

      </div>

      {/* SHARE — premium only */}
      {isPremium ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsApp}
            className="w-full h-11 bg-green-600 text-white rounded-xl text-sm font-semibold"
          >
            Share WhatsApp
          </button>
          <button
            onClick={handleEmail}
            className="w-full h-11 bg-gray-800 text-white rounded-xl text-sm font-semibold"
          >
            Share Email
          </button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-2xl shadow-sm text-center space-y-2">
          <p className="text-sm font-semibold text-[#0d1b3e]">
            🔒 Premium Feature
          </p>
          <p className="text-xs text-gray-500">
            Upgrade to unlock reports & history
          </p>
          <button className="bg-[#0d1b3e] text-white px-4 py-2 rounded-xl text-sm">
            Upgrade
          </button>
        </div>
      )}

    </div>
  )
}