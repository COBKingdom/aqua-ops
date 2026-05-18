"use client"

import { useState } from "react"

import { supabase } from "@/lib/supabase"

import { getFactoryId } from "@/lib/factory"

import {
  ShoppingCart,
} from "lucide-react"

export function Sales() {
  const [saved, setSaved] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [form, setForm] =
    useState({
      date: new Date()
        .toISOString()
        .split("T")[0],

      customerName: "",

      productType: "sachet",

      bagsSold: "",

      pricePerBag: "",

      amountPaid: "",

      notes: "",
    })

  const isBottle =
    form.productType === "bottle"

  const quantityLabel = isBottle
    ? "Crates Sold"
    : "Bags Sold"

  const priceLabel = isBottle
    ? "Price per Crate"
    : "Price per Bag"

  // LIVE CALCULATIONS
  const totalAmount =
    Number(form.bagsSold || 0) *
    Number(form.pricePerBag || 0)

  const balance =
    totalAmount -
    Number(form.amountPaid || 0)

  const handleSubmit =
    async () => {
      try {
        setLoading(true)

        const factoryId =
          getFactoryId()

        if (!factoryId) {
          alert(
            "Factory not found"
          )

          return
        }

        if (
  !form.customerName ||
  !form.bagsSold ||
  !form.pricePerBag ||
  form.amountPaid === ""
        ) {
          alert(
            "Please complete required fields"
          )

          return
        }

        const { error } =
          await supabase
            .from("sales")
            .insert([
              {
                factory_id:
                  factoryId,

                date: form.date,

                customer_name:
                  form.customerName,

                product_type:
                  form.productType,

                bags_sold:
                  Number(
                    form.bagsSold
                  ),

                price_per_bag:
                  Number(
                    form.pricePerBag
                  ),

                total_amount:
                  totalAmount,

                amount_paid:
                  Number(
                    form.amountPaid || 0
                  ),

                balance,
              },
            ])

        if (error) {
          console.error(error)

          alert(
            "Failed to save sale"
          )

          return
        }

        // SUCCESS
        setSaved(true)

        setTimeout(() => {
          setSaved(false)

          setForm({
            ...form,

            customerName:
              "",

            bagsSold: "",

            pricePerBag:
              "",

            amountPaid: "",

            notes: "",
          })
        }, 1500)

      } catch (error) {
        console.error(error)

        alert(
          "Something went wrong"
        )

      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold text-[#0d1b3e]">
          Sales
        </h1>

        <p className="text-xs text-gray-500">
          Record daily sales
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date:
                e.target.value,
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* CUSTOMER */}
        <input
          type="text"
          placeholder="Customer Name"
          value={
            form.customerName
          }
          onChange={(e) =>
            setForm({
              ...form,
              customerName:
                e.target.value,
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* PRODUCT TYPE */}
        <div className="grid grid-cols-2 gap-2">

          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                productType:
                  "sachet",
              })
            }
            className={`h-11 rounded-lg text-sm font-medium transition ${
              form.productType ===
              "sachet"
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb]"
            }`}
          >
            Sachet
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                productType:
                  "bottle",
              })
            }
            className={`h-11 rounded-lg text-sm font-medium transition ${
              form.productType ===
              "bottle"
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb]"
            }`}
          >
            Bottle
          </button>

        </div>

        {/* QUANTITY */}
        <input
          type="number"
          placeholder={
            quantityLabel
          }
          value={
            form.bagsSold
          }
          onChange={(e) =>
            setForm({
              ...form,
              bagsSold:
                e.target.value,
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder={
            priceLabel
          }
          value={
            form.pricePerBag
          }
          onChange={(e) =>
            setForm({
              ...form,
              pricePerBag:
                e.target.value,
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* AMOUNT PAID */}
        <input
          type="number"
          placeholder="Amount Paid"
          value={
            form.amountPaid
          }
          onChange={(e) =>
            setForm({
              ...form,
              amountPaid:
                e.target.value,
            })
          }
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        {/* LIVE SUMMARY */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">

          <div className="flex justify-between text-sm">
            <span>
              Total Amount
            </span>

            <span className="font-semibold">
              ₦{totalAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>
              Amount Paid
            </span>

            <span className="font-semibold">
              ₦{Number(
                form.amountPaid || 0
              ).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>
              Balance
            </span>

            <span
              className={`font-semibold ${
                balance > 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              ₦{balance.toLocaleString()}
            </span>
          </div>

        </div>

        {/* NOTES */}
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes:
                e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm min-h-[90px]"
        />

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] ${
            saved
              ? "bg-green-600 text-white"
              : "bg-[#2563eb] text-white"
          }`}
        >
          {loading
            ? "Saving..."
            : saved
            ? "Saved Successfully"
            : "Save Sale"}
        </button>

      </div>

      {/* INFO CARD */}
      <div className="bg-blue-50 p-3 rounded-xl text-sm text-[#0d1b3e]">

        <div className="flex items-center gap-2">
          <ShoppingCart size={16} />

          <span>
            Track customer sales,
            debts and product
            movement accurately
          </span>
        </div>

      </div>

    </div>
  )
}