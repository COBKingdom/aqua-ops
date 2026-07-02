export const PLANS = {
  Standard: {
    name: "Standard",
    price: 10000,
    currency: "NGN",
    user_limit: 1,
    description: "1 user · ₦10,000/month",
    billing_period: "monthly" as const,
  },
  "Standard Annual": {
    name: "Standard",
    price: 108000,
    currency: "NGN",
    user_limit: 1,
    description: "1 user · ₦108,000/year (save ₦12,000)",
    billing_period: "annual" as const,
  },
  "Multi-User": {
    name: "Multi-User",
    price: 15000,
    currency: "NGN",
    user_limit: 4,
    description: "Up to 4 users · ₦15,000/month",
    billing_period: "monthly" as const,
  },
  "Multi-User Annual": {
    name: "Multi-User",
    price: 162000,
    currency: "NGN",
    user_limit: 4,
    description: "Up to 4 users · ₦162,000/year (save ₦18,000)",
    billing_period: "annual" as const,
  },
} as const

export type PlanName = keyof typeof PLANS

export function getPlanByName(name: string) {
  return PLANS[name as PlanName] ?? null
}

export function getUserLimitForPlan(plan: string): number {
  return PLANS[plan as PlanName]?.user_limit ?? 1
}

export function getFlutterwavePublicKey(): string {
  return import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY ?? ""
}