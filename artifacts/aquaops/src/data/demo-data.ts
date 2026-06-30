export const DEMO_FACTORY_NAME    = "Aqua Pure Water Ltd"
export const DEMO_CURRENCY_CODE   = "NGN"
export const DEMO_CURRENCY_SYMBOL = "₦"

export const DEMO_PERIODS: Record<string, {
  sales: number; costs: number; debt: number;
  sachetProduction: number; bottleProduction: number;
  sachetStock: number; bottleStock: number;
}> = {
  today: {
    sales: 22500, costs: 14800, debt: 68000,
    sachetProduction: 140, bottleProduction: 12,
    sachetStock: 380, bottleStock: 28,
  },
  week: {
    sales: 138000, costs: 89500, debt: 68000,
    sachetProduction: 820, bottleProduction: 58,
    sachetStock: 380, bottleStock: 28,
  },
  month: {
    sales: 512000, costs: 318000, debt: 68000,
    sachetProduction: 3240, bottleProduction: 178,
    sachetStock: 380, bottleStock: 28,
  },
}