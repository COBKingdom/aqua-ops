"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Wallet } from "lucide-react"
import { getFactoryId } from "@/lib/factory"
declare global {
  interface Window {
    gtag: any
  }
}
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
     window.gtag('event', 'expense_added', {
      value: parseInt(form.amount),
})
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
  <div className="space-y-4 p-3 pb-20">

    {/* HEADER */}
    <header className="pt-1">
      <h1 className="text-lg font-bold text-[#0d1b3e]">Expenses</h1>
      <p className="text-xs text-gray-500">Record daily expenses</p>
    </header>

    <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

      {/* DATE */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#0d1b3e]">Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />
      </div>

      {/* CATEGORY */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#0d1b3e]">Category</label>
        <input
          type="text"
          placeholder="e.g. Diesel, Salary"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />
      </div>

      {/* AMOUNT */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#0d1b3e]">Amount (₦)</label>
        <input
          type="number"
          placeholder="e.g. 5000"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />
      </div>

      {/* NOTE */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[#0d1b3e]">Note</label>
        <input
          type="text"
          placeholder="Optional"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />
      </div>

      {/* SAVE */}
      <button
        onClick={handleSubmit}
        disabled={!form.amount}
        className="w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97]"
      >
        Save Expense
      </button>

    </div>
  </div>
)
}