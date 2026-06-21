import {
  getSubscription,
  hasAppAccess,
  isExpired,
} from "@/lib/subscription"

export async function hasActiveAccess() {
  try {
    return await hasAppAccess()
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
    const subscription =
      await getSubscription()

    if (!subscription) {
      return "expired"
    }

    if (
      subscription.isAdmin
    ) {
      return "admin"
    }

    if (
      await isExpired()
    ) {
      return "expired"
    }

    if (
      subscription.status ===
      "Active"
    ) {
      return "active"
    }

    if (
      subscription.status ===
      "Trial"
    ) {
      return "trial"
    }

    return "expired"

  } catch (error) {
    console.error(
      "Access status error:",
      error
    )

    return "expired"
  }
}