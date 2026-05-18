"use client"

import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/format"

import {
  Wallet,
  ShoppingCart,
  Factory,
  BarChart3,
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
  const [factoryName, setFactoryName] =
    useState("")

  const [currencyCode, setCurrencyCode] =
    useState("NGN")

  const [currencySymbol, setCurrencySymbol] =
    useState("₦")

  const [isPremium, setIsPremium] =
    useState(false)

  const [accessStatus, setAccessStatus] =
    useState("trial")

  const [period, setPeriod] =
    useState("today")

  const [data, setData] = useState({
    sales: 0,
    costs: 0,
    production: 0,
    debt: 0,
    stock: 0,
  })

  const getDateFilter = () => {
    const now = new Date()

    if (period === "today") {
      return now
        .toISOString()
        .split("T")[0]
    }

    if (period === "week") {
      return new Date(
        now.getTime() - 7 * 86400000
      )
        .toISOString()
        .split("T")[0]
    }

    if (period === "month") {
      return new Date(
        now.getTime() - 30 * 86400000
      )
        .toISOString()
        .split("T")[0]
    }
  }

  // LOAD DASHBOARD
  useEffect(() => {
    const loadDashboard = async () => {
      const factoryId = getFactoryId()

      if (!factoryId) return

      try {
        const dateFilter =
          getDateFilter()

        const { data: sales } =
          await supabase
            .from("sales")
            .select("*")
            .eq(
              "factory_id",
              factoryId
            )
            .gte("date", dateFilter)

        const { data: costs } =
          await supabase
            .from("expenses")
            .select("*")
            .eq(
              "factory_id",
              factoryId
            )
          .gte(
  "created_at",
  dateFilter
)

        const {
          data: production,
        } = await supabase
          .from("production")
          .select("*")
          .eq(
            "factory_id",
            factoryId
          )
          .gte("date", dateFilter)

        const { data: debts } =
          await supabase
            .from("sales")
            .select("*")
            .eq(
              "factory_id",
              factoryId
            )
            .gt("balance", 0)

        const totalSales =
          sales?.reduce(
            (s, i) =>
              s +
              Number(
                i.total_amount || 0
              ),
            0
          ) || 0

        const totalCosts =
          costs?.reduce(
            (s, i) =>
              s +
              Number(i.amount || 0),
            0
          ) || 0

        const totalProduction =
          production?.reduce(
            (s, i) =>
              s +
              Number(
                i.bags_produced || 0
              ),
            0
          ) || 0

        const totalDebt =
          debts?.reduce(
            (s, i) =>
              s +
              Number(
                i.balance || 0
              ),
            0
          ) || 0

const totalSoldBags =
  sales?.reduce(
    (s, i) =>
      s +
      Number(
        i.bags_sold || 0
      ),
    0
  ) || 0

        const availableStock =
          totalProduction -
          totalSoldBags

        setData({
          sales: totalSales,
          costs: totalCosts,
          production: totalProduction,
          debt: totalDebt,
          stock: availableStock,
        })

        const { data: factory } =
          await supabase
            .from("factories")
            .select(
              "name, currency_code, currency_symbol"
            )
            .eq("id", factoryId)
            .single()

        if (factory) {
          setFactoryName(
            factory.name || "Factory"
          )

          setCurrencyCode(
            factory.currency_code ||
              "NGN"
          )

          setCurrencySymbol(
            factory.currency_symbol ||
              "₦"
          )
        }

      } catch (err) {
        console.error(
          "Dashboard load error:",
          err
        )
      }
    }

    loadDashboard()
  }, [period])

  // PREMIUM + ACCESS CHECK
  useEffect(() => {
    const checkAccess =
      async () => {
        const premium =
          await isProUser()

        setIsPremium(premium)

        const status =
          await getAccessStatus()

        setAccessStatus(status)
      }

    checkAccess()
  }, [])

  const profit =
    data.sales - data.costs

  const netCashProfit =
    profit - data.debt

  const { insights, alerts } =
    generateInsights({
      sales: data.sales,
      expenses: data.costs,
      debt: data.debt,
      cash: profit,
    })

  return (
    <div className="space-y-5 p-3 pb-20">

      {/* EXPIRED TRIAL BANNER */}
      {accessStatus === "expired" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2">

          <h2 className="font-semibold text-red-700">
            AquaOps Trial Expired
          </h2>

          <p className="text-sm text-red-600">
            Your AquaOps free trial
            has expired. Please renew
            your subscription to
            continue uninterrupted
            factory management.
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

      {/* FILTER + CURRENCY */}
      <div className="flex items-center justify-between gap-4 flex-wrap">

        {/* FILTERS */}
        <div className="flex gap-2 flex-wrap">

          {[
            "today",
            "week",
            "month",
          ].map((p) => (
            <button
              key={p}
              onClick={() =>
                setPeriod(p)
              }
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                period === p
                  ? "bg-[#2563eb] text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >
              {p
                .charAt(0)
                .toUpperCase() +
                p.slice(1)}
            </button>
          ))}

        </div>

        {/* CURRENCY */}
        <select
          value={currencyCode}
          onChange={async (e) => {
            const value =
              e.target.value

            const currencies = {
              NGN: "₦",
              USD: "$",
              GBP: "£",
              EUR: "€",
              KES: "KSh",
              GHS: "GH₵",
              ZAR: "R",
            }

            const symbol =
              currencies[
                value as keyof typeof currencies
              ] || "₦"

            setCurrencyCode(value)

            setCurrencySymbol(symbol)

            const factoryId =
              getFactoryId()

            if (factoryId) {
              await supabase
                .from("factories")
                .update({
                  currency_code:
                    value,
                  currency_symbol:
                    symbol,
                })
                .eq(
                  "id",
                  factoryId
                )
            }
          }}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm"
        >
          <option value="NGN">
            ₦ NGN
          </option>

          <option value="USD">
            $ USD
          </option>

          <option value="GBP">
            £ GBP
          </option>

          <option value="EUR">
            € EUR
          </option>

          <option value="KES">
            KSh KES
          </option>

          <option value="GHS">
            GH₵ GHS
          </option>

          <option value="ZAR">
            R ZAR
          </option>

        </select>

      </div>

      {/* PRIMARY CARD */}
      <div className="bg-[#0d1b3e] text-white rounded-2xl p-5 shadow-md">

        <p className="text-xs opacity-70">
          {factoryName || "Factory"} Overview
        </p>

        <p className="text-3xl font-bold mt-3">
          {formatCurrency(
            profit,
            currencyCode,
            currencySymbol
          )}
        </p>

        <p className="text-xs mt-1 opacity-80">
          {profit > 0 &&
            "Profit — Business is growing"}

          {profit < 0 &&
            "Loss — Business is declining"}

          {profit === 0 &&
            "Break-even"}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

          <div>
            <p className="opacity-70">
              Sales
            </p>

            <p className="font-semibold">
              {formatCurrency(
                data.sales,
                currencyCode,
                currencySymbol
              )}
            </p>
          </div>

          <div>
            <p className="opacity-70">
              Operational Costs
            </p>

            <p className="font-semibold">
              {formatCurrency(
                data.costs,
                currencyCode,
                currencySymbol
              )}
            </p>
          </div>

          <div>
            <p className="opacity-70">
              Debt Exposure
            </p>

            <p className="font-semibold">
              {formatCurrency(
                data.debt,
                currencyCode,
                currencySymbol
              )}
            </p>
          </div>

          <div>
            <p className="opacity-70">
              Net Cash Profit
            </p>

            <p
              className={
                netCashProfit < 0
                  ? "text-red-400"
                  : "text-green-300"
              }
            >
              {formatCurrency(
                netCashProfit,
                currencyCode,
                currencySymbol
              )}
            </p>
          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-3">

        <button
          onClick={() =>
            setActiveTab(
              "expenses"
            )
          }
          className="bg-blue-600 text-white p-3 rounded-xl flex gap-2"
        >
          <Wallet size={16} />
          Add Cost
        </button>

        <button
          onClick={() =>
            setActiveTab("sales")
          }
          className="bg-blue-50 p-3 rounded-xl flex gap-2"
        >
          <ShoppingCart size={16} />
          Add Sale
        </button>

        <button
          onClick={() =>
            setActiveTab(
              "production"
            )
          }
          className="bg-blue-50 p-3 rounded-xl flex gap-2"
        >
          <Factory size={16} />
          Production
        </button>

        <button
          onClick={() =>
            setActiveTab(
              "reports"
            )
          }
          className="bg-orange-50 p-3 rounded-xl flex gap-2"
        >
          <BarChart3 size={16} />
          Reports
        </button>

      </div>

      {/* SNAPSHOT */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Profit</span>

          <span>
            {formatCurrency(
              profit,
              currencyCode,
              currencySymbol
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Debt Exposure</span>

          <span className="text-red-600">
            {formatCurrency(
              data.debt,
              currencyCode,
              currencySymbol
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Production</span>

          <span>
            {data.production} bags
          </span>
        </div>

        <div className="flex justify-between">
          <span>Available Stock</span>

          <span>
            {data.stock} bags
          </span>
        </div>

      </div>

      {/* PRO INSIGHTS */}
      {isPremium && (
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">

          {alerts.map((a, i) => (
            <div
              key={i}
              className="text-red-600"
            >
              {a}
            </div>
          ))}

          {insights.map(
            (i, index) => (
              <div
                key={index}
                className="text-green-600"
              >
                {i}
              </div>
            )
          )}

        </div>
      )}

    </div>
  )
}