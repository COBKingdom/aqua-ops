import { supabase } from "@/lib/supabase"

export type SubscriptionStatus =
  | "Trial"
  | "Active"
  | "Expired"

export async function getSubscription() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: admin } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", user.email)
      .single()

    if (admin) {
      return {
        isAdmin: true,
        status: "Active",
        plan: "Admin",
        user_limit: 99,
      }
    }

    const { data } = await supabase
      .from("saas_customers")
      .select("*")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle()

    return data

  } catch (error) {
    console.error("Subscription error:", error)
    return null
  }
}

export async function getUserLimit(): Promise<number> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return 1

    const { data: admin } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", user.email)
      .single()

    if (admin) return 99

    const { data } = await supabase
      .from("subscriptions")
      .select("user_limit")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle()

    return data?.user_limit ?? 1

  } catch {
    return 1
  }
}

export async function hasAppAccess() {
  const subscription = await getSubscription()
  if (!subscription) return false
  if (subscription.isAdmin) return true
  return (
    subscription.status === "Trial" ||
    subscription.status === "Active"
  )
}

export async function isExpired() {
  const subscription = await getSubscription()
  if (!subscription) return true
  if (subscription.isAdmin) return false
  return subscription.status === "Expired"
}

export async function daysRemaining() {
  const subscription = await getSubscription()
  if (!subscription?.expires_at) return 0

  const expiry = new Date(subscription.expires_at)
  const today = new Date()
  const diff = expiry.getTime() - today.getTime()

  return Math.max(
    0,
    Math.ceil(diff / (1000 * 60 * 60 * 24))
  )
}

export async function isProUser() {
  const subscription = await getSubscription()
  if (!subscription) return false
  if (subscription.isAdmin) return true
  return subscription.status === "Active"
}