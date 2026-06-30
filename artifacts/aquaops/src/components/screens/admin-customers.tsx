import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Customer = {
  factory_id: string
  factory_name: string
  user_id: string
  status: string
  plan: string
  expires_at: string
  started_at: string
  signup_date: string
  billing_cycle?: string
  trial_state?: string
}

export function AdminCustomers() {
  const [loading, setLoading]             = useState(true)
  const [customers, setCustomers]         = useState<Customer[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [tab, setTab]                     = useState<"all" | "active" | "trial" | "suspended" | "archived">("all")

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      const { data: customerData } = await supabase
        .from("saas_customers")
        .select("*")
        .order("signup_date", { ascending: false })

      setCustomers(customerData || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ── STATUS ACTIONS ────────────────────────────────────────────────────────

  const updateStatus = async (
    customer: Customer,
    saasStatus: string,
    factoryStatus: string
  ) => {
    const key = `${customer.factory_id}-${saasStatus}`
    setActionLoading(key)
    try {
      await supabase
        .from("saas_customers")
        .update({ status: saasStatus })
        .eq("factory_id", customer.factory_id)

      await supabase
        .from("factories")
        .update({ status: factoryStatus })
        .eq("id", customer.factory_id)

      await loadCustomers()
    } catch (err) {
      console.error(err)
      alert("Action failed. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  const handleActivate = (c: Customer) => updateStatus(c, "Active",    "active")
  const handleSuspend  = (c: Customer) => updateStatus(c, "Suspended", "suspended")
  const handleArchive  = (c: Customer) => updateStatus(c, "Archived",  "archived")

  const isActing = (factoryId: string, action: string) =>
    actionLoading === `${factoryId}-${action}`

  // ── COMPUTED ──────────────────────────────────────────────────────────────

  const counts = {
    all:       customers.filter((c) => c.status !== "Archived").length,
    active:    customers.filter((c) => c.status === "Active").length,
    trial:     customers.filter((c) => c.status === "Trial").length,
    suspended: customers.filter((c) => c.status === "Suspended").length,
    archived:  customers.filter((c) => c.status === "Archived").length,
  }

  const filtered =
    tab === "all"
      ? customers.filter((c) => c.status !== "Archived")
      : customers.filter((c) => c.status.toLowerCase() === tab)

  const activeCustomers    = counts.active
  const trialCustomers     = counts.trial
  const suspendedCustomers = counts.suspended

  // ── LOADING ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm">
        Loading customers…
      </div>
    )
  }

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">
          Customers
        </h1>
        <p className="text-sm text-gray-500">
          AquaOps Customer Management
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-3">

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-[#0d1b3e]">
            {customers.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {activeCustomers}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Trial</p>
          <p className="text-2xl font-bold text-blue-600">
            {trialCustomers}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Suspended</p>
          <p className="text-2xl font-bold text-red-600">
            {suspendedCustomers}
          </p>
        </div>

      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["all", "active", "trial", "suspended", "archived"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
              tab === t
                ? "bg-[#2563eb] text-white"
                : "bg-white border border-gray-200 text-gray-600"
            }`}
          >
            {t}{counts[t] > 0 ? ` (${counts[t]})` : ""}
          </button>
        ))}
      </div>

      {/* CUSTOMER LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-sm">
          No customers in this category.
        </div>
      ) : (
        <div className="space-y-3">

          {filtered.map((customer, index) => (
            <div
              key={`${customer.factory_id}-${index}`}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >

              {/* CUSTOMER HEADER */}
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-lg text-[#0d1b3e]">
                    {customer.factory_name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Joined{" "}
                    {new Date(customer.signup_date).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    customer.status === "Active"    ? "bg-green-100 text-green-700"  :
                    customer.status === "Suspended" ? "bg-red-100 text-red-700"     :
                    customer.status === "Archived"  ? "bg-gray-100 text-gray-500"   :
                                                      "bg-blue-100 text-blue-700"
                  }`}
                >
                  {customer.status}
                </span>

              </div>

              {/* CUSTOMER DETAILS */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                <div>
                  <p className="text-gray-500">Plan</p>
                  <p className="font-medium">{customer.plan || "—"}</p>
                </div>

                <div>
                  <p className="text-gray-500">Trial Status</p>
                  <p className="font-medium">{customer.trial_state || "—"}</p>
                </div>

                <div>
                  <p className="text-gray-500">Started</p>
                  <p className="font-medium">
                    {customer.started_at
                      ? new Date(customer.started_at).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Expiry</p>
                  <p className="font-medium">
                    {customer.expires_at
                      ? new Date(customer.expires_at).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">

                {customer.status !== "Active" && customer.status !== "Archived" && (
                  <button
                    onClick={() => handleActivate(customer)}
                    disabled={!!actionLoading}
                    className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-semibold border border-green-100 disabled:opacity-50"
                  >
                    {isActing(customer.factory_id, "Active") ? "…" : "✅ Activate"}
                  </button>
                )}

                {customer.status !== "Suspended" && customer.status !== "Archived" && (
                  <button
                    onClick={() => handleSuspend(customer)}
                    disabled={!!actionLoading}
                    className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100 disabled:opacity-50"
                  >
                    {isActing(customer.factory_id, "Suspended") ? "…" : "🚫 Suspend"}
                  </button>
                )}

                {customer.status !== "Archived" && (
                  <button
                    onClick={() => handleArchive(customer)}
                    disabled={!!actionLoading}
                    className="flex-1 py-2 bg-gray-50 text-gray-500 rounded-lg text-xs font-semibold border border-gray-100 disabled:opacity-50"
                  >
                    {isActing(customer.factory_id, "Archived") ? "…" : "📦 Archive"}
                  </button>
                )}

                {customer.status === "Archived" && (
                  <button
                    onClick={() => handleActivate(customer)}
                    disabled={!!actionLoading}
                    className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-semibold border border-green-100 disabled:opacity-50"
                  >
                    {isActing(customer.factory_id, "Active") ? "…" : "♻️ Restore"}
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}