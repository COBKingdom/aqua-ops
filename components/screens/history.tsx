"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

import {
  getFactoryCurrency,
  getFactoryId,
} from "@/lib/factory"

import { formatCurrency } from "@/lib/format"

type ActivityItem = {
  type: string
  amount?: number
  title: string
  created_at: string
}

export function HistoryScreen() {
  const [loading, setLoading] =
    useState(true)

  const [activities, setActivities] =
    useState<ActivityItem[]>([])

  const [currencyCode, setCurrencyCode] =
    useState("NGN")

  const [currencySymbol, setCurrencySymbol] =
    useState("₦")

  const [period, setPeriod] =
    useState("today")

  const [startDate, setStartDate] =
    useState("")

  const [endDate, setEndDate] =
    useState("")

  const [useCustomDates, setUseCustomDates] =
    useState(false)

  const getDateFilter = () => {
    const now = new Date()

    if (useCustomDates && startDate) {
      return startDate
    }

    if (period === "today") {
      return now.toISOString()
    }

    if (period === "week") {
      return new Date(
        now.getTime() - 7 * 86400000
      ).toISOString()
    }

    if (period === "month") {
      return new Date(
        now.getTime() - 30 * 86400000
      ).toISOString()
    }

    return null
  }

  const loadHistory = async () => {
    try {
      setLoading(true)

      const factoryId =
        getFactoryId()

      if (!factoryId) return

      const currency =
        await getFactoryCurrency()

      setCurrencyCode(currency.code)

      setCurrencySymbol(
        currency.symbol
      )

      const dateFilter =
        getDateFilter()

      // SALES
      let salesQuery = supabase
        .from("sales")
        .select("*")
        .eq(
          "factory_id",
          factoryId
        )

      if (dateFilter) {
        salesQuery =
          salesQuery.gte(
            "created_at",
            dateFilter
          )
      }

      if (
        useCustomDates &&
        endDate
      ) {
        salesQuery =
          salesQuery.lte(
            "created_at",
            `${endDate}T23:59:59`
          )
      }

      const { data: sales } =
        await salesQuery

      // EXPENSES
      let expenseQuery = supabase
        .from("expenses")
        .select("*")
        .eq(
          "factory_id",
          factoryId
        )

      if (dateFilter) {
        expenseQuery =
          expenseQuery.gte(
            "created_at",
            dateFilter
          )
      }

      if (
        useCustomDates &&
        endDate
      ) {
        expenseQuery =
          expenseQuery.lte(
            "created_at",
            `${endDate}T23:59:59`
          )
      }

      const {
        data: expenses,
      } = await expenseQuery

      // PRODUCTION
      let productionQuery =
        supabase
          .from("production")
          .select("*")
          .eq(
            "factory_id",
            factoryId
          )

      if (dateFilter) {
        productionQuery =
          productionQuery.gte(
            "created_at",
            dateFilter
          )
      }

      if (
        useCustomDates &&
        endDate
      ) {
        productionQuery =
          productionQuery.lte(
            "created_at",
            `${endDate}T23:59:59`
          )
      }

      const {
        data: production,
      } = await productionQuery

      // LOANS
      let loansQuery = supabase
        .from("loans")
        .select("*")
        .eq(
          "factory_id",
          factoryId
        )

      if (dateFilter) {
        loansQuery =
          loansQuery.gte(
            "created_at",
            dateFilter
          )
      }

      if (
        useCustomDates &&
        endDate
      ) {
        loansQuery =
          loansQuery.lte(
            "created_at",
            `${endDate}T23:59:59`
          )
      }

      const { data: loans } =
        await loansQuery

      // BANK
      let bankQuery = supabase
        .from("bank")
        .select("*")
        .eq(
          "factory_id",
          factoryId
        )

      if (dateFilter) {
        bankQuery =
          bankQuery.gte(
            "created_at",
            dateFilter
          )
      }

      if (
        useCustomDates &&
        endDate
      ) {
        bankQuery =
          bankQuery.lte(
            "created_at",
            `${endDate}T23:59:59`
          )
      }

      const { data: bank } =
        await bankQuery

      let combined: ActivityItem[] =
        []

      // SALES
      sales?.forEach((item) => {
        combined.push({
          type: "sale",
          title: `Sale — ${
            item.customer_name ||
            "Customer"
          }`,
          amount:
            item.total_amount,
          created_at:
            item.created_at,
        })
      })

      // EXPENSES
      expenses?.forEach(
        (item) => {
          combined.push({
            type: "expense",
            title: `Expense — ${
              item.category ||
              "Expense"
            }`,
            amount: item.amount,
            created_at:
              item.created_at,
          })
        }
      )

      // PRODUCTION
      production?.forEach(
        (item) => {
          combined.push({
            type: "production",
            title: `Production — ${item.bags_produced} bags`,
            created_at:
              item.created_at,
          })
        }
      )

      // LOANS
      loans?.forEach((item) => {
        combined.push({
          type: "loan",
          title: `Loan — ${
            item.description ||
            "Loan"
          }`,
          amount: item.amount,
          created_at:
            item.created_at,
        })
      })

      // BANK
      bank?.forEach((item) => {
        combined.push({
          type: "bank",
          title: `Bank — ${
            item.description ||
            "Transaction"
          }`,
          amount: item.amount,
          created_at:
            item.created_at,
        })
      })

      // SORT
      combined.sort(
        (a, b) =>
          new Date(
            b.created_at
          ).getTime() -
          new Date(
            a.created_at
          ).getTime()
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

  const handleApplyCustomDates =
    () => {
      if (!startDate || !endDate) {
        alert(
          "Please select both dates"
        )

        return
      }

      setUseCustomDates(true)

      loadHistory()
    }

  const generateHistoryText =
    () => {
      let text = `📜 AQUAOPS HISTORY REPORT

━━━━━━━━━━━━━━━━━━━

`

      activities.forEach((item) => {
        text += `${item.title}`

        if (
          item.amount !== undefined
        ) {
          text += ` — ${formatCurrency(
            item.amount,
            currencyCode,
            currencySymbol
          )}`
        }

        text += `
${new Date(
          item.created_at
        ).toLocaleString()}

━━━━━━━━━━━━━━━━━━━

`
      })

      return text
    }

  const handleWhatsApp = () => {
    const text =
      encodeURIComponent(
        generateHistoryText()
      )

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank"
    )
  }

  const handleEmail = () => {
    const subject =
      encodeURIComponent(
        "AquaOps History Report"
      )

    const body =
      encodeURIComponent(
        generateHistoryText()
      )

    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="p-4 space-y-5 pb-24">

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
          {
            key: "today",
            label: "Today",
          },
          {
            key: "week",
            label: "Week",
          },
          {
            key: "month",
            label: "Month",
          },
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => {
              setUseCustomDates(false)
              setPeriod(p.key)
            }}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              period === p.key &&
              !useCustomDates
                ? "bg-[#2563eb] text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            {p.label}
          </button>
        ))}

      </div>

      {/* CUSTOM RANGE */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">

        <div>
          <p className="text-sm font-semibold">
            Custom Date Range
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Generate history between specific dates
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-xl p-3 text-sm"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-xl p-3 text-sm"
          />

        </div>

        <button
          onClick={
            handleApplyCustomDates
          }
          className="w-full bg-black text-white rounded-xl py-3 text-sm font-medium"
        >
          Apply Date Filter
        </button>

      </div>

      {/* ACTION CENTER */}
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-4 text-white shadow-sm space-y-3">

        <div>
          <h2 className="font-semibold">
            History Actions
          </h2>

          <p className="text-xs opacity-80 mt-1">
            Share or export operational history
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={
              handleWhatsApp
            }
            className="bg-green-600 rounded-xl py-3 text-sm font-medium"
          >
            Share WhatsApp
          </button>

          <button
            onClick={handleEmail}
            className="bg-white text-black rounded-xl py-3 text-sm font-medium"
          >
            Share Email
          </button>

        </div>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-sm text-gray-500">
          Loading history...
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        activities.length === 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm text-sm text-gray-500">
            No activity found.
          </div>
        )}

      {/* TIMELINE */}
      <div className="space-y-3">

        {activities.map(
          (item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="font-semibold capitalize">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </p>
                </div>

                {item.amount !==
                  undefined && (
                  <p className="font-semibold">
                    {formatCurrency(
                      item.amount,
                      currencyCode,
                      currencySymbol
                    )}
                  </p>
                )}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  )
}