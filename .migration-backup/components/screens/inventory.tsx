"use client"

import { useState } from "react"
import { ArrowLeft, Package, AlertTriangle, Check, Save } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/lib/store"

interface InventoryProps {
  onBack: () => void
}

export function Inventory({ onBack }: InventoryProps) {
  const { inventory, updateInventory } = useAppStore()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    nylonRolls: inventory.nylonRolls.toString(),
    bagsInStore: inventory.bagsInStore.toString(),
    bottledWater: inventory.bottledWater.toString(),
  })

  const handleSave = () => {
    updateInventory({
      nylonRolls: parseInt(form.nylonRolls) || 0,
      bagsInStore: parseInt(form.bagsInStore) || 0,
      bottledWater: parseInt(form.bottledWater) || 0,
    })
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setEditing(false)
    }, 1500)
  }

  const stockItems = [
    {
      label: "Nylon Rolls",
      value: inventory.nylonRolls,
      formKey: "nylonRolls" as const,
      lowThreshold: 5,
    },
    {
      label: "Bags in Store",
      value: inventory.bagsInStore,
      formKey: "bagsInStore" as const,
      lowThreshold: 50,
    },
    {
      label: "Bottled Water",
      value: inventory.bottledWater,
      formKey: "bottledWater" as const,
      lowThreshold: 20,
    },
  ]

  return (
    <div className="space-y-6 p-4 pb-24">
      <header className="flex items-center gap-3 pt-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-10 w-10 p-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground">Stock levels</p>
        </div>
      </header>

      {/* Stock Cards */}
      <div className="space-y-3">
        {stockItems.map((item) => {
          const isLow = item.value < item.lowThreshold
          return (
            <Card key={item.label} className="border-0 bg-card shadow-sm">
              <CardContent className="p-4">
                {editing ? (
                  <div className="space-y-2">
                    <Label className="text-base font-medium">{item.label}</Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={form[item.formKey]}
                      onChange={(e) => setForm({ ...form, [item.formKey]: e.target.value })}
                      className="h-14 text-lg"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-3 ${isLow ? "bg-destructive/10" : "bg-primary/10"}`}>
                        <Package className={`h-6 w-6 ${isLow ? "text-destructive" : "text-primary"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        {isLow && (
                          <div className="flex items-center gap-1 text-sm text-destructive">
                            <AlertTriangle className="h-3 w-3" />
                            Low Stock
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-3xl font-bold ${isLow ? "text-destructive" : "text-foreground"}`}>
                      {item.value}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Action Button */}
      {editing ? (
        <Button
          onClick={handleSave}
          disabled={saved}
          className={`h-16 w-full text-lg font-semibold ${
            saved
              ? "bg-success text-success-foreground hover:bg-success"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {saved ? (
            <>
              <Check className="mr-2 h-6 w-6" />
              Saved!
            </>
          ) : (
            <>
              <Save className="mr-2 h-6 w-6" />
              Save Changes
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={() => setEditing(true)}
          className="h-16 w-full bg-primary text-lg font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Package className="mr-2 h-6 w-6" />
          Update Stock
        </Button>
      )}
    </div>
  )
}
