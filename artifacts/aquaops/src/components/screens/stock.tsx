import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { Archive, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StockData {
  sachetProduced: number
  sachetSold: number
  bottleProduced: number
  bottleSold: number
  todaySachetProduced: number
  todayBottleProduced: number
  todaySachetSold: number
  todayBottleSold: number
}

export function StockScreen() {import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { getCurrentFactory } from "@/lib/current-factory"
import {
  Archive, TrendingUp, TrendingDown,
  Minus, Package, ShoppingCart, Wallet,
  ChevronRight,
} from "lucide-react"

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function dayLabel(dateStr: string) {
  const today = new Date().toISOString().split("T")[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
  if (dateStr === today) return "Today"
  if (dateStr === yesterday) return "Yesterday"
  return new Date(dateStr).toLocaleDateString([], { month: "short", day: "numeric" })
}

function nDaysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n + 1)
  return d.toISOString().split("T")[0]
}

// ─── MOVEMENT CARD ───────────────────────────────────────────────────────────

function MovementCard({
  label, value, unit, color,
}: { label: string; value: number; unit: string; color: string }) {
  const Icon = value > 0 ? TrendingUp : value < 0 ? TrendingDown : Minus
  const textColor = value > 0 ? "text-green-600" : value < 0 ? "text-red-500" : "text-gray-400"
  return (
    <div className={`rounded-2xl p-3 ${color}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 bg-white bg-opacity-60`}>
        <Icon size={16} className={textColor} />
      </div>
      <p className="text-xs text-gray-500 leading-tight">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${textColor}`}>{value.toLocaleString()}</p>
      <p className="text-[10px] text-gray-400">{unit}</p>
    </div>
  )
}

// ─── OWNER STOCK SCREEN ───────────────────────────────────────────────────────

function OwnerStockScreen() {
  const [loading, setLoading] = useState(true)
  const [sachetProduced, setSachetProduced] = useState(0)
  const [sachetSold, setSachetSold] = useState(0)
  const [bottleProduced, setBottleProduced] = useState(0)
  const [bottleSold, setBottleSold] = useState(0)
  const [todaySachetProd, setTodaySachetProd] = useState(0)
  const [todaySachetSold, setTodaySachetSold] = useState(0)
  const [todayBottleProd, setTodayBottleProd] = useState(0)
  const [todayBottleSold, setTodayBottleSold] = useState(0)

  useEffect(() => { load() }, [])

  const load = async () => {
    if (!supabase) return
    try {
      setLoading(true)
      const factoryId = await getFactoryId()
      if (!factoryId) return
      const today = new Date().toISOString().split("T")[0]
      const sum = (rows: any[], type: string, col: string) =>
        (rows || []).filter((r) => r.product_type === type).reduce((a, r) => a + (Number(r[col]) || 0), 0)
      const [{ data: prod }, { data: sold }, { data: tp }, { data: ts }] = await Promise.all([
        supabase.from("production").select("product_type,bags_produced").eq("factory_id", factoryId),
        supabase.from("sales").select("product_type,bags_sold").eq("factory_id", factoryId),
        supabase.from("production").select("product_type,bags_produced").eq("factory_id", factoryId).eq("date", today),
        supabase.from("sales").select("product_type,bags_sold").eq("factory_id", factoryId).eq("date", today),
      ])
      setSachetProduced(sum(prod, "sachet", "bags_produced"))
      setSachetSold(sum(sold, "sachet", "bags_sold"))
      setBottleProduced(sum(prod, "bottle", "bags_produced"))
      setBottleSold(sum(sold, "bottle", "bags_sold"))
      setTodaySachetProd(sum(tp, "sachet", "bags_produced"))
      setTodaySachetSold(sum(ts, "sachet", "bags_sold"))
      setTodayBottleProd(sum(tp, "bottle", "bags_produced"))
      setTodayBottleSold(sum(ts, "bottle", "bags_sold"))
    } finally { setLoading(false) }
  }

  const sachetBal = sachetProduced - sachetSold
  const bottleBal = bottleProduced - bottleSold

  if (loading) return <div className="p-6 text-center text-gray-400 text-sm">Loading stock...</div>

  return (
    <div className="p-4 space-y-5 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">Stock</h1>
        <p className="text-sm text-gray-500 mt-1">Current inventory balance</p>
      </div>

      {/* BALANCE */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Sachets in Stock", value: sachetBal, unit: "bags", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Bottles in Stock", value: bottleBal, unit: "crates", color: "text-teal-600", bg: "bg-teal-50" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-2`}>
              <Archive size={20} className={item.color} />
            </div>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className={`text-3xl font-bold ${item.value < 0 ? "text-red-500" : item.color}`}>
              {item.value.toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400">{item.unit}</p>
          </div>
        ))}
      </div>

      {/* TODAY MOVEMENT */}
      <div>
        <p className="text-sm font-bold text-[#0d1b3e] mb-3">Today's Movement</p>
        <div className="grid grid-cols-2 gap-3">
          <MovementCard label="Sachets Produced" value={todaySachetProd} unit="bags" color="bg-green-50" />
          <MovementCard label="Sachets Sold" value={todaySachetSold} unit="bags" color="bg-red-50" />
          <MovementCard label="Sachet Net" value={todaySachetProd - todaySachetSold} unit="bags" color="bg-purple-50" />
          <MovementCard label="Bottle Net" value={todayBottleProd - todayBottleSold} unit="crates" color="bg-amber-50" />
        </div>
      </div>

      {/* ALL-TIME */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">All-Time Summary</p>
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
          {[
            ["Total sachets produced", `${sachetProduced.toLocaleString()} bags`],
            ["Total sachets sold", `${sachetSold.toLocaleString()} bags`],
            ["Total bottles produced", `${bottleProduced.toLocaleString()} crates`],
            ["Total bottles sold", `${bottleSold.toLocaleString()} crates`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-sm font-semibold text-[#0d1b3e]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── DATA ENTRY STOCK SCREEN ──────────────────────────────────────────────────

type Filter = "today" | "7days"

interface RecentProd  { id: string; created_at: string; date: string; product_type: string; bags_produced: number }
interface RecentSale  { id: string; created_at: string; date: string; product_type: string; bags_sold: number; amount_paid: number }
interface RecentExp   { id: string; created_at: string; date: string; amount: number; category: string }

function DataEntryStockScreen({
  setActiveTab,
}: {
  setActiveTab?: (tab: string) => void
}) {
  const [filter, setFilter] = useState<Filter>("today")
  const [loading, setLoading] = useState(true)

  // balances (always all-time)
  const [sachetBal, setSachetBal] = useState(0)
  const [bottleBal, setBottleBal] = useState(0)

  // movement (filtered)
  const [sachetProd, setSachetProd] = useState(0)
  const [sachetSold, setSachetSold] = useState(0)
  const [bottleProd, setBottleProd] = useState(0)
  const [bottleSold, setBottleSold] = useState(0)

  // recent entries
  const [recentProd, setRecentProd] = useState<RecentProd[]>([])
  const [recentSales, setRecentSales] = useState<RecentSale[]>([])
  const [recentExp, setRecentExp] = useState<RecentExp[]>([])

  useEffect(() => { load() }, [filter])

  const load = async () => {
    if (!supabase) return
    try {
      setLoading(true)
      const factoryId = await getFactoryId()
      if (!factoryId) return

      const today = new Date().toISOString().split("T")[0]
      const fromDate = filter === "today" ? today : nDaysAgo(7)

      const sum = (rows: any[], type: string, col: string) =>
        (rows || []).filter((r) => r.product_type === type).reduce((a, r) => a + (Number(r[col]) || 0), 0)

      const [
        { data: allProd },
        { data: allSold },
        { data: filtProd },
        { data: filtSold },
        { data: rProd },
        { data: rSales },
        { data: rExp },
      ] = await Promise.all([
        supabase.from("production").select("product_type,bags_produced").eq("factory_id", factoryId),
        supabase.from("sales").select("product_type,bags_sold").eq("factory_id", factoryId),
        supabase.from("production").select("product_type,bags_produced").eq("factory_id", factoryId).gte("date", fromDate),
        supabase.from("sales").select("product_type,bags_sold").eq("factory_id", factoryId).gte("date", fromDate),
        supabase.from("production").select("id,created_at,date,product_type,bags_produced").eq("factory_id", factoryId).gte("date", fromDate).order("created_at", { ascending: false }).limit(5),
        supabase.from("sales").select("id,created_at,date,product_type,bags_sold,amount_paid").eq("factory_id", factoryId).gte("date", fromDate).order("created_at", { ascending: false }).limit(5),
        supabase.from("expenses").select("id,created_at,date,amount,category").eq("factory_id", factoryId).gte("date", fromDate).order("created_at", { ascending: false }).limit(5),
      ])

      setSachetBal(sum(allProd, "sachet", "bags_produced") - sum(allSold, "sachet", "bags_sold"))
      setBottleBal(sum(allProd, "bottle", "bags_produced") - sum(allSold, "bottle", "bags_sold"))
      setSachetProd(sum(filtProd, "sachet", "bags_produced"))
      setSachetSold(sum(filtSold, "sachet", "bags_sold"))
      setBottleProd(sum(filtProd, "bottle", "bags_produced"))
      setBottleSold(sum(filtSold, "bottle", "bags_sold"))
      setRecentProd((rProd as RecentProd[]) || [])
      setRecentSales((rSales as RecentSale[]) || [])
      setRecentExp((rExp as RecentExp[]) || [])
    } finally { setLoading(false) }
  }

  const filterLabel = filter === "today" ? "Today" : "Last 7 Days"

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1b3e]">Stock</h1>
          <p className="text-xs text-gray-400 mt-0.5">Current inventory balance and recent activity</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setFilter("today")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition ${
              filter === "today"
                ? "bg-[#2563eb] text-white shadow-sm"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            <span>📅</span> Today
          </button>
          <button
            onClick={() => setFilter("7days")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition ${
              filter === "7days"
                ? "bg-[#2563eb] text-white shadow-sm"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            <span>📅</span> Last 7 Days
          </button>
        </div>
      </div>

      {/* BALANCE CARDS */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
            <Archive size={20} className="text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Sachets in Stock</p>
          <p className={`text-3xl font-bold ${sachetBal < 0 ? "text-red-500" : "text-[#0d1b3e]"}`}>
            {sachetBal.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-400 mb-2">bags</p>
          <p className="text-xs text-blue-500 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> Available sachets
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-3">
            <Archive size={20} className="text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Bottles in Stock</p>
          <p className={`text-3xl font-bold ${bottleBal < 0 ? "text-red-500" : "text-[#0d1b3e]"}`}>
            {bottleBal.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-400 mb-2">crates</p>
          <p className="text-xs text-green-500 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> Available bottles
          </p>
        </div>
      </div>

      {/* MOVEMENT */}
      {loading ? (
        <div className="text-center text-xs text-gray-400 py-4">Loading...</div>
      ) : (
        <>
          <div>
            <p className="text-sm font-bold text-[#0d1b3e] mb-3">
              {filterLabel === "Today" ? "Today's Movement" : "Last 7 Days Movement"}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <MovementCard label="Sachets Produced" value={sachetProd} unit="bags" color="bg-green-50" />
              <MovementCard label="Sachets Sold" value={sachetSold} unit="bags" color="bg-red-50" />
              <MovementCard label="Sachet Net Movement" value={sachetProd - sachetSold} unit="bags" color="bg-purple-50" />
              <MovementCard label="Bottles Net Movement" value={bottleProd - bottleSold} unit="crates" color="bg-amber-50" />
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-[#0d1b3e]">Recent Activity</p>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">

              {/* PRODUCTION */}
              <div className="min-w-[200px] bg-green-50 rounded-2xl p-3 flex flex-col shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package size={14} className="text-green-600" />
                  </div>
                  <p className="text-xs font-bold text-green-800">Recent Production</p>
                </div>

                <div className="space-y-2 flex-1">
                  {recentProd.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-2">No entries</p>
                  ) : (
                    recentProd.map((r) => (
                      <div key={r.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                            <Package size={11} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-gray-700">{formatTime(r.created_at)}</p>
                            <p className="text-[9px] text-gray-400">{dayLabel(r.date)}</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-green-700">{r.bags_produced} bags</p>
                      </div>
                    ))
                  )}
                </div>

                {setActiveTab && (
                  <button
                    onClick={() => setActiveTab("production")}
                    className="flex items-center gap-1 text-[10px] text-green-700 font-semibold mt-3 pt-2 border-t border-green-100"
                  >
                    View all production <ChevronRight size={10} />
                  </button>
                )}
              </div>

              {/* SALES */}
              <div className="min-w-[200px] bg-red-50 rounded-2xl p-3 flex flex-col shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart size={14} className="text-red-600" />
                  </div>
                  <p className="text-xs font-bold text-red-800">Recent Sales</p>
                </div>

                <div className="space-y-2 flex-1">
                  {recentSales.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-2">No entries</p>
                  ) : (
                    recentSales.map((r) => (
                      <div key={r.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                            <ShoppingCart size={11} className="text-red-500" />
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-gray-700">{formatTime(r.created_at)}</p>
                            <p className="text-[9px] text-gray-400">{dayLabel(r.date)}</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-red-600">{r.bags_sold} bags</p>
                      </div>
                    ))
                  )}
                </div>

                {setActiveTab && (
                  <button
                    onClick={() => setActiveTab("sales")}
                    className="flex items-center gap-1 text-[10px] text-red-600 font-semibold mt-3 pt-2 border-t border-red-100"
                  >
                    View all sales <ChevronRight size={10} />
                  </button>
                )}
              </div>

              {/* EXPENSES */}
              <div className="min-w-[200px] bg-purple-50 rounded-2xl p-3 flex flex-col shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Wallet size={14} className="text-purple-600" />
                  </div>
                  <p className="text-xs font-bold text-purple-800">Recent Expenses</p>
                </div>

                <div className="space-y-2 flex-1">
                  {recentExp.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-2">No entries</p>
                  ) : (
                    recentExp.map((r) => (
                      <div key={r.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                            <Wallet size={11} className="text-purple-600" />
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-gray-700">{formatTime(r.created_at)}</p>
                            <p className="text-[9px] text-gray-400">{dayLabel(r.date)}</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-purple-700">₦{Number(r.amount).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>

                {setActiveTab && (
                  <button
                    onClick={() => setActiveTab("expenses")}
                    className="flex items-center gap-1 text-[10px] text-purple-700 font-semibold mt-3 pt-2 border-t border-purple-100"
                  >
                    View all expenses <ChevronRight size={10} />
                  </button>
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export function StockScreen({
  setActiveTab,
}: {
  setActiveTab?: (tab: string) => void
}) {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    getCurrentFactory().then((f) => setRole(f?.role ?? "owner"))
  }, [])

  if (role === null) return <div className="p-6 text-center text-gray-400 text-sm">Loading...</div>

  if (role === "data_entry") return <DataEntryStockScreen setActiveTab={setActiveTab} />

  return <OwnerStockScreen />
}
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<StockData>({
    sachetProduced: 0,
    sachetSold: 0,
    bottleProduced: 0,
    bottleSold: 0,
    todaySachetProduced: 0,
    todayBottleProduced: 0,
    todaySachetSold: 0,
    todayBottleSold: 0,
  })

  useEffect(() => {
    loadStock()
  }, [])

  const loadStock = async () => {
    if (!supabase) return
    try {
      setLoading(true)
      const factoryId = await getFactoryId()
      if (!factoryId) return

      const today = new Date().toISOString().split("T")[0]

      const [
        { data: prod },
        { data: sold },
        { data: todayProd },
        { data: todaySold },
      ] = await Promise.all([
        supabase
          .from("production")
          .select("product_type, bags_produced")
          .eq("factory_id", factoryId),
        supabase
          .from("sales")
          .select("product_type, bags_sold")
          .eq("factory_id", factoryId),
        supabase
          .from("production")
          .select("product_type, bags_produced")
          .eq("factory_id", factoryId)
          .eq("date", today),
        supabase
          .from("sales")
          .select("product_type, bags_sold")
          .eq("factory_id", factoryId)
          .eq("date", today),
      ])

      const sum = (rows: any[], type: string, col: string) =>
        (rows || [])
          .filter((r) => r.product_type === type)
          .reduce((acc, r) => acc + (Number(r[col]) || 0), 0)

      setData({
        sachetProduced:       sum(prod || [], "sachet", "bags_produced"),
        sachetSold:           sum(sold || [], "sachet", "bags_sold"),
        bottleProduced:       sum(prod || [], "bottle", "bags_produced"),
        bottleSold:           sum(sold || [], "bottle", "bags_sold"),
        todaySachetProduced:  sum(todayProd || [], "sachet", "bags_produced"),
        todayBottleProduced:  sum(todayProd || [], "bottle", "bags_produced"),
        todaySachetSold:      sum(todaySold || [], "sachet", "bags_sold"),
        todayBottleSold:      sum(todaySold || [], "bottle", "bags_sold"),
      })
    } catch (err) {
      console.error("StockScreen error:", err)
    } finally {
      setLoading(false)
    }
  }

  const sachetBalance = data.sachetProduced - data.sachetSold
  const bottleBalance = data.bottleProduced - data.bottleSold
  const todaySachetNet = data.todaySachetProduced - data.todaySachetSold
  const todayBottleNet = data.todayBottleProduced - data.todayBottleSold

  const MovementBadge = ({ value }: { value: number }) => {
    if (value > 0) return (
      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
        <TrendingUp size={12} /> +{value}
      </span>
    )
    if (value < 0) return (
      <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
        <TrendingDown size={12} /> {value}
      </span>
    )
    return (
      <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
        <Minus size={12} /> 0
      </span>
    )
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm">
        Loading stock...
      </div>
    )
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">Stock</h1>
        <p className="text-sm text-gray-500 mt-1">Current inventory balance</p>
      </div>

      {/* BALANCE CARDS */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Current Balance
        </h2>

        {/* SACHET */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Archive size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0d1b3e]">Sachets</p>
                <p className="text-xs text-gray-400">bags in stock</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold ${sachetBalance < 0 ? "text-red-500" : "text-[#0d1b3e]"}`}>
                {sachetBalance.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400">bags</p>
            </div>
          </div>
        </div>

        {/* BOTTLE */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <Archive size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0d1b3e]">Bottles</p>
                <p className="text-xs text-gray-400">crates in stock</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold ${bottleBalance < 0 ? "text-red-500" : "text-[#0d1b3e]"}`}>
                {bottleBalance.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400">crates</p>
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S MOVEMENT */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Today's Movement
        </h2>

        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">

          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <p className="text-sm text-gray-600">Sachets produced</p>
            <p className="text-sm font-semibold text-[#0d1b3e]">{data.todaySachetProduced.toLocaleString()} bags</p>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <p className="text-sm text-gray-600">Sachets sold</p>
            <p className="text-sm font-semibold text-[#0d1b3e]">{data.todaySachetSold.toLocaleString()} bags</p>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <p className="text-sm text-gray-600">Sachet net movement</p>
            <MovementBadge value={todaySachetNet} />
          </div>

          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <p className="text-sm text-gray-600">Bottles produced</p>
            <p className="text-sm font-semibold text-[#0d1b3e]">{data.todayBottleProduced.toLocaleString()} crates</p>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <p className="text-sm text-gray-600">Bottles sold</p>
            <p className="text-sm font-semibold text-[#0d1b3e]">{data.todayBottleSold.toLocaleString()} crates</p>
          </div>

          <div className="flex items-center justify-between py-1">
            <p className="text-sm text-gray-600">Bottle net movement</p>
            <MovementBadge value={todayBottleNet} />
          </div>

        </div>
      </div>

      {/* TOTALS SUMMARY */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          All-Time Summary
        </h2>

        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <p className="text-sm text-gray-600">Total sachets produced</p>
            <p className="text-sm font-semibold text-[#0d1b3e]">{data.sachetProduced.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <p className="text-sm text-gray-600">Total sachets sold</p>
            <p className="text-sm font-semibold text-[#0d1b3e]">{data.sachetSold.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <p className="text-sm text-gray-600">Total bottles produced</p>
            <p className="text-sm font-semibold text-[#0d1b3e]">{data.bottleProduced.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between py-1">
            <p className="text-sm text-gray-600">Total bottles sold</p>
            <p className="text-sm font-semibold text-[#0d1b3e]">{data.bottleSold.toLocaleString()}</p>
          </div>
        </div>
      </div>

    </div>
  )
}