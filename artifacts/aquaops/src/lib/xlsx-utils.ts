import * as XLSX from "xlsx"

export interface TemplateCol {
  key: string
  header: string
  required: boolean
  example: string
}

export const TEMPLATE_DEFS = {
  sales: [
    { key: "date",          header: "Date (YYYY-MM-DD) *",                             required: true,  example: "2024-01-15"         },
    { key: "customer_name", header: "Customer Name *",                                 required: true,  example: "Lagos Waters Ltd"   },
    { key: "product_type",  header: "Product Type * (sachet / bottle)",                required: true,  example: "sachet"             },
    { key: "bags_sold",     header: "Bags Sold *",                                     required: true,  example: "50"                 },
    { key: "unit_price",    header: "Price Per Bag (₦) *",                             required: true,  example: "200"                },
    { key: "amount_paid",   header: "Amount Paid (₦)",                                 required: false, example: "8000"               },
    { key: "notes",         header: "Notes",                                           required: false, example: "Historical sale"    },
  ],
  expenses: [
    { key: "date",        header: "Date (YYYY-MM-DD) *",                              required: true,  example: "2024-01-15"         },
    { key: "description", header: "Description *",                                    required: true,  example: "Packaging bags"     },
    { key: "amount",      header: "Amount (₦) *",                                     required: true,  example: "15000"              },
    { key: "cost_group",  header: "Cost Group * (Material Cost / Production Cost / Other Expense)", required: true, example: "Material Cost" },
    { key: "notes",       header: "Notes",                                            required: false, example: ""                   },
  ],
  production: [
    { key: "date",          header: "Date (YYYY-MM-DD) *",                            required: true,  example: "2024-01-15"         },
    { key: "product_type",  header: "Product Type * (sachet / bottle)",               required: true,  example: "sachet"             },
    { key: "bags_produced", header: "Bags / Crates Produced *",                       required: true,  example: "120"                },
    { key: "shift",         header: "Shift (morning / afternoon / night)",            required: false, example: "morning"            },
    { key: "notes",         header: "Notes",                                          required: false, example: ""                   },
  ],
  customer_debts: [
    { key: "customer_name", header: "Customer Name *",                                required: true,  example: "Emeka Stores"       },
    { key: "amount_owed",   header: "Amount Owed (₦) *",                              required: true,  example: "45000"              },
    { key: "date",          header: "Date (YYYY-MM-DD) *",                            required: true,  example: "2024-01-01"         },
    { key: "notes",         header: "Notes",                                          required: false, example: "Balance brought fwd" },
  ],
  loans: [
    { key: "source",      header: "Lender / Source *",                                required: true,  example: "First Bank"         },
    { key: "amount",      header: "Loan Amount (₦) *",                                required: true,  example: "500000"             },
    { key: "amount_paid", header: "Amount Repaid (₦)",                                required: false, example: "100000"             },
    { key: "date",        header: "Date (YYYY-MM-DD) *",                              required: true,  example: "2024-01-01"         },
    { key: "notes",       header: "Notes",                                            required: false, example: "Working capital"    },
  ],
} as const

export type TemplateType = keyof typeof TEMPLATE_DEFS

export function downloadTemplate(type: TemplateType): void {
  const cols = TEMPLATE_DEFS[type]
  const headers = cols.map((c) => c.header)
  const examples = cols.map((c) => c.example)

  const ws = XLSX.utils.aoa_to_sheet([headers, examples])
  ws["!cols"] = cols.map(() => ({ wch: 32 }))

  const wb = XLSX.utils.book_new()
  const sheetName = type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  XLSX.writeFile(wb, `aquaops-${type}-template.xlsx`)
}

export function exportToXlsx(rows: Record<string, any>[], filename: string): void {
  if (!rows.length) return
  const ws = XLSX.utils.json_to_sheet(rows)
  ws["!cols"] = Object.keys(rows[0]).map(() => ({ wch: 22 }))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Export")
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

export function exportToCsv(rows: Record<string, any>[], filename: string): void {
  if (!rows.length) return
  const ws = XLSX.utils.json_to_sheet(rows)
  const csv = XLSX.utils.sheet_to_csv(ws)
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export async function parseFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const wb = XLSX.read(data, { type: "binary", cellDates: true })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" })
        resolve(rows as any[])
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = reject
    reader.readAsBinaryString(file)
  })
}

export interface ValidationError {
  row: number
  field: string
  message: string
}

export interface ParseResult {
  rows: any[]
  errors: ValidationError[]
}

function normalizeHeader(h: string): string {
  return h
    .toLowerCase()
    .replace(/\s*\*.*$/, "")
    .replace(/\s*\(.*?\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
}

export function validateRows(rawRows: any[], type: TemplateType): ParseResult {
  const cols = TEMPLATE_DEFS[type]
  const errors: ValidationError[] = []

  if (!rawRows.length) return { rows: [], errors: [] }

  const rawKeys = Object.keys(rawRows[0])
  const keyMap: Record<string, string> = {}

  for (const col of cols) {
    const match = rawKeys.find(
      (rk) =>
        rk === col.key ||
        normalizeHeader(rk) === col.key ||
        normalizeHeader(rk) === normalizeHeader(col.header)
    )
    if (match) keyMap[col.key] = match
  }

  const validRows: any[] = []

  rawRows.forEach((rawRow, idx) => {
    const rowNum = idx + 2
    const row: any = {}

    for (const col of cols) {
      const rk = keyMap[col.key] ?? col.key
      let val = rawRow[rk] ?? rawRow[col.key] ?? ""
      if (val instanceof Date) val = val.toISOString().split("T")[0]
      row[col.key] = String(val).trim()
    }

    let ok = true

    for (const col of cols) {
      if (col.required && !row[col.key]) {
        errors.push({ row: rowNum, field: col.key, message: `${col.key.replace(/_/g, " ")} is required` })
        ok = false
      }
    }

    if (row.date) {
      const d = new Date(row.date)
      if (isNaN(d.getTime())) {
        errors.push({ row: rowNum, field: "date", message: "Invalid date — use YYYY-MM-DD" })
        ok = false
      }
    }

    if (type === "sales" || type === "production") {
      const pt = String(row.product_type || "").toLowerCase()
      if (!["sachet", "bottle"].includes(pt)) {
        errors.push({ row: rowNum, field: "product_type", message: "Product type must be 'sachet' or 'bottle'" })
        ok = false
      }
    }

    if (type === "expenses") {
      const cg = String(row.cost_group || "").toLowerCase()
      if (!["material cost", "production cost", "other expense"].includes(cg)) {
        errors.push({ row: rowNum, field: "cost_group", message: "Cost group must be: Material Cost, Production Cost, or Other Expense" })
        ok = false
      }
    }

    const numericFields: Partial<Record<TemplateType, string[]>> = {
      sales: ["bags_sold", "unit_price"],
      expenses: ["amount"],
      production: ["bags_produced"],
      customer_debts: ["amount_owed"],
      loans: ["amount"],
    }

    for (const field of numericFields[type] ?? []) {
      if (row[field] !== undefined && (isNaN(Number(row[field])) || Number(row[field]) < 0)) {
        errors.push({ row: rowNum, field, message: `${field.replace(/_/g, " ")} must be a positive number` })
        ok = false
      }
    }

    if (ok) validRows.push(row)
  })

  return { rows: validRows, errors }
}