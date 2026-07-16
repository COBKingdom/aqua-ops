import { useState, useEffect, useRef, useCallback } from "react"
import {
  ArrowLeft,
  Phone,
  MapPin,
  Tag,
  Users,
  Edit3,
  Download,
  AlertTriangle,
} from "lucide-react"
import QRCode from "qrcode"
import {
  type Customer,
  getCustomer,
  getCustomerSales,
  deactivateCustomer,
  dormancyLabel,
  dormancyBadgeClass,
  formatCurrency,
  CUSTOMER_SOURCE_LABELS,
  CUSTOMER_TYPE_LABELS,
  getDormancyStatus,
} from "@/lib/customers"
import { getFactoryId } from "@/lib/factory"

interface CustomerProfileProps {
  customerId: string
  onBack: () => void
  onEdit: (c: Customer) => void
  isOwner: boolean
}

type Sale = {
  id: string
  date: string
  customer_name: string
  product_type: string
  bags_sold: number
  total_amount: number
  amount_paid: number
  balance: number
}

export function CustomerProfile({
  customerId,
  onBack,
  onEdit,
  isOwner,
}: CustomerProfileProps) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [sales, setSales] = useState<Sale[]>([])
  const [qrDataUrl, setQrDataUrl] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [deactivating, setDeactivating] = useState(false)
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const factoryId = await getFactoryId()
    const [c, s] = await Promise.all([
      getCustomer(customerId),
      factoryId ? getCustomerSales(customerId, factoryId) : Promise.resolve([]),
    ])
    if (c) {
      const dormancyStatus = getDormancyStatus(
        s.length > 0
          ? s.reduce((latest, sale) =>
              sale.date > latest.date ? sale : latest
            ).date
          : null
      )
      const totalBalance = s.reduce((sum, sale) => sum + Number(sale.balance ?? 0), 0)
      setCustomer({ ...c, dormancy_status: dormancyStatus, balance: totalBalance })
      setSales(s)
      const url = await QRCode.toDataURL(c.id, {
        width: 200,
        margin: 1,
        color: { dark: "#0d1b3e", light: "#ffffff" },
      })
      setQrDataUrl(url)
    }
    setLoading(false)
  }, [customerId])

  useEffect(() => {
    load()
  }, [load])

  async function downloadCard() {
    if (!customer || !qrDataUrl || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = 320
    const H = 200
    canvas.width = W
    canvas.height = H

    // Background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, W, H)

    // Header bar
    ctx.fillStyle = "#0d1b3e"
    ctx.fillRect(0, 0, W, 44)

    // Header text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 13px sans-serif"
    ctx.fillText("AquaOps Customer Card", 12, 28)

    // Customer name
    ctx.fillStyle = "#0d1b3e"
    ctx.font = "bold 15px sans-serif"
    ctx.fillText(customer.name, 12, 70)

    // Area
    if (customer.area) {
      ctx.fillStyle = "#6b7280"
      ctx.font = "11px sans-serif"
      ctx.fillText(customer.area, 12, 88)
    }

    // Customer type
    ctx.fillStyle = "#6b7280"
    ctx.font = "11px sans-serif"
    ctx.fillText(CUSTOMER_TYPE_LABELS[customer.customer_type], 12, 106)

    // Code label
    ctx.fillStyle = "#9ca3af"
    ctx.font = "10px sans-serif"
    ctx.fillText("Customer Code", 12, 128)

    // Code value
    ctx.fillStyle = "#0d1b3e"
    ctx.font = "bold 16px monospace"
    ctx.fillText(customer.factory_code, 12, 148)

    // Border line
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, 162)
    ctx.lineTo(W, 162)
    ctx.stroke()

    // Footer
    ctx.fillStyle = "#9ca3af"
    ctx.font = "9px sans-serif"
    ctx.fillText("Scan QR code for delivery recording", 12, 178)
    ctx.fillText("AquaOps by TrueOps Technologies", 12, 192)

    // QR code image
    const qrImg = new Image()
    qrImg.onload = () => {
      ctx.drawImage(qrImg, W - 120, 50, 108, 108)

      // Download
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${customer.factory_code}-card.png`
        a.click()
        URL.revokeObjectURL(url)
      }, "image/png")
    }
    qrImg.src = qrDataUrl
  }

  async function handleDeactivate() {
    if (!customer) return
    setDeactivating(true)
    const ok = await deactivateCustomer(customer.id)
    setDeactivating(false)
    if (ok) {
      onBack()
    } else {
      alert("Failed to deactivate customer. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-[#0d1b3e] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        Customer not found.
      </div>
    )
  }

  const dormancyStatus = customer.dormancy_status ?? "new"
  const totalBalance = customer.balance ?? 0

  return (
    <div className="space-y-3 p-3 pb-24">

      {/* HEADER */}
      <header className="flex items-center gap-3 pt-1">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100"
        >
          <ArrowLeft size={18} className="text-[#0d1b3e]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-[#0d1b3e] truncate">
            {customer.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400">
              {customer.factory_code}
            </span>
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${dormancyBadgeClass(
                dormancyStatus
              )}`}
            >
              {dormancyLabel(dormancyStatus)}
            </span>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={() => onEdit(customer)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50"
          >
            <Edit3 size={16} className="text-blue-600" />
          </button>
        )}
      </header>

      {/* CONTACT CARD */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-2.5">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact Details
        </h2>

        {customer.phone && (
          <div className="flex items-center gap-2.5">
            <Phone size={14} className="text-gray-400 shrink-0" />
            <span className="text-sm text-[#0d1b3e]">{customer.phone}</span>
          </div>
        )}

        {customer.area && (
          <div className="flex items-center gap-2.5">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <span className="text-sm text-[#0d1b3e]">
              {[customer.address, customer.area].filter(Boolean).join(", ")}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2.5">
          <Tag size={14} className="text-gray-400 shrink-0" />
          <span className="text-sm text-[#0d1b3e]">
            {CUSTOMER_TYPE_LABELS[customer.customer_type]}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Users size={14} className="text-gray-400 shrink-0" />
          <span className="text-sm text-[#0d1b3e]">
            {CUSTOMER_SOURCE_LABELS[customer.customer_source]}
          </span>
        </div>

        {customer.gps_lat && (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <MapPin size={12} />
            <span>Location captured</span>
          </div>
        )}
      </div>

      {/* DEBT SUMMARY */}
      {totalBalance > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
            Outstanding Balance
          </p>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(totalBalance)}
          </p>
          <p className="text-xs text-red-400 mt-0.5">
            Across {sales.filter((s) => s.balance > 0).length} unpaid sale(s)
          </p>
        </div>
      )}

      {/* QR CARD */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Customer QR Card
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Use for delivery recording
            </p>
          </div>
          <button
            onClick={downloadCard}
            className="flex items-center gap-1.5 h-8 px-3 bg-[#0d1b3e] text-white rounded-lg text-xs font-medium active:scale-95 transition"
          >
            <Download size={12} />
            Save Card
          </button>
        </div>

        <div className="flex items-center gap-4">
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt="Customer QR Code"
              className="w-24 h-24 rounded-lg border border-gray-100"
            />
          )}
          <div>
            <p className="text-xs text-gray-400">Customer Code</p>
            <p className="text-xl font-mono font-bold text-[#0d1b3e] mt-0.5">
              {customer.factory_code}
            </p>
            <p className="text-[10px] text-gray-400 mt-2">
              Registered{" "}
              {new Date(customer.created_at).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* RECENT SALES */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Recent Sales
        </h2>
        {sales.length === 0 ? (
          <p className="text-sm text-gray-400 py-2">No sales recorded yet</p>
        ) : (
          <div className="space-y-2">
            {sales.slice(0, 8).map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="text-[#0d1b3e] font-medium">
                    {new Date(s.date).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <p className="text-[10px] text-gray-400 capitalize">
                    {s.product_type} · {s.bags_sold} units
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#0d1b3e] font-medium">
                    {formatCurrency(s.total_amount)}
                  </p>
                  {s.balance > 0 && (
                    <p className="text-[10px] text-red-500 font-medium">
                      -{formatCurrency(s.balance)} owing
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DEACTIVATE — owner only */}
      {isOwner && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          {showDeactivateConfirm ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-orange-700 bg-orange-50 rounded-lg p-3">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <p>
                  This will remove{" "}
                  <strong>{customer.name}</strong> from your active
                  customer list. Their sales records will be preserved.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowDeactivateConfirm(false)}
                  className="h-10 rounded-lg border border-gray-200 text-sm text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeactivate}
                  disabled={deactivating}
                  className="h-10 rounded-lg bg-red-600 text-white text-sm font-medium disabled:opacity-60"
                >
                  {deactivating ? "Removing..." : "Confirm"}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeactivateConfirm(true)}
              className="w-full h-10 rounded-lg border border-red-200 text-red-500 text-sm font-medium"
            >
              Deactivate Customer
            </button>
          )}
        </div>
      )}

      {/* HIDDEN CANVAS for card generation */}
      <canvas ref={canvasRef} className="hidden" />

    </div>
  )
}
