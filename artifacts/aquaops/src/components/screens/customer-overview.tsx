import { useState, useEffect, useCallback } from "react"
import {
  Users,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
} from "lucide-react"
import {
  type Customer,
  type DormancyStatus,
  getCustomers,
  getCustomerCoverageKPI,
  dormancyLabel,
  formatCurrency,
} from "@/lib/customers"
import { getFactoryId } from "@/lib/factory"

interface CustomerOverviewProps {
  onNavigateToRegistry: () => void
  onSelectCustomer: (c: Customer) => void
  refreshKey?: number
}

export function CustomerOverview({
  onNavigateToRegistry,
  onSelectCustomer,
  refreshKey = 0,
}: CustomerOverviewProps) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [kpi, setKpi] = useState({
    registered: 0,
    servedThisMonth: 0,
    coveragePct: 0,
  })
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const factoryId = await getFactoryId()
    const [data, coverage] = await Promise.all([
      getCustomers(),
      factoryId
        ? getCustomerCoverageKPI(factoryId)
        : Promise.resolve({ registered: 0, servedThisMonth: 0, coveragePct: 0 }),
    ])
    setCustomers(data)
    setKpi(coverage)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load, refreshKey])

  const counts = {
    active: customers.filter((c) => c.dormancy_status === "active").length,
    cooling: customers.filter((c) => c.dormancy_status === "cooling").length,
    dormant: customers.filter((c) => c.dormancy_status === "dormant").length,
    lost: customers.filter((c) => c.dormancy_status === "lost").length,
    new: customers.filter((c) => c.dormancy_status === "new").length,
  }

  const topDebtors = [...customers]
    .filter((c) => (c.balance ?? 0) > 0)
    .sort((a, b) => (b.balance ?? 0) - (a.balance ?? 0))
    .slice(0, 5)

  const totalOwing = customers.reduce((sum, c) => sum + (c.balance ?? 0), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <RefreshCw size={20} className="animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-3 p-3 pb-4">

      {/* TITLE */}
      <div className="pt-1">
        <h1 className="text-lg font-bold text-[#0d1b3e]">Customer Control</h1>
        <p className="text-xs text-gray-500">{kpi.registered} registered customers</p>
      </div>

      {/* COVERAGE KPI */}
      <div className="bg-[#0d1b3e] rounded-xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-blue-200 uppercase tracking-wide font-medium">
              Coverage This Month
            </p>
            <p className="text-3xl font-bold mt-0.5">{kpi.coveragePct}%</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <TrendingUp size={22} className="text-white" />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-blue-200 text-xs">Served</p>
            <p className="font-bold">{kpi.servedThisMonth}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-blue-200 text-xs">Registered</p>
            <p className="font-bold">{kpi.registered}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-blue-200 text-xs">Not Served</p>
            <p className="font-bold">{kpi.registered - kpi.servedThisMonth}</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-300 rounded-full transition-all"
            style={{ width: `${kpi.coveragePct}%` }}
          />
        </div>
      </div>

      {/* ACTIVITY BREAKDOWN */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Customer Activity
        </h2>
        <div className="grid grid-cols-4 gap-2">
          <ActivityCard
            label="Active"
            count={counts.active}
            dotClass="bg-green-500"
          />
          <ActivityCard
            label="Cooling"
            count={counts.cooling}
            dotClass="bg-yellow-400"
          />
          <ActivityCard
            label="Dormant"
            count={counts.dormant}
            dotClass="bg-orange-400"
          />
          <ActivityCard
            label="Lost"
            count={counts.lost}
            dotClass="bg-red-500"
          />
        </div>
        {counts.new > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
            <span>New (no sales yet)</span>
            <span className="font-medium text-[#0d1b3e]">{counts.new}</span>
          </div>
        )}
      </div>

      {/* DEBT SUMMARY */}
      {totalOwing > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Outstanding Debt
            </h2>
            <span className="text-xs font-bold text-red-600">
              {formatCurrency(totalOwing)}
            </span>
          </div>

          {topDebtors.length > 0 && (
            <div className="space-y-2">
              {topDebtors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCustomer(c)}
                  className="w-full flex items-center justify-between text-sm active:opacity-70 transition"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#eef0f5] flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-[#0d1b3e]">
                        {c.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-[#0d1b3e] font-medium truncate text-xs">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {c.area ?? c.factory_code}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs font-semibold text-red-600">
                      {formatCurrency(c.balance ?? 0)}
                    </span>
                    <ChevronRight size={12} className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ALERT: DORMANT + LOST */}
      {counts.dormant + counts.lost > 0 && (
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-700">
                {counts.dormant + counts.lost} customer
                {counts.dormant + counts.lost > 1 ? "s" : ""} at risk
              </p>
              <p className="text-xs text-orange-500 mt-0.5">
                {counts.dormant > 0 && `${counts.dormant} dormant`}
                {counts.dormant > 0 && counts.lost > 0 && ", "}
                {counts.lost > 0 && `${counts.lost} lost`}
                {" "}— contact them before they leave permanently.
              </p>
              <button
                onClick={onNavigateToRegistry}
                className="mt-2 text-xs font-medium text-orange-700 underline underline-offset-2"
              >
                View dormant customers →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {customers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#eef0f5] flex items-center justify-center mb-3">
            <Users size={24} className="text-[#0d1b3e]" />
          </div>
          <p className="text-sm font-semibold text-[#0d1b3e]">
            No customers registered yet
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Go to Registry to add your first customer
          </p>
          <button
            onClick={onNavigateToRegistry}
            className="mt-3 h-9 px-4 bg-[#0d1b3e] text-white rounded-lg text-xs font-medium"
          >
            Open Registry
          </button>
        </div>
      )}

    </div>
  )
}

function ActivityCard({
  label,
  count,
  dotClass,
}: {
  label: string
  count: number
  dotClass: string
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-2 text-center">
      <div
        className={`w-2 h-2 rounded-full mx-auto mb-1.5 ${dotClass}`}
      />
      <p className="text-lg font-bold text-[#0d1b3e]">{count}</p>
      <p className="text-[9px] text-gray-500 font-medium">{label}</p>
    </div>
  )
}
