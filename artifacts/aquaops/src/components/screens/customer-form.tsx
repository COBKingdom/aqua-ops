import { useState, useEffect } from "react"
import { ArrowLeft, MapPin } from "lucide-react"
import {
  type Customer,
  type CustomerSource,
  type CustomerType,
  type CustomerPayload,
  CUSTOMER_SOURCE_LABELS,
  CUSTOMER_TYPE_LABELS,
  captureLocation,
  createCustomer,
  updateCustomer,
} from "@/lib/customers"

interface CustomerFormProps {
  customer?: Customer
  onSave: (c: Customer) => void
  onBack: () => void
}

const SOURCE_OPTIONS: CustomerSource[] = [
  "walk_in",
  "driver_referral",
  "existing_customer_referral",
  "association_referral",
  "sales_team",
  "other",
]

const TYPE_OPTIONS: CustomerType[] = [
  "household",
  "retail_shop",
  "distributor",
  "hotel",
  "restaurant",
  "office",
  "school",
  "hospital",
  "other",
]

export function CustomerForm({ customer, onSave, onBack }: CustomerFormProps) {
  const isEdit = !!customer

  const [form, setForm] = useState({
    name: customer?.name ?? "",
    phone: customer?.phone ?? "",
    area: customer?.area ?? "",
    address: customer?.address ?? "",
    customer_source: (customer?.customer_source ?? "walk_in") as CustomerSource,
    customer_type: (customer?.customer_type ?? "household") as CustomerType,
    notes: customer?.notes ?? "",
  })

  const [gps, setGps] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    captureLocation().then((loc) => {
      if (loc) setGps(loc)
    })
  }, [])

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Full name is required"
    if (!form.phone.trim()) e.phone = "Phone number is required"
    if (!form.area.trim()) e.area = "Area is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)

    const payload: CustomerPayload = {
      name: form.name.trim(),
      phone: form.phone.trim() || undefined,
      area: form.area.trim() || undefined,
      address: form.address.trim() || undefined,
      customer_source: form.customer_source,
      customer_type: form.customer_type,
      notes: form.notes.trim() || undefined,
      gps_lat: gps?.lat ?? null,
      gps_lng: gps?.lng ?? null,
      location_source: gps ? (isEdit ? "manual" : "registration") : null,
      location_updated_at: gps ? new Date().toISOString() : null,
    }

    try {
      let result: Customer | null
      if (isEdit && customer) {
        result = await updateCustomer(customer.id, payload)
      } else {
        result = await createCustomer(payload)
      }

      if (!result) {
        alert("Failed to save customer. Please try again.")
        return
      }

      onSave(result)
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-3 pb-24">

      {/* HEADER */}
      <header className="flex items-center gap-3 pt-1">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100"
        >
          <ArrowLeft size={18} className="text-[#0d1b3e]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#0d1b3e]">
            {isEdit ? "Edit Customer" : "Add Customer"}
          </h1>
          <p className="text-xs text-gray-500">
            {isEdit ? "Update customer details" : "Register a new customer"}
          </p>
        </div>
      </header>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">

        {/* NAME */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Emeka Okafor"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full h-11 border rounded-lg px-3 text-sm ${
              errors.name ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 0801 234 5678"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`w-full h-11 border rounded-lg px-3 text-sm ${
              errors.phone ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* AREA */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Area / District <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Surulere"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className={`w-full h-11 border rounded-lg px-3 text-sm ${
              errors.area ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.area && (
            <p className="text-xs text-red-500 mt-1">{errors.area}</p>
          )}
        </div>

        {/* CUSTOMER TYPE */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Customer Type <span className="text-red-500">*</span>
          </label>
          <select
            value={form.customer_type}
            onChange={(e) =>
              setForm({ ...form, customer_type: e.target.value as CustomerType })
            }
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm bg-white"
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {CUSTOMER_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        {/* CUSTOMER SOURCE */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            How did they find us? <span className="text-red-500">*</span>
          </label>
          <select
            value={form.customer_source}
            onChange={(e) =>
              setForm({ ...form, customer_source: e.target.value as CustomerSource })
            }
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm bg-white"
          >
            {SOURCE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {CUSTOMER_SOURCE_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        {/* ADDRESS */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Street Address <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 12 Bode Thomas Street"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Notes <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            placeholder="Any additional notes..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[80px] resize-none"
          />
        </div>

        {/* GPS INDICATOR */}
        {gps && (
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2">
            <MapPin size={13} />
            <span>Location captured automatically</span>
          </div>
        )}

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-12 bg-[#0d1b3e] text-white rounded-xl text-sm font-semibold active:scale-[0.98] transition disabled:opacity-60"
      >
        {loading ? "Saving..." : isEdit ? "Save Changes" : "Register Customer"}
      </button>

    </div>
  )
}
