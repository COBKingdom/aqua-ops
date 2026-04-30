"use client"

import {
  Home,
  Package,
  ShoppingCart,
  Wallet,
  Users,
  BarChart3,
  Landmark,
  Banknote
} from "lucide-react"

type BottomNavProps = {
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
    { id: "loans", label: "Loans", icon: Banknote },
    { id: "bank", label: "Bank", icon: Landmark },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ]

  return (
    <div className="bg-white border-t border-gray-100">
      <div className="grid grid-cols-4 gap-1.5 p-1.5">

        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 rounded-lg transition
                ${
                  isActive
                    ? "bg-[#0d1b3e] text-white"
                    : "bg-white text-[#1f3a8a] border border-[#e0e7ff]"
                }
              `}
            >
              {/* 🟠 ORANGE INDICATOR */}
              {isActive && (
                <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
              )}

              <Icon size={18} strokeWidth={2} />

              <span className="text-[9px] mt-0.5 font-medium leading-none">
                {tab.label}
              </span>
            </button>
          )
        })}

      </div>
    </div>
  )
}