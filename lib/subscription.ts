import { supabase } from "@/lib/supabase"

export type PlanType =
  | "free"
  | "pro"
  | "enterprise"

export async function getUserPlan(): Promise<PlanType> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return "free"
    }

    // FUTURE DATABASE BILLING CHECK
    // const { data } = await supabase
    //   .from("subscriptions")
    //   .select("plan")
    //   .eq("user_id", user.id)
    //   .single()

    // if (data?.plan) {
    //   return data.plan
    // }

    // TEMP PREMIUM CHECK
    const premium = localStorage.getItem("premium")

    if (premium === "true") {
      return "pro"
    }

    return "free"

  } catch (error) {
    console.error("Plan error:", error)

    return "free"
  }
}

export async function isProUser() {
  const plan = await getUserPlan()

  return plan === "pro" || plan === "enterprise"
}