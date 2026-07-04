import { supabase } from "./supabase"

const FACTORY_ID_CACHE_KEY = "cachedFactoryId"

export async function getFactoryId() {
  // Offline path — use cached factory ID immediately, no network call
  if (!navigator.onLine) {
    return localStorage.getItem(FACTORY_ID_CACHE_KEY) || null
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      // Auth glitch fallback — use cache rather than hard-blocking
      return localStorage.getItem(FACTORY_ID_CACHE_KEY) || null
    }

    const { data: membership } =
      await supabase
        .from("factory_users")
        .select("factory_id")
        .eq("user_id", user.id)
        .single()

    const factoryId = membership?.factory_id || null

    // Cache for offline use on every successful lookup
    if (factoryId) {
      localStorage.setItem(FACTORY_ID_CACHE_KEY, factoryId)
    }

    return factoryId
  } catch {
    // Network error despite navigator.onLine being true (captive portal, flaky signal)
    return localStorage.getItem(FACTORY_ID_CACHE_KEY) || null
  }
}

export function getFactoryName() {
  return localStorage.getItem("factoryName")
}

export function setFactoryName(name) {
  localStorage.setItem("factoryName", name)
}

export async function getFactoryCurrency() {

  const factoryId =
    await getFactoryId()

  if (!factoryId) {
    return {
      code: "NGN",
      symbol: "₦",
    }
  }

  const { data } = await supabase
    .from("factories")
    .select(
      "currency_code, currency_symbol"
    )
    .eq("id", factoryId)
    .single()

  return {
    code:
      data?.currency_code || "NGN",
    symbol:
      data?.currency_symbol || "₦",
  }
}