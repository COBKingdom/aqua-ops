

import { useState, useEffect, useRef } from "react"

import { supabase }    from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import { enqueue }     from "@/lib/offline-db"
import { useOffline }  from "@/contexts/OfflineContext"
import { getCustomers, type Customer } from "@/lib/customers"

import {
  ShoppingCart,
  UserCircle2,
  X,
} from "lucide-react"

export function Sales() {
  const [saved, setSaved] =
    useState(false)

  const [savedOffline, setSavedOffline] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const { refreshCounts } = useOffline()

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
    
const [linkCustomer, setLinkCustomer] = useState(false)

const [linkedCustomer, setLinkedCustomer] =
  useState<Customer | null>(null)

const [customerSearch, setCustomerSearch] =
  useState("")

const [customerResults, setCustomerResults] =
  useState<Customer[]>([])

const [allCustomers, setAllCustomers] =
  useState<Customer[]>([])

const [showDropdown, setShowDropdown] =
  useState(false)

const searchRef =
  useRef<HTMLInputElement>(null)

  useEffect(() => {
  if (
    linkCustomer &&
    allCustomers.length === 0
  ) {
    getCustomers()
      .then(setAllCustomers)
  }
}, [linkCustomer, allCustomers.length])

useEffect(() => {
  if (!customerSearch.trim()) {
    setCustomerResults([])
    return
  }

  const q =
    customerSearch.toLowerCase()

  setCustomerResults(
    allCustomers
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.phone ?? "").includes(q) ||
          (c.factory_code ?? "")
            .toLowerCase()
            .includes(q)
      )
      .slice(0, 6)
  )

  setShowDropdown(true)

}, [customerSearch, allCustomers])

function selectCustomer(c: Customer) {
  setLinkedCustomer(c)

  setForm((prev) => ({
    ...prev,
    customerName: c.name,
  }))

  setCustomerSearch(c.name)

  setShowDropdown(false)
}

function clearLinkedCustomer() {
  setLinkedCustomer(null)

  setCustomerSearch("")

  setForm((prev) => ({
    ...prev,
    customerName: "",
  }))
}
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
  await getFactoryId()

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

const saleRecord = {
  factory_id: factoryId,

  date: form.date,

  customer_name:
    form.customerName,

  customer_id:
    linkedCustomer?.id ?? null,

  product_type:
    form.productType,

  bags_sold:
    Number(form.bagsSold),

  price_per_bag:
    Number(form.pricePerBag),

  total_amount:
    totalAmount,

  amount_paid:
    Number(form.amountPaid || 0),

  balance,
}

        if (!navigator.onLine) {
          await enqueue("sales", saleRecord)
          refreshCounts()
          setSavedOffline(true)
          setSaved(true)
        } else {
          const { error } = await supabase
            .from("sales")
            .insert([{ ...saleRecord, local_id: crypto.randomUUID() }])

          if (error) {
            // Fallback: save locally
            await enqueue("sales", saleRecord)
            refreshCounts()
            setSavedOffline(true)
          }

          setSaved(true)
        }

        setTimeout(() => {
          setSaved(false)
          setSavedOffline(false)
          setLinkedCustomer(null)

          setCustomerSearch("")

          setLinkCustomer(false)

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
{!linkCustomer ? (
  <div className="space-y-1.5">
    <input
      type="text"
      placeholder="Customer Name"
      value={form.customerName}
      onChange={(e) =>
        setForm({
          ...form,
          customerName: e.target.value,
        })
      }
      className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
    />

    <button
      type="button"
      onClick={() => setLinkCustomer(true)}
      className="flex items-center gap-1.5 text-xs text-[#2563eb] font-medium"
    >
      <UserCircle2 size={13} />
      Link to registered customer
    </button>
  </div>
) : (
  <div className="relative">
    <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 h-11">
      <UserCircle2
        size={15}
        className="text-blue-500 shrink-0"
      />

      {linkedCustomer ? (
        <div className="flex-1 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#0d1b3e]">
              {linkedCustomer.name}
            </p>

            <p className="text-[10px] text-gray-400">
              {linkedCustomer.factory_code}
            </p>
          </div>

          <button
            type="button"
            onClick={clearLinkedCustomer}
            className="w-6 h-6 flex items-center justify-center rounded text-gray-400"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <input
          ref={searchRef}
          autoFocus
          type="text"
          placeholder="Search by name, phone or code..."
          value={customerSearch}
          onChange={(e) =>
            setCustomerSearch(e.target.value)
          }
          className="flex-1 bg-transparent text-sm outline-none"
        />
      )}
    </div>

    {showDropdown &&
      customerResults.length > 0 &&
      !linkedCustomer && (
        <div className="absolute z-10 top-12 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {customerResults.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => selectCustomer(c)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 text-left border-b border-gray-50 last:border-0"
            >
              <div className="w-7 h-7 rounded-full bg-[#eef0f5] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-[#0d1b3e]">
                  {c.name
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[#0d1b3e] truncate">
                  {c.name}
                </p>

                <p className="text-[10px] text-gray-400">
                  {c.factory_code}
                  {c.area
                    ? ` · ${c.area}`
                    : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

    <button
      type="button"
      onClick={() => {
        setLinkCustomer(false)
        clearLinkedCustomer()
      }}
      className="mt-1 text-xs text-gray-400"
    >
      Cancel — type name manually instead
    </button>
  </div>
)}

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