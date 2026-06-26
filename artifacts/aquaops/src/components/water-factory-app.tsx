import { useState, useEffect } from "react"
import { Dashboard } from "@/components/screens/dashboard"
import { Production } from "@/components/screens/production"
import { Sales } from "@/components/screens/sales"
import { Expenses } from "@/components/screens/expenses"
import { Debts } from "@/components/screens/debts"
import { BottomNav } from "@/components/bottom-nav"
import { setFactoryName } from "@/lib/factory"
import { signOutUser } from "@/lib/auth"
import { Reports } from "@/components/screens/reports"
import { useLocation } from "wouter"
import { Loans } from "@/components/screens/loans"
import { Bank } from "@/components/screens/bank"
import { AccountScreen } from "@/components/screens/account"
import { useAuth } from "@/contexts/AuthContext"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminSubscriptions } from "@/components/screens/admin-subscriptions"
import { HistoryScreen } from "@/components/screens/history"
import { getCurrentFactory } from "@/lib/current-factory"
import { AdminDashboard } from "@/components/screens/admin-dashboard"
import { AdminPayments } from "@/components/screens/admin-payments"
import { AdminRevenue } from "@/components/screens/admin-revenue"
import { AdminCustomers } from "@/components/screens/admin-customers"
import { MigrationWizard } from "@/components/screens/migration-wizard"

export default function WaterFactoryApp() {

  const [activeTab, setActiveTab] = useState("dashboard")
  const [factoryName, setFactoryNameState] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [, navigate] = useLocation()
  const { user, loading } = useAuth()

  useEffect(() => {
    const loadFactory = async () => {
      try {
        if (loading) return

        if (!user) {
          navigate("/")
          return
        }

        const factory = await getCurrentFactory()

        if (factory) {
          setFactoryNameState(factory.name)
          localStorage.setItem("factoryName", factory.name)

          if (!localStorage.getItem("trialStart")) {
            localStorage.setItem("trialStart", new Date().toISOString())
          }

          return
        }

        navigate("/")

      } catch (err) {
        console.error(err)
        navigate("/")
      }
    }

    loadFactory()
  }, [user, loading, navigate])

  if (loading) return null
  if (!factoryName) return null

  const renderScreen = () => {
    if (activeTab === "dashboard") {
      return <Dashboard setActiveTab={setActiveTab} />
    }
    if (activeTab === "production") {
      return <Production />
    }
    if (activeTab === "sales") {
      return <Sales />
    }
    if (activeTab === "expenses") {
      return <Expenses />
    }
    if (activeTab === "debts") {
      return <Debts />
    }
    if (activeTab === "reports") {
      return <Reports setActiveTab={setActiveTab} />
    }
    if (activeTab === "loans") {
      return <Loans />
    }
    if (activeTab === "bank") {
      return <Bank />
    }
    if (activeTab === "account") {
      return <AccountScreen />
    }
    if (activeTab === "history") {
      return <HistoryScreen setActiveTab={setActiveTab} />
    }
    if (activeTab === "migration") {
      return <MigrationWizard setActiveTab={setActiveTab} />
    }
    if (activeTab === "admin-dashboard") {
      return <AdminDashboard onNavigate={setActiveTab} />
    }
    if (activeTab === "admin-subscriptions") {
      return <AdminSubscriptions />
    }
    if (activeTab === "admin-payments") {
      return <AdminPayments />
    }
    if (activeTab === "admin-revenue") {
      return <AdminRevenue />
    }
    if (activeTab === "admin-customers") {
      return <AdminCustomers />
    }
    return <Dashboard setActiveTab={setActiveTab} />
  }

  return (
    <ProtectedRoute>

      <div className="h-screen bg-[#eef0f5] max-w-md mx-auto flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">

          {/* LOGO + FACTORY */}
          <div className="flex items-center gap-2">
            <img
              src="/icon-192.png"
              alt="AquaOps Logo"
              className="w-8 h-8 rounded"
            />
            <div>
              <h1 className="text-sm font-bold text-[#0d1b3e]">AquaOps</h1>
              <p className="text-[10px] text-gray-400">{factoryName}</p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 items-center">

            {/* ADMIN */}
            <button
              onClick={() => setActiveTab("admin-dashboard")}
              className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg"
            >
              Admin
            </button>

            {/* AVATAR + DROPDOWN */}
            <div className="relative">

              <button
                onClick={() => setShowDropdown((v) => !v)}
                className="w-9 h-9 rounded-full bg-[#0d1b3e] text-white font-bold text-sm flex items-center justify-center shadow-sm"
              >
                {factoryName?.[0]?.toUpperCase() ?? "?"}
              </button>

              {showDropdown && (
                <div>

                  {/* BACKDROP */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                  />

                  {/* MENU */}
                  <div className="absolute right-0 top-11 z-50 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* IDENTITY */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs font-bold text-[#0d1b3e] truncate">
                        {factoryName}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {user?.email ?? ""}
                      </p>
                    </div>

                    {/* BILLING CENTRE */}
                    <button
                      onClick={() => {
                        setShowDropdown(false)
                        setActiveTab("account")
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-[#2563eb] hover:bg-blue-50 border-b border-gray-50"
                    >
                      🔄 Renew Subscription
                    </button>

                    {/* SIGN OUT */}
                    <button
                      onClick={async () => {
                        setShowDropdown(false)
                        await signOutUser()
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>

                  </div>

                </div>
              )}

            </div>

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

    </ProtectedRoute>
  )
}