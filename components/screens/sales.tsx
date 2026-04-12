"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ShoppingCart } from "lucide-react"

export function Sales() {
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    bagsSold: "",
    pricePerBag: "",
    amountPaid: "",
  })

  const handleSubmit = async () => {
    if (!form.bagsSold || !form.pricePerBag || !form.customerName) return

    const total =
      parseInt(form.bagsSold) * parseInt(form.pricePerBag)

    const paid = parseInt(form.amountPaid || "0")

    const { error } = await supabase.from("sales").insert([
      {
        factory_id: "96f00619-05be-40f3-bfcf-fe6881b8922e",
        date: form.date,
        customer_name: form.customerName,
        bags_sold: parseInt(form.bagsSold),
        price_per_bag: parseInt(form.pricePerBag),
        total_amount: total,
        amount_paid: paid,
        balance: total - paid,
      },
    ])

    if (error) {
      console.error(error)
      alert("Error saving sale")
      return
    }

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
      setForm({
        ...form,
        customerName: "",
        bagsSold: "",
        pricePerBag: "",
        amountPaid: "",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6 p-4 pb-24">
      <header>
        <h1 className="text-2xl font-bold">Sales</h1>
        <p className="text-sm text-muted-foreground">
          Record daily sales
        </p>
      </header>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Customer Name</Label>
            <Input
              placeholder="Enter customer name"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Bags Sold</Label>
            <Input
              type="number"
              value={form.bagsSold}
              onChange={(e) =>
                setForm({ ...form, bagsSold: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Price per Bag (₦)</Label>
            <Input
              type="number"
              value={form.pricePerBag}
              onChange={(e) =>
                setForm({ ...form, pricePerBag: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Amount Paid (₦)</Label>
            <Input
              type="number"
              value={form.amountPaid}
              onChange={(e) =>
                setForm({ ...form, amountPaid: e.target.value })
              }
            />
          </div>

          <Button onClick={handleSubmit} className="w-full h-14">
            {saved ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Saved!
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Save Sale
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}