import { useState } from "react"
import { Factory, Wallet, BarChart3, Droplets } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function AquaOpsEntry() {
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [factoryName, setFactoryName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [infoMsg, setInfoMsg] = useState("")
  const [showResend, setShowResend] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const clearMessages = () => {
    setErrorMsg("")
    setInfoMsg("")
    setShowResend(false)
  }

  const friendlyError = (msg: string): string => {
    const m = msg.toLowerCase()
    if (m.includes("invalid login credentials") || m.includes("invalid credentials")) {
      return "Incorrect email or password. Please try again or use Forgot Password."
    }
    if (m.includes("email not confirmed") || m.includes("not confirmed")) {
      return "Please verify your email address before logging in."
    }
    if (m.includes("already registered") || m.includes("already exists")) {
      return "This email address is already registered. Please log in or reset your password."
    }
    if (m.includes("rate limit") || m.includes("too many")) {
      return "Too many attempts. Please wait a moment and try again."
    }
    if (m.includes("password") && m.includes("short")) {
      return "Password must be at least 6 characters."
    }
    return msg
  }

  const handleResendVerification = async () => {
    setResendLoading(true)
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })
      if (error) {
        setErrorMsg("Could not resend email. Please try again.")
      } else {
        setInfoMsg("Verification email sent. Please check your inbox or Spam folder.")
        setShowResend(false)
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.")
    } finally {
      setResendLoading(false)
    }
  }

  const handleSubmit = async () => {
    clearMessages()

    if (!email || !password) {
      setErrorMsg("Please enter your email and password.")
      return
    }

    setLoading(true)

    try {

      // ── LOGIN ────────────────────────────────────────────────
      if (isLogin) {

        const { data: authData, error } =
          await supabase.auth.signInWithPassword({ email, password })

        if (error) {
          const isUnverified =
            error.message.toLowerCase().includes("not confirmed") ||
            error.message.toLowerCase().includes("email not confirmed")

          setErrorMsg(friendlyError(error.message))

          if (isUnverified) setShowResend(true)

          return
        }

        // ── Check for existing membership ────────────────────
        const { data: membership } = await supabase
          .from("factory_users")
          .select("factory_id")
          .eq("user_id", authData.user.id)
          .maybeSingle()

        // ── Existing member → go straight to dashboard ───────
        if (membership) {
          window.location.href = "/aquaops"
          return
        }

        // ── First login after email verification ─────────────
        const pendingFactoryName =
          authData.user.user_metadata?.pending_factory_name ||
          localStorage.getItem("pendingFactoryName")

        if (!pendingFactoryName) {
          setErrorMsg(
            "Factory name not found. Please register again or contact support."
          )
          return
        }

        // ── Guard: check if factory already exists for user ──
        const { data: existingFactory } = await supabase
          .from("factories")
          .select("id")
          .eq("user_id", authData.user.id)
          .maybeSingle()

        let factoryId: string

        if (existingFactory) {
          factoryId = existingFactory.id
        } else {
          const { data: newFactory, error: factoryError } = await supabase
            .from("factories")
            .insert({
              user_id: authData.user.id,
              name: pendingFactoryName,
              currency_code: "NGN",
              currency_symbol: "₦",
            })
            .select("id")
            .single()

          if (factoryError || !newFactory) {
            setErrorMsg(
              "Failed to create your factory. Please try logging in again."
            )
            return
          }

          factoryId = newFactory.id
        }

        // ── Guard: check if membership already exists ────────
        const { data: existingMembership } = await supabase
          .from("factory_users")
          .select("factory_id")
          .eq("user_id", authData.user.id)
          .maybeSingle()

        if (!existingMembership) {
          const { error: membershipError } = await supabase
            .from("factory_users")
            .insert({
              factory_id: factoryId,
              user_id: authData.user.id,
              role: "owner",
            })

          if (membershipError) {
            setErrorMsg("Failed to link your account to the factory. Please contact support.")
            return
          }
        }

        // ── Guard: check if subscription already exists ──────
        const { data: existingSubscription } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("user_id", authData.user.id)
          .maybeSingle()

if (!existingSubscription) {
  const startedAt = new Date()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 14)

  const {
    error: subscriptionError,
  } = await supabase
    .from("subscriptions")
    .insert({
      user_id: authData.user.id,
      plan: "Starter",
      status: "Trial",
      user_limit: 1,
      renewal_status: "pending",
      started_at:
        startedAt.toISOString(),
      expires_at:
        expiresAt.toISOString(),
    })

  if (subscriptionError) {
    setErrorMsg("Failed to activate trial. Please contact support.")
    return
  }

  try {
    await fetch(
      `${import.meta.env.VITE_API_URL}/send-welcome`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.user.email ?? email,
          factoryName: pendingFactoryName,
        }),
      }
    )
  } catch (err) {
    console.error(
      "Welcome email failed:",
      err
    )
  }
}

        localStorage.removeItem("pendingFactoryName")
        window.location.href = "/aquaops"
        return
      }

      // ── SIGNUP ───────────────────────────────────────────────

      if (!factoryName.trim()) {
        setErrorMsg("Please enter your factory name.")
        return
      }

      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters.")
        return
      }

      const { data: signupData, error: signupError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { pending_factory_name: factoryName.trim() },
          },
        })

      if (signupError) {
        setErrorMsg(friendlyError(signupError.message))
        return
      }

      // ── Supabase silent duplicate detection ─────────────────
      // When email confirmation is ON, Supabase returns no error for
      // already-registered emails, but the user object has identities: []
      if (
        signupData.user &&
        Array.isArray(signupData.user.identities) &&
        signupData.user.identities.length === 0
      ) {
        setErrorMsg(
          "This email address is already registered. Please log in or use Forgot Password."
        )
        return
      }

      // ── Unverified existing account edge case ────────────────
      if (signupData.user && !signupData.session) {
        localStorage.setItem("pendingFactoryName", factoryName.trim())
        setInfoMsg(
          "Account created successfully. Please check your Inbox or Spam Folder and click the verification link before logging in."
        )
        setIsLogin(true)
        setEmail(email)
        setPassword("")
        setFactoryName("")
        return
      }

      localStorage.setItem("pendingFactoryName", factoryName.trim())
      setInfoMsg(
        "Account created. Please verify your email before logging in."
      )
      setIsLogin(true)

    } catch (err) {
      console.error(err)
      setErrorMsg("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleTryDemo = () => {
    sessionStorage.setItem("aquaops_demo", "true")
    window.location.href = "/aquaops"
  }

  return (
    <div className="min-h-screen bg-[#eef0f5]">
      <div className="max-w-md mx-auto px-4 pt-5 pb-16 space-y-5">

        {/* BRAND */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img src="/icon-192.png" alt="AquaOps" className="w-16 h-16 rounded-2xl shadow-sm" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0d1b3e] leading-tight">
              Stop guessing your business numbers
            </h1>
            <div className="flex justify-center mt-3">
              <svg width="90" height="8" viewBox="0 0 120 12">
                <path
                  d="M4 8 Q60 0 116 8"
                  stroke="#f5a623"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-gray-500 mt-3 text-base leading-relaxed">
              Track your production, sales, expenses, debts and profit in one operational dashboard.
            </p>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="space-y-3">
          <div className="bg-[#0d1b3e] text-white rounded-3xl p-4 shadow-sm">
            <p className="text-sm opacity-70">AquaOps</p>
            <h2 className="text-lg font-semibold mt-1 leading-snug">
              Built for water factories to manage daily operations from anywhere.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { Icon: Wallet,   label: "Expenses",   sub: "Track costs"     },
              { Icon: BarChart3,label: "Reports",    sub: "Profit insights" },
              { Icon: Factory,  label: "Production", sub: "Factory output"  },
              { Icon: Droplets, label: "Debts",      sub: "Reduce debt"     },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2">
                <Icon size={18} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-[11px] text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AUTH CARD */}
        <div className="bg-white rounded-3xl p-4 shadow-sm space-y-3">

          <div>
            <h2 className="text-2xl font-bold text-[#0d1b3e]">
              {isLogin ? "Welcome back" : "Start Free Trial"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin
                ? "Login to continue managing your factory"
                : "Create your account to start"}
            </p>
          </div>

          {/* INFO MESSAGE */}
          {infoMsg && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3">
              <p className="text-sm text-blue-700">{infoMsg}</p>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 space-y-2">
              <p className="text-sm text-red-700">{errorMsg}</p>
              {showResend && (
                <button
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="text-sm font-semibold text-[#2563eb] underline disabled:opacity-50"
                >
                  {resendLoading ? "Sending…" : "Resend Verification Email"}
                </button>
              )}
            </div>
          )}

          {!isLogin && (
            <input
              type="text"
              placeholder="Factory Name"
              value={factoryName}
              onChange={(e) => { clearMessages(); setFactoryName(e.target.value) }}
              className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => { clearMessages(); setEmail(e.target.value) }}
            className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { clearMessages(); setPassword(e.target.value) }}
            onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
            className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#0d1b3e] text-white py-4 rounded-2xl font-medium disabled:opacity-60"
          >
            {loading ? "Please wait…" : isLogin ? "Login" : "Start Free Trial"}
          </button>

          {isLogin && (
            <p
              onClick={() => { window.location.href = "/forgot-password" }}
              className="text-sm text-center text-blue-600 cursor-pointer"
            >
              Forgot Password?
            </p>
          )}

          <p
            onClick={() => { clearMessages(); setIsLogin(!isLogin) }}
            className="text-sm text-center text-blue-600 cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Start free trial"
              : "Already have an account? Login"}
          </p>

        </div>

        {/* TRY DEMO */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <p className="text-xs text-gray-400 shrink-0">or explore first</p>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <button
            onClick={handleTryDemo}
            className="w-full border-2 border-[#0d1b3e] text-[#0d1b3e] py-4 rounded-2xl font-medium hover:bg-[#0d1b3e] hover:text-white transition"
          >
            🔍 Try Demo — No Account Needed
          </button>
          <p className="text-xs text-center text-gray-400">
            Explore with sample factory data. No sign-up required.
          </p>
        </div>

      </div>

    </div>
  )
}