const TRIAL_DAYS = 14

export function getTrialStartDate() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("trialStart")
}

export function setTrialStartDate() {
  if (typeof window === "undefined") return
  const existing = localStorage.getItem("trialStart")
  if (!existing) {
    localStorage.setItem(
      "trialStart",
      new Date().toISOString()
    )
  }
}

export function getTrialRemainingDays() {
  if (typeof window === "undefined") return TRIAL_DAYS
  const trialStart = localStorage.getItem("trialStart")
  if (!trialStart) return TRIAL_DAYS

  const startDate = new Date(trialStart)
  const now = new Date()
  const diff = now.getTime() - startDate.getTime()
  const daysUsed = Math.floor(diff / (1000 * 60 * 60 * 24))
  const remaining = TRIAL_DAYS - daysUsed

  return remaining > 0 ? remaining : 0
}

export function isTrialExpired() {
  return getTrialRemainingDays() <= 0
}