"use client"

import { useState } from "react"
import { Dashboard } from "@/components/screens/dashboard"
import { Production } from "@/components/screens/production"
import { Sales } from "@/components/screens/sales"
import { Expenses } from "@/components/screens/expenses"
import { Debts } from "@/components/screens/debts"
import { BottomNav } from "@/components/bottom-nav"

export default function WaterFactoryApp() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderScreen = () => {
    if (activeTab === "dashboard") return <Dashboard />
    if (activeTab === "production") return <Production />
    if (activeTab === "sales") return <Sales />
    if (activeTab === "expenses") return <Expenses />
    if (activeTab === "debts") return <Debts />
    return <Dashboard />
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-lg flex flex-col">
      
      {/* 🔥 HEADER */}
      <div className="flex items-center gap-3 p-4 border-b bg-white">
        <img
          src="/icon-192.png"
          alt="AquaOps Logo"
          className="w-8 h-8 rounded"
        />
        <h1 className="text-lg font-bold">AquaOps</h1>
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
  )
}