// app/modules/intelligence/cash.service.js

import { supabase } from '@/lib/supabase'

export async function calculateRunway(factoryId) {
  // 1. Get total cash (bank table)
  const { data: cashData, error: cashError } = await supabase
    .from('bank')
    .select('amount')
    .eq('factory_id', factoryId)

  if (cashError) {
    console.error("Cash fetch error:", cashError)
  }

  const cash =
    cashData?.reduce((sum, c) => sum + Number(c.amount), 0) || 0

  // 2. Get last 7 days expenses using your `date` column
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000)
    .toISOString()
    .split('T')[0]

  const { data: expenseData, error: expenseError } = await supabase
    .from('expenses')
    .select('amount')
    .eq('factory_id', factoryId)
    .gte('date', sevenDaysAgo)

  if (expenseError) {
    console.error("Expense fetch error:", expenseError)
  }

  const totalExpenses =
    expenseData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0

  // 3. Average daily expense
  const avgDailyExpense = totalExpenses / 7 || 0

  // 4. Runway calculation
  const runway = avgDailyExpense === 0 ? 999 : cash / avgDailyExpense

  return {
    cash,
    avgDailyExpense,
    runway
  }
}