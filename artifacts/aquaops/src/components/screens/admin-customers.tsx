import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, ChevronRight, AlertTriangle } from "lucide-react"

type Customer = {
  factory_id: string
  factory_name: string
  user_id: string
  status: string
  plan: string
  expires_at: string | null
  started_at: string | null
  signup_date: string | null
  billing_cycle: string | null
}

type FactorySummary = {
  totalSales: number
  totalExpenses: number
  totalProduction: number
  totalDebt: number
  totalLoans: number
}

const STATUS_COLORS: Record<string, string> = {
  active:    "bg-green-100 text-green-700",
  Active:    "bg-green-100 text-green-700",
  trial:     "bg-blue-100 text-blue-700",
  Trial:     "bg-blue-100 text-blue-700",
  suspended: "bg-red-100 text-red-700",
  expired:   "bg-orange-100 text-orange-600",
  Expired:   "bg-orange-100 text-orange-600",
  archived:  "bg-gray-100 text-gray-500",
}

const FILTER_TABS = ["all", "active", "trial", "suspended", "expired", "archived"]

// ─── MAIN LIST ──────────────────────────────────────────────────────────────

export function AdminCustomers() {
  const [loading, setLoading] = useState(true)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState<Customer | null>(null)

  useEffect(() => { loadCustomers() }, [])

  const loadCustomers = async () => {
    setLoading(true)
    try {
      const { data } = await supabase
        .from("saas_customers")
        .select("*")
        .order("signup_date", { ascending: false })
      setCustomers(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const countFor = (status: string) =>
    status === "all"
      ? customers.length
      : customers.filter((c) => c.status?.toLowerCase() === status).length

  const filteredCustomers = customers.filter((c) =>
    filter === "all" ? true : c.status?.toLowerCase() === filter
  )

  if (loading) {
    return <div className="p-6 text-sm text-gray-400">Loading customers…</div>
  }

  if (selected) {
    return (
      <CustomerDetail
        customer={selected}
        onBack={() => {
          setSelected(null)
          loadCustomers()
        }}
      />
    )
  }

  return (
    <div className="p-4 space-y-4 pb-24">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-[#0d1b3e]">Customer Management</h1>
        <p className="text-xs text-gray-500 mt-0.5">AquaOps SaaS Administration Console</p>
      </div>

      {/* SUMMARY GRID */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total",     value: customers.length,   color: "text-[#0d1b3e]"  },
          { label: "Active",    value: countFor("active"),  color: "text-green-600"  },
          { label: "Trial",     value: countFor("trial"),   color: "text-blue-600"   },
          { label: "Suspended", value: countFor("suspended"),color:"text-red-600"    },
          { label: "Expired",   value: countFor("expired"), color: "text-orange-500" },
          { label: "Archived",  value: countFor("archived"),color: "text-gray-400"   },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-3 shadow-sm text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
            <p className={`text-xl font-bold mt-0.5 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
              filter === tab
                ? "bg-[#0d1b3e] text-white"
                : "bg-white border border-gray-200 text-gray-600"
            }`}
          >
            {tab} ({countFor(tab)})
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {filteredCustomers.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center text-sm text-gray-400">
            No customers in this category.
          </div>
        )}
        {filteredCustomers.map((c, i) => (
          <button
            key={`${c.factory_id}-${i}`}
            onClick={() => setSelected(c)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm text-left flex items-center justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-[#0d1b3e]">{c.factory_name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize font-semibold ${
                  STATUS_COLORS[c.status] || "bg-gray-100 text-gray-600"
                }`}>
                  {c.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {c.plan || "No plan"} · Joined{" "}
                {c.signup_date ? new Date(c.signup_date).toLocaleDateString() : "—"}
              </p>
              {c.expires_at && (
                <p className="text-xs text-gray-400">
                  Expires: {new Date(c.expires_at).toLocaleDateString()}
                </p>
              )}
            </div>
            <ChevronRight size={16} className="text-gray-300 shrink-0 ml-3" />
          </button>
        ))}
      </div>

    </div>
  )
}

// ─── CUSTOMER DETAIL ────────────────────────────────────────────────────────

function CustomerDetail({
  customer,
  onBack,
}: {
  customer: Customer
  onBack: () => void
}) {
  const [summary, setSummary] = useState<FactorySummary>({
    totalSales: 0, totalExpenses: 0, totalProduction: 0, totalDebt: 0, totalLoans: 0,
  })
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [localStatus, setLocalStatus] = useState(customer.status)
  const [processing, setProcessing] = useState(false)

  const [modal, setModal] = useState<
    null | "suspend" | "activate" | "archive" | "extend-trial" | "change-plan" | "delete"
  >(null)

  const [trialDays, setTrialDays] = useState("7")
  const [customDays, setCustomDays] = useState("")
  const [newPlan, setNewPlan] = useState(customer.plan || "Standard Monthly")
  const [deleteText, setDeleteText] = useState("")

  useEffect(() => { loadSummary() }, [])

  const loadSummary = async () => {
    if (!customer.factory_id) { setSummaryLoading(false); return }
    try {
      const [salesRes, expsRes, prodRes, debtsRes, loansRes] = await Promise.all([
        supabase.from("sales").select("total_amount").eq("factory_id", customer.factory_id),
        supabase.from("expenses").select("amount").eq("factory_id", customer.factory_id),
        supabase.from("production").select("bags_produced").eq("factory_id", customer.factory_id),
        supabase.from("sales").select("balance").eq("factory_id", customer.factory_id).gt("balance", 0),
        supabase.from("loans").select("amount").eq("factory_id", customer.factory_id),
      ])
      setSummary({
        totalSales:      salesRes.data?.reduce((s, i) => s + Number(i.total_amount || 0), 0) || 0,
        totalExpenses:   expsRes.data?.reduce((s, i) => s + Number(i.amount || 0), 0) || 0,
        totalProduction: prodRes.data?.reduce((s, i) => s + Number(i.bags_produced || 0), 0) || 0,
        totalDebt:       debtsRes.data?.reduce((s, i) => s + Number(i.balance || 0), 0) || 0,
        totalLoans:      loansRes.data?.reduce((s, i) => s + Number(i.amount || 0), 0) || 0,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setSummaryLoading(false)
    }
  }

  const logAudit = async (eventType: string, description: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from("subscription_events").insert({
      event_type: eventType,
      description,
      user_id: user?.id,
    })
  }

  const updateStatus = async (newStatus: string) => {
    setProcessing(true)
    try {
      await supabase.from("factories").update({ status: newStatus }).eq("id", customer.factory_id)
      await supabase.from("saas_customers").update({ status: newStatus }).eq("factory_id", customer.factory_id)
      await logAudit(`admin_${newStatus}`, `Customer ${newStatus}: ${customer.factory_name}`)
      setLocalStatus(newStatus)
      setModal(null)
    } catch (err) {
      console.error(err)
    } finally {
      setProcessing(false)
    }
  }

  const handleExtendTrial = async () => {
    const days = trialDays === "custom" ? parseInt(customDays) : parseInt(trialDays)
    if (!days || isNaN(days) || days <= 0) return
    setProcessing(true)
    try {
      const base = customer.expires_at ? new Date(customer.expires_at) : new Date()
      base.setDate(base.getDate() + days)
      await supabase
        .from("saas_customers")
        .update({ expires_at: base.toISOString() })
        .eq("factory_id", customer.factory_id)
      await logAudit("trial_extended", `Trial extended by ${days} days for ${customer.factory_name}`)
      setModal(null)
    } catch (err) {
      console.error(err)
    } finally {
      setProcessing(false)
    }
  }

  const handleChangePlan = async () => {
    if (!newPlan) return
    setProcessing(true)
    try {
      await supabase
        .from("saas_customers")
        .update({ plan: newPlan })
        .eq("factory_id", customer.factory_id)
      await logAudit("plan_changed", `Plan changed to ${newPlan} for ${customer.factory_name}`)
      setModal(null)
    } catch (err) {
      console.error(err)
    } finally {
      setProcessing(false)
    }
  }

  const handlePermanentDelete = async () => {
    if (deleteText !== "DELETE") return
    setProcessing(true)
    try {
      const fid = customer.factory_id
      const uid = customer.user_id
      for (const [table, col] of [
        ["sales",               "factory_id"],
        ["expenses",            "factory_id"],
        ["production",          "factory_id"],
        ["production_losses",   "factory_id"],
        ["loans",               "factory_id"],
        ["bank_transactions",   "factory_id"],
      ] as const) {
        await supabase.from(table).delete().eq(col, fid)
      }
      for (const [table, col] of [
        ["payments",            "user_id"],
        ["subscription_events", "user_id"],
      ] as const) {
        await supabase.from(table).delete().eq(col, uid)
      }
      await supabase.from("saas_customers").delete().eq("factory_id", fid)
      await supabase.from("memberships").delete().eq("factory_id", fid)
      await supabase.from("factories").delete().eq("id", fid)
      onBack()
    } catch (err) {
      console.error(err)
    } finally {
      setProcessing(false)
    }
  }

  const fmt = (n: number) =>
    "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 0 })

  return (
    <div className="p-4 space-y-4 pb-24">

      {/* BACK */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#2563eb] font-semibold"
      >
        <ArrowLeft size={16} /> Back to Customers
      </button>

      {/* FACTORY INFO */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#0d1b3e] to-[#1e3a8a] text-white px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">{customer.factory_name}</h2>
              <p className="text-xs opacity-70 mt-0.5">Factory ID: {customer.factory_id?.slice(0, 8)}…</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${
              STATUS_COLORS[localStatus] || "bg-gray-100 text-gray-600"
            }`}>
              {localStatus}
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { label: "Current Plan",     value: customer.plan || "—"                                                             },
            { label: "Billing Cycle",    value: customer.billing_cycle || "—"                                                    },
            { label: "Signup Date",      value: customer.signup_date ? new Date(customer.signup_date).toLocaleDateString() : "—" },
            { label: "Subscription Start", value: customer.started_at ? new Date(customer.started_at).toLocaleDateString() : "—" },
            { label: "Expiry Date",      value: customer.expires_at ? new Date(customer.expires_at).toLocaleDateString() : "—"   },
            { label: "User ID",          value: customer.user_id?.slice(0, 16) + "…"                                            },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between px-4 py-2.5 text-sm">
              <span className="text-gray-500">{label}</span>
              <span className="font-medium text-[#0d1b3e] text-right max-w-[55%] truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BUSINESS SUMMARY */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <h3 className="font-bold text-[#0d1b3e] text-sm">Business Summary</h3>
          <p className="text-[11px] text-gray-400">All-time totals for this factory</p>
        </div>
        {summaryLoading ? (
          <div className="px-4 py-4 text-sm text-gray-400">Loading…</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {[
              { label: "Total Sales",         value: fmt(summary.totalSales),      color: "text-[#0d1b3e]"  },
              { label: "Total Expenses",      value: fmt(summary.totalExpenses),   color: "text-red-600"    },
              { label: "Total Production",    value: `${summary.totalProduction} bags`, color: "text-green-600" },
              { label: "Outstanding Debts",   value: fmt(summary.totalDebt),       color: "text-orange-600" },
              { label: "Outstanding Loans",   value: fmt(summary.totalLoans),      color: "text-purple-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between px-4 py-2.5 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className={`font-semibold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADMIN ACTIONS */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <h3 className="font-bold text-[#0d1b3e] text-sm">Admin Actions</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setModal("activate")}
            className="py-3 px-4 bg-green-600 text-white rounded-xl text-sm font-semibold"
          >
            ✅ Activate
          </button>
          <button
            onClick={() => setModal("suspend")}
            className="py-3 px-4 bg-red-500 text-white rounded-xl text-sm font-semibold"
          >
            🚫 Suspend
          </button>
          <button
            onClick={() => setModal("archive")}
            className="py-3 px-4 bg-gray-400 text-white rounded-xl text-sm font-semibold"
          >
            📦 Archive
          </button>
          <button
            onClick={() => setModal("extend-trial")}
            className="py-3 px-4 bg-blue-600 text-white rounded-xl text-sm font-semibold"
          >
            ⏳ Extend Trial
          </button>
          <button
            onClick={() => setModal("change-plan")}
            className="py-3 px-4 bg-purple-600 text-white rounded-xl text-sm font-semibold"
          >
            💳 Change Plan
          </button>
          <button
            onClick={() => setModal("delete")}
            className="py-3 px-4 bg-red-900 text-white rounded-xl text-sm font-semibold"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {/* ── MODAL: ACTIVATE ─────────────────────────────────── */}
      {modal === "activate" && (
        <ModalCard
          title="Activate Customer"
          onClose={() => setModal(null)}
        >
          <p className="text-sm text-gray-600 mb-4">
            This will restore full access for <strong>{customer.factory_name}</strong>.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => updateStatus("active")}
              disabled={processing}
              className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold disabled:opacity-50"
            >
              {processing ? "Processing…" : "Activate"}
            </button>
          </div>
        </ModalCard>
      )}

      {/* ── MODAL: SUSPEND ──────────────────────────────────── */}
      {modal === "suspend" && (
        <ModalCard
          title="Suspend Customer"
          onClose={() => setModal(null)}
        >
          <p className="text-sm text-gray-600 mb-4">
            <strong>{customer.factory_name}</strong> will lose dashboard access immediately. They can still log in but will see a suspension notice.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => updateStatus("suspended")}
              disabled={processing}
              className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold disabled:opacity-50"
            >
              {processing ? "Processing…" : "Suspend"}
            </button>
          </div>
        </ModalCard>
      )}

      {/* ── MODAL: ARCHIVE ──────────────────────────────────── */}
      {modal === "archive" && (
        <ModalCard
          title="Archive Customer"
          onClose={() => setModal(null)}
        >
          <p className="text-sm text-gray-600 mb-4">
            <strong>{customer.factory_name}</strong> will be archived. Their data is kept but they will be hidden from the main customer list.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => updateStatus("archived")}
              disabled={processing}
              className="flex-1 py-2.5 rounded-xl bg-gray-600 text-white text-sm font-semibold disabled:opacity-50"
            >
              {processing ? "Processing…" : "Archive"}
            </button>
          </div>
        </ModalCard>
      )}

      {/* ── MODAL: EXTEND TRIAL ─────────────────────────────── */}
      {modal === "extend-trial" && (
        <ModalCard
          title="Extend Trial"
          onClose={() => setModal(null)}
        >
          <p className="text-sm text-gray-600 mb-4">
            Current expiry:{" "}
            <strong>
              {customer.expires_at
                ? new Date(customer.expires_at).toLocaleDateString()
                : "Not set"}
            </strong>
          </p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {["7", "14", "30", "custom"].map((opt) => (
              <button
                key={opt}
                onClick={() => setTrialDays(opt)}
                className={`py-2 rounded-xl text-sm border transition ${
                  trialDays === opt
                    ? "bg-[#0d1b3e] text-white border-[#0d1b3e]"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {opt === "custom" ? "Custom" : `${opt} Days`}
              </button>
            ))}
          </div>
          {trialDays === "custom" && (
            <input
              type="number"
              placeholder="Enter number of days"
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mb-4"
            />
          )}
          <div className="flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleExtendTrial}
              disabled={processing || (trialDays === "custom" && !customDays)}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold disabled:opacity-50"
            >
              {processing ? "Processing…" : "Extend Trial"}
            </button>
          </div>
        </ModalCard>
      )}

      {/* ── MODAL: CHANGE PLAN ──────────────────────────────── */}
      {modal === "change-plan" && (
        <ModalCard
          title="Change Plan"
          onClose={() => setModal(null)}
        >
          <p className="text-sm text-gray-500 mb-4">
            Current plan: <strong>{customer.plan || "None"}</strong>
          </p>
          <div className="space-y-2 mb-4">
            {[
              "Standard Monthly",
              "Standard Annual",
              "Enterprise",
            ].map((plan) => (
              <button
                key={plan}
                onClick={() => setNewPlan(plan)}
                className={`w-full py-3 px-4 rounded-xl text-sm text-left border transition ${
                  newPlan === plan
                    ? "bg-[#0d1b3e] text-white border-[#0d1b3e]"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {plan}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleChangePlan}
              disabled={processing || !newPlan}
              className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold disabled:opacity-50"
            >
              {processing ? "Processing…" : "Save Plan"}
            </button>
          </div>
        </ModalCard>
      )}

      {/* ── MODAL: PERMANENT DELETE ─────────────────────────── */}
      {modal === "delete" && (
        <ModalCard
          title="⚠️ Permanent Delete"
          onClose={() => setModal(null)}
        >
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">
              WARNING — This cannot be undone
            </p>
            <p className="text-xs text-red-600">
              The following will be permanently removed:
            </p>
            <ul className="text-xs text-red-600 list-disc list-inside mt-1 space-y-0.5">
              {["Factory", "Sales", "Expenses", "Production", "Debts", "Loans",
                "Bank Transactions", "Subscriptions", "Payments", "Activity"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Type <strong>DELETE</strong> to confirm:
          </p>
          <input
            type="text"
            placeholder="Type DELETE"
            value={deleteText}
            onChange={(e) => setDeleteText(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm mb-4 font-mono"
          />
          <div className="flex gap-3">
            <button
              onClick={() => { setModal(null); setDeleteText("") }}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handlePermanentDelete}
              disabled={processing || deleteText !== "DELETE"}
              className="flex-1 py-2.5 rounded-xl bg-red-700 text-white text-sm font-bold disabled:opacity-40"
            >
              {processing ? "Deleting…" : "Delete Forever"}
            </button>
          </div>
        </ModalCard>
      )}

    </div>
  )
}

// ─── MODAL WRAPPER ──────────────────────────────────────────────────────────

function ModalCard({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#0d1b3e] text-base">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 text-xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}