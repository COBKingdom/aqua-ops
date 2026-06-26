import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/format"
import {
  Wallet,
  ShoppingCart,
  Package,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Zap,
  ArrowRight,
  Activity,
} from "lucide-react"
import { generateInsights } from "@/app/modules/intelligence/intelligence.service"
import { isProUser } from "@/lib/subscription"
import { getAccessStatus } from "@/lib/access"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"

export function Dashboard({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void
}) {
  const [factoryName, setFactoryName] = useState("")
  const [currencyCode, setCurrencyCode] = useState("NGN")
  const [currencySymbol, setCurrencySymbol] = useState("₦")
  const [isPremium, setIsPremium] = useState(false)
  const [accessStatus, setAccessStatus] = useState("trial")
  const [period, setPeriod] = useState("today")

  const [data, setData] = useState({
    sales: 0,
    costs: 0,
    production: 0,
    debt: 0,
    sachetProduction: 0,
    bottleProduction: 0,
    sachetStock: 0,
    bottleStock: 0,
  })

  const getDateFilter = () => {
    const now = new Date()
    if (period === "today") return now.toISOString().split("T")[0]
    if (period === "week")
      return new Date(now.getTime() - 7 * 86400000).toISOString().split("T")[0]
    if (period === "month")
      return new Date(now.getTime() - 30 * 86400000).toISOString().split("T")[0]
  }

  useEffect(() => {
    const loadDashboard = async () => {
      const factoryId = await getFactoryId()
      if (!factoryId) return

      try {
        const dateFilter = getDateFilter()

        const { data: sales } = await supabase
          .from("sales")
          .select("*")
          .eq("factory_id", factoryId)
          .gte("date", dateFilter)

        const { data: costs } = await supabase
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
          costs?.reduce((s, i) => s + Number(i.amount || 0), 0) || 0
        const totalDebt =
          debts?.reduce((s, i) => s + Number(i.balance || 0), 0) || 0

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
          production: sachetProduction + bottleProduction,
          sachetProduction,
          bottleProduction,
          sachetStock,
          bottleStock,
        })

        const { data: factory } = await supabase
          .from("factories")
          .select("name, currency_code, currency_symbol")
          .eq("id", factoryId)
          .single()

        if (factory) {
          setFactoryName(factory.name || "Factory")
          setCurrencyCode(factory.currency_code || "NGN")
          setCurrencySymbol(factory.currency_symbol || "₦")
        }

      } catch (err) {
        console.error("Dashboard load error:", err)
      }
    }

    loadDashboard()
  }, [period])

  useEffect(() => {
    const checkAccess = async () => {
      const premium = await isProUser()
      setIsPremium(premium)
      const status = await getAccessStatus()
      setAccessStatus(status)
    }
    checkAccess()
  }, [])

  const profit = data.sales - data.costs
  const netCashProfit = profit - data.debt

  const { insights, alerts } = generateInsights({
    sales: data.sales,
    expenses: data.costs,
    debt: data.debt,
    cash: profit,
  })

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const periodLabel =
    period === "today" ? "Today" : period === "week" ? "This Week" : "This Month"

  const CURRENCIES: Record<string, string> = {
    NGN: "₦", USD: "$", GBP: "£", EUR: "€", KES: "KSh", GHS: "GH₵", ZAR: "R",
  }

  return (
    <div className="space-y-4 p-3 pb-24">

      {/* ── EXPIRED TRIAL BANNER ─────────────────────────────── */}
      {accessStatus === "expired" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2">
          <h2 className="font-semibold text-red-700">AquaOps Trial Expired</h2>
          <p className="text-sm text-red-600">
            Your free trial has expired. Please renew your subscription to continue.
          </p>
          <a
            href="https://wa.me/2349066656691?text=Hello%20AquaOps%20Support%2C%0A%0AMy%20AquaOps%20trial%20has%20expired%20and%20I%20would%20like%20to%20activate%20my%20subscription.%0A%0APlease%20send%20payment%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white text-sm px-4 py-2 rounded-lg"
          >
            Contact Support
          </a>
        </div>
      )}

      {/* ── SECTION 1: WELCOME HEADER ────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0d1b3e] to-gray-800 text-white rounded-2xl p-5 shadow-md">
        <p className="text-xs opacity-60 uppercase tracking-wide">{today}</p>
        <h1 className="text-xl font-bold mt-1">
          Welcome Back,
        </h1>
        <h2 className="text-2xl font-bold text-blue-300">
          {factoryName || "Factory"}
        </h2>
        <p className="text-xs opacity-70 mt-1">
          Operational Visibility for Your Factory
        </p>
      </div>

      {/* ── PERIOD + CURRENCY BAR ─────────────────────────────── */}
      <div className="flex items-center justify-between gap-2 flex-wrap">

        <div className="flex gap-2">
          {["today", "week", "month"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                period === p
                  ? "bg-[#2563eb] text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <select
          value={currencyCode}
          onChange={async (e) => {
            const value = e.target.value
            const symbol = CURRENCIES[value] || "₦"
            setCurrencyCode(value)
            setCurrencySymbol(symbol)
            const factoryId = getFactoryId()
            if (factoryId) {
              await supabase
                .from("factories")
                .update({ currency_code: value, currency_symbol: symbol })
                .eq("id", factoryId)
            }
          }}
          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm shadow-sm"
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

      {/* ── SECTION 2: TODAY AT A GLANCE ─────────────────────── */}
      <div className="grid grid-cols-2 gap-3">

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <ShoppingCart size={13} className="text-[#2563eb]" />
            <p className="text-[11px] font-semibold text-[#2563eb] uppercase tracking-wide">
              {periodLabel} Sales
            </p>
          </div>
          <p className="text-lg font-bold text-[#0d1b3e]">
            {formatCurrency(data.sales, currencyCode, currencySymbol)}
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <Wallet size={13} className="text-red-500" />
            <p className="text-[11px] font-semibold text-red-500 uppercase tracking-wide">
              {periodLabel} Expenses
            </p>
          </div>
          <p className="text-lg font-bold text-[#0d1b3e]">
            {formatCurrency(data.costs, currencyCode, currencySymbol)}
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <Package size={13} className="text-green-600" />
            <p className="text-[11px] font-semibold text-green-600 uppercase tracking-wide">
              Production
            </p>
          </div>
          <p className="text-lg font-bold text-[#0d1b3e]">
            {data.production} bags
          </p>
        </div>

        <div className={`rounded-2xl p-3 shadow-sm border ${
          profit >= 0
            ? "bg-emerald-50 border-emerald-100"
            : "bg-orange-50 border-orange-100"
        }`}>
          <div className="flex items-center gap-1.5 mb-1">
            <Activity size={13} className={profit >= 0 ? "text-emerald-600" : "text-orange-500"} />
            <p className={`text-[11px] font-semibold uppercase tracking-wide ${
              profit >= 0 ? "text-emerald-600" : "text-orange-500"
            }`}>
              Net Position
            </p>
          </div>
          <p className="text-lg font-bold text-[#0d1b3e]">
            {formatCurrency(profit, currencyCode, currencySymbol)}
          </p>
        </div>

      </div>

      {/* ── SECTION 3: NET POSITION HERO ─────────────────────── */}
      <div className={`rounded-2xl p-5 shadow-md text-white ${
        profit >= 0
          ? "bg-gradient-to-r from-green-700 to-green-600"
          : "bg-gradient-to-r from-red-700 to-red-600"
      }`}>

        <div className="flex items-center gap-2 mb-2">
          {profit >= 0
            ? <TrendingUp size={18} className="opacity-80" />
            : <TrendingDown size={18} className="opacity-80" />
          }
          <p className="text-xs opacity-80 uppercase tracking-wide font-semibold">
            Net Position — {periodLabel}
          </p>
        </div>

        <p className="text-4xl font-bold tracking-tight">
          {formatCurrency(profit, currencyCode, currencySymbol)}
        </p>

        <p className="text-sm opacity-90 mt-2">
          {profit > 0 && "Factory is operating profitably."}
          {profit < 0 && "Factory expenses are currently exceeding income."}
          {profit === 0 && "Factory is at break-even."}
        </p>

        <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="opacity-60 text-xs">Sales</p>
            <p className="font-semibold mt-0.5">
              {formatCurrency(data.sales, currencyCode, currencySymbol)}
            </p>
          </div>
          <div>
            <p className="opacity-60 text-xs">Expenses</p>
            <p className="font-semibold mt-0.5">
              {formatCurrency(data.costs, currencyCode, currencySymbol)}
            </p>
          </div>
          <div>
            <p className="opacity-60 text-xs">Net Cash</p>
            <p className={`font-semibold mt-0.5 ${netCashProfit < 0 ? "text-red-300" : "text-green-200"}`}>
              {formatCurrency(netCashProfit, currencyCode, currencySymbol)}
            </p>
          </div>
        </div>

      </div>

      {/* ── SECTION 4: KPI GRID ──────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">

        {[
          {
            label: "Sales Revenue",
            value: formatCurrency(data.sales, currencyCode, currencySymbol),
            icon: ShoppingCart,
            accent: "text-[#2563eb]",
            bg: "bg-blue-50 border-blue-100",
          },
          {
            label: "Total Expenses",
            value: formatCurrency(data.costs, currencyCode, currencySymbol),
            icon: Wallet,
            accent: "text-red-500",
            bg: "bg-red-50 border-red-100",
          },
          {
            label: "Bags Produced",
            value: `${data.production} bags`,
            icon: Package,
            accent: "text-green-600",
            bg: "bg-green-50 border-green-100",
          },
          {
            label: "Customer Debts",
            value: formatCurrency(data.debt, currencyCode, currencySymbol),
            icon: Users,
            accent: "text-orange-500",
            bg: "bg-orange-50 border-orange-100",
          },
          {
            label: "Sachet Stock",
            value: `${data.sachetStock} bags`,
            icon: Zap,
            accent: "text-purple-500",
            bg: "bg-purple-50 border-purple-100",
          },
          {
            label: "Bottle Stock",
            value: `${data.bottleStock} crates`,
            icon: BarChart3,
            accent: "text-teal-600",
            bg: "bg-teal-50 border-teal-100",
          },
        ].map(({ label, value, icon: Icon, accent, bg }) => (
          <div
            key={label}
            className={`border rounded-2xl p-3 shadow-sm ${bg}`}
          >
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

      {/* ── SECTION 5: OPERATIONAL INSIGHTS ─────────────────── */}
      <div className="space-y-2">

        <h2 className="text-sm font-bold text-[#0d1b3e] px-1">
          Operational Insights
        </h2>

        {alerts.length === 0 && insights.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-sm text-gray-400">
              Add transactions to generate insights.
            </p>
          </div>
        )}

        {alerts.map((alert, i) => (
          <div
            key={`alert-${i}`}
            className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-start gap-3"
          >
            <span className="text-base shrink-0">🔴</span>
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-0.5">
                Action Required
              </p>
              <p className="text-sm text-red-700">{alert}</p>
            </div>
          </div>
        ))}

        {insights.map((insight, i) => {
          const isWarning =
            insight.toLowerCase().includes("debt") ||
            insight.toLowerCase().includes("loss") ||
            insight.toLowerCase().includes("exceed")
          return (
            <div
              key={`insight-${i}`}
              className={`rounded-2xl p-3 flex items-start gap-3 border ${
                isWarning
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <span className="text-base shrink-0">
                {isWarning ? "🟡" : "🟢"}
              </span>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wide mb-0.5 ${
                  isWarning ? "text-yellow-700" : "text-green-700"
                }`}>
                  {isWarning ? "Attention" : "Positive"}
                </p>
                <p className={`text-sm ${isWarning ? "text-yellow-800" : "text-green-800"}`}>
                  {insight}
                </p>
              </div>
            </div>
          )
        })}

      </div>

      {/* ── SECTION 6: QUICK ACTIONS ─────────────────────────── */}
      <div className="space-y-2">

        <h2 className="text-sm font-bold text-[#0d1b3e] px-1">Quick Actions</h2>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => setActiveTab("sales")}
            className="bg-[#2563eb] text-white rounded-2xl p-4 flex flex-col items-start gap-2 shadow-sm"
          >
            <ShoppingCart size={20} />
            <div className="text-left">
              <p className="text-sm font-bold">Add Sale</p>
              <p className="text-[11px] opacity-70">Record a sale</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("expenses")}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-start gap-2 shadow-sm"
          >
            <Wallet size={20} className="text-red-500" />
            <div className="text-left">
              <p className="text-sm font-bold text-[#0d1b3e]">Add Expense</p>
              <p className="text-[11px] text-gray-400">Record a cost</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("production")}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-start gap-2 shadow-sm"
          >
            <Package size={20} className="text-green-600" />
            <div className="text-left">
              <p className="text-sm font-bold text-[#0d1b3e]">Production</p>
              <p className="text-[11px] text-gray-400">Log output</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-start gap-2 shadow-sm"
          >
            <BarChart3 size={20} className="text-[#2563eb]" />
            <div className="text-left">
              <p className="text-sm font-bold text-[#0d1b3e]">View Reports</p>
              <p className="text-[11px] text-gray-400">Full analysis</p>
            </div>
          </button>

        </div>

      </div>

      {/* ── SECTION 7: BUSINESS SNAPSHOT ─────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-50">
          <h2 className="font-bold text-[#0d1b3e] text-sm">Business Snapshot</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">{periodLabel} summary</p>
        </div>

        <div className="divide-y divide-gray-50">
          {[
            { label: "Total Sales",         value: formatCurrency(data.sales, currencyCode, currencySymbol),   color: "text-[#0d1b3e]" },
            { label: "Total Expenses",      value: formatCurrency(data.costs, currencyCode, currencySymbol),   color: "text-red-600"   },
            { label: "Sachet Production",   value: `${data.sachetProduction} bags`,                            color: "text-[#0d1b3e]" },
            { label: "Bottle Production",   value: `${data.bottleProduction} crates`,                          color: "text-[#0d1b3e]" },
            { label: "Sachet Stock",        value: `${data.sachetStock} bags`,                                 color: "text-green-600" },
            { label: "Bottle Stock",        value: `${data.bottleStock} crates`,                               color: "text-green-600" },
            { label: "Outstanding Debts",   value: formatCurrency(data.debt, currencyCode, currencySymbol),    color: "text-orange-600"},
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between items-center px-4 py-2.5 text-sm">
              <span className="text-gray-600">{label}</span>
              <span className={`font-semibold ${color}`}>{value}</span>
            </div>
          ))}
        </div>

      </div>

      {/* ── SECTION 8: RECENT ACTIVITY PLACEHOLDER ───────────── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[#0d1b3e] text-sm">Recent Activity</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Latest operational events</p>
          </div>
          <button
            onClick={() => setActiveTab("history")}
            className="flex items-center gap-1 text-xs text-[#2563eb] font-semibold"
          >
            View All <ArrowRight size={12} />
          </button>
        </div>

        <div className="px-4 py-4 text-center">
          <p className="text-sm text-gray-400">
            Tap <span className="font-semibold text-[#2563eb]">View All</span> to see the full activity timeline.
          </p>
        </div>

      </div>

    </div>
  )
}