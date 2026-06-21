// app/modules/intelligence/intelligence.controller.js

import { updateDailyProfit } from './profit.service'
import { calculateRunway } from './cash.service'
import {
  checkLowCash,
  checkNoSales,
  checkLoss,
  checkExpenseSpike
} from './alerts.service'

export async function runIntelligence(factoryId, period = "today") {
  const profitData = await updateDailyProfit(factoryId, period)
  const cashData = await calculateRunway(factoryId)

  // 🚨 Smart Alerts
  await checkLowCash(factoryId, cashData.runway)
  await checkNoSales(factoryId)
  await checkLoss(factoryId, profitData.profit)
  await checkExpenseSpike(factoryId)

  return {
    profit: profitData,
    cash: cashData
  }
}