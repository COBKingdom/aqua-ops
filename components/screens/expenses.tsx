"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { Wallet } from "lucide-react"

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

    if (!factoryId) {
      alert("Factory not found")
      return
    }

    if (!form.amount || !form.category) {
      alert("Please fill required fields")
      return
    }

    const { error } = await supabase.from("expenses").insert([
      {
        factory_id: factoryId,
        date: form.date,
        category: form.category,
        amount: Number(form.amount),
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
        category: "",
        amount: "",
        notes: "",
      })
    }, 1500)
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">Expenses</h1>
        <p className="text-xs text-gray-500">Record daily expenses</p>
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

        {/* AMOUNT (NOW FIRST ✅) */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* CATEGORY */}
        <input
          type="text"
          placeholder="Category (e.g. Diesel, Salary)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* NOTES */}
        <input
          type="text"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          className={`w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] ${
            saved
              ? "bg-green-600 text-white"
              : "bg-[#2563eb] text-white"
          }`}
        >
          {saved ? "Saved" : "Save Expense"}
        </button>

      </div>

      {/* INFO CARD */}
      <div className="bg-blue-50 p-3 rounded-xl text-sm text-[#0d1b3e]">
        <div className="flex items-center gap-2">
          <Wallet size={16} />
          <span>Track spending to stay profitable</span>
        </div>
      </div>

    </div>
  )
}