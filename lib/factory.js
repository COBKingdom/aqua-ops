import { supabase } from "./supabase"

export async function getFactoryId() {

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: membership } =
    await supabase
      .from("factory_users")
      .select("factory_id")
      .eq("user_id", user.id)
      .single()

  return membership?.factory_id || null
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