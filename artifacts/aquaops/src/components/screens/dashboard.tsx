import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/format"
import {
  ShoppingCart,
  Wallet,
  Package,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Zap,
  Landmark,
  MoreHorizontal,
} from "lucide-react"
import { generateInsights } from "@/app/modules/intelligence/intelligence.service"
import { isProUser } from "@/lib/subscription"
import { getAccessStatus } from "@/lib/access"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { DEMO_PERIODS, DEMO_FACTORY_NAME, DEMO_CURRENCY_CODE, DEMO_CURRENCY_SYMBOL } from "@/data/demo-data"
import { supportUrl } from "@/config/support"

export function Dashboard({
  setActiveTab,
  isDemoMode = false,
}: {
  setActiveTab: (tab: string) => void
  isDemoMode?: boolean
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

  if (period === "today")
    return now.toISOString().split("T")[0]

  if (period === "week")
    return new Date(
      now.getTime() - 7 * 86400000
    ).toISOString().split("T")[0]

  if (period === "month")
    return new Date(
      now.getTime() - 30 * 86400000
    ).toISOString().split("T")[0]

  return null
}

  useEffect(() => {
  const loadDashboard = async () => {
      // DEMO MODE — use static sample data
      if (isDemoMode) {
        const demo = DEMO_PERIODS[period] || DEMO_PERIODS.today
        setFactoryName(DEMO_FACTORY_NAME)
        setCurrencyCode(DEMO_CURRENCY_CODE)
        setCurrencySymbol(DEMO_CURRENCY_SYMBOL)
        setData({
          sales: demo.sales,
          costs: demo.costs,
          debt:  demo.debt,
          production: demo.sachetProduction + demo.bottleProduction,
          sachetProduction: demo.sachetProduction,
          bottleProduction: demo.bottleProduction,
          sachetStock:      demo.sachetStock,
          bottleStock:      demo.bottleStock,
        })
        return
      }

      const factoryId =
  await getFactoryId()

      if (!factoryId) return
      try {
        const dateFilter = getDateFilter()

        const { data: sales } = await supabase
          .from("sales").select("*").eq("factory_id", factoryId).gte("date", dateFilter)

        const { data: costs } = await supabase
          .from("expenses").select("*").eq("factory_id", factoryId).gte("created_at", dateFilter)

        const { data: production } = await supabase
          .from("production").select("*").eq("factory_id", factoryId).gte("date", dateFilter)

        const { data: debts } = await supabase
          .from("sales").select("*").eq("factory_id", factoryId).gt("balance", 0)

        const totalSales =
          sales?.reduce((s, i) => s + Number(i.total_amount || 0), 0) || 0
        const totalCosts =
          costs?.reduce((s, i) => s + Number(i.amount || 0), 0) || 0
        const totalDebt =
          debts?.reduce((s, i) => s + Number(i.balance || 0), 0) || 0

        const sachetProduction =
          production?.filter((p) => p.product_type === "sachet")
            .reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0
        const bottleProduction =
          production?.filter((p) => p.product_type === "bottle")
            .reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0

        const sachetSold =
          sales?.filter((s) => s.product_type === "sachet")
            .reduce((s, i) => s + Number(i.bags_sold || 0), 0) || 0
        const bottleSold =
          sales?.filter((s) => s.product_type === "bottle")
            .reduce((s, i) => s + Number(i.bags_sold || 0), 0) || 0

        setData({
          sales: totalSales,
          costs: totalCosts,
          debt: totalDebt,
          production: sachetProduction + bottleProduction,
          sachetProduction,
          bottleProduction,
          sachetStock: sachetProduction - sachetSold,
          bottleStock: bottleProduction - bottleSold,
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
  }, [period, isDemoMode])

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

  const CURRENCIES: Record<string, string> = {
    NGN: "₦", USD: "$", GBP: "£", EUR: "€", KES: "KSh", GHS: "GH₵", ZAR: "R",
  }

  const fc = (n: number) => formatCurrency(n, currencyCode, currencySymbol)

  return (
    <div className="space-y-4 p-3 pb-24">

      {/* ── EXPIRED TRIAL BANNER ────────────────────────────── */}
      {accessStatus === "expired" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2">
          <h2 className="font-semibold text-red-700">AquaOps Trial Expired</h2>
          <p className="text-sm text-red-600">
            Your free trial has expired. Please renew your subscription to continue.
          </p>
          <a
            href={supportUrl("Hello AquaOps Support,\n\nMy AquaOps trial has expired and I would like to activate my subscription.\n\nPlease send payment details.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white text-sm px-4 py-2 rounded-lg"
          >
            Contact Support
          </a>
        </div>
      )}

      {/* ── 1. WELCOME HEADER ──────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0d1b3e] to-[#1e3a8a] text-white rounded-2xl p-5 shadow-md">
        <p className="text-xs opacity-60 uppercase tracking-wide">{today}</p>
        <p className="text-base font-semibold mt-1 opacity-90">Welcome Back,</p>
        <h2 className="text-2xl font-bold text-blue-300">{factoryName || "Factory"}</h2>
        <p className="text-xs opacity-60 mt-1">Operational Visibility for Your Factory</p>
      </div>

      {/* ── 2. PERIOD + CURRENCY ───────────────────────────── */}
      <div className="flex items-center justify-between gap-2">
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

      {/* ── 3. NET POSITION HERO ───────────────────────────── */}
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
            Net Position —{" "}
            {period === "today" ? "Today" : period === "week" ? "This Week" : "This Month"}
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
            <p className={`font-semibold mt-0.5 ${netCashProfit < 0 ? "text-red-300" : "text-green-200"}`}>
              {fc(netCashProfit)}
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. OPERATIONS OVERVIEW ─────────────────────────── */}
      <h2 className="text-sm font-bold text-[#0d1b3e] px-1">Operations Overview</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Bags Produced",  value: `${data.production} bags`,        icon: Package,      accent: "text-green-600",bg: "bg-green-50 border-green-100"   },
          { label: "Customer Debts", value: fc(data.debt),                    icon: Users,        accent: "text-orange-500",bg:"bg-orange-50 border-orange-100" },
          { label: "Sachet Stock",   value: `${data.sachetStock} bags`,       icon: Zap,          accent: "text-purple-500",bg:"bg-purple-50 border-purple-100" },
          { label: "Bottle Stock",   value: `${data.bottleStock} crates`,     icon: BarChart3,    accent: "text-teal-600", bg: "bg-teal-50 border-teal-100"     },
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

      {/* ── 5. OPERATIONAL INSIGHTS ────────────────────────── */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-[#0d1b3e] px-1">Operational Insights</h2>

        {alerts.length === 0 && insights.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-4 text-sm text-gray-400 text-center">
            Add transactions to generate insights.
          </div>
        )}

        {alerts.map((alert, i) => (
          <div
            key={`alert-${i}`}
            className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center gap-3"
          >
            <span className="text-base shrink-0">🔴</span>
            <div>
              <p className="text-[10px] font-bold text-red-700 uppercase tracking-wide">
                Action Required
              </p>
              <p className="text-sm text-red-700 mt-0.5">{alert}</p>
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
              className={`rounded-2xl p-3 flex items-center gap-3 border ${
                isWarning ? "bg-yellow-50 border-yellow-200" : "bg-green-50 border-green-200"
              }`}
            >
              <span className="text-base shrink-0">{isWarning ? "🟡" : "🟢"}</span>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wide ${
                  isWarning ? "text-yellow-700" : "text-green-700"
                }`}>
                  {isWarning ? "Attention" : "Positive"}
                </p>
                <p className={`text-sm mt-0.5 ${isWarning ? "text-yellow-800" : "text-green-800"}`}>
                  {insight}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── 6. QUICK ACTIONS ───────────────────────────────── */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-[#0d1b3e] px-1">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Add Sale",    sub: "Record a sale",          icon: ShoppingCart, tab: "sales",      bg: "bg-[#2563eb] text-white",             iconColor: ""               },
            { label: "Add Expense", sub: "Record an expense",      icon: Wallet,       tab: "expenses",   bg: "bg-white border border-gray-100",     iconColor: "text-red-500"   },
            { label: "Production",  sub: "Record production",      icon: Package,      tab: "production", bg: "bg-white border border-gray-100",     iconColor: "text-green-600" },
            { label: "Add Debt",    sub: "Record customer debt",   icon: Users,        tab: "debts",      bg: "bg-white border border-gray-100",     iconColor: "text-orange-500"},
            { label: "Bank",        sub: "Manage bank transactions",icon: Landmark,    tab: "bank",       bg: "bg-white border border-gray-100",     iconColor: "text-[#2563eb]" },
            { label: "Reports",     sub: "View reports",           icon: BarChart3,    tab: "reports",    bg: "bg-white border border-gray-100",     iconColor: "text-teal-600"  },
            { label: "More",        sub: "More actions",           icon: MoreHorizontal,tab: "account",  bg: "bg-white border border-gray-100",     iconColor: "text-gray-400"  },
          ].map(({ label, sub, icon: Icon, tab, bg, iconColor }) => (
            <button
              key={label}
              onClick={() => setActiveTab(tab)}
              className={`rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-sm text-center ${bg}`}
            >
              <Icon size={18} className={iconColor || "text-white"} />
              <p className={`text-[11px] font-bold leading-tight ${bg.includes("text-white") ? "text-white" : "text-[#0d1b3e]"}`}>
                {label}
              </p>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}