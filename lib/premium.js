import { supabase } from "@/lib/supabase"

// Optional: small in-memory cache to avoid repeated calls
let cached = {
  factoryId: null,
  isPremium: false,
}

export async function isPremiumUser() {
  try {
    const factoryId = localStorage.getItem("factoryId")
    if (!factoryId) return false

    // Use cache if same factory
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

    // Update cache
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

// Helper to clear cache if needed (optional)
export function clearPremiumCache() {
  cached = { factoryId: null, isPremium: false }
}