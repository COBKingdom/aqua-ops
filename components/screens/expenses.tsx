"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Wallet } from "lucide-react"
import { getFactoryId } from "@/lib/factory"

export function Expenses() {
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    amount: "",
    notes: "",
  })

  const handleSubmit = async () => {
    const factoryId = getFactoryId()
    if (!form.amount || !form.category) return

    const { error } = await supabase.from("expenses").insert([
      {
       factory_id: factoryId,
        date: form.date,
        category: form.category,
        amount: parseInt(form.amount),
        notes: form.notes,
      },
    ])

    if (error) {
      console.error(error)
      alert("Error saving expense")
      return
    }

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
      setForm({
        ...form,
        amount: "",
        category: "",
        notes: "",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6 p-4 pb-24">
      <header className="pt-2">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <p className="text-sm text-muted-foreground">
          Record daily expenses
        </p>
      </header>

      <Card className="border-0 shadow-sm">
        <CardContent className="space-y-5 p-5">
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              placeholder="e.g. Fuel, Nylon, Labour"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Amount (₦)</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Input
              placeholder="Optional"
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />
          </div>

          <Button onClick={handleSubmit} className="h-14 w-full">
            {saved ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Saved!
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-5 w-5" />
                Save Expense
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}