// app/modules/intelligence/profit.service.js

import { supabase } from '@/lib/supabase'

export async function updateDailyProfit(factoryId, period = "today") {
  let salesQuery = supabase
    .from('sales')
    .select('total_amount')
    .eq('factory_id', factoryId)

  let expenseQuery = supabase
    .from('expenses')
    .select('amount')
    .eq('factory_id', factoryId)

  // 🔁 Apply period filter
  if (period === "today") {
    const today = new Date().toISOString().split('T')[0]

    salesQuery = salesQuery.eq('date', today)
    expenseQuery = expenseQuery.eq('date', today)
  }

  if (period === "week") {
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000)
      .toISOString()
      .split('T')[0]

    salesQuery = salesQuery.gte('date', sevenDaysAgo)
    expenseQuery = expenseQuery.gte('date', sevenDaysAgo)
  }

  // "all" → no date filter

  const { data: salesData, error: salesError } = await salesQuery
  const { data: expenseData, error: expenseError } = await expenseQuery

  if (salesError) console.error("Sales error:", salesError)
  if (expenseError) console.error("Expense error:", expenseError)

  const sales =
    salesData?.reduce((sum, s) => sum + Number(s.total_amount), 0) || 0

  const expenses =
    expenseData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0

  const profit = sales - expenses

  return {
    sales,
    expenses,
    profit
  }
}