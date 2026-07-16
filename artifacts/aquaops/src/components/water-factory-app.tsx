import { useState, useEffect } from "react"
import { Dashboard } from "@/components/screens/dashboard"
import { Production } from "@/components/screens/production"
import { Sales } from "@/components/screens/sales"
import { Expenses } from "@/components/screens/expenses"
import { Debts } from "@/components/screens/debts"
import { BottomNav } from "@/components/bottom-nav"
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
import { DataMigration } from "@/components/screens/data-migration"
import { DataSetup } from "@/components/screens/data-setup"
import { getCurrentFactory } from "@/lib/current-factory"
import { SuspendedScreen } from "@/components/screens/suspended-screen"
import { InactiveScreen }  from "@/components/screens/inactive-screen"
import { ArchivedScreen }  from "@/components/screens/archived-screen"
import { DemoBanner }      from "@/components/ui/demo-banner"
import { DEMO_FACTORY_NAME } from "@/data/demo-data"
import { AdminDashboard } from "@/components/screens/admin-dashboard"
import { AdminPayments } from "@/components/screens/admin-payments"
import { AdminRevenue } from "@/components/screens/admin-revenue"
import { AdminCustomers }  from "@/components/screens/admin-customers"
import { OfflineIndicator } from "@/components/offline-indicator"
import { RenewSubscription } from "@/components/screens/renew-subscription"
import { UserManagement } from "@/components/screens/user-management"
import { MigrationWizard } from "@/components/screens/migration-wizard"
import { supabase } from "@/lib/supabase"
import { supportUrl } from "@/config/support"
import { StockScreen } from "@/components/screens/stock"
import { CustomersModule } from "@/components/screens/customers-module"

function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const check = async () => {
      try {
        if (!supabase) return
        const { data: { user } } = await supabase.auth.getUser()
        if (!user?.email) return
        const { data } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", user.email)
          .maybeSingle()
        setIsAdmin(!!data)
      } catch {
        setIsAdmin(false)
      }
    }
    check()
  }, [])
  return isAdmin
}

function AdminGuard({
  isAdmin,
  setActiveTab,
  children,
}: {
  isAdmin: boolean
  setActiveTab: (tab: string) => void
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!isAdmin) setActiveTab("dashboard")
  }, [isAdmin, setActiveTab])
  if (!isAdmin) return null
  return <>{children}</>
}

export default function WaterFactoryApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [factoryName, setFactoryNameState] = useState<string | null>(null)
  const [factoryStatus, setFactoryStatus] = useState<string>("active")
  const [userRole, setUserRole] = useState<string>("owner")
  const [showDropdown, setShowDropdown] = useState(false)
  const [, navigate] = useLocation()
  const [isDemoMode] = useState(() => sessionStorage.getItem("aquaops_demo") === "true")
  const exitDemo = () => { sessionStorage.removeItem("aquaops_demo"); window.location.href = "/" }
  const { user, loading } = useAuth()
  const isAdmin = useIsAdmin()

  useEffect(() => {
        // DEMO MODE — bypass auth and factory loading
    if (isDemoMode) {
      setFactoryNameState(DEMO_FACTORY_NAME)
      setFactoryStatus("active")
      return
    }

    const loadFactory = async () => {
      try {
        if (loading) return
        if (!user) { navigate("/"); return }
        const factory = await getCurrentFactory()
        if (factory) {
                    setFactoryNameState(
            factory.name
          )

           setFactoryStatus(factory.status || "active")
          const role = factory.role || "owner"
          setUserRole(role)
          if (role === "data_entry") setActiveTab("production")

          // OPTIONAL UI CACHE
          localStorage.setItem("factoryName", factory.name)
          if (!localStorage.getItem("trialStart")) {
            localStorage.setItem("trialStart", new Date().toISOString())
          }
          return
        }

        // NO FACTORY — CHECK FOR PENDING INVITATION
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()

        if (currentUser?.email) {
          const { data: invite } =
            await supabase
              .from("factory_invitations")
              .select("id, factory_id, role")
              .eq("email", currentUser.email)
              .is("accepted_at", null)
              .limit(1)
              .maybeSingle()

          if (invite) {
            const { error: joinError } =
              await supabase
                .from("factory_users")
                .insert({
                  user_id: currentUser.id,
                  factory_id: invite.factory_id,
                  role: invite.role,
                  email: currentUser.email,
                  is_active: true,
                })

            if (!joinError) {
              await supabase
                .from("factory_invitations")
                .update({
                  accepted_at:
                    new Date().toISOString(),
                })
                .eq("id", invite.id)

              window.location.reload()
              return
            }
          }
        }

        navigate("/")
      } catch (err) {
        console.error(err)
        navigate("/")
      }
    }
    loadFactory()

  }, [user, loading, navigate])

  useEffect(() => {
    const handleNavigate = (
      e: Event
    ) => {
      const tab = (
        e as CustomEvent
      ).detail
      if (tab) setActiveTab(tab)
    }

    window.addEventListener(
      "aquaops:navigate",
      handleNavigate
    )

    return () => {
      window.removeEventListener(
        "aquaops:navigate",
        handleNavigate
      )
    }
  }, [])

  // WAIT FOR AUTH (skip in demo mode)
  if (!isDemoMode && loading) {
    return null
  }

  // WAIT FOR FACTORY
  if (!factoryName) {
    return null
  }

  // STATUS ENFORCEMENT (live users only)
  if (!isDemoMode && factoryStatus === "suspended") return <SuspendedScreen />
  if (!isDemoMode && factoryStatus === "inactive")  return <InactiveScreen />
  if (!isDemoMode && factoryStatus === "archived")  return <ArchivedScreen />

  // ── SUSPENDED SCREEN ───────────────────────────────────────
  if (factoryStatus === "suspended") {
    return (
      <ProtectedRoute>
                 
        <div className="h-screen bg-[#eef0f5] max-w-md mx-auto flex flex-col items-center justify-center p-8 text-center">
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-xl font-bold text-[#0d1b3e] mb-2">Account Suspended</h2>
          <p className="text-sm text-gray-600 mb-6">
            Your account has been suspended. Please contact support to restore access.
          </p>
          <a
            href={supportUrl("Hello AquaOps Support,\n\nMy account has been suspended. Please assist me in restoring access.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2563eb] text-white px-6 py-3 rounded-xl text-sm font-semibold mb-3"
          >
            Contact Support
          </a>
          <button
            onClick={async () => { await signOutUser() }}
            className="text-sm text-red-600 font-medium"
          >
            Sign Out
          </button>
        </div>
         
      </ProtectedRoute>
    )
  }

  // SCREEN RENDERER
  const renderScreen = () => {

    // DATA ENTRY ROLE RESTRICTION
    const ALLOWED_DATA_ENTRY = [
      "production",
      "sales",
      "expenses",
      "stock",
    ]

    if (
      userRole === "data_entry" &&
      !ALLOWED_DATA_ENTRY.includes(activeTab)
    ) {
      return <Production />
    }

    if (
      activeTab === "dashboard"
    ) {
      return (
        <Dashboard
          setActiveTab={setActiveTab}
          isDemoMode={isDemoMode}
        />
      )
    }
    if (activeTab === "production")          return <Production />
    if (activeTab === "sales")               return <Sales />
    if (activeTab === "customers") {
  return (
    <CustomersModule
      setActiveTab={setActiveTab}
    />
  )
}
    if (activeTab === "expenses")            return <Expenses />
    if (activeTab === "debts")               return <Debts />
    if (activeTab === "reports")             return <Reports setActiveTab={setActiveTab} />
    if (activeTab === "loans")               return <Loans />
    if (activeTab === "bank")                return <Bank />
    if (activeTab === "account") {
      return (
        <AccountScreen
          setActiveTab={setActiveTab}
        />
      )
    }

if (
  activeTab === "history"
) {
  return <HistoryScreen setActiveTab={setActiveTab} />
}

if (activeTab === "data-migration") {
  return <DataMigration setActiveTab={setActiveTab} />
}
    if (activeTab === "data-setup") {
  return (
    <DataSetup setActiveTab={setActiveTab} />
  )
}
    if (activeTab === "renew-subscription") {
      return (
        <RenewSubscription
          setActiveTab={setActiveTab}
        />
      )
    }

    if (activeTab === "migration") {
      return (
        <MigrationWizard
          setActiveTab={setActiveTab}
        />
      )
    }

    if (activeTab === "user-management") {
      return (
        <UserManagement
          setActiveTab={setActiveTab}
        />
      )
    }

    if (activeTab === "admin-dashboard") {
      return (
        <AdminGuard isAdmin={isAdmin} setActiveTab={setActiveTab}>
          <AdminDashboard onNavigate={setActiveTab} />
        </AdminGuard>
      )
    }

    if (activeTab === "admin-subscriptions") {
      return (
        <AdminGuard isAdmin={isAdmin} setActiveTab={setActiveTab}>
          <AdminSubscriptions />
        </AdminGuard>
      )
    }

    if (activeTab === "admin-payments") {
      return (
        <AdminGuard isAdmin={isAdmin} setActiveTab={setActiveTab}>
          <AdminPayments />
        </AdminGuard>
      )
    }

    if (activeTab === "admin-revenue") {
      return (
        <AdminGuard isAdmin={isAdmin} setActiveTab={setActiveTab}>
          <AdminRevenue />
        </AdminGuard>
      )
    }

    if (activeTab === "admin-customers") {
      return (
        <AdminGuard isAdmin={isAdmin} setActiveTab={setActiveTab}>
          <AdminCustomers />
        </AdminGuard>
      )
    }

    if (activeTab === "stock") return <StockScreen setActiveTab={setActiveTab} />
    return <Dashboard setActiveTab={setActiveTab} />
  }
  // DEMO SHELL — no auth required
  if (isDemoMode) {
    return (
      <div className="h-screen bg-[#eef0f5] max-w-md mx-auto flex flex-col overflow-hidden">
        <DemoBanner onSignUp={exitDemo} />
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm shrink-0">
          <div className="flex items-center gap-2">
            <img src="/icon-192.png" alt="AquaOps Logo" className="w-8 h-8 rounded" />
            <div>
              <h1 className="text-sm font-bold text-[#0d1b3e]">AquaOps</h1>
              <p className="text-[10px] text-gray-400">{factoryName}</p>
            </div>
          </div>
          <button onClick={exitDemo} className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg">
            Exit Demo
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-1">{renderScreen()}</div>
               <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
        />
      </div>
    )
  }

  // MAIN APP
  return (
    <ProtectedRoute>
      <div className="h-screen bg-[#eef0f5] max-w-md mx-auto flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">

          <div className="flex items-center gap-2">
            <img src="/icon-192.png" alt="AquaOps Logo" className="w-8 h-8 rounded" />
            <div>
              <h1 className="text-sm font-bold text-[#0d1b3e]">AquaOps</h1>
              <p className="text-[10px] text-gray-400">{factoryName}</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">

            {isAdmin && (
              <button
                onClick={() => setActiveTab("admin-dashboard")}
                className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg"
              >
                Admin
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowDropdown((v) => !v)}
                className="w-9 h-9 rounded-full bg-[#0d1b3e] text-white font-bold text-sm flex items-center justify-center shadow-sm"
              >
                {factoryName?.[0]?.toUpperCase() ?? "?"}
              </button>

              {showDropdown && (
                <div>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                  <div className="absolute right-0 top-11 z-50 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs font-bold text-[#0d1b3e] truncate">{factoryName}</p>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{user?.email ?? ""}</p>
                    {isAdmin && (
                        <span className="inline-block mt-1 text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                          Administrator
                        </span>
                      )}
                      {!isAdmin && userRole === "data_entry" && (
                        <span className="inline-block mt-1 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                          Data Entry Staff
                        </span>
                      )}
                    </div>
                    {userRole === "owner" && (
                      <button
                        onClick={() => { setShowDropdown(false); setActiveTab("account") }}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-[#0d1b3e] hover:bg-gray-50 border-b border-gray-50"
                      >
                        👤 Account & Billing
                      </button>
                    )}

                    {!isAdmin && userRole === "owner" && (
                      <button
                        onClick={() => { setShowDropdown(false); setActiveTab("user-management") }}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-[#0d1b3e] hover:bg-gray-50 border-b border-gray-50"
                      >
                        👥 Team Members
                      </button>
                    )}
                    <button
                      onClick={async () => { setShowDropdown(false); await signOutUser() }}
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

        <OfflineIndicator />

        {/* SCREEN */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {renderScreen()}
        </div>

        {/* NAV */}
               <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
        />

      </div>
    </ProtectedRoute>
  )
}