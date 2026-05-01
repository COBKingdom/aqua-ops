// app/modules/intelligence/alerts.service.js

import { supabase } from '@/lib/supabase'

export async function createAlert(factoryId, type, priority, message) {
  await supabase.from('alerts').insert([
    {
      factory_id: factoryId,
      type,
      priority,
      message,
      is_read: false
    }
  ])
}

export async function checkLowCash(factoryId, runway) {
  if (runway < 7) {
    await createAlert(
      factoryId,
      'LOW_CASH',
      'HIGH',
      'Cash runway is below 7 days'
    )
  }
}