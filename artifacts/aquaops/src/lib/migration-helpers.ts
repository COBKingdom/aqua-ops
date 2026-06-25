import * as XLSX from "xlsx"
import { supabase } from "./supabase"
import { getFactoryId } from "./factory"

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type ParsedWorkbook = {
  sales: Record<string, any>[]
  expenses: Record<string, any>[]
  production: Record<string, any>[]
  productionLosses: Record<string, any>[]
  customers: Record<string, any>[]
}

export type ValidationError = {
  sheet: string
  row: number
  field: string
  message: string
}

export type ValidationResult = {
  valid: boolean
  errors: ValidationError[]
  warnings: string[]
}

export type PreviewCounts = {
  sales: number
  expenses: number
  production: number
  productionLosses: number
  customers: number
  total: number
}

export type ImportResult = {
  salesImported: number
  expensesImported: number
  productionImported: number
  productionLossesImported: number
  customersImported: number
  skipped: number
  warnings: string[]
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const VALID_PRODUCT_TYPES = ["sachet", "bottle"]
const VALID_COST_GROUPS = ["Material Cost", "Production Cost", "Other Expense"]
const VALID_SHIFTS = ["morning", "afternoon", "night", ""]
const VALID_LOSS_TYPES = [
  "Leakages",
  "Burst Sachets",
  "Broken Bottles",
  "Quality Rejects",
  "Cleaning Waste",
  "Machine Faults",
  "Other",
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size))
  }
  return out
}

function isValidDate(val: string): boolean {
  if (!val) return false
  const d = new Date(val)
  return !isNaN(d.getTime())
}

function isPositiveNumber(val: any): boolean {
  const n = Number(val)
  return !isNaN(n) && n >= 0
}

function findSheet(wb: XLSX.WorkBook, ...names: string[]): any[] {
  for (const name of names) {
    const found = wb.SheetNames.find(
      (s) => s.toLowerCase().trim() === name.toLowerCase()
    )
    if (found) {
      return XLSX.utils.sheet_to_json(wb.Sheets[found], {
        raw: false,
        defval: "",
      })
    }
  }
  return []
}

// ─── TEMPLATE DOWNLOAD ────────────────────────────────────────────────────────

export function downloadMigrationTemplate() {
  const wb = XLSX.utils.book_new()

  const salesWs = XLSX.utils.aoa_to_sheet([
    [
      "date",
      "customer_name",
      "product_type",
      "bags_sold",
      "price_per_bag",
      "total_amount",
      "amount_paid",
      "balance",
    ],
    ["2024-01-15", "John Doe", "sachet", "100", "50", "5000", "5000", "0"],
    ["2024-01-15", "Jane Stores", "bottle", "20", "800", "16000", "10000", "6000"],
  ])
  salesWs["!cols"] = [8, 20, 14, 12, 14, 14, 14, 12].map((w) => ({ wch: w }))
  XLSX.utils.book_append_sheet(wb, salesWs, "Sales")

  const expensesWs = XLSX.utils.aoa_to_sheet([
    ["date", "category", "cost_group", "amount", "description"],
    ["2024-01-15", "Nylon", "Material Cost", "12000", "Sachet nylon rolls"],
    ["2024-01-15", "Diesel", "Production Cost", "5000", "Generator fuel"],
    ["2024-01-15", "Logistics", "Other Expense", "2000", "Delivery"],
  ])
  expensesWs["!cols"] = [12, 20, 20, 12, 30].map((w) => ({ wch: w }))
  XLSX.utils.book_append_sheet(wb, expensesWs, "Expenses")

  const productionWs = XLSX.utils.aoa_to_sheet([
    ["date", "product_type", "bags_produced", "shift", "notes"],
    ["2024-01-15", "sachet", "500", "morning", ""],
    ["2024-01-15", "bottle", "50", "afternoon", ""],
  ])
  productionWs["!cols"] = [12, 14, 16, 12, 24].map((w) => ({ wch: w }))
  XLSX.utils.book_append_sheet(wb, productionWs, "Production")

  const lossesWs = XLSX.utils.aoa_to_sheet([
    ["date", "product_type", "loss_type", "quantity", "reason"],
    ["2024-01-15", "sachet", "Burst Sachets", "10", "Machine pressure issue"],
    ["2024-01-15", "bottle", "Quality Rejects", "2", "Contamination detected"],
  ])
  lossesWs["!cols"] = [12, 14, 18, 12, 30].map((w) => ({ wch: w }))
  XLSX.utils.book_append_sheet(wb, lossesWs, "Production Losses")

  const customersWs = XLSX.utils.aoa_to_sheet([
    ["customer_name", "phone", "address", "email", "notes"],
    ["John Doe", "08012345678", "12 Main Street, Lagos", "", ""],
    ["Jane Stores", "08098765432", "45 Market Road, Abuja", "", "VIP customer"],
  ])
  customersWs["!cols"] = [22, 16, 30, 22, 24].map((w) => ({ wch: w }))
  XLSX.utils.book_append_sheet(wb, customersWs, "Customers")

  XLSX.writeFile(wb, "AquaOps_Migration_Template.xlsx")
}

// ─── PARSE WORKBOOK ───────────────────────────────────────────────────────────

export function parseWorkbook(file: File): Promise<ParsedWorkbook> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer)
        const wb = XLSX.read(data, { type: "array", cellDates: false })

        resolve({
          sales: findSheet(wb, "Sales"),
          expenses: findSheet(wb, "Expenses"),
          production: findSheet(wb, "Production"),
          productionLosses: findSheet(
            wb,
            "Production Losses",
            "ProductionLosses",
            "Losses"
          ),
          customers: findSheet(wb, "Customers", "Debtors"),
        })
      } catch (err) {
        reject(err)
      }
    }

    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsArrayBuffer(file)
  })
}

// ─── VALIDATE ─────────────────────────────────────────────────────────────────

export function validateWorkbook(data: ParsedWorkbook): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: string[] = []

  // SALES
  data.sales.forEach((row, i) => {
    const r = i + 2
    if (!row.date) {
      errors.push({ sheet: "Sales", row: r, field: "date", message: "Date is required" })
    } else if (!isValidDate(row.date)) {
      errors.push({ sheet: "Sales", row: r, field: "date", message: "Invalid date format — use YYYY-MM-DD" })
    }
    if (!row.customer_name) {
      errors.push({ sheet: "Sales", row: r, field: "customer_name", message: "Customer name is required" })
    }
    if (!row.product_type) {
      errors.push({ sheet: "Sales", row: r, field: "product_type", message: "Product type is required" })
    } else if (!VALID_PRODUCT_TYPES.includes(row.product_type.toLowerCase())) {
      errors.push({ sheet: "Sales", row: r, field: "product_type", message: `Must be "sachet" or "bottle"` })
    }
    if (!isPositiveNumber(row.bags_sold)) {
      errors.push({ sheet: "Sales", row: r, field: "bags_sold", message: "Must be a positive number" })
    }
    if (!isPositiveNumber(row.total_amount)) {
      errors.push({ sheet: "Sales", row: r, field: "total_amount", message: "Must be a positive number" })
    }
    if (row.balance && Number(row.balance) < 0) {
      errors.push({ sheet: "Sales", row: r, field: "balance", message: "Balance cannot be negative" })
    }
  })

  // EXPENSES
  data.expenses.forEach((row, i) => {
    const r = i + 2
    if (!row.date) {
      errors.push({ sheet: "Expenses", row: r, field: "date", message: "Date is required" })
    } else if (!isValidDate(row.date)) {
      errors.push({ sheet: "Expenses", row: r, field: "date", message: "Invalid date format — use YYYY-MM-DD" })
    }
    if (!row.category) {
      errors.push({ sheet: "Expenses", row: r, field: "category", message: "Category is required" })
    }
    if (row.cost_group && !VALID_COST_GROUPS.includes(row.cost_group)) {
      errors.push({
        sheet: "Expenses",
        row: r,
        field: "cost_group",
        message: `Must be one of: ${VALID_COST_GROUPS.join(", ")}`,
      })
    }
    if (!isPositiveNumber(row.amount) || Number(row.amount) === 0) {
      errors.push({ sheet: "Expenses", row: r, field: "amount", message: "Must be a positive number" })
    }
  })

  // PRODUCTION
  data.production.forEach((row, i) => {
    const r = i + 2
    if (!row.date) {
      errors.push({ sheet: "Production", row: r, field: "date", message: "Date is required" })
    } else if (!isValidDate(row.date)) {
      errors.push({ sheet: "Production", row: r, field: "date", message: "Invalid date format — use YYYY-MM-DD" })
    }
    if (!row.product_type) {
      errors.push({ sheet: "Production", row: r, field: "product_type", message: "Product type is required" })
    } else if (!VALID_PRODUCT_TYPES.includes(row.product_type.toLowerCase())) {
      errors.push({ sheet: "Production", row: r, field: "product_type", message: `Must be "sachet" or "bottle"` })
    }
    if (!isPositiveNumber(row.bags_produced) || Number(row.bags_produced) === 0) {
      errors.push({ sheet: "Production", row: r, field: "bags_produced", message: "Must be a positive number" })
    }
    if (row.shift && !VALID_SHIFTS.includes(row.shift.toLowerCase())) {
      warnings.push(`Production row ${r}: shift "${row.shift}" is not standard — will be imported as-is`)
    }
  })

  // PRODUCTION LOSSES
  data.productionLosses.forEach((row, i) => {
    const r = i + 2
    if (!row.product_type) {
      errors.push({ sheet: "Production Losses", row: r, field: "product_type", message: "Product type is required" })
    } else if (!VALID_PRODUCT_TYPES.includes(row.product_type.toLowerCase())) {
      errors.push({ sheet: "Production Losses", row: r, field: "product_type", message: `Must be "sachet" or "bottle"` })
    }
    if (!row.loss_type) {
      errors.push({ sheet: "Production Losses", row: r, field: "loss_type", message: "Loss type is required" })
    } else if (!VALID_LOSS_TYPES.includes(row.loss_type)) {
      warnings.push(`Production Losses row ${r}: loss type "${row.loss_type}" is non-standard — will be imported as-is`)
    }
    if (!isPositiveNumber(row.quantity) || Number(row.quantity) === 0) {
      errors.push({ sheet: "Production Losses", row: r, field: "quantity", message: "Must be a positive number" })
    }
  })

  // CUSTOMERS
  data.customers.forEach((row, i) => {
    const r = i + 2
    if (!row.customer_name) {
      errors.push({ sheet: "Customers", row: r, field: "customer_name", message: "Customer name is required" })
    }
  })

  if (
    data.sales.length === 0 &&
    data.expenses.length === 0 &&
    data.production.length === 0 &&
    data.productionLosses.length === 0 &&
    data.customers.length === 0
  ) {
    errors.push({
      sheet: "Workbook",
      row: 0,
      field: "—",
      message: "No data found. Make sure sheet names match the template exactly.",
    })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// ─── PREVIEW ──────────────────────────────────────────────────────────────────

export function generatePreview(data: ParsedWorkbook): PreviewCounts {
  return {
    sales: data.sales.length,
    expenses: data.expenses.length,
    production: data.production.length,
    productionLosses: data.productionLosses.length,
    customers: data.customers.length,
    total:
      data.sales.length +
      data.expenses.length +
      data.production.length +
      data.productionLosses.length +
      data.customers.length,
  }
}

// ─── IMPORT ───────────────────────────────────────────────────────────────────

export async function importToSupabase(
  data: ParsedWorkbook,
  onProgress: (msg: string) => void
): Promise<ImportResult> {
  const factoryId = await getFactoryId()
  if (!factoryId) throw new Error("No factory found. Please set up your factory first.")

  const result: ImportResult = {
    salesImported: 0,
    expensesImported: 0,
    productionImported: 0,
    productionLossesImported: 0,
    customersImported: 0,
    skipped: 0,
    warnings: [],
  }

  // SALES
  if (data.sales.length > 0) {
    onProgress(`Importing ${data.sales.length} sales records…`)
    const rows = data.sales.map((r) => ({
      factory_id: factoryId,
      customer_name: String(r.customer_name || "").trim(),
      product_type: String(r.product_type || "").toLowerCase().trim(),
      bags_sold: Number(r.bags_sold) || 0,
      price_per_bag: Number(r.price_per_bag) || 0,
      total_amount: Number(r.total_amount) || 0,
      amount_paid: Number(r.amount_paid ?? r.total_amount) || 0,
      balance: Number(r.balance) || 0,
      date: r.date,
    }))
    for (const batch of chunk(rows, 100)) {
      const { error } = await supabase.from("sales").insert(batch)
      if (error) {
        result.warnings.push(`Sales batch error: ${error.message}`)
        result.skipped += batch.length
      } else {
        result.salesImported += batch.length
      }
    }
  }

  // EXPENSES
  if (data.expenses.length > 0) {
    onProgress(`Importing ${data.expenses.length} expense records…`)
    const rows = data.expenses.map((r) => ({
      factory_id: factoryId,
      category: String(r.category || "").trim(),
      cost_group: String(r.cost_group || "Other Expense").trim(),
      amount: Number(r.amount) || 0,
      description: String(r.description || "").trim(),
      created_at: isValidDate(r.date) ? new Date(r.date).toISOString() : new Date().toISOString(),
    }))
    for (const batch of chunk(rows, 100)) {
      const { error } = await supabase.from("expenses").insert(batch)
      if (error) {
        result.warnings.push(`Expenses batch error: ${error.message}`)
        result.skipped += batch.length
      } else {
        result.expensesImported += batch.length
      }
    }
  }

  // PRODUCTION
  if (data.production.length > 0) {
    onProgress(`Importing ${data.production.length} production records…`)
    const rows = data.production.map((r) => ({
      factory_id: factoryId,
      product_type: String(r.product_type || "").toLowerCase().trim(),
      bags_produced: Number(r.bags_produced) || 0,
      shift: String(r.shift || "morning").toLowerCase().trim(),
      notes: String(r.notes || "").trim(),
      date: r.date,
    }))
    for (const batch of chunk(rows, 100)) {
      const { error } = await supabase.from("production").insert(batch)
      if (error) {
        result.warnings.push(`Production batch error: ${error.message}`)
        result.skipped += batch.length
      } else {
        result.productionImported += batch.length
      }
    }
  }

  // PRODUCTION LOSSES
  if (data.productionLosses.length > 0) {
    onProgress(`Importing ${data.productionLosses.length} production loss records…`)
    const rows = data.productionLosses.map((r) => ({
      factory_id: factoryId,
      product_type: String(r.product_type || "").toLowerCase().trim(),
      loss_type: String(r.loss_type || "Other").trim(),
      quantity: Number(r.quantity) || 0,
      reason: String(r.reason || "").trim(),
    }))
    for (const batch of chunk(rows, 100)) {
      const { error } = await supabase.from("production_losses").insert(batch)
      if (error) {
        result.warnings.push(`Production losses batch error: ${error.message}`)
        result.skipped += batch.length
      } else {
        result.productionLossesImported += batch.length
      }
    }
  }

  // CUSTOMERS
  if (data.customers.length > 0) {
    onProgress(`Importing ${data.customers.length} customer records…`)
    const rows = data.customers.map((r) => ({
      factory_id: factoryId,
      customer_name: String(r.customer_name || "").trim(),
      phone: String(r.phone || "").trim(),
      address: String(r.address || "").trim(),
      email: String(r.email || "").trim(),
      notes: String(r.notes || "").trim(),
    }))
    for (const batch of chunk(rows, 100)) {
      const { error } = await supabase.from("customers").insert(batch)
      if (error) {
        result.warnings.push(`Customers: ${error.message} — skipping ${batch.length} records`)
        result.skipped += batch.length
      } else {
        result.customersImported += batch.length
      }
    }
  }

  onProgress("Import complete.")
  return result
}