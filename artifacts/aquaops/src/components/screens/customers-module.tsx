import { useState, useEffect } from "react"
import { type Customer, getCurrentUserRole } from "@/lib/customers"
import { CustomerOverview } from "@/components/screens/customer-overview"
import { CustomerRegistry } from "@/components/screens/customer-registry"
import { CustomerProfile } from "@/components/screens/customer-profile"
import { CustomerForm } from "@/components/screens/customer-form"

type ActiveView = "overview" | "registry" | "profile" | "add" | "edit"

interface CustomersModuleProps {
  setActiveTab?: (tab: string) => void
}

export function CustomersModule({ setActiveTab: _setActiveTab }: CustomersModuleProps) {
  const [activeView, setActiveView] = useState<ActiveView>("overview")
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [isOwner, setIsOwner] = useState(false)
  const [roleLoaded, setRoleLoaded] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    getCurrentUserRole().then((role) => {
      setIsOwner(role === "owner")
      setRoleLoaded(true)
    })
  }, [])

  function refresh() {
    setRefreshKey((k) => k + 1)
  }

  function handleSelectCustomer(c: Customer) {
    setSelectedCustomerId(c.id)
    setActiveView("profile")
  }

  function handleAddCustomer() {
    setEditingCustomer(null)
    setActiveView("add")
  }

  function handleEditCustomer(c: Customer) {
    setEditingCustomer(c)
    setActiveView("edit")
  }

  function handleSaveCustomer(_c: Customer) {
    refresh()
    setActiveView("registry")
  }

  function handleBack() {
    if (activeView === "profile") {
      setActiveView("registry")
      setSelectedCustomerId(null)
    } else if (activeView === "add" || activeView === "edit") {
      setActiveView(editingCustomer ? "profile" : "registry")
      setEditingCustomer(null)
    }
  }

  if (!roleLoaded) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-5 h-5 border-2 border-[#0d1b3e] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const showSubNav = activeView === "overview" || activeView === "registry"

  return (
    <div className="flex flex-col h-full relative">

      {/* SUB-NAVIGATION */}
      {showSubNav && (
        <div className="flex bg-white border-b border-gray-100 px-3 pt-2 shrink-0">
          <SubNavTab
            label="Overview"
            active={activeView === "overview"}
            onClick={() => setActiveView("overview")}
          />
          <SubNavTab
            label="Registry"
            active={activeView === "registry"}
            onClick={() => setActiveView("registry")}
          />
        </div>
      )}

      {/* SCREEN CONTENT */}
      <div className="flex-1 overflow-y-auto">

        {activeView === "overview" && (
          <CustomerOverview
            onNavigateToRegistry={() => setActiveView("registry")}
            onSelectCustomer={handleSelectCustomer}
            refreshKey={refreshKey}
          />
        )}

        {activeView === "registry" && (
          <CustomerRegistry
            onSelectCustomer={handleSelectCustomer}
            onAddCustomer={handleAddCustomer}
            isOwner={isOwner}
            refreshKey={refreshKey}
          />
        )}

        {activeView === "profile" && selectedCustomerId && (
          <CustomerProfile
            customerId={selectedCustomerId}
            onBack={handleBack}
            onEdit={handleEditCustomer}
            isOwner={isOwner}
          />
        )}

        {(activeView === "add" || activeView === "edit") && (
          <CustomerForm
            customer={editingCustomer ?? undefined}
            onSave={handleSaveCustomer}
            onBack={handleBack}
          />
        )}

      </div>
    </div>
  )
}

function SubNavTab({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
        active
          ? "border-[#2563eb] text-[#2563eb]"
          : "border-transparent text-gray-500"
      }`}
    >
      {label}
    </button>
  )
}
