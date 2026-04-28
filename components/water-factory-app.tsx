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

export default function WaterFactoryApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [factoryName, setFactoryNameState] = useState<string | null>(null)
  const [tempName, setTempName] = useState("")
  const [showAuth, setShowAuth] = useState(false)

  // ✅ LOAD SAVED FACTORY NAME
  useEffect(() => {
    const name = getFactoryName()

    if (name && name.trim() !== "") {
      setFactoryNameState(name)
    } else {
      setFactoryNameState("")
    }
  }, [])

  // ✅ SCREEN RENDERER
  const renderScreen = () => {
    if (activeTab === "dashboard") return <Dashboard />
    if (activeTab === "production") return <Production />
    if (activeTab === "sales") return <Sales />
    if (activeTab === "expenses") return <Expenses />
    if (activeTab === "debts") return <Debts />
    if (activeTab === "reports") return <Reports />
    return <Dashboard />
  }

  // 🔥 ONBOARDING (FIXED)
  if (!factoryName || factoryName.trim() === "") {
    const isValid = tempName.trim().length > 0

    return (
      <main className="min-h-screen bg-[#eef0f5] flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4">

          {/* HEADER */}
          <div className="text-center flex flex-col items-center space-y-2">
            <img
              src="/icon-192.png"
              alt="AquaOps Logo"
              className="w-12 h-12 rounded-xl"
            />

            <h1 className="text-xl font-bold text-[#0d1b3e]">
              Welcome to AquaOps
            </h1>

            <p className="text-xs text-gray-500">
              Enter your factory name to begin
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-4">

            <input
              type="text"
              placeholder="e.g. COB Water Factory"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d1b3e]"
              autoFocus
            />

            <button
              onClick={() => {
                const name = tempName.trim()
                if (!name) return

                // ✅ UPDATE UI IMMEDIATELY
                setFactoryNameState(name)

                // ✅ SAVE TO STORAGE
                setFactoryName(name)
              }}
              disabled={!isValid}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                isValid
                  ? "bg-[#0d1b3e] text-white hover:bg-[#08122b]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue →
            </button>

          </div>

          <p className="text-center text-[11px] text-gray-400">
            You can change this later
          </p>

        </div>
      </main>
    )
  }

  // 🔥 MAIN APP
  return (
    <>
      <div className="min-h-screen bg-[#eef0f5] max-w-md mx-auto flex flex-col">

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
          </div>
        </div>

        {/* SCREEN */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
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