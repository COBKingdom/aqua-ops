import { supabase } from "./supabase"

export function getFactoryId() {
  return localStorage.getItem("factoryId")
}

export function getFactoryName() {
  return localStorage.getItem("factoryName")
}

export function setFactoryName(name) {
  localStorage.setItem("factoryName", name)
}

export async function getFactoryCurrency() {
  const factoryId = getFactoryId()

  if (!factoryId) {
    return {
      code: "NGN",
      symbol: "₦",
    }
  }

  const { data } = await supabase
    .from("factories")
    .select("currency_code, currency_symbol")
    .eq("id", factoryId)
    .single()

  return {
    code: data?.currency_code || "NGN",
    symbol: data?.currency_symbol || "₦",
  }
}