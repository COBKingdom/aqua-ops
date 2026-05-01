// app/modules/intelligence/intelligence.controller.js

import { updateDailyProfit } from './profit.service'
import { calculateRunway } from './cash.service'
import { checkLowCash } from './alerts.service'

export async function runIntelligence(factoryId, period = "today") {
  const profitData = await updateDailyProfit(factoryId, period)
  const cashData = await calculateRunway(factoryId)

  await checkLowCash(factoryId, cashData.runway)

  return {
    profit: profitData,
    cash: cashData
  }
}