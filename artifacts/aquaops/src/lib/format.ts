export function formatCurrency(
  amount,
  currency = "NGN",
  symbol = "₦"
) {
  const value = Number(amount || 0)

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value).replace(/^/, symbol)
}