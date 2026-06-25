

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/screens/dashboard"
import { Production } from "@/components/screens/production"
import { Sales } from "@/components/screens/sales"
import { Expenses } from "@/components/screens/expenses"
import { Debts } from "@/components/screens/debts"
import { BottomNav } from "@/components/bottom-nav"
import { setFactoryName } from "@/lib/factory"
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
import { MigrationWizard } from "@/components/screens/migration-wizard"
import { AdminCustomers } from "@/components/screens/admin-customers"

export default function WaterFactoryApp() {

  const [activeTab, setActiveTab] =
    useState("dashboard")

  const [
    factoryName,
    setFactoryNameState,
  ] = useState<string | null>(null)

  const [, navigate] = useLocation()

  // GLOBAL AUTH
  const { user, loading } =
    useAuth()

  // LOAD FACTORY
  useEffect(() => {

    const loadFactory = async () => {

      try {

        // WAIT FOR AUTH HYDRATION
        if (loading) return

        // NO USER
        if (!user) {

          // SEND TO MAIN ENTRY FLOW
          navigate("/")

          return
        }

        // GET CURRENT FACTORY
        const factory =
          await getCurrentFactory()

        // FACTORY FOUND
        if (factory) {

          setFactoryNameState(
            factory.name
          )

          // OPTIONAL UI CACHE
          localStorage.setItem(
            "factoryName",
            factory.name
          )

          // KEEP EXISTING TRIAL LOGIC
          if (
            !localStorage.getItem(
              "trialStart"
            )
          ) {

            localStorage.setItem(
              "trialStart",
              new Date().toISOString()
            )
          }

          return
        }

        // NO FACTORY FOUND
        // RETURN TO ENTRY FLOW
        navigate("/")

      } catch (err) {

        console.error(err)

        navigate("/")
      }
    }

    loadFactory()

  }, [user, loading, navigate])

  // WAIT FOR AUTH
  if (loading) {
    return null
  }

  // WAIT FOR FACTORY
  if (!factoryName) {
    return null
  }

  // SCREEN RENDERER
  const renderScreen = () => {

    if (
      activeTab === "dashboard"
    ) {
      return (
        <Dashboard
          setActiveTab={
            setActiveTab
          }
        />
      )
    }

    if (
      activeTab === "production"
    ) {
      return <Production />
    }

    if (
      activeTab === "sales"
    ) {
      return <Sales />
    }

    if (
      activeTab === "expenses"
    ) {
      return <Expenses />
    }

    if (
      activeTab === "debts"
    ) {
      return <Debts />
    }

    if (
      activeTab === "reports"
    ) {
      return (
        <Reports
          setActiveTab={
            setActiveTab
          }
        />
      )
    }

    if (
      activeTab === "loans"
    ) {
      return <Loans />
    }

    if (
      activeTab === "bank"
    ) {
      return <Bank />
    }

    if (
      activeTab === "account"
    ) {
      return <AccountScreen />
    }

if (
  activeTab === "history"
) {
  return <HistoryScreen setActiveTab={setActiveTab} />
}
if (
  activeTab === "migration"
) {
  return <MigrationWizard setActiveTab={setActiveTab} />
}
if (
  activeTab ===
  "admin-dashboard"
) {
  return (
   <AdminDashboard
  onNavigate={setActiveTab}
/>
  )
}

if (
  activeTab ===
  "admin-subscriptions"
) {
  return (
    <AdminSubscriptions />
  )
}
if (
  activeTab ===
  "admin-payments"
) {
  return (
    <AdminPayments />
  )
}
if (
  activeTab ===
  "admin-revenue"
) {
  return (
    <AdminRevenue />
  )
}
if (
  activeTab ===
  "admin-customers"
) {
  return (
    <AdminCustomers />
  )
}
    return (
      <Dashboard
        setActiveTab={
          setActiveTab
        }
      />
    )
  }

  // MAIN APP
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

              <h1 className="text-sm font-bold text-[#0d1b3e]">
                AquaOps
              </h1>

              <p className="text-[10px] text-gray-400">
                {factoryName}
              </p>

            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">

            {/* ACCOUNT */}
            <button
              onClick={() => {
                setActiveTab(
                  "account"
                )
              }}
              className="text-xs bg-[#0d1b3e] text-white px-3 py-1.5 rounded-lg"
            >
              Account
            </button>

{/* ADMIN */}
<button
  onClick={() =>
    setActiveTab(
      "admin-dashboard"
    )
  }
  className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg"
>
  Admin
</button>

            {/* CHANGE FACTORY */}
            <button
              onClick={() => {

                const newName =
                  prompt(
                    "Enter new factory name"
                  )

                if (
                  newName &&
                  newName.trim() !== ""
                ) {

                  setFactoryName(
                    newName
                  )

                  setFactoryNameState(
                    newName
                  )
                }

              }}
              className="text-xs bg-gray-200 px-3 py-1.5 rounded-lg"
            >
              Change
            </button>

          </div>
        </div>

        {/* SCREEN */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {renderScreen()}
        </div>

        {/* NAV */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={
            setActiveTab
          }
        />

      </div>

    </ProtectedRoute>
  )
}