import * as XLSX from "xlsx"

export type ExcelExportParams = {
  period: string
  currencySymbol: string
  summary: {
    sales: number
    costs: number
    debt: number
    sachetProduction: number
    bottleProduction: number
    sachetStock: number
    bottleStock: number
  }
  salesData: any[]
  expensesData: any[]
  productionData: any[]
  productionLossesData: any[]
  debtorsData: any[]
}

function cols(widths: number[]): XLSX.ColInfo[] {
  return widths.map((w) => ({ wch: w }))
}

function autoFilter(ws: XLSX.WorkSheet, colCount: number) {
  const ref = ws["!ref"]
  if (!ref) return
  const range = XLSX.utils.decode_range(ref)
  ws["!autofilter"] = {
    ref: XLSX.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: 0, c: colCount - 1 },
    }),
  }
}

function freezeRow(ws: XLSX.WorkSheet) {
  ws["!freeze"] = { xSplit: 0, ySplit: 1 } as any
}

function noData(ws: XLSX.WorkSheet) {
  const cell: XLSX.CellObject = {
    t: "s",
    v: "No records found for the selected period.",
  }
  ws["A2"] = cell
}

export function exportReportToExcel(params: ExcelExportParams) {
  const {
    period,
    currencySymbol,
    summary,
    salesData,
    expensesData,
    productionData,
    productionLossesData,
    debtorsData,
  } = params

  const totalLosses = productionLossesData.reduce(
    (s, i) => s + Number(i.quantity || 0),
    0
  )

  const profit = summary.sales - summary.costs
  const netSachet = summary.sachetProduction - totalLosses

  const wb = XLSX.utils.book_new()
  const today = new Date().toISOString().split("T")[0]

  // ─── SHEET 1: EXECUTIVE SUMMARY ──────────────────────────────────────────────

  const summaryRows: any[][] = [
    ["Metric", "Value"],
    ["Period", period.toUpperCase()],
    [""],
    ["Total Sales", summary.sales],
    ["Operational Costs", summary.costs],
    [""],
    ["Gross Sachet Production", `${summary.sachetProduction} bags`],
    ["Production Losses", `${totalLosses} bags`],
    ["Net Sachet Production", `${netSachet} bags`],
    ["Sachet Stock", `${summary.sachetStock} bags`],
    [""],
    ["Bottle Production", `${summary.bottleProduction} crates`],
    ["Bottle Stock", `${summary.bottleStock} crates`],
    [""],
    ["Debt Exposure", summary.debt],
    ["Net Result", profit],
  ]

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows)

  // Apply currency format to value column for numeric rows
  const currencyRows = [3, 4, 14, 15]
  currencyRows.forEach((r) => {
    const cell = wsSummary[XLSX.utils.encode_cell({ r, c: 1 })]
    if (cell && cell.t === "n") {
      cell.z = `${currencySymbol}#,##0.00`
    }
  })

  wsSummary["!cols"] = cols([30, 25])
  freezeRow(wsSummary)
  XLSX.utils.book_append_sheet(wb, wsSummary, "Executive Summary")

  // ─── SHEET 2: SALES ──────────────────────────────────────────────────────────

  const salesHeaders = [
    "Date",
    "Customer",
    "Product Type",
    "Qty (Bags/Crates)",
    "Amount",
    "Balance",
  ]

  const salesRows: any[][] = [salesHeaders]

  if (salesData && salesData.length > 0) {
    salesData.forEach((s) => {
      salesRows.push([
        s.date || s.created_at?.split("T")[0] || "",
        s.customer_name || "",
        s.product_type || "",
        Number(s.bags_sold || 0),
        Number(s.total_amount || 0),
        Number(s.balance || 0),
      ])
    })
  }

  const wsSales = XLSX.utils.aoa_to_sheet(salesRows)

  if (salesData && salesData.length > 0) {
    for (let r = 1; r < salesRows.length; r++) {
      ;[4, 5].forEach((c) => {
        const cell = wsSales[XLSX.utils.encode_cell({ r, c })]
        if (cell && cell.t === "n") cell.z = `${currencySymbol}#,##0.00`
      })
    }
    autoFilter(wsSales, salesHeaders.length)
  } else {
    noData(wsSales)
  }

  wsSales["!cols"] = cols([14, 24, 16, 20, 16, 16])
  freezeRow(wsSales)
  XLSX.utils.book_append_sheet(wb, wsSales, "Sales")

  // ─── SHEET 3: EXPENSES ───────────────────────────────────────────────────────

  const expenseHeaders = ["Date", "Category", "Cost Group", "Amount"]

  const expenseRows: any[][] = [expenseHeaders]

  if (expensesData && expensesData.length > 0) {
    expensesData.forEach((e) => {
      expenseRows.push([
        e.created_at?.split("T")[0] || "",
        e.category || "",
        e.cost_group || "",
        Number(e.amount || 0),
      ])
    })
  }

  const wsExpenses = XLSX.utils.aoa_to_sheet(expenseRows)

  if (expensesData && expensesData.length > 0) {
    for (let r = 1; r < expenseRows.length; r++) {
      const cell = wsExpenses[XLSX.utils.encode_cell({ r, c: 3 })]
      if (cell && cell.t === "n") cell.z = `${currencySymbol}#,##0.00`
    }
    autoFilter(wsExpenses, expenseHeaders.length)
  } else {
    noData(wsExpenses)
  }

  wsExpenses["!cols"] = cols([14, 24, 20, 16])
  freezeRow(wsExpenses)
  XLSX.utils.book_append_sheet(wb, wsExpenses, "Expenses")

  // ─── SHEET 4: PRODUCTION ─────────────────────────────────────────────────────

  const productionHeaders = [
    "Date",
    "Product Type",
    "Bags / Crates Produced",
    "Shift",
    "Notes",
  ]

  const productionRows: any[][] = [productionHeaders]

  if (productionData && productionData.length > 0) {
    productionData.forEach((p) => {
      productionRows.push([
        p.date || p.created_at?.split("T")[0] || "",
        p.product_type || "",
        Number(p.bags_produced || 0),
        p.shift || "",
        p.notes || "",
      ])
    })
  }

  const wsProduction = XLSX.utils.aoa_to_sheet(productionRows)

  if (productionData && productionData.length > 0) {
    autoFilter(wsProduction, productionHeaders.length)
  } else {
    noData(wsProduction)
  }

  wsProduction["!cols"] = cols([14, 16, 24, 14, 30])
  freezeRow(wsProduction)
  XLSX.utils.book_append_sheet(wb, wsProduction, "Production")

  // ─── SHEET 5: PRODUCTION LOSSES ──────────────────────────────────────────────

  const lossHeaders = [
    "Date",
    "Product Type",
    "Loss Type",
    "Quantity",
    "Reason",
  ]

  const lossRows: any[][] = [lossHeaders]

  if (productionLossesData && productionLossesData.length > 0) {
    productionLossesData.forEach((l) => {
      lossRows.push([
        l.created_at?.split("T")[0] || "",
        l.product_type || "",
        l.loss_type || "",
        Number(l.quantity || 0),
        l.reason || "",
      ])
    })
  }

  const wsLosses = XLSX.utils.aoa_to_sheet(lossRows)

  if (productionLossesData && productionLossesData.length > 0) {
    autoFilter(wsLosses, lossHeaders.length)
  } else {
    noData(wsLosses)
  }

  wsLosses["!cols"] = cols([14, 16, 20, 12, 36])
  freezeRow(wsLosses)
  XLSX.utils.book_append_sheet(wb, wsLosses, "Production Losses")

  // ─── SHEET 6: DEBTORS ────────────────────────────────────────────────────────

  const debtorHeaders = ["Date", "Customer", "Product Type", "Total Amount", "Balance Owed"]

  const debtorRows: any[][] = [debtorHeaders]

  if (debtorsData && debtorsData.length > 0) {
    debtorsData.forEach((d) => {
      debtorRows.push([
        d.date || d.created_at?.split("T")[0] || "",
        d.customer_name || "",
        d.product_type || "",
        Number(d.total_amount || 0),
        Number(d.balance || 0),
      ])
    })
  }

  const wsDebtors = XLSX.utils.aoa_to_sheet(debtorRows)

  if (debtorsData && debtorsData.length > 0) {
    for (let r = 1; r < debtorRows.length; r++) {
      ;[3, 4].forEach((c) => {
        const cell = wsDebtors[XLSX.utils.encode_cell({ r, c })]
        if (cell && cell.t === "n") cell.z = `${currencySymbol}#,##0.00`
      })
    }
    autoFilter(wsDebtors, debtorHeaders.length)
  } else {
    noData(wsDebtors)
  }

  wsDebtors["!cols"] = cols([14, 24, 16, 18, 18])
  freezeRow(wsDebtors)
  XLSX.utils.book_append_sheet(wb, wsDebtors, "Debtors")

  // ─── WRITE FILE ──────────────────────────────────────────────────────────────

  XLSX.writeFile(wb, `AquaOps_Report_${today}.xlsx`)
}