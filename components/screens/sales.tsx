"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { ShoppingCart } from "lucide-react"

export function Sales() {
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    bagsSold: "",
    pricePerBag: "",
    amountPaid: "",
  })

  const total =
    Number(form.bagsSold || 0) * Number(form.pricePerBag || 0)

  const balance =
    total - Number(form.amountPaid || 0)

  const handleSubmit = async () => {
    const factoryId = getFactoryId()

    if (!factoryId) {
      alert("Factory not found")
      return
    }

    if (
      !form.customerName ||
      !form.bagsSold ||
      !form.pricePerBag ||
      !form.amountPaid
    ) {
      alert("Please fill all fields")
      return
    }

    if (Number(form.amountPaid) > total) {
      alert("Amount paid cannot exceed total")
      return
    }

    const { error } = await supabase.from("sales").insert([
      {
        factory_id: factoryId,
        date: form.date,
        customer_name: form.customerName,
        bags_sold: Number(form.bagsSold),
        price_per_bag: Number(form.pricePerBag),
        total_amount: total,
        amount_paid: Number(form.amountPaid),
        balance: balance,
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
    }, 1500)
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">Sales</h1>
        <p className="text-xs text-gray-500">Record daily sales</p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* CUSTOMER */}
        <input
          type="text"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) =>
            setForm({ ...form, customerName: e.target.value })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* BAGS */}
        <input
          type="number"
          placeholder="Bags Sold"
          value={form.bagsSold}
          onChange={(e) =>
            setForm({ ...form, bagsSold: e.target.value })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price per Bag"
          value={form.pricePerBag}
          onChange={(e) =>
            setForm({ ...form, pricePerBag: e.target.value })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* AMOUNT PAID */}
        <input
          type="number"
          placeholder="Amount Paid"
          value={form.amountPaid}
          onChange={(e) =>
            setForm({ ...form, amountPaid: e.target.value })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* LIVE PREVIEW */}
        <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
          <p>Total: ₦{total.toLocaleString()}</p>

          <p
            className={
              balance > 0
                ? "text-red-600 font-medium"
                : "text-green-600 font-medium"
            }
          >
            Balance: ₦{balance.toLocaleString()}
          </p>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          className={`w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] ${
            saved
              ? "bg-green-600 text-white"
              : "bg-[#2563eb] text-white"
          }`}
        >
          {saved ? "Saved" : "Save Sale"}
        </button>

      </div>

      {/* INFO CARD */}
      <div className="bg-blue-50 p-3 rounded-xl text-sm text-[#0d1b3e]">
        <div className="flex items-center gap-2">
          <ShoppingCart size={16} />
          <span>Track sales and customer payments</span>
        </div>
      </div>

    </div>
  )
}