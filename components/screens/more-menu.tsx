"use client"

import { Users, Package, ChevronRight, Droplets } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Customers } from "./customers"
import { Inventory } from "./inventory"

interface MoreMenuProps {
  subTab: string | null
  onSubTabChange: (subTab: string | null) => void
}

const menuItems = [
  {
    id: "customers",
    label: "Customers",
    description: "View customer debts & history",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "inventory",
    label: "Inventory",
    description: "Check stock levels",
    icon: Package,
    color: "bg-success/10 text-success",
  },
]

export function MoreMenu({ subTab, onSubTabChange }: MoreMenuProps) {
  if (subTab === "customers") {
    return <Customers onBack={() => onSubTabChange(null)} />
  }

  if (subTab === "inventory") {
    return <Inventory onBack={() => onSubTabChange(null)} />
  }

  return (
    <div className="space-y-6 p-4 pb-24">
      <header className="pt-2">
        <h1 className="text-2xl font-bold text-foreground">More</h1>
        <p className="text-sm text-muted-foreground">Additional features</p>
      </header>

      {/* App Logo/Branding */}
      <Card className="border-0 bg-primary/5 shadow-sm">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Droplets className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">AquaTrack</h2>
            <p className="text-sm text-muted-foreground">Water Factory Manager</p>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.id}
              className="cursor-pointer border-0 bg-card shadow-sm transition-colors hover:bg-accent/50"
              onClick={() => onSubTabChange(item.id)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`rounded-full p-3 ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Version Info */}
      <div className="pt-4 text-center">
        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
      </div>
    </div>
  )
}
