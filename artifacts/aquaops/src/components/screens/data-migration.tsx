import { useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId } from "@/lib/factory"
import * as XLSX from "xlsx"

type DataType = "customers" | "debts" | "production" | "sales" | "expenses"
type Step =
  | "select" | "download" | "upload"
  | "validating" | "preview" | "importing" | "done"

interface ParsedRow    { [key: string]: any }
interface ErrorRow     { rowNum: number; reason: string }
interface ImportSummary {
  found: number; valid: number; imported: number
  duplicates: number; errors: number
}
interface DataMigrationProps { setActiveTab: (tab: string) => void }

const TYPES = [
  { id: "customers",  label: "Customers",                  desc: "Customer names and contact info"      },
  { id: "debts",      label: "Outstanding Customer Debts", desc: "Unpaid balances owed by customers"    },
  { id: "production", label: "Production",                 desc: "Daily bags / crates produced"         },
  { id: "sales",      label: "Sales",                      desc: "Sales transactions and payments"      },
  { id: "expenses",   label: "Expenses",                   desc: "Costs and operational expenses"       },
] as const

const REQUIRED_COLS: Record<DataType, string[]> = {
  customers:  ["name"],
  debts:      ["date","customer_name","product_type","bags_sold","price_per_bag","amount_paid"],
  production: ["date","product_type","bags_produced","pieces_per_bag","shift"],
  sales:      ["date","customer_name","product_type","bags_sold","price_per_bag","amount_paid"],
  expenses:   ["date","cost_group","category","amount"],
}

const TEMPLATE_HEADERS: Record<DataType, string[]> = {
  customers:  ["name","phone","address"],
  debts:      ["date","customer_name","product_type","bags_sold","price_per_bag","amount_paid","notes"],
  production: ["date","product_type","bags_produced","pieces_per_bag","shift"],
  sales:      ["date","customer_name","product_type","bags_sold","price_per_bag","amount_paid","notes"],
  expenses:   ["date","cost_group","category","amount","notes"],
}

const TEMPLATE_EXAMPLES: Record<DataType, any[]> = {
  customers:  ["Alhaji Musa","08012345678","Kano Road"],
  debts:      ["2026-01-15","Alhaji Musa","sachet",50,1200,30000,"Opening balance"],
  production: ["2026-06-01","sachet",500,20,"morning"],
  sales:      ["2026-06-01","Alhaji Musa","sachet",100,1200,120000,"Paid in full"],
  expenses:   ["2026-06-01","Material Cost","Nylon",45000,"Weekly supply"],
}

const TEMPLATE_INSTRUCTIONS: Record<DataType, string> = {
  customers:  "REQUIRED: name. Optional: phone, address.",
  debts:      "REQUIRED: date (YYYY-MM-DD), customer_name, product_type (sachet/bottle), bags_sold, price_per_bag, amount_paid. total_amount and balance are auto-computed.",
  production: "REQUIRED: date (YYYY-MM-DD), product_type (sachet/bottle), bags_produced, pieces_per_bag (default 20), shift (morning/afternoon/night).",
  sales:      "REQUIRED: date (YYYY-MM-DD), customer_name, product_type (sachet/bottle), bags_sold, price_per_bag, amount_paid. total_amount auto-computed.",
  expenses:   "REQUIRED: date (YYYY-MM-DD), cost_group (Material Cost | Production Cost | Other Expense), category, amount. Optional: notes.",
}

const TARGET_TABLE: Record<DataType, string> = {
  customers: "customers", debts: "sales",
  production: "production", sales: "sales", expenses: "expenses",
}

function parseDate(val: any): string | null {
  if (!val && val !== 0) return null
  if (typeof val === "number" && val > 0 && val < 60000) {
    const d = new Date(Math.floor(val - 25569) * 86400 * 1000)
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,"0")}-${String(d.getUTCDate()).padStart(2,"0")}`
  }
  const s = String(val).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) {
    const [dd,mm,yyyy] = s.split("/"); return `${yyyy}-${mm}-${dd}`
  }
  const p = new Date(s)
  return isNaN(p.getTime()) ? null : p.toISOString().split("T")[0]
}

function parseNum(val: any): number | null {
  const n = Number(val); return isNaN(n) ? null : n
}

export function DataMigration({ setActiveTab }: DataMigrationProps) {

  const [step, setStep]           = useState<Step>("select")
  const [dataType, setDataType]   = useState<DataType>("customers")
  const [totalFound, setTotal]    = useState(0)
  const [validRows, setValid]     = useState<ParsedRow[]>([])
  const [dupRows,   setDups]      = useState<ParsedRow[]>([])
  const [errRows,   setErrs]      = useState<ErrorRow[]>([])
  const [progress,  setProgress]  = useState(0)
  const [summary,   setSummary]   = useState<ImportSummary | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const sel = TYPES.find(t => t.id === dataType)!

  const downloadTemplate = (type: DataType) => {
    const label   = TYPES.find(t => t.id === type)!.label
    const headers = TEMPLATE_HEADERS[type]
    const ex      = TEMPLATE_EXAMPLES[type]
    const exRow   = ex.map((v, i) => i === 0 ? `(EXAMPLE — DELETE THIS ROW) ${v}` : v)
    const ws = XLSX.utils.aoa_to_sheet([
      [`AquaOps Data Migration Template — ${label}`],
      ["AquaOps by TrueOps  |  support@trueops.app  |  trueops.app"],
      [`INSTRUCTIONS: ${TEMPLATE_INSTRUCTIONS[type]}`],
      [],
      headers,
      exRow,
    ])
    ws["!cols"] = headers.map(() => ({ wch: 24 }))
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Data")
    XLSX.writeFile(wb, `AquaOps_${type}_template.xlsx`)
  }

  const handleFile = async (file: File) => {
    setStep("validating")
    try {
      const buf  = await file.arrayBuffer()
      const wb   = XLSX.read(buf)
      const sh   = wb.SheetNames.includes("Data") ? "Data" : wb.SheetNames[0]
      const all: any[][] = XLSX.utils.sheet_to_json(wb.Sheets[sh], { header:1, defval:"" })

      const req  = REQUIRED_COLS[dataType]
      const hIdx = all.findIndex(row => {
        const cells = row.map((c:any) => String(c??"").toLowerCase().trim())
        return req.every(col => cells.includes(col.toLowerCase()))
      })
      if (hIdx === -1) {
        alert(`Could not find required columns: ${req.join(", ")}\n\nPlease use the AquaOps template for ${sel.label}.`)
        setStep("upload"); return
      }

      const hRow  = all[hIdx].map((c:any) => String(c??"").toLowerCase().trim())
      const dRows = all.slice(hIdx+1)
        .filter(r => r.some((c:any) => String(c??"").trim() !== ""))
        .filter(r => !String(r[0]??"").toLowerCase().includes("example"))

      setTotal(dRows.length)
      const valid:ParsedRow[] = []; const inv:ErrorRow[] = []

      dRows.forEach((row, idx) => {
        const obj:ParsedRow = {}
        hRow.forEach((h,i) => { obj[h] = row[i] })
        const errs:string[] = []
        const res = validateRow(dataType, obj, errs)
        if (errs.length) inv.push({ rowNum: hIdx+idx+2, reason: errs.join("; ") })
        else valid.push(res)
      })

      const dupes = await detectDuplicates(dataType, valid)
      setValid(valid); setDups(dupes); setErrs(inv)
      setStep("preview")
    } catch (err) {
      console.error(err)
      alert("Failed to read file. Please use a valid .xlsx or .csv file.")
      setStep("upload")
    }
  }

  function validateRow(type: DataType, obj: ParsedRow, errs: string[]): ParsedRow {
    const r: ParsedRow = {}

    if (type === "customers") {
      const name = String(obj.name??"").trim()
      if (!name) errs.push("name is required")
      r.name    = name
      r.phone   = String(obj.phone??"").trim()   || null
      r.address = String(obj.address??"").trim() || null
    }

    if (type === "sales" || type === "debts") {
      const date = parseDate(obj.date)
      if (!date) errs.push("date is invalid (use YYYY-MM-DD)"); else r.date = date
      const cn = String(obj.customer_name??"").trim()
      if (!cn) errs.push("customer_name is required"); r.customer_name = cn
      const pt = String(obj.product_type??"").toLowerCase().trim()
      if (!["sachet","bottle"].includes(pt)) errs.push("product_type must be sachet or bottle")
      r.product_type = pt
      const bags = parseNum(obj.bags_sold)
      if (!bags || bags <= 0) errs.push("bags_sold must be a positive number"); r.bags_sold = bags??0
      const ppb = parseNum(obj.price_per_bag)
      if (!ppb || ppb <= 0) errs.push("price_per_bag must be a positive number"); r.price_per_bag = ppb??0
      const paid = parseNum(obj.amount_paid)
      if (paid === null || paid < 0) errs.push("amount_paid must be 0 or more"); r.amount_paid = paid??0
      r.total_amount       = r.bags_sold * r.price_per_bag
      r.balance            = Math.max(0, r.total_amount - r.amount_paid)
      r.notes              = String(obj.notes??"").trim() || null
      r.is_opening_balance = type === "debts"
    }

    if (type === "production") {
      const date = parseDate(obj.date)
      if (!date) errs.push("date is invalid (use YYYY-MM-DD)"); else r.date = date
      const pt = String(obj.product_type??"").toLowerCase().trim()
      if (!["sachet","bottle"].includes(pt)) errs.push("product_type must be sachet or bottle")
      r.product_type = pt
      const bags = parseNum(obj.bags_produced)
      if (!bags || bags <= 0) errs.push("bags_produced must be a positive number"); r.bags_produced = bags??0
      const ppb = parseNum(obj.pieces_per_bag)
      r.pieces_per_bag = ppb !== null && ppb > 0 ? ppb : 20
      const shift = String(obj.shift??"").toLowerCase().trim()
      if (!["morning","afternoon","night"].includes(shift)) errs.push("shift must be morning, afternoon, or night")
      r.shift = shift
    }

    if (type === "expenses") {
      const date = parseDate(obj.date)
      if (!date) errs.push("date is invalid (use YYYY-MM-DD)"); else r.date = date
      const cg = String(obj.cost_group??"").trim()
      if (!["Material Cost","Production Cost","Other Expense"].includes(cg))
        errs.push("cost_group must be: Material Cost, Production Cost, or Other Expense")
      r.cost_group = cg
      const cat = String(obj.category??"").trim()
      if (!cat) errs.push("category is required"); r.category = cat
      const amt = parseNum(obj.amount)
      if (!amt || amt <= 0) errs.push("amount must be a positive number"); r.amount = amt??0
      r.notes = String(obj.notes??"").trim() || null
    }

    return r
  }

  async function detectDuplicates(type: DataType, rows: ParsedRow[]): Promise<ParsedRow[]> {
    if (!rows.length) return []
    const fid = await getFactoryId()
    if (!fid) return []
    try {
      if (type === "sales" || type === "debts") {
        const dates = [...new Set(rows.map(r => r.date))]
        const { data } = await supabase.from("sales")
          .select("date,customer_name,bags_sold,product_type")
          .eq("factory_id", fid).in("date", dates)
        return !data ? [] : rows.filter(r =>
          data.some(d => d.date === r.date &&
            String(d.customer_name).toLowerCase() === String(r.customer_name).toLowerCase() &&
            Number(d.bags_sold) === Number(r.bags_sold) && d.product_type === r.product_type))
      }
      if (type === "production") {
        const dates = [...new Set(rows.map(r => r.date))]
        const { data } = await supabase.from("production")
          .select("date,product_type,shift").eq("factory_id", fid).in("date", dates)
        return !data ? [] : rows.filter(r =>
          data.some(d => d.date === r.date && d.product_type === r.product_type && d.shift === r.shift))
      }
      if (type === "expenses") {
        const dates = [...new Set(rows.map(r => r.date))]
        const { data } = await supabase.from("expenses")
          .select("date,cost_group,amount").eq("factory_id", fid).in("date", dates)
        return !data ? [] : rows.filter(r =>
          data.some(d => d.date === r.date && d.cost_group === r.cost_group && Number(d.amount) === Number(r.amount)))
      }
      if (type === "customers") {
        const { data } = await supabase.from("customers").select("name").eq("factory_id", fid)
        return !data ? [] : rows.filter(r =>
          data.some(d => String(d.name).toLowerCase() === String(r.name).toLowerCase()))
      }
    } catch { /* non-blocking */ }
    return []
  }

  const handleImport = async () => {
    setStep("importing"); setProgress(0)
    const fid = await getFactoryId()
    if (!fid) { alert("Factory not found."); setStep("preview"); return }

    const prepRow = (row: ParsedRow) => {
      if (dataType === "customers")
        return { factory_id:fid, name:row.name, phone:row.phone, address:row.address }
      if (dataType === "sales" || dataType === "debts")
        return { factory_id:fid, date:row.date, customer_name:row.customer_name,
          product_type:row.product_type, bags_sold:row.bags_sold, price_per_bag:row.price_per_bag,
          total_amount:row.total_amount, amount_paid:row.amount_paid, balance:row.balance,
          notes:row.notes, is_opening_balance:row.is_opening_balance }
      if (dataType === "production")
        return { factory_id:fid, date:row.date, product_type:row.product_type,
          bags_produced:row.bags_produced, pieces_per_bag:row.pieces_per_bag, shift:row.shift }
      return { factory_id:fid, date:row.date, cost_group:row.cost_group,
        category:row.category, amount:row.amount, notes:row.notes }
    }

    const rows = validRows.map(prepRow)
    const BATCH = 100; let imported = 0

    for (let i = 0; i < rows.length; i += BATCH) {
      const { error } = await supabase.from(TARGET_TABLE[dataType]).insert(rows.slice(i, i+BATCH))
      if (!error) imported += Math.min(BATCH, rows.length - i)
      setProgress(Math.min(100, Math.round(((i+BATCH)/rows.length)*100)))
    }

    setSummary({ found:totalFound, valid:validRows.length, imported, duplicates:dupRows.length, errors:errRows.length })
    setStep("done")
  }

  const resetAll = () => {
    setStep("select"); setValid([]); setDups([]); setErrs([])
    setTotal(0); setSummary(null); setProgress(0)
    if (fileRef.current) fileRef.current.value = ""
  }

  const STEP_LABELS = ["Type","Template","Upload","Preview","Import"]
  const stepIdx: Record<string,number> = { select:0,download:1,upload:2,validating:2,preview:3,importing:4,done:4 }

  return (
    <div className="p-4 space-y-5 pb-24">

      <button onClick={() => setActiveTab("reports")}
        className="flex items-center gap-1 text-sm text-[#2563eb] font-medium">
        ← Back to Reports
      </button>

      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">Data Migration</h1>
        <p className="text-sm text-gray-500 mt-1">Import existing records from Excel spreadsheets</p>
      </div>

      {step !== "select" && step !== "done" && (
        <div className="flex items-center overflow-x-auto pb-1">
          {STEP_LABELS.map((label, i) => {
            const cur  = stepIdx[step]
            const done = i < cur; const active = i === cur
            return (
              <div key={label} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    done ? "bg-green-500 text-white" : active ? "bg-[#2563eb] text-white" : "bg-gray-200 text-gray-400"}`}>
                    {done ? "✓" : i+1}
                  </div>
                  <p className={`text-[10px] mt-1 ${active ? "text-[#2563eb] font-semibold" : "text-gray-400"}`}>{label}</p>
                </div>
                {i < STEP_LABELS.length-1 && <div className={`w-6 h-0.5 mb-4 mx-1 ${done ? "bg-green-500" : "bg-gray-200"}`}/>}
              </div>
            )
          })}
        </div>
      )}

      {/* SELECT */}
      {step === "select" && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#0d1b3e]">What would you like to import?</p>
          {TYPES.map((t, i) => (
            <button key={t.id}
              onClick={() => { setDataType(t.id as DataType); setStep("download") }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between text-left hover:border-[#2563eb] hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0d1b3e] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i+1}
                </div>
                <div>
                  <p className="font-semibold text-[#0d1b3e] text-sm">{t.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </div>
              </div>
              <span className="text-[#2563eb] text-xl">›</span>
            </button>
          ))}
        </div>
      )}

      {/* DOWNLOAD */}
      {step === "download" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Importing</p>
            <p className="font-bold text-[#0d1b3e] text-base mt-0.5">{sel.label}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <p className="text-sm font-semibold text-[#0d1b3e]">Step 1 — Download the Template</p>
            <p className="text-sm text-gray-600">Download, fill in your records, then return here to upload.</p>
            <ul className="space-y-1.5 text-xs text-gray-500">
              {["Do not rename or remove column headers",
                "Delete the example row before uploading",
                "Dates must be YYYY-MM-DD (e.g. 2026-06-15)",
                "Save as .xlsx before uploading"].map(t => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">•</span>{t}
                </li>
              ))}
            </ul>
            <button onClick={() => downloadTemplate(dataType)}
              className="w-full h-12 bg-[#0d1b3e] text-white rounded-xl text-sm font-bold">
              ⬇ Download {sel.label} Template
            </button>
          </div>
          <button onClick={() => setStep("upload")}
            className="w-full h-12 bg-[#2563eb] text-white rounded-xl text-sm font-bold">
            I've filled the template — Continue ›
          </button>
          <button onClick={resetAll} className="w-full py-2 text-sm text-gray-400">← Change data type</button>
        </div>
      )}

      {/* UPLOAD / VALIDATING */}
      {(step === "upload" || step === "validating") && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Importing</p>
            <p className="font-bold text-[#0d1b3e] text-base mt-0.5">{sel.label}</p>
          </div>
          {step === "validating" ? (
            <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin"/>
              <p className="text-sm text-gray-500 font-medium">Validating your data…</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-[#0d1b3e] mb-3">Step 2 — Upload Your Spreadsheet</p>
              <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-xl p-10 cursor-pointer hover:border-[#2563eb] transition-colors">
                <span className="text-3xl mb-2">📂</span>
                <span className="text-sm font-semibold text-[#0d1b3e]">Tap to select file</span>
                <span className="text-xs text-gray-400 mt-1">Accepts .xlsx, .xls, .csv</span>
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}/>
              </label>
            </div>
          )}
          <button onClick={() => setStep("download")} className="w-full py-2 text-sm text-gray-400">← Back</button>
        </div>
      )}

      {/* PREVIEW */}
      {step === "preview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: totalFound,     label: "Rows Found", cls: "bg-white text-[#0d1b3e]"          },
              { val: validRows.length, label: "Valid Rows", cls: "bg-green-50 text-green-700"      },
              { val: errRows.length,  label: "Errors",     cls: errRows.length > 0 ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-400" },
            ].map(c => (
              <div key={c.label} className={`${c.cls} rounded-xl p-3 text-center border border-gray-100`}>
                <p className="text-xl font-bold">{c.val}</p>
                <p className="text-[10px] text-gray-500 mt-1">{c.label}</p>
              </div>
            ))}
          </div>

          {dupRows.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-sm font-semibold text-yellow-800">
                ⚠ {dupRows.length} potential duplicate{dupRows.length !== 1 ? "s" : ""} detected
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                These records may already exist. Import will still proceed — review afterwards.
              </p>
            </div>
          )}

          {errRows.length > 0 && (
            <details className="bg-white rounded-xl shadow-sm overflow-hidden">
              <summary className="p-3 cursor-pointer text-sm font-semibold text-red-600">
                {errRows.length} row{errRows.length !== 1 ? "s" : ""} with errors — will be skipped ▾
              </summary>
              <div className="px-3 pb-3 space-y-1 max-h-48 overflow-y-auto">
                {errRows.slice(0,30).map(e => (
                  <p key={e.rowNum} className="text-xs text-gray-500">
                    <span className="font-semibold">Row {e.rowNum}:</span> {e.reason}
                  </p>
                ))}
                {errRows.length > 30 && <p className="text-xs text-gray-400 italic">…and {errRows.length-30} more</p>}
              </div>
            </details>
          )}

          {validRows.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <p className="text-xs font-semibold text-gray-500 p-3 border-b border-gray-100">
                Preview — first {Math.min(5,validRows.length)} of {validRows.length} valid rows
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50">
                      {TEMPLATE_HEADERS[dataType].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-100">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {validRows.slice(0,5).map((row,i) => (
                      <tr key={i} className={i%2===0?"bg-white":"bg-gray-50"}>
                        {TEMPLATE_HEADERS[dataType].map(h => (
                          <td key={h} className="px-3 py-2 text-gray-700 whitespace-nowrap">{String(row[h]??"")}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {validRows.length === 0 ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center space-y-2">
              <p className="text-sm font-bold text-red-700">No valid rows to import</p>
              <p className="text-xs text-red-500">Fix the errors in your spreadsheet and try again</p>
              <button onClick={() => setStep("upload")} className="mt-2 text-sm text-[#2563eb] font-medium">← Try a different file</button>
            </div>
          ) : (
            <button onClick={handleImport}
              className="w-full h-12 bg-[#2563eb] text-white rounded-xl text-sm font-bold shadow-md">
              Import {validRows.length} Valid Row{validRows.length !== 1 ? "s" : ""} →
            </button>
          )}
          <button onClick={() => setStep("upload")} className="w-full py-2 text-sm text-gray-400">← Upload a different file</button>
        </div>
      )}

      {/* IMPORTING */}
      {step === "importing" && (
        <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin"/>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Importing {sel.label}…</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-[#2563eb] h-2.5 rounded-full transition-all duration-300" style={{ width:`${progress}%` }}/>
            </div>
          </div>
          <p className="text-xs text-gray-400">Please do not close this page</p>
        </div>
      )}

      {/* DONE */}
      {step === "done" && summary && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 text-center space-y-2">
            <p className="text-4xl">✅</p>
            <p className="text-lg font-bold text-[#0d1b3e]">Import Complete</p>
            <p className="text-sm text-gray-500">{sel.label} migration finished</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-[#0d1b3e]">{summary.found}</p>
              <p className="text-xs text-gray-500 mt-1">Rows Found</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-green-600">{summary.valid}</p>
              <p className="text-xs text-gray-500 mt-1">Valid Rows</p>
            </div>
            <div className="bg-[#2563eb] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{summary.imported}</p>
              <p className="text-xs text-blue-100 mt-1">Imported</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{summary.duplicates}</p>
              <p className="text-xs text-gray-500 mt-1">Duplicate Rows</p>
            </div>
            <div className="col-span-2 bg-red-50 border border-red-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{summary.errors}</p>
              <p className="text-xs text-gray-500 mt-1">Error Rows Skipped</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <button onClick={() => setActiveTab("reports")}
              className="w-full h-12 bg-[#0d1b3e] text-white rounded-xl text-sm font-bold">
              📊 View Reports
            </button>
            <button onClick={() => setActiveTab("dashboard")}
              className="w-full h-12 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0d1b3e] shadow-sm">
              🏠 Return to Dashboard
            </button>
            <button onClick={resetAll}
              className="w-full h-12 bg-blue-50 text-[#2563eb] rounded-xl text-sm font-semibold border border-blue-100">
              ↩ Import Another File
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 pt-2">
            Powered by AquaOps by TrueOps · support@trueops.app · trueops.app
          </p>
        </div>
      )}

    </div>
  )
}