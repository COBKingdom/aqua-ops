"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { Factory } from "lucide-react"

export function Production() {
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    productType: "sachet",
    bagsProduced: "",
    piecesPerBag: "20",
    shift: "morning",
  })

  const handleSubmit = async () => {
    const factoryId = getFactoryId()

    if (!factoryId) {
      alert("Factory not found")
      return
    }

    if (!form.bagsProduced || !form.piecesPerBag) {
      alert("Please fill required fields")
      return
    }

    const { error } = await supabase.from("production").insert([
      {
        factory_id: factoryId,
        date: form.date,
        product_type: form.productType,
        bags_produced: Number(form.bagsProduced),
        pieces_per_bag: Number(form.piecesPerBag),
        shift: form.shift,
      },
    ])

    if (error) {
      console.error(error)
      alert("Error saving production")
      return
    }

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
      setForm({
        ...form,
        bagsProduced: "",
      })
    }, 1500)
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">Production</h1>
        <p className="text-xs text-gray-500">Record daily production</p>
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

        {/* PRODUCT TYPE */}
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

        {/* BAGS */}
        <input
          type="number"
          placeholder="Bags Produced"
          value={form.bagsProduced}
          onChange={(e) => setForm({ ...form, bagsProduced: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* PIECES */}
        <input
          type="number"
          placeholder="Pieces per Bag"
          value={form.piecesPerBag}
          onChange={(e) => setForm({ ...form, piecesPerBag: e.target.value })}
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
          {saved ? "Saved" : "Save Production"}
        </button>

      </div>

      {/* QUICK HINT CARD (MATCH DASHBOARD FEEL) */}
      <div className="bg-blue-50 p-3 rounded-xl text-sm text-[#0d1b3e]">
        <div className="flex items-center gap-2">
          <Factory size={16} />
          <span>Track daily output to measure performance</span>
        </div>
      </div>

    </div>
  )
}