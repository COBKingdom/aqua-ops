"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ShoppingCart } from "lucide-react"
import { getFactoryId } from "@/lib/factory"
  declare global {
   interface Window {
    gtag: any
  }
}
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
    const factoryId = getFactoryId()
    if (!form.bagsSold || !form.pricePerBag || !form.customerName) return

    const total =
      parseInt(form.bagsSold) * parseInt(form.pricePerBag)

    const paid = parseInt(form.amountPaid || "0")

    const { error } = await supabase.from("sales").insert([
      {
        factory_id: factoryId,
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
   window.gtag('event', 'sale_recorded', {
    value: total,
})
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
  <div className="space-y-4 p-3 pb-20">

    {/* HEADER */}
    <header className="pt-1">
      <h1 className="text-lg font-bold text-[#0d1b3e]">Sales</h1>
      <p className="text-xs text-gray-500">Record daily sales</p>
    </header>

    <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

      {/* DATE */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#0d1b3e]">
          Date
        </label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />
      </div>

      {/* PRODUCT TYPE */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#0d1b3e]">
          Product Type
        </label>

        <div className="grid grid-cols-2 gap-2">

          <button
            onClick={() => setForm({ ...form, productType: "sachet" })}
            className={`h-11 rounded-lg text-sm font-medium ${
              form.productType === "sachet"
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb]"
            }`}
          >
            Sachet
          </button>

          <button
            onClick={() => setForm({ ...form, productType: "bottle" })}
            className={`h-11 rounded-lg text-sm font-medium ${
              form.productType === "bottle"
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb]"
            }`}
          >
            Bottle
          </button>

        </div>
      </div>

      {/* QUANTITY */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#0d1b3e]">
          Quantity Sold
        </label>
        <input
          type="number"
          placeholder="e.g. 50 bags"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />
      </div>

      {/* AMOUNT */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#0d1b3e]">
          Amount (₦)
        </label>
        <input
          type="number"
          placeholder="e.g. 25000"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={!form.amount || !form.quantity}
        className="w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97]"
      >
        Save Sale
      </button>

    </div>

  </div>
)
}