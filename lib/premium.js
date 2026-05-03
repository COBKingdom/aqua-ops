import { supabase } from "@/lib/supabase"

// 🔥 TOGGLE (KEEP FALSE FOR NOW = FULL ACCESS)
export const PREMIUM_ENABLED = false

// 🔥 CACHE
let cached = {
  factoryId: null,
  isPremium: false,
}

// 🔥 CHECK PREMIUM FROM DATABASE
export async function isPremiumUser() {
  // ✅ FORCE PREMIUM WHEN DISABLED
  if (!PREMIUM_ENABLED) return true

  try {
    const factoryId = localStorage.getItem("factoryId")
    if (!factoryId) return false

    if (cached.factoryId === factoryId) {
      return cached.isPremium
    }

    const { data, error } = await supabase
      .from("factories")
      .select("is_premium")
      .eq("id", factoryId)
      .single()

    if (error) {
      console.error("Premium check error:", error)
      return false
    }

    const result = data?.is_premium === true

    cached = {
      factoryId,
      isPremium: result,
    }

    return result
  } catch (e) {
    console.error("Premium check exception:", e)
    return false
  }
}

// 🔥 TRIAL SYSTEM (KEPT BUT NOT ACTIVE YET)
export function isTrialActive() {
  const start = localStorage.getItem("trialStart")

  if (!start) {
    const now = new Date().toISOString()
    localStorage.setItem("trialStart", now)
    return true
  }

  const startDate = new Date(start)
  const now = new Date()

  const diffDays =
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)

  return diffDays <= 30
}

// 🔥 MAIN ACCESS CONTROL
export async function canUseApp() {
  if (!PREMIUM_ENABLED) return true
  return (await isPremiumUser()) || isTrialActive()
}

// 🔥 PREMIUM FEATURES
export async function canUsePremium() {
  if (!PREMIUM_ENABLED) return true
  return await isPremiumUser()
}

// 🔥 OPTIONAL CACHE RESET
export function clearPremiumCache() {
  cached = { factoryId: null, isPremium: false }
}