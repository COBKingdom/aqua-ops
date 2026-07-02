import { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import {
  downloadTemplate,
  exportToXlsx,
  exportToCsv,
  parseFile,
  validateRows,
  TemplateType,
  ValidationError,
} from "@/lib/xlsx-utils"

interface DataSetupProps {
  setActiveTab: (tab: string) => void
}

const STEPS = [
  { id: "cash",       title: "Opening Cash Balance",   subtitle: "Set your starting financial position",               templateType: null                   },
  { id: "debts",      title: "Opening Customer Debts", subtitle: "Import balances owed by customers before you joined", templateType: "customer_debts"       },
  { id: "loans",      title: "Opening Loans",          subtitle: "Import loans your factory had before joining",        templateType: "loans"                },
  { id: "production", title: "Historical Production",  subtitle: "Import past production records",                     templateType: "production"           },
  { id: "sales",      title: "Historical Sales",       subtitle: "Import past sales records",                          templateType: "sales"                },
  { id: "expenses",   title: "Historical Expenses",    subtitle: "Import past expense records",                        templateType: "expenses"             },
] as const

type StepPhase = "idle" | "preview" | "importing" | "done"
type ExportDataType = "sales" | "expenses" | "production" | "loans" | "debts"

export function DataSetup({ setActiveTab }: DataSetupProps) {
  const [booting, setBooting]     = useState(true)
  const [isOwner, setIsOwner]     = useState(false)
  const [factoryId, setFactoryId] = useState<string | null>(null)
  const [view, setView]           = useState<"hub" | "export" | "wizard">("hub")

  const [wizardStep, setWizardStep] = useState(0)
  const [stepPhase, setStepPhase]   = useState<StepPhase>("idle")
  const [parsedRows, setParsedRows] = useState<any[]>([])
  const [validRows, setValidRows]   = useState<any[]>([])
  const [parseErrors, setParseErrors] = useState<ValidationError[]>([])
  const [importedCount, setImportedCount] = useState(0)
  const [stepSummary, setStepSummary]     = useState<(number | null)[]>(new Array(STEPS.length).fill(null))

  const [cashAmount, setCashAmount] = useState("")
  const [cashDate, setCashDate]     = useState(new Date().toISOString().split("T")[0])
  const [cashNotes, setCashNotes]   = useState("")
  const [cashSaved, setCashSaved]   = useState(false)

  const [exportType, setExportType]     = useState<ExportDataType>("sales")
  const [exportFormat, setExportFormat] = useState<"xlsx" | "csv">("xlsx")
  const [exportFrom, setExportFrom]     = useState("")
  const [exportTo, setExportTo]         = useState("")
  const [exporting, setExporting]       = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const fid = await getFactoryId()
        if (!fid) return
        setFactoryId(fid)

        const [{ data: fUser }, { data: factoryRow }] = await Promise.all([
          supabase.from("factory_users").select("role").eq("user_id", user.id).eq("factory_id", fid).maybeSingle(),
          supabase.from("factories").select("user_id").eq("id", fid).single(),
        ])

        setIsOwner(
          fUser?.role?.toLowerCase() === "owner" ||
          factoryRow?.user_id === user.id
        )
      } catch (err) {
        console.error(err)
      } finally {
        setBooting(false)
      }
    }
    init()
  }, [])

  const resetStep = (step: number) => {
    setWizardStep(step)
    setStepPhase("idle")
    setParsedRows([])
    setValidRows([])
    setParseErrors([])
    setImportedCount(0)
    if (fileRef.current) fileRef.current.value = ""
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const step = STEPS[wizardStep]
      const rows = await parseFile(file)
      const result = validateRows(rows, step.templateType as TemplateType)
      setParsedRows(rows)
      setValidRows(result.rows)
      setParseErrors(result.errors)
      setStepPhase("preview")
    } catch {
      alert("Could not read file. Please use the provided Excel template.")
    }
  }

  const handleImport = async () => {
    if (!factoryId || !validRows.length) return
    setStepPhase("importing")

    try {
      let count = 0

      if (wizardStep === 1) {
        const records = validRows.map((r) => ({
          factory_id: factoryId,
          date: r.date,
          customer_name: r.customer_name,
          product_type: "sachet",
          bags_sold: 0,
          price_per_bag: 0,
          total_amount: Number(r.amount_owed),
          amount_paid: 0,
          balance: Number(r.amount_owed),
          notes: r.notes || "Opening balance",
          is_opening_balance: true,
        }))
        const { error } = await supabase.from("sales").insert(records)
        if (!error) count = records.length

      } else if (wizardStep === 2) {
        const records = validRows.map((r) => ({
          factory_id: factoryId,
          source: r.source,
          amount: Number(r.amount),
          amount_paid: Number(r.amount_paid || 0),
          date: r.date,
          notes: r.notes || "",
          is_historical: true,
        }))
        const { error } = await supabase.from("loans").insert(records)
        if (!error) count = records.length

      } else if (wizardStep === 3) {
        const records = validRows.map((r) => ({
          factory_id: factoryId,
          date: r.date,
          product_type: String(r.product_type).toLowerCase(),
          bags_produced: Number(r.bags_produced),
          shift: r.shift || "morning",
          notes: r.notes || "",
        }))
        const { error } = await supabase.from("production").insert(records)
        if (!error) count = records.length

      } else if (wizardStep === 4) {
        const records = validRows.map((r) => {
          const bags  = Number(r.bags_sold)
          const price = Number(r.unit_price || r.price_per_bag || 0)
          const total = bags * price
          const paid  = r.amount_paid !== "" ? Number(r.amount_paid) : total
          return {
            factory_id: factoryId,
            date: r.date,
            customer_name: r.customer_name,
            product_type: String(r.product_type).toLowerCase(),
            bags_sold: bags,
            price_per_bag: price,
            total_amount: total,
            amount_paid: paid,
            balance: Math.max(0, total - paid),
            notes: r.notes || "",
            is_opening_balance: false,
          }
        })
        const { error } = await supabase.from("sales").insert(records)
        if (!error) count = records.length

      } else if (wizardStep === 5) {
        const records = validRows.map((r) => ({
          factory_id: factoryId,
          created_at: new Date(r.date).toISOString(),
          description: r.description,
          amount: Number(r.amount),
          cost_group: r.cost_group,
          notes: r.notes || "",
        }))
        const { error } = await supabase.from("expenses").insert(records)
        if (!error) count = records.length
      }

      setImportedCount(count)
      setStepSummary((prev) => {
        const next = [...prev]
        next[wizardStep] = count
        return next
      })
      setStepPhase("done")
    } catch (err) {
      console.error(err)
      alert("Import failed. Please try again.")
      setStepPhase("preview")
    }
  }

  const handleSaveCash = async () => {
    if (!factoryId || !cashAmount) return
    try {
      await supabase.from("opening_balances").insert({
        factory_id: factoryId,
        type: "cash",
        label: "Opening Cash Balance",
        amount: Number(cashAmount),
        date: cashDate,
        notes: cashNotes || null,
      })
      setCashSaved(true)
      setStepSummary((prev) => {
        const next = [...prev]
        next[0] = Number(cashAmount)
        return next
      })
    } catch (err) {
      console.error(err)
      alert("Could not save. Please try again.")
    }
  }

  const goNext = () => {
    if (wizardStep < STEPS.length - 1) {
      resetStep(wizardStep + 1)
    } else {
      setWizardStep(STEPS.length)
    }
  }

  const handleExport = async () => {
    if (!factoryId) return
    setExporting(true)
    try {
      const tableName =
        exportType === "debts" ? "sales" : exportType

      let query = (supabase as any).from(tableName).select("*").eq("factory_id", factoryId)

      if (exportFrom) {
        query = exportType === "expenses"
          ? query.gte("created_at", exportFrom)
          : query.gte("date", exportFrom)
      }
      if (exportTo) {
        query = exportType === "expenses"
          ? query.lte("created_at", exportTo + "T23:59:59")
          : query.lte("date", exportTo)
      }
      if (exportType === "debts") {
        query = query.gt("balance", 0)
      }

      const { data } = await query
      const rows = (data ?? []).map((r: any) => {
        const { id, factory_id, ...rest } = r
        return rest
      })

      const filename = `aquaops-${exportType}-export`
      if (exportFormat === "xlsx") exportToXlsx(rows, filename)
      else exportToCsv(rows, filename)
    } catch (err) {
      console.error(err)
      alert("Export failed. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  if (booting) return <div className="p-6 text-center text-gray-400 text-sm">Loading...</div>

  if (!isOwner) {
    return (
      <div className="p-4 pb-24">
        <button onClick={() => setActiveTab("reports")} className="text-sm text-gray-500 mb-4 flex items-center gap-1">← Back to Reports</button>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-3">
          <div className="text-4xl">🔒</div>
          <h2 className="font-bold text-[#0d1b3e]">Owner Access Only</h2>
          <p className="text-sm text-gray-500">Data import, export, and business setup are restricted to the factory Owner.</p>
        </div>
      </div>
    )
  }

  if (view === "hub") {
    return (
      <div className="p-4 space-y-4 pb-24">
        <div>
          <button onClick={() => setActiveTab("reports")} className="text-sm text-gray-500 mb-3 flex items-center gap-1">← Back to Reports</button>
          <h1 className="text-2xl font-bold text-[#0d1b3e]">Data & Setup</h1>
          <p className="text-sm text-gray-500">Import your history or export your records</p>
        </div>

        <button
          onClick={() => { setView("wizard"); resetStep(0) }}
          className="w-full text-left bg-gradient-to-br from-[#0d1b3e] to-[#2563eb] text-white rounded-2xl p-5 shadow-sm"
        >
          <p className="text-3xl mb-2">🏭</p>
          <p className="font-bold text-lg">Business Setup Wizard</p>
          <p className="text-sm opacity-80 mt-1">
            Enter your opening balances and import existing records so AquaOps is ready from Day 1.
          </p>
          <p className="mt-3 text-xs opacity-60">Opening Cash · Customer Debts · Loans · Production · Sales · Expenses</p>
        </button>

        <button
          onClick={() => setView("export")}
          className="w-full text-left bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <p className="text-3xl mb-2">📥</p>
          <p className="font-bold text-[#0d1b3e] text-lg">Export Data</p>
          <p className="text-sm text-gray-500 mt-1">Download your records as Excel or CSV for offline use or reporting.</p>
        </button>
      </div>
    )
  }

  if (view === "export") {
    return (
      <div className="p-4 space-y-4 pb-24">
        <div>
          <button onClick={() => setView("hub")} className="text-sm text-gray-500 mb-3 flex items-center gap-1">← Back</button>
          <h1 className="text-2xl font-bold text-[#0d1b3e]">Export Data</h1>
          <p className="text-sm text-gray-500">Download your records as a file</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#0d1b3e]">Data Type</label>
            <select value={exportType} onChange={(e) => setExportType(e.target.value as ExportDataType)} className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm bg-white">
              <option value="sales">Sales</option>
              <option value="expenses">Expenses</option>
              <option value="production">Production</option>
              <option value="loans">Loans</option>
              <option value="debts">Outstanding Debts</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#0d1b3e]">From (optional)</label>
              <input type="date" value={exportFrom} onChange={(e) => setExportFrom(e.target.value)} className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#0d1b3e]">To (optional)</label>
              <input type="date" value={exportTo} onChange={(e) => setExportTo(e.target.value)} className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#0d1b3e]">Format</label>
            <div className="flex gap-3">
              {(["xlsx", "csv"] as const).map((f) => (
                <button key={f} onClick={() => setExportFormat(f)} className={`flex-1 h-11 rounded-xl text-sm font-semibold border-2 transition ${exportFormat === f ? "border-[#2563eb] bg-blue-50 text-[#2563eb]" : "border-gray-200 text-gray-500"}`}>
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleExport} disabled={exporting} className="w-full h-12 bg-[#2563eb] text-white font-semibold rounded-xl text-sm disabled:opacity-60">
            {exporting ? "Preparing download..." : `Download ${exportFormat.toUpperCase()}`}
          </button>
        </div>
      </div>
    )
  }

  const isDone = wizardStep >= STEPS.length

  if (isDone) {
    const completed = stepSummary.filter((s) => s !== null).length
    return (
      <div className="p-4 pb-24">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <div className="text-center space-y-2">
            <div className="text-5xl">🎉</div>
            <h2 className="text-xl font-bold text-[#0d1b3e]">Business Setup Complete!</h2>
            <p className="text-sm text-gray-500">{completed} of {STEPS.length} steps completed. AquaOps is now ready to use.</p>
          </div>

          <div className="space-y-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-gray-600">{s.title}</span>
                <span className={stepSummary[i] !== null ? "text-green-600 font-semibold" : "text-gray-300"}>
                  {stepSummary[i] !== null
                    ? i === 0
                      ? `₦${Number(stepSummary[i]).toLocaleString()}`
                      : `${stepSummary[i]} records`
                    : "Skipped"}
                </span>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab("dashboard")} className="w-full h-12 bg-[#2563eb] text-white font-semibold rounded-xl">
            Go to Dashboard →
          </button>
        </div>
      </div>
    )
  }

  const step = STEPS[wizardStep]

  return (
    <div className="p-4 space-y-4 pb-24">
      <div>
        <button onClick={() => setView("hub")} className="text-sm text-gray-500 mb-3 flex items-center gap-1">← Exit Wizard</button>
        <h1 className="text-xl font-bold text-[#0d1b3e]">Business Setup Wizard</h1>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Step {wizardStep + 1} of {STEPS.length}</span>
          <span>{step.title}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#2563eb] rounded-full transition-all" style={{ width: `${((wizardStep + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#0d1b3e]">{step.title}</h2>
          <p className="text-sm text-gray-500">{step.subtitle}</p>
        </div>

        {wizardStep === 0 && (
          <div className="space-y-3">
            {cashSaved ? (
              <div className="bg-green-50 rounded-xl p-4 text-center space-y-1">
                <p className="text-green-700 font-semibold">✓ Opening cash saved</p>
                <p className="text-2xl font-bold text-green-600">₦{Number(cashAmount).toLocaleString()}</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600">How much cash did your factory have when you started using AquaOps? This sets your starting financial position.</p>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#0d1b3e]">Opening Cash Amount (₦)</label>
                  <input type="number" placeholder="e.g. 250000" value={cashAmount} onChange={(e) => setCashAmount(e.target.value)} className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#0d1b3e]">As of Date</label>
                  <input type="date" value={cashDate} onChange={(e) => setCashDate(e.target.value)} className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#0d1b3e]">Notes (optional)</label>
                  <input type="text" placeholder="e.g. Cash on hand as at Jan 1" value={cashNotes} onChange={(e) => setCashNotes(e.target.value)} className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm" />
                </div>
                <button onClick={handleSaveCash} disabled={!cashAmount} className="w-full h-11 bg-[#2563eb] text-white font-semibold rounded-xl text-sm disabled:opacity-40">
                  Save Cash Balance
                </button>
              </>
            )}
          </div>
        )}

        {wizardStep > 0 && stepPhase === "idle" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Download the template, fill in your data in Excel, then upload it here.</p>
            <button onClick={() => downloadTemplate(step.templateType as TemplateType)} className="w-full h-11 bg-blue-50 text-[#2563eb] font-semibold rounded-xl text-sm border border-blue-100">
              ⬇ Download Excel Template
            </button>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center space-y-2">
              <p className="text-sm text-gray-400">Upload your completed file (.xlsx or .csv)</p>
              <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFileSelect} className="hidden" />
              <button onClick={() => fileRef.current?.click()} className="h-11 px-8 bg-[#0d1b3e] text-white font-semibold rounded-xl text-sm">
                Choose File
              </button>
            </div>
          </div>
        )}

        {wizardStep > 0 && stepPhase === "preview" && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-gray-700">{parsedRows.length}</p>
                <p className="text-xs text-gray-400">Total Rows</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-green-600">{validRows.length}</p>
                <p className="text-xs text-gray-400">Ready</p>
              </div>
              <div className="bg-red-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-red-500">{parseErrors.length}</p>
                <p className="text-xs text-gray-400">Errors</p>
              </div>
            </div>

            {parseErrors.length > 0 && (
              <div className="bg-red-50 rounded-xl p-3 max-h-28 overflow-y-auto space-y-1">
                <p className="text-xs font-semibold text-red-700">Rows with errors will be skipped:</p>
                {parseErrors.slice(0, 8).map((e, i) => (
                  <p key={i} className="text-xs text-red-600">Row {e.row}: {e.message}</p>
                ))}
                {parseErrors.length > 8 && <p className="text-xs text-red-400">+{parseErrors.length - 8} more</p>}
              </div>
            )}

            {validRows.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 px-3 pt-2">Preview — first 5 of {validRows.length} valid rows</p>
                <table className="text-xs w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {Object.keys(validRows[0]).map((k) => (
                        <th key={k} className="px-2 py-1.5 text-left text-gray-500 whitespace-nowrap border-b border-gray-100">{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {validRows.slice(0, 5).map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        {Object.values(row).map((v: any, j) => (
                          <td key={j} className="px-2 py-1.5 whitespace-nowrap text-gray-700">{String(v)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => { setStepPhase("idle"); if (fileRef.current) fileRef.current.value = "" }} className="flex-1 h-11 border border-gray-200 text-gray-600 font-semibold rounded-xl text-sm">
                Re-upload
              </button>
              <button onClick={handleImport} disabled={!validRows.length} className="flex-1 h-11 bg-[#2563eb] text-white font-semibold rounded-xl text-sm disabled:opacity-40">
                Import {validRows.length} Record{validRows.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        )}

        {wizardStep > 0 && stepPhase === "importing" && (
          <div className="py-8 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-500">Importing records, please wait...</p>
          </div>
        )}

        {wizardStep > 0 && stepPhase === "done" && (
          <div className="bg-green-50 rounded-xl p-4 text-center space-y-1">
            <p className="text-green-700 font-semibold text-lg">✓ Import successful</p>
            <p className="text-sm text-green-600">{importedCount} record{importedCount !== 1 ? "s" : ""} added to your account</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={goNext} className="flex-1 h-12 border border-gray-200 text-gray-600 font-semibold rounded-xl text-sm">
          {wizardStep === STEPS.length - 1 ? "Finish" : "Skip"}
        </button>
        {(cashSaved && wizardStep === 0) || stepPhase === "done" ? (
          <button onClick={goNext} className="flex-1 h-12 bg-[#2563eb] text-white font-semibold rounded-xl text-sm">
            {wizardStep < STEPS.length - 1 ? "Next Step →" : "Finish →"}
          </button>
        ) : null}
      </div>
    </div>
  )
}