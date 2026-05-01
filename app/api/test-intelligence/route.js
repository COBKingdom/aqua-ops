// app/api/test-intelligence/route.js

import { runIntelligence } from '@/app/modules/intelligence/intelligence.controller'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') || 'today'

  const factoryId = "96f00619-05be-40f3-bfcf-fe6881b8922e"

  const result = await runIntelligence(factoryId, period)

  return Response.json(result)
}