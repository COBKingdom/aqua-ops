import { useState, useRef } from "react"

import {
  downloadMigrationTemplate,
  parseWorkbook,
  validateWorkbook,
  generatePreview,
  importToSupabase,
} from "@/lib/migration-helpers"

import type {
  ParsedWorkbook,
  ValidationResult,
  PreviewCounts,
  ImportResult,
} from "@/lib/migration-helpers"

import {
  CheckCircle,
  AlertTriangle,
  Upload,
  FileSpreadsheet,
  Download,
  ArrowLeft,
  ArrowRight,
  Loader2,
  XCircle,
} from "lucide-react"

const STEPS = [
  "Welcome",
  "Upload",
  "Validate",
  "Preview",
  "Import",
  "Complete",
]

export function MigrationWizard({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void
}) {
  const [step, setStep] = useState(1)

  const [file, setFile] = useState<File | null>(null)
  const [parsing, setParsing] = useState(false)
  const [parseError, setParseError] = useState<string | null>(null)

  const [parsedData, setParsedData] = useState<ParsedWorkbook | null>(null)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [preview, setPreview] = useState<PreviewCounts | null>(null)

  const [importing, setImporting] = useState(false)
  const [importLog, setImportLog] = useState<string[]>([])
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // ─── FILE HANDLING ─────────────────────────────────────────────────────────

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return

    setFile(f)
    setParseError(null)
    setParsedData(null)
    setValidation(null)
    setPreview(null)
    setParsing(true)

    try {
      const data = await parseWorkbook(f)
      const val = validateWorkbook(data)
      const prev = generatePreview(data)

      setParsedData(data)
      setValidation(val)
      setPreview(prev)
    } catch (err: any) {
      setParseError(err?.message || "Failed to parse workbook. Ensure it is a valid .xlsx file.")
    } finally {
      setParsing(false)
    }
  }

  const handleImport = async () => {
    if (!parsedData) return

    setImporting(true)
    setImportLog([])

    try {
      const result = await importToSupabase(parsedData, (msg) => {
        setImportLog((prev) => [...prev, msg])
      })

      setImportResult(result)
      setStep(6)
    } catch (err: any) {
      setImportLog((prev) => [
        ...prev,
        `Error: ${err?.message || "Import failed."}`,
      ])
    } finally {
      setImporting(false)
    }
  }

  // ─── STEP INDICATOR ────────────────────────────────────────────────────────

  const StepIndicator = () => (
    <div className="flex items-center justify-between px-2 py-3">
      {STEPS.map((label, i) => {
        const n = i + 1
        const done = step > n
        const active = step === n
        return (
          <div key={n} className="flex flex-col items-center gap-0.5">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                done
                  ? "bg-green-500 border-green-500 text-white"
                  : active
                  ? "bg-[#2563eb] border-[#2563eb] text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {done ? <CheckCircle size={14} /> : n}
            </div>
            <span
              className={`text-[9px] font-medium ${
                active ? "text-[#2563eb]" : done ? "text-green-600" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )

  // ─── STEP 1: WELCOME ───────────────────────────────────────────────────────

  const Step1 = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-[#0d1b3e] to-gray-800 text-white p-5 rounded-xl">
        <p className="text-xs opacity-70 mb-1">Premium Feature</p>
        <h2 className="text-lg font-bold">Historical Data Migration</h2>
        <p className="text-sm opacity-80 mt-1">
          Import your existing business records into AquaOps safely and accurately.
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-[#0d1b3e]">What you can import</h3>
        {[
          ["📦 Sales Records", "All customer sales with amounts and balances"],
          ["💸 Expenses", "Historical operational costs and breakdowns"],
          ["🏭 Production", "Sachet and bottle production logs"],
          ["⚠️ Production Losses", "Loss records by type and quantity"],
          ["👥 Customers", "Customer directory with contact details"],
        ].map(([title, desc]) => (
          <div key={title} className="flex items-start gap-2">
            <span className="text-base">{title.split(" ")[0]}</span>
            <div>
              <p className="text-sm font-medium text-[#0d1b3e]">
                {title.slice(2)}
              </p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-[#0d1b3e] text-sm">
          Step 1 — Download the Excel Template
        </h3>
        <p className="text-xs text-gray-600">
          Fill in your historical data using the official AquaOps template. Each worksheet has the correct column structure with example rows.
        </p>
        <button
          onClick={downloadMigrationTemplate}
          className="w-full h-11 bg-[#0d1b3e] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Download AquaOps Excel Template
        </button>
      </div>

      <button
        onClick={() => setStep(2)}
        className="w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
      >
        I have my data ready
        <ArrowRight size={16} />
      </button>
    </div>
  )

  // ─── STEP 2: UPLOAD ────────────────────────────────────────────────────────

  const Step2 = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-[#0d1b3e]">Upload Your Workbook</h3>
        <p className="text-sm text-gray-500">
          Upload the completed Excel workbook (.xlsx). Only .xlsx format is supported.
        </p>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-[#2563eb] transition-colors"
        >
          <FileSpreadsheet size={32} className="text-[#2563eb]" />
          <span className="text-sm font-medium text-[#0d1b3e]">
            {file ? file.name : "Tap to select Excel file"}
          </span>
          <span className="text-xs text-gray-400">
            {file
              ? `${(file.size / 1024).toFixed(1)} KB`
              : "Supports .xlsx format"}
          </span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleFileChange}
        />

        {parsing && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 size={14} className="animate-spin text-[#2563eb]" />
            Reading workbook…
          </div>
        )}

        {parseError && (
          <div className="flex items-start gap-2 bg-red-50 text-red-700 rounded-lg p-3 text-sm">
            <XCircle size={16} className="shrink-0 mt-0.5" />
            {parseError}
          </div>
        )}

        {file && !parsing && !parseError && parsedData && (
          <div className="bg-green-50 text-green-700 rounded-lg p-3 text-sm flex items-center gap-2">
            <CheckCircle size={16} />
            Workbook loaded successfully
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(1)}
          className="flex-1 h-11 bg-gray-100 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!parsedData || parsing}
          className="flex-1 h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
        >
          Validate
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )

  // ─── STEP 3: VALIDATION ────────────────────────────────────────────────────

  const Step3 = () => {
    if (!validation) return null

    return (
      <div className="space-y-4">
        <div
          className={`rounded-xl p-4 ${
            validation.valid
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {validation.valid ? (
              <CheckCircle size={20} className="text-green-600" />
            ) : (
              <XCircle size={20} className="text-red-600" />
            )}
            <p className="font-semibold text-sm">
              {validation.valid
                ? "Validation passed — no errors found"
                : `${validation.errors.length} validation error${validation.errors.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
          {!validation.valid && (
            <p className="text-xs mt-1 text-red-600">
              Fix all errors before importing. Correct your Excel file and re-upload.
            </p>
          )}
        </div>

        {validation.errors.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-2 bg-red-50 border-b border-red-100">
              <p className="text-sm font-semibold text-red-700">Errors</p>
            </div>
            <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
              {validation.errors.map((err, i) => (
                <div key={i} className="px-4 py-2.5 flex items-start gap-3">
                  <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#0d1b3e]">
                      {err.sheet} — Row {err.row || ""}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">{err.field}:</span> {err.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {validation.warnings.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-2 bg-yellow-50 border-b border-yellow-100">
              <p className="text-sm font-semibold text-yellow-700">
                {validation.warnings.length} Warning{validation.warnings.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="divide-y divide-gray-100 max-h-40 overflow-y-auto">
              {validation.warnings.map((w, i) => (
                <div key={i} className="px-4 py-2.5 flex items-start gap-3">
                  <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600">{w}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setStep(2)}
            className="flex-1 h-11 bg-gray-100 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Re-upload
          </button>
          <button
            onClick={() => setStep(4)}
            disabled={!validation.valid}
            className="flex-1 h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
          >
            Preview
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // ─── STEP 4: PREVIEW ───────────────────────────────────────────────────────

  const Step4 = () => {
    if (!preview) return null

    const rows = [
      { label: "Sales",              count: preview.sales,              icon: "🛒" },
      { label: "Expenses",           count: preview.expenses,           icon: "💸" },
      { label: "Production",         count: preview.production,         icon: "🏭" },
      { label: "Production Losses",  count: preview.productionLosses,   icon: "⚠️" },
      { label: "Customers",          count: preview.customers,          icon: "👥" },
    ]

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-1">
          <h3 className="font-semibold text-[#0d1b3e] mb-3">
            Records ready to import
          </h3>

          {rows.map(({ label, count, icon }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span>{icon}</span>
                <span className="text-sm text-[#0d1b3e]">{label}</span>
              </div>
              <span
                className={`text-sm font-bold ${
                  count > 0 ? "text-[#2563eb]" : "text-gray-300"
                }`}
              >
                {count > 0 ? count : "—"}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-sm font-bold text-[#0d1b3e]">
              Total Records
            </span>
            <span className="text-lg font-bold text-[#2563eb]">
              {preview.total}
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle size={15} className="text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-800">
              This will insert all records into your AquaOps database. This action cannot be automatically undone. Review the counts carefully before proceeding.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep(3)}
            className="flex-1 h-11 bg-gray-100 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={() => {
              setStep(5)
              handleImport()
            }}
            className="flex-1 h-11 bg-[#0d1b3e] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            Start Import
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // ─── STEP 5: IMPORTING ─────────────────────────────────────────────────────

  const Step5 = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-3">
          {importing ? (
            <Loader2 size={22} className="animate-spin text-[#2563eb]" />
          ) : (
            <CheckCircle size={22} className="text-green-500" />
          )}
          <div>
            <p className="font-semibold text-[#0d1b3e]">
              {importing ? "Importing records…" : "Import finished"}
            </p>
            <p className="text-xs text-gray-500">
              {importing
                ? "Please do not close this screen."
                : "All records have been processed."}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 space-y-1 max-h-48 overflow-y-auto">
          {importLog.length === 0 ? (
            <p className="text-xs text-gray-400">Starting…</p>
          ) : (
            importLog.map((msg, i) => (
              <p key={i} className="text-xs text-gray-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                {msg}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  )

  // ─── STEP 6: COMPLETE ──────────────────────────────────────────────────────

  const Step6 = () => {
    if (!importResult) return null

    const rows = [
      { label: "Sales Imported",             count: importResult.salesImported            },
      { label: "Expenses Imported",           count: importResult.expensesImported         },
      { label: "Production Imported",         count: importResult.productionImported       },
      { label: "Production Losses Imported",  count: importResult.productionLossesImported },
      { label: "Customers Imported",          count: importResult.customersImported        },
      { label: "Skipped Records",             count: importResult.skipped                  },
    ]

    const total =
      importResult.salesImported +
      importResult.expensesImported +
      importResult.productionImported +
      importResult.productionLossesImported +
      importResult.customersImported

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-5">
          <CheckCircle size={28} className="mb-2" />
          <h2 className="text-lg font-bold">Migration Complete</h2>
          <p className="text-sm opacity-80 mt-1">
            {total} records successfully imported into AquaOps.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 space-y-1">
          <h3 className="font-semibold text-[#0d1b3e] mb-3">
            Migration Summary
          </h3>
          {rows.map(({ label, count }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-sm text-[#0d1b3e]">{label}</span>
              <span
                className={`text-sm font-bold ${
                  label === "Skipped Records"
                    ? count > 0
                      ? "text-red-500"
                      : "text-gray-300"
                    : count > 0
                    ? "text-green-600"
                    : "text-gray-300"
                }`}
              >
                {count > 0 ? count : "—"}
              </span>
            </div>
          ))}
        </div>

        {importResult.warnings.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-2 bg-yellow-50 border-b border-yellow-100">
              <p className="text-sm font-semibold text-yellow-700">Warnings</p>
            </div>
            <div className="divide-y divide-gray-100 max-h-36 overflow-y-auto">
              {importResult.warnings.map((w, i) => (
                <div key={i} className="px-4 py-2.5 flex items-start gap-2">
                  <AlertTriangle size={13} className="text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600">{w}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setActiveTab("dashboard")}
          className="w-full h-11 bg-[#0d1b3e] text-white rounded-lg text-sm font-semibold"
        >
          Go to Dashboard
        </button>
      </div>
    )
  }

  // ─── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div className="p-3 pb-24 space-y-3">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab("reports")}
          className="p-1.5 rounded-lg bg-white shadow-sm"
        >
          <ArrowLeft size={18} className="text-[#0d1b3e]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#0d1b3e]">
            Data Migration Wizard
          </h1>
          <p className="text-xs text-gray-500">
            Import historical records into AquaOps
          </p>
        </div>
      </div>

      {/* STEP INDICATOR */}
      <div className="bg-white rounded-xl shadow-sm px-2">
        <StepIndicator />
      </div>

      {/* STEP CONTENT */}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}

    </div>
  )
}