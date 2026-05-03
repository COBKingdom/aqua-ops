"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/screens/dashboard"
import { Production } from "@/components/screens/production"
import { Sales } from "@/components/screens/sales"
import { Expenses } from "@/components/screens/expenses"
import { Debts } from "@/components/screens/debts"
import { BottomNav } from "@/components/bottom-nav"
import { getFactoryName, setFactoryName } from "@/lib/factory"
import { Reports } from "@/components/screens/reports"
import { AuthModal } from "@/components/auth-modal"
import { useRouter } from "next/navigation"
import { Loans } from "@/components/screens/loans"
import { Bank } from "@/components/screens/bank"

export default function WaterFactoryApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [factoryName, setFactoryNameState] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const router = useRouter()

  // ✅ LOAD FACTORY OR REDIRECT (FIXED + TRIAL INIT)
  useEffect(() => {
    const factoryId = localStorage.getItem("factoryId")
    const name = localStorage.getItem("factoryName")

    if (!factoryId) {
      router.push("/onboarding")
      return
    }

    // 🔥 INIT TRIAL (ONLY ON FIRST USE)
    if (!localStorage.getItem("trialStart")) {
      localStorage.setItem("trialStart", new Date().toISOString())
    }

    // Set name for UI
    if (name && name.trim() !== "") {
      setFactoryNameState(name)
    } else {
      setFactoryNameState("Factory")
    }
  }, [])

  // 🚫 Prevent render before check completes
  if (!factoryName) {
    return null
  }

  // ✅ SCREEN RENDERER
  const renderScreen = () => {
    if (activeTab === "dashboard") return <Dashboard setActiveTab={setActiveTab} />
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
              Login
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

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}