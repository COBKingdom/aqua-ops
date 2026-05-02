export function generateInsights({ sales, expenses, debt, cash }) {
  const insights = []
  const alerts = []

  const profit = sales - expenses

  // 🔥 PROFIT
  if (profit < 0) {
    alerts.push("⚠️ Loss — Business is declining")
  } else if (profit > 0) {
    insights.push("✅ Profit — Business is growing")
  }

  // 💸 EXPENSES
  if (sales > 0 && expenses > sales * 0.7) {
    alerts.push("⚠️ Expenses are too high compared to sales")
  }

  // 🧾 DEBT
  if (sales > 0 && debt > sales * 0.5) {
    alerts.push("⚠️ Debt level is becoming risky")
  }

  // 💰 CASH
  if (cash <= 0) {
    alerts.push("🚨 Cash is low — urgent attention needed")
  }

  return { insights, alerts }
}