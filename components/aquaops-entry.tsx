"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Factory,
  Wallet,
  BarChart3,
  Droplets,
} from "lucide-react"

import { supabase } from "@/lib/supabase"

export function AquaOpsEntry() {
  const router = useRouter()

  const [isLogin, setIsLogin] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [factoryName, setFactoryName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const handleSubmit = async () => {
    try {
      setLoading(true)

      // LOGIN
      if (isLogin) {
const {
  data: authData,
  error,
} =
  await supabase.auth.signInWithPassword(
    {
      email,
      password,
    }
  )

if (error) {
  alert(error.message)
  return
}

console.log(
  "LOGIN SUCCESS:",
  authData
)

        const { data: membership } =
  await supabase
    .from("factory_users")
    .select("factory_id")
    .eq("user_id", authData.user.id)
    .single()

console.log(
  "MEMBERSHIP:",
  membership
)

// GIVE SUPABASE SESSION TIME
setTimeout(() => {
  window.location.href = "/aquaops"
}, 1200)

        return
      }

      // SIGNUP
      if (
        !factoryName ||
        !email ||
        !password
      ) {
        alert(
          "Please complete all fields"
        )

        return
      }

      // CREATE ACCOUNT
      const {
        data: signupData,
        error: signupError,
      } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signupError) {
        alert(signupError.message)
        return
      }

      const user =
        signupData.user

      if (!user) {
        alert(
          "Account creation failed"
        )

        return
      }

// CREATE FACTORY
const {
  data: newFactory,
  error: factoryError,
} = await supabase
  .from("factories")
  .insert({
    user_id: user.id,
    name: factoryName,
    currency_code: "NGN",
    currency_symbol: "₦",
  })
  .select("id")
  .single()

if (
  factoryError ||
  !newFactory
) {
  alert(
    factoryError?.message ||
    "Factory creation failed"
  )

  return
}

// CREATE MEMBERSHIP
const {
  error: membershipError,
} = await supabase
  .from("factory_users")
  .insert({
    factory_id: newFactory.id,
    user_id: user.id,
    role: "owner",
  })

if (membershipError) {
  alert(
    membershipError.message
  )

  return
}

      localStorage.setItem(
        "factoryName",
        factoryName
      )

      alert(
        "Account created successfully. Please verify your email before login."
      )

      setIsLogin(true)

    } catch (error) {
      console.error(error)

      alert("Something went wrong")

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#eef0f5]">

      {/* HERO */}
      <div className="max-w-md mx-auto px-4 pt-5 pb-16 space-y-5">

        {/* BRAND */}
        <div className="text-center space-y-3">

          <div className="flex justify-center">
            <img
              src="/icon-192.png"
              alt="AquaOps"
              className="w-16 h-16 rounded-2xl shadow-sm"
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0d1b3e] leading-tight">
              Stop guessing your business numbers
            </h1>

            <div className="flex justify-center mt-3">
              <svg
                width="90"
                height="8"
                viewBox="0 0 120 12"
              >
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
              Track your production,
              sales, expenses, debts and
              profit in one operational
              dashboard.
            </p>
          </div>

        </div>

{/* FEATURE CARDS */}
<div className="space-y-3">

  {/* HERO STRIP */}
  <div className="bg-[#0d1b3e] text-white rounded-3xl p-4 shadow-sm">

    <p className="text-sm opacity-70">
      AquaOps
    </p>

    <h2 className="text-lg font-semibold mt-1 leading-snug">
      Built for water factories to manage daily operations from anywhere.
    </h2>

  </div>

  {/* COMPACT FEATURES */}
  <div className="grid grid-cols-2 gap-2">

    <div className="bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2">
      <Wallet
        size={18}
        className="text-blue-600"
      />

      <div>
        <p className="text-sm font-medium">
          Expenses
        </p>

        <p className="text-[11px] text-gray-500">
          Track costs
        </p>
      </div>
    </div>

    <div className="bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2">
      <BarChart3
        size={18}
        className="text-blue-600"
      />

      <div>
        <p className="text-sm font-medium">
          Reports
        </p>

        <p className="text-[11px] text-gray-500">
          Profit insights
        </p>
      </div>
    </div>

    <div className="bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2">
      <Factory
        size={18}
        className="text-blue-600"
      />

      <div>
        <p className="text-sm font-medium">
          Production
        </p>

        <p className="text-[11px] text-gray-500">
          Factory output
        </p>
      </div>
    </div>

    <div className="bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2">
      <Droplets
        size={18}
        className="text-blue-600"
      />

      <div>
        <p className="text-sm font-medium">
          Debts
        </p>

        <p className="text-[11px] text-gray-500">
          Reduce debt
        </p>
      </div>
    </div>

  </div>

</div>

        {/* AUTH CARD */}
        <div className="bg-white rounded-3xl p-4 shadow-sm space-y-3">

          <div>
            <h2 className="text-2xl font-bold text-[#0d1b3e]">
              {isLogin
                ? "Welcome back"
                : "Start Free Trial"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {isLogin
                ? "Login to continue managing your factory"
                : "Create your account to start"}
            </p>
          </div>

          {!isLogin && (
            <input
              type="text"
              placeholder="Factory Name"
              value={factoryName}
              onChange={(e) =>
                setFactoryName(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit()
              }
            }}
            className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#0d1b3e] text-white py-4 rounded-2xl font-medium"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Start Free Trial"}
          </button>

          <p
            onClick={() =>
              setIsLogin(!isLogin)
            }
            className="text-sm text-center text-blue-600 cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Start free trial"
              : "Already have an account? Login"}
          </p>

        </div>

      </div>

    </div>
  )
}