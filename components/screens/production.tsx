"use client"

import { useState } from "react"
import { Check, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore, type ProductType, type Shift } from "@/lib/store"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
  declare global {
   interface Window {
    gtag: any
  }
}
export function Production() {
  const { addProduction } = useAppStore()
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    productType: "sachet" as ProductType,
    bagsProduced: "",
    piecesPerBag: "20",
    shift: "morning" as Shift,
  })

  const handleSubmit = async () => {
    const factoryId = getFactoryId()
    if (!form.bagsProduced || !form.piecesPerBag) return

    // ✅ SAVE TO SUPABASE
    const { error } = await supabase.from("production").insert([
      {
        factory_id: factoryId,
        date: form.date,
        product_type: form.productType,
        bags_produced: parseInt(form.bagsProduced),
        pieces_per_bag: parseInt(form.piecesPerBag),
        shift: form.shift,
      },
    ])

    if (error) {
      console.error(error)
      alert("Error saving to database")
      return
    }
    window.gtag('event', 'production_saved', {
      value: parseInt(form.bagsProduced),
})
    // ✅ KEEP EXISTING LOCAL STATE
    addProduction({
      date: form.date,
      productType: form.productType,
      bagsProduced: parseInt(form.bagsProduced),
      piecesPerBag: parseInt(form.piecesPerBag),
      shift: form.shift,
    })

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
      setForm({
        ...form,
        bagsProduced: "",
      })
    }, 2000)
  }

return (
  <div className="space-y-3 p-3 pb-16">

    {/* HEADER */}
    <header className="pt-1">
      <h1 className="text-lg font-bold text-[#0d1b3e]">Production</h1>
      <p className="text-xs text-gray-500">Record daily production</p>
    </header>

    <Card className="border border-gray-100 shadow-sm">
      <CardContent className="space-y-3 p-4">

        {/* DATE */}
        <div className="space-y-1">
          <Label htmlFor="date" className="text-sm font-medium text-[#0d1b3e]">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="h-11 text-sm"
          />
        </div>

        {/* PRODUCT TYPE */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-[#0d1b3e]">
            Product Type
          </Label>
          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              onClick={() => setForm({ ...form, productType: "sachet" })}
              className={`h-11 rounded-lg text-sm font-medium transition ${
                form.productType === "sachet"
                  ? "bg-[#2563eb] text-white"
                  : "bg-blue-50 text-[#2563eb]"
              }`}
            >
              Sachet
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, productType: "bottle" })}
              className={`h-11 rounded-lg text-sm font-medium transition ${
                form.productType === "bottle"
                  ? "bg-[#2563eb] text-white"
                  : "bg-blue-50 text-[#2563eb]"
              }`}
            >
              Bottle
            </button>

          </div>
        </div>

        {/* BAGS */}
        <div className="space-y-1">
          <Label htmlFor="bags" className="text-sm font-medium text-[#0d1b3e]">
            Bags Produced
          </Label>
          <Input
            id="bags"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 120"
            value={form.bagsProduced}
            onChange={(e) => setForm({ ...form, bagsProduced: e.target.value })}
            className="h-11 text-sm"
          />
        </div>

        {/* PIECES */}
        <div className="space-y-1">
          <Label htmlFor="pieces" className="text-sm font-medium text-[#0d1b3e]">
            Pieces per Bag
          </Label>
          <Input
            id="pieces"
            type="number"
            inputMode="numeric"
            placeholder="20"
            value={form.piecesPerBag}
            onChange={(e) => setForm({ ...form, piecesPerBag: e.target.value })}
            className="h-11 text-sm"
          />
        </div>

        {/* SAVE BUTTON (MOVED UP + COMPACT) */}
        <button
          onClick={handleSubmit}
          disabled={!form.bagsProduced || !form.piecesPerBag || saved}
          className={`w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] ${
            saved
              ? "bg-green-600 text-white"
              : "bg-[#2563eb] text-white"
          }`}
        >
          {saved ? "Saved" : "Save Production"}
        </button>

      </CardContent>
    </Card>
  </div>
)
}