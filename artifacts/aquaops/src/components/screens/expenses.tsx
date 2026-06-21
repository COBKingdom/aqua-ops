

import { useState } from "react"

import { supabase } from "@/lib/supabase"

import { getFactoryId } from "@/lib/factory"

export function Expenses() {
  const [loading, setLoading] =
    useState(false)

  const [saved, setSaved] =
    useState(false)

  const [amount, setAmount] =
    useState("")

  const [notes, setNotes] =
    useState("")

  const [costGroup, setCostGroup] =
    useState("Material Cost")

  const [category, setCategory] =
    useState("Nylon")

  const categoryOptions = {
    "Material Cost": [
      "Nylon",
      "Packaging",
      "Caps",
      "Labels",
      "Chemicals",
      "Bottles",
      "Cartons",
      "Other Material",
    ],

    "Production Cost": [
      "Diesel",
      "Petrol",
      "Electricity",
      "Machine Repairs",
      "Factory Labor",
      "Generator",
      "Maintenance",
      "Water Treatment",
      "Other Production",
    ],

    "Other Expense": [
      "Commission",
      "Transport",
      "Office Expense",
      "Rent",
      "Marketing",
      "Internet",
      "Staff Welfare",
      "Miscellaneous",
    ],
  }

  const handleCostGroupChange = (
    value: string
  ) => {
    setCostGroup(value)

    const firstCategory =
      categoryOptions[
        value as keyof typeof categoryOptions
      ][0]

    setCategory(firstCategory)
  }

  const handleSave = async () => {
    try {
      setLoading(true)

const factoryId =
  await getFactoryId()

      if (!factoryId) {
        alert("Factory not found")
        return
      }

      if (!amount) {
        alert(
          "Please enter amount"
        )

        return
      }

      const { error } =
        await supabase
          .from("expenses")
          .insert({
            factory_id: factoryId,

            amount:
              Number(amount),

            notes,

            cost_group:
              costGroup,

            category,
          })

      if (error) {
        alert(error.message)
        return
      }

      // RESET FORM
      setAmount("")
      setNotes("")

      // SUCCESS STATE
      setSaved(true)

      setTimeout(() => {
        setSaved(false)
      }, 2000)

    } catch (error) {
      console.error(error)

      alert(
        "Failed to save entry"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Operational Costs
        </h1>

        <p className="text-sm text-gray-500">
          Track factory operational costs
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">

        {/* COST GROUP */}
        <div>
          <label className="text-sm font-medium">
            Cost Group
          </label>

          <select
            value={costGroup}
            onChange={(e) =>
              handleCostGroupChange(
                e.target.value
              )
            }
            className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none"
          >
            <option>
              Material Cost
            </option>

            <option>
              Production Cost
            </option>

            <option>
              Other Expense
            </option>

          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-sm font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none"
          >

            {categoryOptions[
              costGroup as keyof typeof categoryOptions
            ].map((item) => (
              <option
                key={item}
              >
                {item}
              </option>
            ))}

          </select>
        </div>

        {/* AMOUNT */}
        <div>
          <label className="text-sm font-medium">
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="text-sm font-medium">
            Notes
          </label>

          <textarea
            placeholder="Optional notes"
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
            className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none min-h-[100px]"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-medium text-white transition ${
            saved
              ? "bg-green-600"
              : "bg-[#2563eb]"
          }`}
        >
          {loading
            ? "Saving..."
            : saved
            ? "Saved Successfully"
            : "Save Cost Entry"}
        </button>

      </div>

      {/* INFO CARD */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">

        <p className="text-sm font-semibold text-[#0d1b3e]">
          Operational Cost Tracking
        </p>

        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
          AquaOps separates material costs,
          production costs and operational
          expenses to help factories better
          understand profitability and
          operational performance.
        </p>

      </div>

    </div>
  )
}