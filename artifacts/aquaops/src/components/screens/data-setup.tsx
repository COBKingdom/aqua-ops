import { useState, useEffect, useRef } from "react"
import * as XLSX from "xlsx"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import {
  CheckCircle2,
  Download,
  Upload,
  ChevronRight,
  ChevronLeft,
  Package,
  Users,
  AlertCircle,
  BarChart3,
  ShoppingCart,
  Wallet,
  Sparkles,
  Factory,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

interface Results {
  stockSaved: boolean
  customers: number
  debts: number
  debtTotal: number
  production: number
  sales: number
  expenses: number
}

interface StepImport {
  rows: any[]
  status: "idle" | "parsed" | "importing" | "done" | "error"
  message: string
}

const EMPTY: StepImport = { rows: [], status: "idle", message: "" }

// ─── Excel helpers ────────────────────────────────────────────────────────────

function parseExcel(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const wb = XLSX.read(data, { type: "array" })
        const ws = wb.Sheets[wb.SheetNames[0]]
        resolve(XLSX.utils.sheet_to_json(ws, { defval: "" }) as any[])
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

function dlXlsx(filename: string, sheetName: string, rows: any[][]) {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  XLSX.writeFile(wb, filename)
}

const templates = {
  customers: () =>
    dlXlsx("customers_template.xlsx", "Customers", [
      ["Customer Name", "Phone", "Address"],
      ["Alhaji Musa", "08012345678", "17 Kano Road, Lagos"],
      ["Mrs. Chioma", "09087654321", "Apapa Market"],
    ]),
  debts: () =>
    dlXlsx("outstanding_debts_template.xlsx", "Debts", [
      ["Customer Name", "Amount Owed", "Date", "Notes"],
      ["Alhaji Musa", "25000", "2024-01-15", "Balance from January"],
      ["Mrs. Chioma", "12500", "2024-02-01", "Unpaid delivery"],
    ]),
  production: () =>
    dlXlsx("production_template.xlsx", "Production", [
      ["Date", "Product Type", "Bags Produced", "Pieces Per Bag", "Shift"],
      ["2024-01-15", "sachet", "150", "20", "morning"],
      ["2024-01-15", "bottle", "30", "20", "afternoon"],
    ]),
  sales: () =>
    dlXlsx("sales_template.xlsx", "Sales", [
      ["Date", "Customer Name", "Product Type", "Bags Sold", "Price Per Bag", "Amount Paid"],
      ["2024-01-15", "Alhaji Musa", "sachet", "50", "300", "15000"],
      ["2024-01-16", "Mrs. Chioma", "bottle", "10", "1200", "12000"],
    ]),
  expenses: () =>
    dlXlsx("expenses_template.xlsx", "Expenses", [
      ["Date", "Cost Group", "Category", "Amount", "Notes"],
      ["2024-01-15", "Material Cost", "Nylon", "5000", "Weekly nylon purchase"],
      ["2024-01-16", "Production Cost", "Diesel", "18000", "Generator fuel"],
      ["2024-01-17", "Other Expense", "Transport", "3500", "Delivery costs"],
    ]),
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepNav({
  onSkip,
  onNext,
  imported,
}: {
  onSkip: () => void
  onNext: () => void
  imported: boolean
}) {
  return (
    <div className="flex gap-2 pt-1">
      {!imported && (
        <button
          onClick={onSkip}
          className="flex-1 h-11 border border-gray-200 rounded-xl text-sm text-gray-500 active:scale-[0.97]"
        >
          Skip this step
        </button>
      )}
      <button
        onClick={onNext}
        className="flex-1 h-11 bg-[#0d1b3e] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-1 active:scale-[0.97]"
      >
        {imported ? "Next Step" : "Next"} <ChevronRight size={16} />
      </button>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  ok,
}: {
  label: string
  value: string
  ok: boolean
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className={`font-medium ${ok ? "text-green-600" : "text-gray-400"}`}>
        {value}
      </span>
    </div>
  )
}

interface ImportStepProps {
  title: string
  description: string
  state: StepImport
  onDownload: () => void
  onFile: (f: File) => void
  onImport: () => void
  onSkip: () => void
  onNext: () => void
  hints?: string[]
}

function ImportStep({
  title,
  description,
  state,
  onDownload,
  onFile,
  onImport,
  onSkip,
  onNext,
  hints,
}: ImportStepProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
        <div>
          <p className="text-sm font-semibold text-[#0d1b3e]">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>

        {hints && hints.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-3 space-y-1">
            {hints.map((h, i) => (
              <p key={i} className="text-xs text-[#2563eb]">
                ℹ️ {h}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={onDownload}
          className="w-full h-11 border border-[#2563eb] text-[#2563eb] rounded-lg text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.97]"
        >
          <Download size={15} /> Download Template
        </button>

        <div>
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onFile(f)
              e.target.value = ""
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={state.status === "importing" || state.status === "done"}
            className="w-full h-11 bg-blue-50 text-[#2563eb] rounded-lg text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-50"
          >
            <Upload size={15} />
            {state.status === "parsed"
              ? `${state.rows.length} rows loaded — change file`
              : "Upload Excel File"}
          </button>
        </div>

        {state.message && (
          <p
            className={`text-xs text-center font-medium ${
              state.status === "error"
                ? "text-red-500"
                : state.status === "done"
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {state.message}
          </p>
        )}

        {state.status === "parsed" && (
          <button
            onClick={onImport}
            className="w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97]"
          >
            Import {state.rows.length} Records
          </button>
        )}

        {state.status === "importing" && (
          <div className="w-full h-11 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
            Importing...
          </div>
        )}
      </div>

      <StepNav
        onSkip={onSkip}
        onNext={onNext}
        imported={state.status === "done"}
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DataSetup({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void
}) {
  const [step, setStep] = useState<Step>(0)
  const [isOwner, setIsOwner] = useState<boolean | null>(null)
  const [factoryId, setFactoryId] = useState<string | null>(null)

  const [results, setResults] = useState<Results>({
    stockSaved: false,
    customers: 0,
    debts: 0,
    debtTotal: 0,
    production: 0,
    sales: 0,
    expenses: 0,
  })

  const [stock, setStock] = useState({
    sachet_stock: "",
    bottle_stock: "",
    as_of_date: new Date().toISOString().split("T")[0],
  })
  const [stockSaving, setStockSaving] = useState(false)
  const [stockSaved, setStockSaved] = useState(false)

  const [s2, setS2] = useState<StepImport>({ ...EMPTY })
  const [s3, setS3] = useState<StepImport>({ ...EMPTY })
  const [s4, setS4] = useState<StepImport>({ ...EMPTY })
  const [s5, setS5] = useState<StepImport>({ ...EMPTY })
  const [s6, setS6] = useState<StepImport>({ ...EMPTY })

  // ── Owner check ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setActiveTab("reports")
        return
      }
      const { data } = await supabase
        .from("factory_users")
        .select("role")
        .eq("user_id", user.id)
        .single()
      if (!data || data.role.toLowerCase() !== "owner") {
        setActiveTab("reports")
        return
      }
      setIsOwner(true)
      const fid = await getFactoryId()
      if (fid) setFactoryId(fid)
    }
    check()
  }, [])

  if (isOwner === null) return null
  if (isOwner === false) return null

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const ensureFactory = async () => {
    if (factoryId) return factoryId
    const fid = await getFactoryId()
    if (fid) setFactoryId(fid)
    return fid
  }

  const next = () => setStep((s) => Math.min(s + 1, 7) as Step)
  const back = () => setStep((s) => Math.max(s - 1, 0) as Step)

  // ── Step 1: Stock ────────────────────────────────────────────────────────────
  const saveStock = async () => {
    const fid = await ensureFactory()
    if (!fid) return
    setStockSaving(true)
    try {
      await supabase.from("opening_stock").upsert(
        {
          factory_id: fid,
          sachet_stock: Number(stock.sachet_stock) || 0,
          bottle_stock: Number(stock.bottle_stock) || 0,
          as_of_date: stock.as_of_date,
        },
        { onConflict: "factory_id" }
      )
      setStockSaved(true)
      setResults((r) => ({ ...r, stockSaved: true }))
    } finally {
      setStockSaving(false)
    }
  }

  // ── File parse ────────────────────────────────────────────────────────────────
  const handleFile = async (
    file: File,
    setter: React.Dispatch<React.SetStateAction<StepImport>>
  ) => {
    setter({ rows: [], status: "idle", message: "Reading file..." })
    try {
      const rows = await parseExcel(file)
      if (!rows.length) {
        setter({ rows: [], status: "error", message: "File appears empty." })
        return
      }
      setter({
        rows,
        status: "parsed",
        message: `${rows.length} rows ready to import`,
      })
    } catch {
      setter({
        rows: [],
        status: "error",
        message: "Could not read file. Please use the provided template.",
      })
    }
  }

  // ── Step 2: Customers ────────────────────────────────────────────────────────
  const importCustomers = async () => {
    const fid = await ensureFactory()
    if (!fid || !s2.rows.length) return
    setS2((s) => ({ ...s, status: "importing", message: "Importing..." }))
    const records = s2.rows
      .map((r: any) => ({
        factory_id: fid,
        name: String(r["Customer Name"] || "").trim(),
        phone: String(r["Phone"] || "").trim(),
        address: String(r["Address"] || "").trim(),
      }))
      .filter((r) => r.name)
    const { error } = await supabase.from("customers").insert(records)
    if (error) {
      setS2((s) => ({ ...s, status: "error", message: "Import failed: " + error.message }))
    } else {
      setS2((s) => ({ ...s, status: "done", message: `✓ ${records.length} customers imported` }))
      setResults((r) => ({ ...r, customers: records.length }))
    }
  }

  // ── Step 3: Debts ─────────────────────────────────────────────────────────────
  const importDebts = async () => {
    const fid = await ensureFactory()
    if (!fid || !s3.rows.length) return
    setS3((s) => ({ ...s, status: "importing", message: "Importing..." }))
    const today = new Date().toISOString().split("T")[0]
    const records = s3.rows
      .map((r: any) => {
        const owed = Number(r["Amount Owed"]) || 0
        return {
          factory_id: fid,
          date: String(r["Date"] || today).trim(),
          customer_name: String(r["Customer Name"] || "").trim(),
          product_type: "sachet",
          bags_sold: 0,
          price_per_bag: 0,
          total_amount: owed,
          amount_paid: 0,
          balance: owed,
          is_opening_balance: true,
        }
      })
      .filter((r) => r.customer_name && r.balance > 0)
    const total = records.reduce((s, r) => s + r.balance, 0)
    const { error } = await supabase.from("sales").insert(records)
    if (error) {
      setS3((s) => ({ ...s, status: "error", message: "Import failed: " + error.message }))
    } else {
      setS3((s) => ({ ...s, status: "done", message: `✓ ${records.length} debt records imported` }))
      setResults((r) => ({ ...r, debts: records.length, debtTotal: total }))
    }
  }

  // ── Step 4: Production ────────────────────────────────────────────────────────
  const importProduction = async () => {
    const fid = await ensureFactory()
    if (!fid || !s4.rows.length) return
    setS4((s) => ({ ...s, status: "importing", message: "Importing..." }))
    const records = s4.rows
      .map((r: any) => ({
        factory_id: fid,
        date: String(r["Date"] || "").trim(),
        product_type: String(r["Product Type"] || "sachet").toLowerCase().trim(),
        bags_produced: Number(r["Bags Produced"]) || 0,
        pieces_per_bag: Number(r["Pieces Per Bag"]) || 20,
        shift: String(r["Shift"] || "morning").toLowerCase().trim(),
        is_historical: true,
      }))
      .filter((r) => r.date && r.bags_produced > 0)
    const { error } = await supabase.from("production").insert(records)
    if (error) {
      setS4((s) => ({ ...s, status: "error", message: "Import failed: " + error.message }))
    } else {
      setS4((s) => ({ ...s, status: "done", message: `✓ ${records.length} production records imported` }))
      setResults((r) => ({ ...r, production: records.length }))
    }
  }

  // ── Step 5: Sales ─────────────────────────────────────────────────────────────
  const importSales = async () => {
    const fid = await ensureFactory()
    if (!fid || !s5.rows.length) return
    setS5((s) => ({ ...s, status: "importing", message: "Importing..." }))
    const records = s5.rows
      .map((r: any) => {
        const bags = Number(r["Bags Sold"]) || 0
        const price = Number(r["Price Per Bag"]) || 0
        const total = bags * price
        const paid = Number(r["Amount Paid"]) || 0
        const balance = Math.max(0, total - paid)
        return {
          factory_id: fid,
          date: String(r["Date"] || "").trim(),
          customer_name: String(r["Customer Name"] || "").trim(),
          product_type: String(r["Product Type"] || "sachet").toLowerCase().trim(),
          bags_sold: bags,
          price_per_bag: price,
          total_amount: total,
          amount_paid: paid,
          balance,
          is_opening_balance: false,
        }
      })
      .filter((r) => r.date && r.customer_name)
    const { error } = await supabase.from("sales").insert(records)
    if (error) {
      setS5((s) => ({ ...s, status: "error", message: "Import failed: " + error.message }))
    } else {
      setS5((s) => ({ ...s, status: "done", message: `✓ ${records.length} sales records imported` }))
      setResults((r) => ({ ...r, sales: records.length }))
    }
  }

  // ── Step 6: Expenses ──────────────────────────────────────────────────────────
  const importExpenses = async () => {
    const fid = await ensureFactory()
    if (!fid || !s6.rows.length) return
    setS6((s) => ({ ...s, status: "importing", message: "Importing..." }))
    const records = s6.rows
      .map((r: any) => ({
        factory_id: fid,
        date: String(r["Date"] || "").trim(),
        cost_group: String(r["Cost Group"] || "Other Expense").trim(),
        category: String(r["Category"] || "Miscellaneous").trim(),
        amount: Number(r["Amount"]) || 0,
        notes: String(r["Notes"] || "").trim(),
        is_historical: true,
      }))
      .filter((r) => r.date && r.amount > 0)
    const { error } = await supabase.from("expenses").insert(records)
    if (error) {
      setS6((s) => ({ ...s, status: "error", message: "Import failed: " + error.message }))
    } else {
      setS6((s) => ({ ...s, status: "done", message: `✓ ${records.length} expense records imported` }))
      setResults((r) => ({ ...r, expenses: records.length }))
    }
  }

  // ── Completion % ─────────────────────────────────────────────────────────────
  const completionPct = () => {
    const done = [
      results.stockSaved,
      results.customers > 0,
      results.debts > 0,
      results.production > 0,
      results.sales > 0,
      results.expenses > 0,
    ].filter(Boolean).length
    return Math.round((done / 6) * 100)
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <div className="flex items-center gap-2 pt-1">
        {step > 0 && step < 7 && (
          <button
            onClick={back}
            className="p-1.5 rounded-lg bg-blue-50 text-[#2563eb]"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold text-[#0d1b3e]">
            Business Setup Wizard
          </h1>
          {step > 0 && step < 7 && (
            <p className="text-xs text-gray-400">Step {step} of 6</p>
          )}
        </div>
      </div>

      {/* PROGRESS BAR */}
      {step > 0 && step < 7 && (
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-[#2563eb] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      )}

      {/* ── STEP 0: WELCOME ── */}
      {step === 0 && (
        <div className="space-y-4">
          <div className="bg-[#0d1b3e] rounded-2xl p-5 text-white space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-blue-300" />
              <p className="font-bold text-lg">Welcome to AquaOps</p>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              This wizard imports your existing factory records so your dashboard
              and reports show real data from day one — no manual re-entry needed.
            </p>
            <div className="flex items-center gap-3 text-xs text-blue-200">
              <span>⏱ 10–20 minutes</span>
              <span>·</span>
              <span>All steps optional</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              What you will set up
            </p>
            {[
              { icon: Package, label: "Current Stock Position" },
              { icon: Users, label: "Customer Directory" },
              { icon: AlertCircle, label: "Outstanding Customer Debts" },
              { icon: Factory, label: "Historical Production Records" },
              { icon: ShoppingCart, label: "Historical Sales Records" },
              { icon: Wallet, label: "Historical Expense Records" },
            ].map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-[#0d1b3e]"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-[#2563eb]" />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              ensureFactory()
              next()
            }}
            className="w-full h-12 bg-[#2563eb] text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Start Setup <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className="w-full text-center text-xs text-gray-400 py-1"
          >
            Skip — I'll set up later
          </button>
        </div>
      )}

      {/* ── STEP 1: CURRENT STOCK POSITION ── */}
      {step === 1 && (
        <div className="space-y-3">
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div>
              <p className="text-sm font-semibold text-[#0d1b3e]">
                Current Stock Position
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Record how many bags / crates you currently have in stock.
                This is your starting baseline.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                As of Date
              </label>
              <input
                type="date"
                value={stock.as_of_date}
                onChange={(e) =>
                  setStock({ ...stock, as_of_date: e.target.value })
                }
                className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Sachet Bags in Stock
              </label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={stock.sachet_stock}
                onChange={(e) =>
                  setStock({ ...stock, sachet_stock: e.target.value })
                }
                className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Bottle Crates in Stock
              </label>
              <input
                type="number"
                placeholder="e.g. 20"
                value={stock.bottle_stock}
                onChange={(e) =>
                  setStock({ ...stock, bottle_stock: e.target.value })
                }
                className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
              />
            </div>

            <button
              onClick={saveStock}
              disabled={stockSaving || stockSaved}
              className={`w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] ${
                stockSaved
                  ? "bg-green-600 text-white"
                  : "bg-[#2563eb] text-white disabled:opacity-60"
              }`}
            >
              {stockSaving
                ? "Saving..."
                : stockSaved
                ? "✓ Stock Position Saved"
                : "Save Stock Position"}
            </button>
          </div>

          <StepNav onSkip={next} onNext={next} imported={stockSaved} />
        </div>
      )}

      {/* ── STEP 2: CUSTOMERS ── */}
      {step === 2 && (
        <ImportStep
          title="Customer Directory"
          description="Import your existing customers. They will be available as a reference across AquaOps."
          state={s2}
          onDownload={templates.customers}
          onFile={(f) => handleFile(f, setS2)}
          onImport={importCustomers}
          onSkip={next}
          onNext={next}
        />
      )}

      {/* ── STEP 3: OUTSTANDING DEBTS ── */}
      {step === 3 && (
        <ImportStep
          title="Outstanding Customer Debts"
          description="Import money owed to you. These will appear immediately in your Debts screen and Dashboard totals."
          state={s3}
          onDownload={templates.debts}
          onFile={(f) => handleFile(f, setS3)}
          onImport={importDebts}
          onSkip={next}
          onNext={next}
        />
      )}

      {/* ── STEP 4: PRODUCTION ── */}
      {step === 4 && (
        <ImportStep
          title="Historical Production"
          description="Import past production records so your reports reflect real output history."
          state={s4}
          onDownload={templates.production}
          onFile={(f) => handleFile(f, setS4)}
          onImport={importProduction}
          onSkip={next}
          onNext={next}
          hints={[
            "Product Type must be exactly: sachet or bottle",
            "Shift must be exactly: morning, afternoon, or night",
          ]}
        />
      )}

      {/* ── STEP 5: SALES ── */}
      {step === 5 && (
        <ImportStep
          title="Historical Sales"
          description="Import past sales records so your revenue history and reports are complete."
          state={s5}
          onDownload={templates.sales}
          onFile={(f) => handleFile(f, setS5)}
          onImport={importSales}
          onSkip={next}
          onNext={next}
          hints={["Product Type must be exactly: sachet or bottle"]}
        />
      )}

      {/* ── STEP 6: EXPENSES ── */}
      {step === 6 && (
        <ImportStep
          title="Historical Expenses"
          description="Import past expenses so your cost history and profit calculations are accurate."
          state={s6}
          onDownload={templates.expenses}
          onFile={(f) => handleFile(f, setS6)}
          onImport={importExpenses}
          onSkip={next}
          onNext={next}
          hints={[
            "Cost Group must be exactly: Material Cost, Production Cost, or Other Expense",
            "Category examples: Nylon, Diesel, Transport, Rent",
          ]}
        />
      )}

      {/* ── STEP 7: COMPLETION ── */}
      {step === 7 && (
        <div className="space-y-4">
          <div className="bg-[#0d1b3e] rounded-2xl p-5 text-white text-center space-y-3">
            <CheckCircle2 size={44} className="text-green-400 mx-auto" />
            <p className="text-xl font-bold">Your AquaOps account is ready.</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full transition-all"
                style={{ width: `${completionPct()}%` }}
              />
            </div>
            <p className="text-blue-200 text-sm">
              Setup {completionPct()}% complete
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Import Summary
            </p>
            <SummaryRow
              label="Stock Position"
              value={results.stockSaved ? "Saved" : "Skipped"}
              ok={results.stockSaved}
            />
            <SummaryRow
              label="Customers"
              value={
                results.customers > 0
                  ? `${results.customers} imported`
                  : "Skipped"
              }
              ok={results.customers > 0}
            />
            <SummaryRow
              label="Outstanding Debts"
              value={
                results.debts > 0
                  ? `${results.debts} records · ₦${results.debtTotal.toLocaleString()}`
                  : "Skipped"
              }
              ok={results.debts > 0}
            />
            <SummaryRow
              label="Production Records"
              value={
                results.production > 0
                  ? `${results.production} imported`
                  : "Skipped"
              }
              ok={results.production > 0}
            />
            <SummaryRow
              label="Sales Records"
              value={
                results.sales > 0 ? `${results.sales} imported` : "Skipped"
              }
              ok={results.sales > 0}
            />
            <SummaryRow
              label="Expense Records"
              value={
                results.expenses > 0
                  ? `${results.expenses} imported`
                  : "Skipped"
              }
              ok={results.expenses > 0}
            />
          </div>

          <button
            onClick={() => setActiveTab("dashboard")}
            className="w-full h-12 bg-[#2563eb] text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Go to Dashboard <BarChart3 size={16} />
          </button>

          <button
            onClick={() => setStep(1)}
            className="w-full text-center text-xs text-gray-400 py-1"
          >
            Go back and import more data
          </button>
        </div>
      )}

    </div>
  )
}