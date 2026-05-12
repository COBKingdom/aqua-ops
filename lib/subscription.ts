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

    // CHECK ACTIVE SUBSCRIPTION
    const { data } = await supabase
      .from("subscriptions")
      .select("plan, status, expires_at")
      .eq("user_id", user.id)
      .single()

    if (
      data?.status === "active" &&
      data?.expires_at
    ) {
      const expiry = new Date(data.expires_at)

      if (expiry > new Date()) {
        return data.plan as PlanType
      }
    }

    return "free"

  } catch (error) {
    console.error("Plan error:", error)

    return "free"
  }
}

export async function isProUser() {
  const plan = await getUserPlan()

  return (
    plan === "pro" ||
    plan === "enterprise"
  )
}