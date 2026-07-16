import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type CustomerSource =
  | "walk_in"
  | "driver_referral"
  | "association_referral"
  | "existing_customer_referral"
  | "sales_team"
  | "other"

export type CustomerType =
  | "retail_shop"
  | "distributor"
  | "hotel"
  | "restaurant"
  | "office"
  | "school"
  | "hospital"
  | "household"
  | "other"

export type DormancyStatus = "new" | "active" | "cooling" | "dormant" | "lost"

export interface Customer {
  id: string
  factory_id: string
  factory_code: string
  universal_id: string | null
  name: string
  phone: string | null
  area: string | null
  address: string | null
  gps_lat: number | null
  gps_lng: number | null
  location_source: string | null
  location_updated_at: string | null
  customer_source: CustomerSource
  customer_type: CustomerType
  notes: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  dormancy_status?: DormancyStatus
  balance?: number
  last_sale_date?: string | null
}

export interface CustomerPayload {
  name: string
  phone?: string
  area?: string
  address?: string
  customer_source: CustomerSource
  customer_type: CustomerType
  notes?: string
  gps_lat?: number | null
  gps_lng?: number | null
  location_source?: string | null
  location_updated_at?: string | null
}

// ─── LABEL MAPS ───────────────────────────────────────────────────────────────

export const CUSTOMER_SOURCE_LABELS: Record<CustomerSource, string> = {
  walk_in: "Walk-in",
  driver_referral: "Driver Referral",
  association_referral: "Association Referral",
  existing_customer_referral: "Existing Customer Referral",
  sales_team: "Sales Team",
  other: "Other",
}

export const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  retail_shop: "Retail Shop",
  distributor: "Distributor",
  hotel: "Hotel",
  restaurant: "Restaurant",
  office: "Office",
  school: "School",
  hospital: "Hospital",
  household: "Household",
  other: "Other",
}

// ─── DORMANCY ─────────────────────────────────────────────────────────────────

export function getDormancyStatus(
  lastSaleDate: string | null | undefined
): DormancyStatus {
  if (!lastSaleDate) return "new"
  const days = Math.floor(
    (Date.now() - new Date(lastSaleDate).getTime()) / 86_400_000
  )
  if (days <= 7) return "active"
  if (days <= 14) return "cooling"
  if (days <= 30) return "dormant"
  return "lost"
}

export function dormancyColor(status: DormancyStatus): string {
  switch (status) {
    case "active":  return "bg-green-500"
    case "cooling": return "bg-yellow-400"
    case "dormant": return "bg-orange-400"
    case "lost":    return "bg-red-500"
    default:        return "bg-gray-300"
  }
}

export function dormancyLabel(status: DormancyStatus): string {
  switch (status) {
    case "active":  return "Active"
    case "cooling": return "Cooling"
    case "dormant": return "Dormant"
    case "lost":    return "Lost"
    default:        return "New"
  }
}

export function dormancyBadgeClass(status: DormancyStatus): string {
  switch (status) {
    case "active":  return "bg-green-100 text-green-700"
    case "cooling": return "bg-yellow-100 text-yellow-700"
    case "dormant": return "bg-orange-100 text-orange-700"
    case "lost":    return "bg-red-100 text-red-700"
    default:        return "bg-gray-100 text-gray-500"
  }
}

// ─── CURRENCY ─────────────────────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount)
}

// ─── SILENT GPS ───────────────────────────────────────────────────────────────

export async function captureLocation(): Promise<{
  lat: number
  lng: number
} | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) return null
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => resolve(null),
      { timeout: 5000, maximumAge: 60_000 }
    )
  })
}

// ─── ROLE ─────────────────────────────────────────────────────────────────────

export async function getCurrentUserRole(): Promise<string | null> {
  if (!supabase) return null
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const factoryId = await getFactoryId()
  if (!factoryId) return null
  const { data } = await supabase
    .from("factory_users")
    .select("role")
    .eq("user_id", user.id)
    .eq("factory_id", factoryId)
    .eq("is_active", true)
    .single()
  return data?.role ?? null
}

// ─── CODE GENERATION ──────────────────────────────────────────────────────────

async function generateCustomerCode(factoryId: string): Promise<string> {
  if (!supabase) throw new Error("Supabase not initialised")

  const { data: factory } = await supabase
    .from("factories")
    .select("customer_code_prefix")
    .eq("id", factoryId)
    .single()

  const prefix = factory?.customer_code_prefix ?? "AQF"

  const { data: seq, error } = await supabase.rpc(
    "increment_customer_sequence",
    { p_factory_id: factoryId }
  )

  if (error || seq == null) {
    const { count } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true })
      .eq("factory_id", factoryId)
    const fallbackSeq = (count ?? 0) + 1
    return `${prefix}-${String(fallbackSeq).padStart(4, "0")}`
  }

  return `${prefix}-${String(seq).padStart(4, "0")}`
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

export async function getCustomers(): Promise<Customer[]> {
  if (!supabase) return []
  const factoryId = await getFactoryId()
  if (!factoryId) return []

  const { data: customers, error } = await supabase
    .from("customers")
    .select("*")
    .eq("factory_id", factoryId)
    .eq("is_active", true)
    .order("name", { ascending: true })

  if (error || !customers) return []

  const { data: salesData } = await supabase
    .from("sales")
    .select("customer_id, date, balance")
    .eq("factory_id", factoryId)
    .not("customer_id", "is", null)

  const salesMap: Record<string, { lastDate: string; balance: number }> = {}
  for (const sale of salesData ?? []) {
    if (!sale.customer_id) continue
    if (!salesMap[sale.customer_id]) {
      salesMap[sale.customer_id] = { lastDate: sale.date, balance: 0 }
    }
    if (sale.date > salesMap[sale.customer_id].lastDate) {
      salesMap[sale.customer_id].lastDate = sale.date
    }
    salesMap[sale.customer_id].balance += Number(sale.balance ?? 0)
  }

  return customers.map((c) => {
    const info = salesMap[c.id]
    return {
      ...c,
      last_sale_date: info?.lastDate ?? null,
      balance: info?.balance ?? 0,
      dormancy_status: getDormancyStatus(info?.lastDate),
    }
  })
}

export async function getCustomer(id: string): Promise<Customer | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single()
  if (error) return null
  return data
}

export async function getCustomerSales(
  customerId: string,
  factoryId: string
): Promise<
  Array<{
    id: string
    date: string
    customer_name: string
    product_type: string
    bags_sold: number
    total_amount: number
    amount_paid: number
    balance: number
  }>
> {
  if (!supabase) return []
  const { data } = await supabase
    .from("sales")
    .select(
      "id, date, customer_name, product_type, bags_sold, total_amount, amount_paid, balance"
    )
    .eq("factory_id", factoryId)
    .eq("customer_id", customerId)
    .order("date", { ascending: false })
    .limit(20)
  return data ?? []
}

export async function createCustomer(
  payload: CustomerPayload
): Promise<Customer | null> {
  if (!supabase) return null
  const factoryId = await getFactoryId()
  if (!factoryId) return null

  const factory_code = await generateCustomerCode(factoryId)

  const { data, error } = await supabase
    .from("customers")
    .insert([{ factory_id: factoryId, factory_code, ...payload }])
    .select()
    .single()

  if (error) {
    console.error("createCustomer:", error)
    return null
  }
  return data
}

export async function updateCustomer(
  id: string,
  payload: Partial<CustomerPayload>
): Promise<Customer | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from("customers")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) {
    console.error("updateCustomer:", error)
    return null
  }
  return data
}

export async function deactivateCustomer(id: string): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase
    .from("customers")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", id)
  return !error
}

// ─── COVERAGE KPI ─────────────────────────────────────────────────────────────

export async function getCustomerCoverageKPI(factoryId: string): Promise<{
  registered: number
  servedThisMonth: number
  coveragePct: number
}> {
  if (!supabase) return { registered: 0, servedThisMonth: 0, coveragePct: 0 }

  const now = new Date()
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`

  const [regResult, servedResult] = await Promise.all([
    supabase
      .from("customers")
      .select("*", { count: "exact", head: true })
      .eq("factory_id", factoryId)
      .eq("is_active", true),
    supabase
      .from("sales")
      .select("customer_id")
      .eq("factory_id", factoryId)
      .not("customer_id", "is", null)
      .gte("date", monthStart),
  ])

  const registered = regResult.count ?? 0
  const uniqueIds = new Set(
    (servedResult.data ?? []).map((s: { customer_id: string }) => s.customer_id)
  )
  const servedThisMonth = uniqueIds.size
  const coveragePct =
    registered > 0 ? Math.round((servedThisMonth / registered) * 100) : 0

  return { registered, servedThisMonth, coveragePct }
}
