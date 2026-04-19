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
  const [factoryName, setFactoryNameState] = useState("")
  const [tempName, setTempName] = useState("")
  const [showAuth, setShowAuth] = useState(false)


useEffect(() => {
  const name = getFactoryName()

  if (name) {
    setFactoryNameState(name)
  }


}, [])
  const handleSaveName = () => {
    if (!tempName.trim()) return

    setFactoryName(tempName)
    setFactoryNameState(tempName)
  }

  const renderScreen = () => {
    if (activeTab === "dashboard") return <Dashboard />
    if (activeTab === "production") return <Production />
    if (activeTab === "sales") return <Sales />
    if (activeTab === "expenses") return <Expenses />
    if (activeTab === "debts") return <Debts />
    if (activeTab === "reports") return <Reports />
    return <Dashboard />
  }

  // 🔥 SHOW INPUT SCREEN IF NO FACTORY NAME
  if (!factoryName) {
    return (
<div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
  <h1 className="text-2xl font-bold mb-4">Welcome to AquaOps</h1>

  {/* 🔥 NEW MESSAGE */}
  <p className="text-base font-medium text-gray-800 mb-2">
    Take full control of your water factory.
  </p>
  <p className="text-base font-medium text-gray-800 mb-4">
    Track production, sales, expenses and debt in one place.
  </p>

  {/* SMALL TEXT */}
  <p className="text-xs text-gray-500 mb-6">
    Works on your phone. No installation needed.
  </p>

  {/* INPUT LABEL */}
<p className="text-sm text-gray-600 mb-2">
  Enter your factory name to get started
</p>

<input
  type="text"
  placeholder="e.g. COB Water Factory"
  value={tempName}
  onChange={(e) => setTempName(e.target.value)}
  className="w-full max-w-sm p-3 border rounded-lg mb-4"
/>

  <button
    onClick={handleSaveName}
    className="bg-black text-white px-6 py-3 rounded-lg w-full max-w-sm"
  >
    Continue
  </button>
</div>
    )
  }

return (
  <>
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-lg flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <img
            src="/icon-192.png"
            alt="AquaOps Logo"
            className="w-8 h-8 rounded"
          />
          <div>
            <h1 className="text-lg font-bold">AquaOps</h1>
            <p className="text-sm text-gray-500">{factoryName}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAuth(true)}
            className="text-sm bg-black text-white px-3 py-1 rounded"
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
            className="text-sm bg-gray-200 px-3 py-1 rounded"
          >
            Change
          </button>
        </div>
      </div>

      {/* SCREEN */}
      <div className="flex-1 overflow-y-auto">
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