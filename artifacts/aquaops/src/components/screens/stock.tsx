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

export function StockScreen() {
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