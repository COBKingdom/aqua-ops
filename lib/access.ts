import { getUserPlan } from "@/lib/subscription"
import { isTrialExpired } from "@/lib/trial"

export async function hasActiveAccess() {
  try {
    const plan = await getUserPlan()

    // PAID USERS
    if (
      plan === "pro" ||
      plan === "enterprise"
    ) {
      return true
    }

    // FREE TRIAL USERS
    return !isTrialExpired()

  } catch (error) {
    console.error(
      "Access check error:",
      error
    )

    return false
  }
}

export async function getAccessStatus() {
  try {
    const plan = await getUserPlan()

    if (plan === "pro") {
      return "pro"
    }

    if (plan === "enterprise") {
      return "enterprise"
    }

    if (isTrialExpired()) {
      return "expired"
    }

    return "trial"

  } catch (error) {
    console.error(
      "Access status error:",
      error
    )

    return "expired"
  }
}