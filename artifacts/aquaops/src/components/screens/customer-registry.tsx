import { useState, useEffect, useCallback } from "react"
import { Search, Plus, ChevronRight, RefreshCw } from "lucide-react"
import {
  type Customer,
  type DormancyStatus,
  getCustomers,
  dormancyColor,
  dormancyLabel,
  formatCurrency,
} from "@/lib/customers"

interface CustomerRegistryProps {
  onSelectCustomer: (c: Customer) => void
  onAddCustomer: () => void
  isOwner: boolean
  refreshKey?: number
}

type FilterTab = "all" | "active" | "cooling" | "dormant" | "owing"

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "cooling", label: "Cooling" },
  { id: "dormant", label: "Dormant" },
  { id: "owing", label: "Owing" },
]

export function CustomerRegistry({
  onSelectCustomer,
  onAddCustomer,
  isOwner,
  refreshKey = 0,
}: CustomerRegistryProps) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterTab>("all")

  const load = useCallback(async () => {
    setLoading(true)
    const data = await getCustomers()
    setCustomers(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load, refreshKey])

  const filtered = customers.filter((c) => {
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone ?? "").includes(search) ||
      (c.factory_code ?? "").toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "owing" && (c.balance ?? 0) > 0) ||
      (c.dormancy_status === filter)

    return matchesSearch && matchesFilter
  })

  const counts: Record<FilterTab, number> = {
    all: customers.length,
    active: customers.filter((c) => c.dormancy_status === "active").length,
    cooling: customers.filter((c) => c.dormancy_status === "cooling").length,
    dormant: customers.filter(
      (c) =>
        c.dormancy_status === "dormant" || c.dormancy_status === "lost"
    ).length,
    owing: customers.filter((c) => (c.balance ?? 0) > 0).length,
  }

  return (
    <div className="flex flex-col h-full">

      {/* SEARCH BAR */}
      <div className="px-3 pt-2 pb-2 bg-[#eef0f5]">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, phone or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 border border-gray-200 rounded-lg pl-9 pr-3 text-sm bg-white"
          />
        </div>
      </div>

      {/* FILTER CHIPS */}
      <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none bg-[#eef0f5]">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`shrink-0 h-7 px-3 rounded-full text-xs font-medium transition ${
              filter === tab.id
                ? "bg-[#0d1b3e] text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {tab.label}
            {counts[tab.id] > 0 && (
              <span
                className={`ml-1 ${
                  filter === tab.id ? "text-blue-200" : "text-gray-400"
                }`}
              >
                {counts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw size={20} className="animate-spin text-gray-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Search size={22} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              {customers.length === 0
                ? "No customers yet"
                : "No customers match your search"}
            </p>
            {customers.length === 0 && isOwner && (
              <p className="text-xs text-gray-400 mt-1">
                Tap + to register your first customer
              </p>
            )}
          </div>
        ) : (
          filtered.map((c) => (
            <CustomerRow
              key={c.id}
              customer={c}
              onClick={() => onSelectCustomer(c)}
            />
          ))
        )}
      </div>

      {/* FAB — owner only */}
      {isOwner && (
        <button
          onClick={onAddCustomer}
          className="absolute bottom-20 right-4 w-12 h-12 bg-[#2563eb] text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition"
          aria-label="Add customer"
        >
          <Plus size={22} />
        </button>
      )}

    </div>
  )
}

function CustomerRow({
  customer,
  onClick,
}: {
  customer: Customer
  onClick: () => void
}) {
  const status = customer.dormancy_status ?? "new"
  const balance = customer.balance ?? 0

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 active:scale-[0.99] transition text-left"
    >
      {/* DORMANCY DOT */}
      <div
        className={`w-2.5 h-2.5 rounded-full shrink-0 ${dormancyColor(status as DormancyStatus)}`}
      />

      {/* AVATAR */}
      <div className="w-9 h-9 rounded-full bg-[#eef0f5] flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-[#0d1b3e]">
          {customer.name.charAt(0).toUpperCase()}
        </span>
      </div>

      {/* DETAILS */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#0d1b3e] truncate">
            {customer.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] text-gray-400 font-mono">
            {customer.factory_code}
          </span>
          {customer.area && (
            <>
              <span className="text-gray-300">·</span>
              <span className="text-[10px] text-gray-400 truncate">
                {customer.area}
              </span>
            </>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        {balance > 0 && (
          <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
            {formatCurrency(balance)}
          </span>
        )}
        <span
          className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : status === "cooling"
              ? "bg-yellow-100 text-yellow-700"
              : status === "dormant"
              ? "bg-orange-100 text-orange-700"
              : status === "lost"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {dormancyLabel(status as DormancyStatus)}
        </span>
      </div>

      <ChevronRight size={14} className="text-gray-300 shrink-0" />
    </button>
  )
}
