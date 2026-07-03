import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

import {
  getFactoryCurrency,
  getFactoryId,
} from "@/lib/factory"

import { formatCurrency } from "@/lib/format"

import {
  Factory,
  ShoppingCart,
  Receipt,
  Landmark,
  Wallet,
  Loader2,
} from "lucide-react"

type ActivityItem = {
  type: string
  amount?: number
  title: string
  subtitle?: string
  created_at: string
}

export function HistoryScreen({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void
}) {
  const [loading, setLoading] = useState(true)

  const [activities, setActivities] = useState<ActivityItem[]>([])

  const [currencyCode, setCurrencyCode] = useState("NGN")

  const [currencySymbol, setCurrencySymbol] = useState("₦")

  const [period, setPeriod] = useState("today")

  const [startDate, setStartDate] = useState("")

  const [endDate, setEndDate] = useState("")

  const [useCustomDates, setUseCustomDates] = useState(false)

  const getDateFilter = () => {
    const now = new Date()

    if (useCustomDates && startDate) {
      return startDate
    }

    if (period === "today") {
      const startOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      return startOfDay.toISOString()
    }

    if (period === "week") {
      return new Date(now.getTime() - 7 * 86400000).toISOString()
    }

    if (period === "month") {
      return new Date(now.getTime() - 30 * 86400000).toISOString()
    }

    return null
  }

  const loadHistory = async () => {
    try {
      setLoading(true)

      const factoryId = await getFactoryId()

      if (!factoryId) return

      const currency = await getFactoryCurrency()

      setCurrencyCode(currency.code)
      setCurrencySymbol(currency.symbol)

      const dateFilter = getDateFilter()

      // SALES
      let salesQuery = supabase
        .from("sales")
        .select("*")
        .eq("factory_id", factoryId)

      if (dateFilter) {
        salesQuery = salesQuery.gte("created_at", dateFilter)
      }

      if (useCustomDates && endDate) {
        salesQuery = salesQuery.lte("created_at", `${endDate}T23:59:59`)
      }

      const { data: sales } = await salesQuery

      // EXPENSES
      let expenseQuery = supabase
        .from("expenses")
        .select("*")
        .eq("factory_id", factoryId)

      if (dateFilter) {
        expenseQuery = expenseQuery.gte("created_at", dateFilter)
      }

      if (useCustomDates && endDate) {
        expenseQuery = expenseQuery.lte("created_at", `${endDate}T23:59:59`)
      }

      const { data: expenses } = await expenseQuery

      // PRODUCTION
      let productionQuery = supabase
        .from("production")
        .select("*")
        .eq("factory_id", factoryId)

      if (dateFilter) {
        productionQuery = productionQuery.gte("created_at", dateFilter)
      }

      if (useCustomDates && endDate) {
        productionQuery = productionQuery.lte("created_at", `${endDate}T23:59:59`)
      }

      const { data: production } = await productionQuery

      // LOANS
      let loansQuery = supabase
        .from("loans")
        .select("*")
        .eq("factory_id", factoryId)

      if (dateFilter) {
        loansQuery = loansQuery.gte("created_at", dateFilter)
      }

      if (useCustomDates && endDate) {
        loansQuery = loansQuery.lte("created_at", `${endDate}T23:59:59`)
      }

      const { data: loans } = await loansQuery

      // BANK
      let bankQuery = supabase
        .from("bank")
        .select("*")
        .eq("factory_id", factoryId)

      if (dateFilter) {
        bankQuery = bankQuery.gte("created_at", dateFilter)
      }

      if (useCustomDates && endDate) {
        bankQuery = bankQuery.lte("created_at", `${endDate}T23:59:59`)
      }

      const { data: bank } = await bankQuery

      const combined: ActivityItem[] = []

      // SALES
      sales?.forEach((item) => {
        combined.push({
          type: "sale",
          title: `Sale — ${item.customer_name || "Customer"}`,
          amount: item.total_amount,
          created_at: item.created_at,
        })
      })

      // EXPENSES
      expenses?.forEach((item) => {
        combined.push({
          type: "expense",
          title: `Expense — ${item.category || "Expense"}`,
          amount: item.amount,
          created_at: item.created_at,
        })
      })

      // PRODUCTION — improved label with product type
      production?.forEach((item) => {
        const isBottle = item.product_type === "bottle"
        combined.push({
          type: "production",
          title: isBottle ? "Bottle Production" : "Sachet Production",
          subtitle: isBottle
            ? `${item.bags_produced} Crates Produced`
            : `${item.bags_produced} Bags Produced`,
          created_at: item.created_at,
        })
      })

      // LOANS
      loans?.forEach((item) => {
        combined.push({
          type: "loan",
          title: `Loan — ${item.description || "Loan"}`,
          amount: item.amount,
          created_at: item.created_at,
        })
      })

      // BANK
      bank?.forEach((item) => {
        combined.push({
          type: "bank",
          title: `Bank — ${item.description || "Transaction"}`,
          amount: item.amount,
          created_at: item.created_at,
        })
      })

      // SORT newest first
      combined.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )

      setActivities(combined)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [period])

  const handleApplyCustomDates = () => {
    if (!startDate || !endDate) {
      alert("Please select both dates")
      return
    }
    setUseCustomDates(true)
    loadHistory()
  }

  const generateHistoryText = () => {
    let text = `📜 AQUAOPS HISTORY REPORT\n\n━━━━━━━━━━━━━━━━━━━\n\n`

    activities.forEach((item) => {
      text += `${item.title}`
      if (item.subtitle) {
        text += ` — ${item.subtitle}`
      }
      if (item.amount !== undefined) {
        text += ` — ${formatCurrency(item.amount, currencyCode, currencySymbol)}`
      }
      text += `\n${new Date(item.created_at).toLocaleString()}\n\n━━━━━━━━━━━━━━━━━━━\n\n`
    })

    return text
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateHistoryText())
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const handleEmail = () => {
    const subject = encodeURIComponent("AquaOps History Report")
    const body = encodeURIComponent(generateHistoryText())
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  // Per-type config: icon, border color, icon color
  const typeConfig: Record<
    string,
    { icon: React.ReactNode; border: string }
  > = {
    sale: {
      icon: <ShoppingCart size={15} className="text-green-600 shrink-0 mt-0.5" />,
      border: "border-l-green-500",
    },
    expense: {
      icon: <Receipt size={15} className="text-red-500 shrink-0 mt-0.5" />,
      border: "border-l-red-500",
    },
    production: {
      icon: <Factory size={15} className="text-blue-500 shrink-0 mt-0.5" />,
      border: "border-l-blue-500",
    },
    loan: {
      icon: <Landmark size={15} className="text-purple-500 shrink-0 mt-0.5" />,
      border: "border-l-purple-500",
    },
    bank: {
      icon: <Wallet size={15} className="text-orange-500 shrink-0 mt-0.5" />,
      border: "border-l-orange-500",
    },
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* BACK */}
      <button
        onClick={() => setActiveTab("reports")}
        className="flex items-center gap-1 text-sm text-[#2563eb] font-medium"
      >
        ← Back to Reports
      </button>

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Activity History
        </h1>
        <p className="text-sm text-gray-500">
          Complete operational timeline
        </p>
      </div>

      {/* QUICK FILTERS */}
      <div className="flex gap-2 flex-wrap">

        {[
          { key: "today", label: "Today" },
          { key: "week",  label: "Week"  },
          { key: "month", label: "Month" },
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => {
              setUseCustomDates(false)
              setPeriod(p.key)
            }}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              period === p.key && !useCustomDates
                ? "bg-[#2563eb] text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            {p.label}
          </button>
        ))}

        <button
          onClick={() => setActiveTab("reports")}
          className="px-3 py-1.5 rounded-lg text-sm bg-black text-white"
        >
          Reports
        </button>

      </div>

      {/* CUSTOM DATE RANGE */}
      <div className="bg-white rounded-2xl p-3 shadow-sm space-y-2">

        <div>
          <p className="text-sm font-semibold">Custom Date Range</p>
          <p className="text-xs text-gray-500">
            Generate history between specific dates
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-200 rounded-xl p-2 text-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-200 rounded-xl p-2 text-sm"
          />
        </div>

        <button
          onClick={handleApplyCustomDates}
          className="w-full bg-black text-white rounded-xl py-2.5 text-sm font-medium"
        >
          Apply Date Filter
        </button>

      </div>

      {/* EXPORT HISTORY */}
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-3 text-white shadow-sm space-y-2">

        <div>
          <h2 className="font-semibold">Export History</h2>
          <p className="text-xs opacity-80">
            Share or export operational history
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsApp}
            className="bg-green-600 rounded-xl py-2.5 text-sm font-medium"
          >
            Share WhatsApp
          </button>

          <button
            onClick={handleEmail}
            className="bg-white text-black rounded-xl py-2.5 text-sm font-medium"
          >
            Share Email
          </button>
        </div>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
          <Loader2 size={16} className="animate-spin text-[#2563eb]" />
          Loading operational history...
        </div>
      )}

      {/* EMPTY */}
      {!loading && activities.length === 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm text-sm text-gray-500">
          No operational activity found for the selected period.
        </div>
      )}

      {/* TIMELINE */}
      <div className="space-y-2">

        {activities.map((item, index) => {
          const config = typeConfig[item.type] ?? {
            icon: <ShoppingCart size={15} className="text-gray-400 shrink-0 mt-0.5" />,
            border: "border-l-gray-300",
          }

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl p-3 shadow-sm border-l-4 ${config.border}`}
            >
              <div className="flex items-start justify-between gap-3">

                <div className="flex items-start gap-2 min-w-0">
                  {config.icon}

                  <div className="min-w-0">
                    <p className="font-semibold capitalize leading-snug">
                      {item.title}
                    </p>
                    {item.subtitle && (
                      <p className="text-xs text-gray-600 mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {item.amount !== undefined && (
                  <p className="font-semibold shrink-0 text-sm">
                    {formatCurrency(item.amount, currencyCode, currencySymbol)}
                  </p>
                )}

              </div>
            </div>
          )
        })}

      </div>

    </div>
  )
}