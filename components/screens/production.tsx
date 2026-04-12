"use client"

import { useState } from "react"
import { Check, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore, type ProductType, type Shift } from "@/lib/store"
import { supabase } from "@/lib/supabase"

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
    if (!form.bagsProduced || !form.piecesPerBag) return

    // ✅ SAVE TO SUPABASE
    const { error } = await supabase.from("production").insert([
      {
        factory_id: "96f00619-05be-40f3-bfcf-fe6881b8922e",
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
    <div className="space-y-6 p-4 pb-24">
      <header className="pt-2">
        <h1 className="text-2xl font-bold text-foreground">Production</h1>
        <p className="text-sm text-muted-foreground">Record daily production</p>
      </header>

      <Card className="border-0 bg-card shadow-sm">
        <CardContent className="space-y-5 p-5">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-base font-medium">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="h-14 text-lg"
            />
          </div>

          {/* Product Type */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Product Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={form.productType === "sachet" ? "default" : "outline"}
                className={`h-14 text-base ${
                  form.productType === "sachet"
                    ? "bg-primary text-primary-foreground"
                    : "border-2 text-foreground"
                }`}
                onClick={() => setForm({ ...form, productType: "sachet" })}
              >
                Sachet Water
              </Button>
              <Button
                type="button"
                variant={form.productType === "bottle" ? "default" : "outline"}
                className={`h-14 text-base ${
                  form.productType === "bottle"
                    ? "bg-primary text-primary-foreground"
                    : "border-2 text-foreground"
                }`}
                onClick={() => setForm({ ...form, productType: "bottle" })}
              >
                Bottled Water
              </Button>
            </div>
          </div>

          {/* Bags Produced */}
          <div className="space-y-2">
            <Label htmlFor="bags" className="text-base font-medium">
              Number of Bags Produced
            </Label>
            <Input
              id="bags"
              type="number"
              inputMode="numeric"
              placeholder="Enter number of bags"
              value={form.bagsProduced}
              onChange={(e) => setForm({ ...form, bagsProduced: e.target.value })}
              className="h-14 text-lg"
            />
          </div>

          {/* Pieces per Bag */}
          <div className="space-y-2">
            <Label htmlFor="pieces" className="text-base font-medium">
              Pieces per Bag
            </Label>
            <Input
              id="pieces"
              type="number"
              inputMode="numeric"
              placeholder="20"
              value={form.piecesPerBag}
              onChange={(e) => setForm({ ...form, piecesPerBag: e.target.value })}
              className="h-14 text-lg"
            />
          </div>

          {/* Shift */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Shift</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={form.shift === "morning" ? "default" : "outline"}
                className={`h-14 text-base ${
                  form.shift === "morning"
                    ? "bg-primary text-primary-foreground"
                    : "border-2 text-foreground"
                }`}
                onClick={() => setForm({ ...form, shift: "morning" })}
              >
                Morning
              </Button>
              <Button
                type="button"
                variant={form.shift === "evening" ? "default" : "outline"}
                className={`h-14 text-base ${
                  form.shift === "evening"
                    ? "bg-primary text-primary-foreground"
                    : "border-2 text-foreground"
                }`}
                onClick={() => setForm({ ...form, shift: "evening" })}
              >
                Evening
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!form.bagsProduced || !form.piecesPerBag || saved}
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
                <Package className="mr-2 h-6 w-6" />
                Save Production
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}