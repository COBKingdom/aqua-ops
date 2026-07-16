export function formatCurrency(
  amount: number | string = 0,
  currency = "NGN",
  symbol = "₦"
) {
  const value = Number(amount)

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value).replace(/^/, symbol)
}