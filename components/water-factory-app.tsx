"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/screens/dashboard"
import { Production } from "@/components/screens/production"
import { Sales } from "@/components/screens/sales"
import { Expenses } from "@/components/screens/expenses"
import { Debts } from "@/components/screens/debts"
import { BottomNav } from "@/components/bottom-nav"
import { setFactoryName } from "@/lib/factory"
import { Reports } from "@/components/screens/reports"
import { AuthModal } from "@/components/auth-modal"
import { useRouter } from "next/navigation"
import { Loans } from "@/components/screens/loans"
import { Bank } from "@/components/screens/bank"
import { getUser } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export default function WaterFactoryApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [factoryName, setFactoryNameState] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const router = useRouter()

  // ✅ LOAD FACTORY FROM AUTH USER OR LOCAL CACHE
  useEffect(() => {
    const loadFactory = async () => {
      const path = window.location.pathname

      // ✅ Skip onboarding
      if (path === "/onboarding") return

      try {
        // ✅ CHECK AUTH USER
        const user = await getUser()

        if (user?.email) {
          setUserEmail(user.email)

          // ✅ FIND USER FACTORY
          const { data: factory } = await supabase
            .from("factories")
            .select("id, name")
            .eq("user_id", user.id)
            .single()

          // ✅ FACTORY FOUND
          if (factory) {
            localStorage.setItem("factoryId", factory.id)
            localStorage.setItem("factoryName", factory.name)

            setFactoryNameState(factory.name)

            // ✅ INIT TRIAL
            if (!localStorage.getItem("trialStart")) {
              localStorage.setItem(
                "trialStart",
                new Date().toISOString()
              )
            }

            return
          }
        }

        // ✅ FALLBACK TO LOCAL CACHE
        const factoryId = localStorage.getItem("factoryId")
        const name = localStorage.getItem("factoryName")

        if (!factoryId) {
          router.push("/onboarding")
          return
        }

        setFactoryNameState(name || "Factory")

      } catch (err) {
        console.error(err)
        router.push("/onboarding")
      }
    }

    loadFactory()
  }, [])

  // 🚫 Prevent render before check completes
  if (!factoryName) {
    return null
  }

  // ✅ SCREEN RENDERER
  const renderScreen = () => {
    if (activeTab === "dashboard") {
      return <Dashboard setActiveTab={setActiveTab} />
    }

    if (activeTab === "production") return <Production />
    if (activeTab === "sales") return <Sales />
    if (activeTab === "expenses") return <Expenses />
    if (activeTab === "debts") return <Debts />
    if (activeTab === "reports") return <Reports />
    if (activeTab === "loans") return <Loans />
    if (activeTab === "bank") return <Bank />

    return <Dashboard />
  }

  // 🔥 MAIN APP
  return (
    <>
      <div className="h-screen bg-[#eef0f5] max-w-md mx-auto flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">

          <div className="flex items-center gap-2">
            <img
              src="/icon-192.png"
              alt="AquaOps Logo"
              className="w-8 h-8 rounded"
            />

            <div>
              <h1 className="text-sm font-bold text-[#0d1b3e]">
                AquaOps
              </h1>

              <p className="text-[10px] text-gray-400">
                {factoryName}
              </p>
            </div>
          </div>

          <div className="flex gap-2">

            <button
              onClick={() => setShowAuth(true)}
              className="text-xs bg-[#0d1b3e] text-white px-3 py-1.5 rounded-lg"
            >
              {userEmail ? "Account" : "Login"}
            </button>

            <button
              onClick={() => {
                const newName = prompt("Enter new factory name")

                if (newName && newName.trim() !== "") {
                  setFactoryName(newName)
                  setFactoryNameState(newName)
                }
              }}
              className="text-xs bg-gray-200 px-3 py-1.5 rounded-lg"
            >
              Change
            </button>

            {process.env.NODE_ENV === "development" && (
              <button
                onClick={() => {
                  localStorage.clear()
                  window.location.reload()
                }}
                className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg border border-red-700"
              >
                TEMP RESET
              </button>
            )}

          </div>
        </div>

        {/* SCREEN */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {renderScreen()}
        </div>

        {/* NAV */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

      </div>

      {/* AUTH MODAL */}
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} />
      )}
    </>
  )
}