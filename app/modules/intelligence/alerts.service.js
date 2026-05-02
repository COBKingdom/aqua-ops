// app/modules/intelligence/alerts.service.js

import { supabase } from '@/lib/supabase'

// 🧠 Prevent duplicate alerts (same type, same day)
async function alertExists(factoryId, type) {
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('alerts')
    .select('id')
    .eq('factory_id', factoryId)
    .eq('type', type)
    .gte('created_at', today)

  return data && data.length > 0
}

// Create alert safely
async function createAlert(factoryId, type, priority, message) {
  const exists = await alertExists(factoryId, type)

  if (exists) return // 🚫 skip duplicate

  const { error } = await supabase.from('alerts').insert([
    {
      factory_id: factoryId,
      type,
      priority,
      message,
      is_read: false
    }
  ])

  if (error) {
    console.error("Create alert error:", error)
  }
}

// 🚨 LOW CASH
export async function checkLowCash(factoryId, runway) {
  if (runway < 7) {
    await createAlert(
      factoryId,
      'LOW_CASH',
      'HIGH',
      'Cash is low — less than 7 days runway'
    )
  }
}

// 🚨 NO SALES TODAY
export async function checkNoSales(factoryId) {
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('sales')
    .select('id')
    .eq('factory_id', factoryId)
    .eq('date', today)

  if (!data || data.length === 0) {
    await createAlert(
      factoryId,
      'NO_SALES',
      'MEDIUM',
      'No sales recorded today'
    )
  }
}

// 🚨 LOSS
export async function checkLoss(factoryId, profit) {
  if (profit < 0) {
    await createAlert(
      factoryId,
      'LOSS',
      'HIGH',
      `You're running at a loss today (${Math.abs(profit)})`
    )
  }
}

// 🚨 EXPENSE SPIKE
export async function checkExpenseSpike(factoryId) {
  const today = new Date().toISOString().split('T')[0]

  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000)
    .toISOString()
    .split('T')[0]

  const { data: todayData } = await supabase
    .from('expenses')
    .select('amount')
    .eq('factory_id', factoryId)
    .eq('date', today)

  const todayTotal =
    todayData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0

  const { data: weekData } = await supabase
    .from('expenses')
    .select('amount')
    .eq('factory_id', factoryId)
    .gte('date', sevenDaysAgo)

  const weekTotal =
    weekData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0

  const avg = weekTotal / 7 || 0

  if (avg > 0 && todayTotal > avg * 1.5) {
    await createAlert(
      factoryId,
      'EXPENSE_SPIKE',
      'MEDIUM',
      'Spending is much higher than your usual daily average'
    )
  }
}