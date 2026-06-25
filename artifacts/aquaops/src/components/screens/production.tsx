import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { Factory, Trash2, Plus } from "lucide-react"

const LOSS_TYPES = [
  "Leakages",
  "Burst Sachets",
  "Broken Bottles",
  "Quality Rejects",
  "Cleaning Waste",
  "Machine Faults",
  "Other",
] as const

type LossRow = {
  id: number
  lossType: string
  otherType: string
  quantity: string
  reason: string
}

let _lossCounter = 1

export function Production() {
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    productType: "sachet",
    bagsProduced: "",
    piecesPerBag: "20",
    shift: "morning",
  })

  const [losses, setLosses] = useState<LossRow[]>([])

  const isBottle = form.productType === "bottle"
  const unitLabel = isBottle ? "Crates Produced" : "Bags Produced"
  const piecesLabel = isBottle ? "Bottles per Crate" : "Sachets per Bag"
  const helperText = isBottle ? "20 bottles per crate" : "20 sachets per bag"

  const grossProduction = Number(form.bagsProduced) || 0
  const totalLosses = losses.reduce(
    (sum, l) => sum + (Number(l.quantity) || 0),
    0
  )
  const netProduction = Math.max(0, grossProduction - totalLosses)

  const addLoss = () => {
    setLosses((prev) => [
      ...prev,
      {
        id: _lossCounter++,
        lossType: "Leakages",
        otherType: "",
        quantity: "",
        reason: "",
      },
    ])
  }

  const removeLoss = (id: number) => {
    setLosses((prev) => prev.filter((l) => l.id !== id))
  }

  const updateLoss = (
    id: number,
    field: keyof Omit<LossRow, "id">,
    value: string
  ) => {
    setLosses((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    )
  }

  const handleSubmit = async () => {
    if (!supabase) {
      alert("Service unavailable. Please try again later.")
      return
    }

    const factoryId = await getFactoryId()

    if (!factoryId) {
      alert("Factory not found")
      return
    }

    if (!form.bagsProduced || !form.piecesPerBag) {
      alert("Please fill required fields")
      return
    }

    if (Number(form.bagsProduced) < 0 || Number(form.piecesPerBag) < 0) {
      alert("Quantities cannot be negative")
      return
    }

    for (const l of losses) {
      if (Number(l.quantity) < 0) {
        alert("Loss quantities cannot be negative")
        return
      }
    }

    setSaving(true)

    const { data: prodData, error: prodError } = await supabase
      .from("production")
      .insert([
        {
          factory_id: factoryId,
          date: form.date,
          product_type: form.productType,
          bags_produced: Number(form.bagsProduced),
          pieces_per_bag: Number(form.piecesPerBag),
          shift: form.shift,
        },
      ])
      .select("id")
      .single()

    if (prodError || !prodData) {
      console.error(prodError)
      alert("Error saving production")
      setSaving(false)
      return
    }

    const productionId = (prodData as { id: string | number }).id

    if (losses.length > 0) {
      const lossRows = losses.map((l) => ({
        production_id: productionId,
        factory_id: factoryId,
        product_type: form.productType,
        loss_type:
          l.lossType === "Other"
            ? l.otherType.trim() || "Other"
            : l.lossType,
        quantity: Number(l.quantity) || 0,
        reason: l.reason,
      }))

      const { error: lossError } = await supabase
        .from("production_losses")
        .insert(lossRows)

if (lossError) {
  console.error("LOSS ERROR:", lossError)

  alert(
    "Production saved but losses could not be recorded.\n\n" +
    JSON.stringify(lossError, null, 2)
  )
}
    }

    setSaving(false)
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
      setForm((prev) => ({ ...prev, bagsProduced: "" }))
      setLosses([])
    }, 1500)
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">
          Production
        </h1>
        <p className="text-xs text-gray-500">
          Record daily production
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* PRODUCT TYPE */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() =>
              setForm({ ...form, productType: "sachet", piecesPerBag: "20" })
            }
            className={`h-11 rounded-lg text-sm font-medium transition ${
              form.productType === "sachet"
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb]"
            }`}
          >
            Sachet
          </button>

          <button
            onClick={() =>
              setForm({ ...form, productType: "bottle", piecesPerBag: "20" })
            }
            className={`h-11 rounded-lg text-sm font-medium transition ${
              form.productType === "bottle"
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb]"
            }`}
          >
            Bottle
          </button>
        </div>

        {/* GROSS PRODUCTION */}
        <input
          type="number"
          placeholder={unitLabel}
          value={form.bagsProduced}
          onChange={(e) =>
            setForm({ ...form, bagsProduced: e.target.value })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* PIECES PER UNIT */}
        <div className="space-y-1">
          <input
            type="number"
            placeholder={piecesLabel}
            value={form.piecesPerBag}
            onChange={(e) =>
              setForm({ ...form, piecesPerBag: e.target.value })
            }
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
          <p className="text-xs text-gray-500 px-1">{helperText}</p>
        </div>

      </div>

      {/* PRODUCTION LOSSES */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#0d1b3e]">
              Production Losses
            </h2>
            <p className="text-xs text-gray-500">
              Optional — record what was lost
            </p>
          </div>

          <button
            onClick={addLoss}
            className="flex items-center gap-1 bg-blue-50 text-[#2563eb] text-xs font-medium px-3 h-8 rounded-lg"
          >
            <Plus size={13} />
            Add Loss
          </button>
        </div>

        {losses.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-2">
            No losses recorded
          </p>
        )}

        {losses.map((loss) => (
          <div
            key={loss.id}
            className="border border-gray-100 rounded-lg p-3 space-y-2"
          >
            <div className="flex items-center gap-2">
              <select
                value={loss.lossType}
                onChange={(e) =>
                  updateLoss(loss.id, "lossType", e.target.value)
                }
                className="flex-1 h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white"
              >
                {LOSS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeLoss(loss.id)}
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-50 text-red-500 shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>

            {loss.lossType === "Other" && (
              <input
                type="text"
                placeholder="Specify Loss Type"
                value={loss.otherType}
                onChange={(e) =>
                  updateLoss(loss.id, "otherType", e.target.value)
                }
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm"
              />
            )}

            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Quantity Lost"
                value={loss.quantity}
                onChange={(e) =>
                  updateLoss(loss.id, "quantity", e.target.value)
                }
                className="h-10 border border-gray-200 rounded-lg px-3 text-sm"
              />

              <input
                type="text"
                placeholder="Reason"
                value={loss.reason}
                onChange={(e) =>
                  updateLoss(loss.id, "reason", e.target.value)
                }
                className="h-10 border border-gray-200 rounded-lg px-3 text-sm"
              />
            </div>

          </div>
        ))}

      </div>

      {/* SUMMARY */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-1">

        <h2 className="text-sm font-semibold text-[#0d1b3e] mb-2">
          Summary
        </h2>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Gross Production</span>
          <span className="text-sm font-semibold text-[#0d1b3e]">
            {grossProduction.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Total Losses</span>
          <span className="text-sm font-semibold text-red-500">
            {totalLosses.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-semibold text-[#0d1b3e]">
            Net Production
          </span>
          <span className="text-sm font-bold text-[#2563eb]">
            {netProduction.toLocaleString()}
          </span>
        </div>

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={saving}
        className={`w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] disabled:opacity-60 ${
          saved
            ? "bg-green-600 text-white"
            : "bg-[#2563eb] text-white"
        }`}
      >
        {saved ? "Saved Successfully" : saving ? "Saving..." : "Save Production"}
      </button>

      {/* HINT */}
      <div className="bg-blue-50 p-3 rounded-xl text-sm text-[#0d1b3e]">
        <div className="flex items-center gap-2">
          <Factory size={16} />
          <span>
            Track daily output to measure operational performance
          </span>
        </div>
      </div>

    </div>
  )
}