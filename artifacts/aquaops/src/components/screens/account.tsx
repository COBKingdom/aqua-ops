import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { signOutUser } from "@/lib/auth"

type Payment = {
  id: string
  created_at: string
  amount: number
  status: string
  payment_provider: string
  reference: string
}

type SubscriptionEvent = {
  id: string
  created_at: string
  event_type: string
  description?: string
}

export function AccountScreen() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [customer, setCustomer] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [payments, setPayments] = useState<Payment[]>([])
  const [events, setEvents] = useState<SubscriptionEvent[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    loadAccount()
  }, [])

  const loadAccount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setEmail(user.email || "")

      const { data: admin } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", user.email)
        .single()

      if (admin) {
        setIsAdmin(true)
        return
      }

      const { data: customerData } = await supabase
        .from("saas_customers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

      setCustomer(customerData)

      const { data: paymentData } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20)

      setPayments(paymentData || [])

      const { data: eventData } = await supabase
        .from("subscription_events")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20)

      setEvents(eventData || [])

    } catch (error) {
      console.error("Account load error:", error)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      await signOutUser()
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const getDaysRemaining = () => {
    if (!customer?.expires_at) return 0
    const diff = new Date(customer.expires_at).getTime() - new Date().getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const daysRemaining = getDaysRemaining()

  const statusColor = (status: string) => {
    if (status === "Active") return "bg-green-100 text-green-700"
    if (status === "Trial") return "bg-blue-100 text-blue-700"
    return "bg-red-100 text-red-700"
  }

  const eventIcon = (type: string) => {
    if (type?.toLowerCase().includes("trial")) return "🧪"
    if (type?.toLowerCase().includes("activ")) return "✅"
    if (type?.toLowerCase().includes("renew")) return "🔄"
    if (type?.toLowerCase().includes("expir")) return "⚠️"
    if (type?.toLowerCase().includes("cancel")) return "❌"
    return "📋"
  }

  const paymentStatusColor = (status: string) => {
    if (status === "success" || status === "paid") return "text-green-600"
    if (status === "pending") return "text-yellow-600"
    return "text-red-600"
  }

  const PLANS = [
    {
      id: "monthly",
      name: "Professional",
      cycle: "Monthly",
      price: "₦10,000",
      period: "/ month",
      badge: null,
      accent: "border-[#2563eb]",
      highlight: false,
    },
    {
      id: "annual",
      name: "Professional",
      cycle: "Annual",
      price: "₦108,000",
      period: "/ year",
      badge: "BEST VALUE",
      accent: "border-green-500",
      highlight: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      cycle: "Custom",
      price: "Custom",
      period: "pricing",
      badge: null,
      accent: "border-purple-400",
      highlight: false,
    },
  ]

  const PAYMENT_METHODS = [
    { icon: "💳", label: "Credit / Debit Cards" },
    { icon: "🏦", label: "Bank Transfer" },
    { icon: "📱", label: "USSD" },
    { icon: "🌍", label: "International Cards" },
  ]

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">
          Billing Centre
        </h1>
        <p className="text-sm text-gray-500">
          Manage your AquaOps subscription
        </p>
      </div>

      {/* ACCOUNT IDENTITY */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#0d1b3e] flex items-center justify-center text-white font-bold text-lg">
          {email ? email[0].toUpperCase() : "?"}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[#0d1b3e] truncate">{email || "—"}</p>
          <p className="text-xs text-gray-400">
            {isAdmin ? "Platform Administrator" : customer?.factory_name || "AquaOps User"}
          </p>
        </div>
        {isAdmin && (
          <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold shrink-0">
            Admin
          </span>
        )}
      </div>

      {isAdmin ? (

        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-2">
          <h2 className="font-semibold text-[#0d1b3e]">Platform Administrator</h2>
          <p className="text-sm text-gray-500">
            This account manages the AquaOps platform. Subscription billing does not apply.
          </p>
        </div>

      ) : (
        <>

          {/* ── SECTION 1: CURRENT SUBSCRIPTION ─────────────────────── */}

          <div className="bg-gradient-to-r from-[#0d1b3e] to-gray-800 text-white rounded-2xl shadow-md p-5 space-y-4">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs opacity-60 uppercase tracking-wide">Current Plan</p>
                <p className="text-xl font-bold mt-0.5">
                  {customer?.plan || "Professional"}
                </p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                customer?.status === "Active"
                  ? "bg-green-500 text-white"
                  : customer?.status === "Trial"
                  ? "bg-blue-400 text-white"
                  : "bg-red-500 text-white"
              }`}>
                {customer?.status || "—"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="opacity-60 text-xs">Billing Cycle</p>
                <p className="font-semibold mt-0.5">{customer?.billing_cycle || "Monthly"}</p>
              </div>
              <div>
                <p className="opacity-60 text-xs">Days Remaining</p>
                <p className={`font-bold mt-0.5 text-lg ${daysRemaining <= 7 ? "text-red-400" : "text-green-400"}`}>
                  {daysRemaining}
                </p>
              </div>
              <div>
                <p className="opacity-60 text-xs">Started</p>
                <p className="font-semibold mt-0.5">
                  {customer?.started_at
                    ? new Date(customer.started_at).toLocaleDateString()
                    : "—"}
                </p>
              </div>
              <div>
                <p className="opacity-60 text-xs">Expires</p>
                <p className="font-semibold mt-0.5">
                  {customer?.expires_at
                    ? new Date(customer.expires_at).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>

            <button className="w-full h-11 bg-white text-[#0d1b3e] rounded-xl text-sm font-bold">
              🔄 Renew Now
            </button>

          </div>

          {/* TRIAL BANNER */}
          {customer?.status === "Trial" && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🧪</span>
                <div>
                  <p className="font-semibold text-blue-800 text-sm">Trial Active</p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    Your free trial expires in {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}.
                    Upgrade to keep full access.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── SECTION 2: CHOOSE YOUR PLAN ──────────────────────────── */}

          <div className="space-y-3">

            <div>
              <h2 className="font-bold text-[#0d1b3e]">Choose Your Plan</h2>
              <p className="text-xs text-gray-400 mt-0.5">Select the plan that fits your business</p>
            </div>

            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full bg-white rounded-2xl shadow-sm p-4 border-2 text-left transition-all ${
                  selectedPlan === plan.id ? plan.accent : "border-transparent"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[#0d1b3e]">{plan.name}</p>
                      {plan.badge && (
                        <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{plan.cycle} Billing</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#0d1b3e]">{plan.price}</p>
                    <p className="text-xs text-gray-400">{plan.period}</p>
                  </div>
                </div>

                {plan.id === "enterprise" && (
                  <div className="mt-3">
                    <span className="text-xs text-purple-600 font-semibold">
                      Contact Sales →
                    </span>
                  </div>
                )}

                {selectedPlan === plan.id && plan.id !== "enterprise" && (
                  <div className="mt-3">
                    <div className="w-full h-10 bg-[#2563eb] text-white rounded-xl text-sm font-bold flex items-center justify-center">
                      Select {plan.cycle} Plan
                    </div>
                  </div>
                )}
              </button>
            ))}

          </div>

          {/* ── SECTION 3: PAYMENT METHODS ───────────────────────────── */}

          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">

            <div>
              <h2 className="font-bold text-[#0d1b3e]">Payment Methods</h2>
              <p className="text-xs text-gray-400 mt-0.5">Accepted payment options</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-gray-50 rounded-xl p-3"
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-xs font-medium text-[#0d1b3e]">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <div className="h-px bg-gray-100 flex-1" />
              <span className="text-[11px] text-gray-400 font-medium">Powered by Flutterwave</span>
              <div className="h-px bg-gray-100 flex-1" />
            </div>

          </div>

          {/* ── SECTION 4: PAYMENT HISTORY ───────────────────────────── */}

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <div className="px-4 py-3 border-b border-gray-50">
              <h2 className="font-bold text-[#0d1b3e]">Payment History</h2>
              <p className="text-xs text-gray-400 mt-0.5">Recent transactions</p>
            </div>

            {payments.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-400">No payment history available</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {payments.map((p) => (
                  <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0d1b3e]">
                        ₦{Number(p.amount || 0).toLocaleString()}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                        {p.payment_provider || "—"} · {p.reference || "—"}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-xs font-semibold capitalize ${paymentStatusColor(p.status)}`}>
                        {p.status || "—"}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {new Date(p.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ── SECTION 5: SUBSCRIPTION ACTIVITY ─────────────────────── */}

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <div className="px-4 py-3 border-b border-gray-50">
              <h2 className="font-bold text-[#0d1b3e]">Subscription Activity</h2>
              <p className="text-xs text-gray-400 mt-0.5">Recent account events</p>
            </div>

            {events.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-400">No activity recorded yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {events.map((ev) => (
                  <div key={ev.id} className="px-4 py-3 flex items-start gap-3">
                    <span className="text-lg shrink-0">{eventIcon(ev.event_type)}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0d1b3e]">
                        {ev.event_type || "Event"}
                      </p>
                      {ev.description && (
                        <p className="text-xs text-gray-500 mt-0.5">{ev.description}</p>
                      )}
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {new Date(ev.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ── SECTION 6: BILLING SUPPORT ───────────────────────────── */}

          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-sm p-4 space-y-3">

            <div>
              <h2 className="font-bold">Billing Support</h2>
              <p className="text-xs opacity-80 mt-0.5">
                Need help with your subscription? Our team is available.
              </p>
            </div>

            <button
              onClick={() =>
                window.open("https://wa.me/2348000000000?text=Hi, I need help with my AquaOps subscription.", "_blank")
              }
              className="w-full h-11 bg-white text-green-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
            >
              💬 WhatsApp Support
            </button>

          </div>

        </>
      )}

      {/* SIGN OUT */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full h-11 bg-red-50 text-red-600 rounded-xl text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Signing out…" : "Sign Out"}
        </button>
      </div>

    </div>
  )
}