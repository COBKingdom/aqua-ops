"use client"

import { useState } from "react"
import { ArrowLeft, Phone, User, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

interface CustomersProps {
  onBack: () => void
}

export function Customers({ onBack }: CustomersProps) {
  const { customers, sales } = useAppStore()
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)
  const customerSales = selectedCustomer
    ? sales.filter((s) => s.customerId === selectedCustomerId)
    : []

  if (selectedCustomer) {
    return (
      <div className="space-y-6 p-4 pb-24">
        <header className="flex items-center gap-3 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCustomerId(null)}
            className="h-10 w-10 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedCustomer.name}</h1>
            <p className="text-sm text-muted-foreground">Customer Details</p>
          </div>
        </header>

        {/* Customer Info */}
        <Card className="border-0 bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-foreground">{selectedCustomer.name}</p>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{selectedCustomer.phone || "No phone"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outstanding Balance */}
        <Card className={`border-0 shadow-sm ${selectedCustomer.totalDebt > 0 ? "bg-destructive/10" : "bg-success/10"}`}>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Outstanding Balance</p>
            <p className={`text-4xl font-bold ${selectedCustomer.totalDebt > 0 ? "text-destructive" : "text-success"}`}>
              {formatCurrency(selectedCustomer.totalDebt)}
            </p>
          </CardContent>
        </Card>

        {/* Sales History */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Sales History</h2>
          {customerSales.length === 0 ? (
            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="flex items-center justify-center p-6">
                <p className="text-muted-foreground">No sales history</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {customerSales.map((sale) => (
                <Card key={sale.id} className="border-0 bg-card shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{sale.bagsSold} bags</p>
                        <p className="text-sm text-muted-foreground">{sale.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-success">{formatCurrency(sale.amountPaid)}</p>
                        {sale.balance > 0 && (
                          <p className="text-sm text-destructive">Bal: {formatCurrency(sale.balance)}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 pb-24">
      <header className="flex items-center gap-3 pt-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-10 w-10 p-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground">{customers.length} customers</p>
        </div>
      </header>

      {/* Total Debts Summary */}
      {customers.some((c) => c.totalDebt > 0) && (
        <Card className="border-0 bg-destructive/10 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Outstanding Debts</p>
            <p className="text-3xl font-bold text-destructive">
              {formatCurrency(customers.reduce((sum, c) => sum + c.totalDebt, 0))}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Customer List */}
      <div className="space-y-2">
        {customers.map((customer) => (
          <Card
            key={customer.id}
            className="cursor-pointer border-0 bg-card shadow-sm transition-colors hover:bg-accent/50"
            onClick={() => setSelectedCustomerId(customer.id)}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{customer.name}</p>
                <p className="text-sm text-muted-foreground">{customer.phone || "No phone"}</p>
              </div>
              <div className="flex items-center gap-2">
                {customer.totalDebt > 0 && (
                  <span className="text-lg font-bold text-destructive">
                    {formatCurrency(customer.totalDebt)}
                  </span>
                )}
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
