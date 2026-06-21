// app/modules/intelligence/profit.service.js

import { supabase } from '@/lib/supabase'

export async function updateDailyProfit(factoryId) {
  const today = new Date().toISOString().split('T')[0]

  const { data: salesData } = await supabase
    .from('sales')
    .select('total_amount')
    .eq('factory_id', factoryId)
    .gte('created_at', today)

  const { data: expenseData } = await supabase
    .from('expenses')
    .select('amount')
    .eq('factory_id', factoryId)
    .gte('created_at', today)

  const sales =
    salesData?.reduce((sum, s) => sum + Number(s.total_amount), 0) || 0

  const expenses =
    expenseData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0

  const profit = sales - expenses

  return { sales, expenses, profit }
}