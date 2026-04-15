"use client"

import { Home, Package, ShoppingCart, Wallet, Users, BarChart3 } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "production", label: "Production", icon: Package },
    { id: "sales", label: "Sales", icon: ShoppingCart },
    { id: "expenses", label: "Expenses", icon: Wallet },
    { id: "debts", label: "Debts", icon: Users },
    { id: "reports", label: "Reports", icon: BarChart3 }, // ✅ NEW
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      {tabs.map((tab) => {
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center text-xs ${
              activeTab === tab.id
                ? "text-black font-semibold"
                : "text-gray-400"
            }`}
          >
            <Icon className="h-5 w-5 mb-1" />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}