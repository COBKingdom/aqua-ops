"use client"

import { create } from "zustand"

export type ProductType = "sachet" | "bottle"
export type Shift = "morning" | "evening"
export type PaymentType = "cash" | "transfer" | "credit"
export type ExpenseCategory = "nylon" | "labour" | "driver" | "fuel" | "salary" | "maintenance"

export interface Production {
  id: string
  date: string
  productType: ProductType
  bagsProduced: number
  piecesPerBag: number
  shift: Shift
}

export interface Sale {
  id: string
  date: string
  customerId: string
  customerName: string
  bagsSold: number
  pricePerBag: number
  total: number
  paymentType: PaymentType
  amountPaid: number
  balance: number
}

export interface Customer {
  id: string
  name: string
  phone: string
  totalDebt: number
}

export interface Expense {
  id: string
  date: string
  category: ExpenseCategory
  amount: number
  notes: string
}

export interface Inventory {
  nylonRolls: number
  bagsInStore: number
  bottledWater: number
}

interface AppState {
  productions: Production[]
  sales: Sale[]
  customers: Customer[]
  expenses: Expense[]
  inventory: Inventory
  addProduction: (production: Omit<Production, "id">) => void
  addSale: (sale: Omit<Sale, "id">) => void
  addCustomer: (customer: Omit<Customer, "id">) => void
  addExpense: (expense: Omit<Expense, "id">) => void
  updateInventory: (inventory: Partial<Inventory>) => void
  getTodayStats: () => {
    bagsProduced: number
    salesToday: number
    expensesToday: number
    profitToday: number
  }
}

const generateId = () => Math.random().toString(36).substring(2, 9)
const getToday = () => new Date().toISOString().split("T")[0]

export const useAppStore = create<AppState>((set, get) => ({
  productions: [
    { id: "1", date: getToday(), productType: "sachet", bagsProduced: 45, piecesPerBag: 20, shift: "morning" },
    { id: "2", date: getToday(), productType: "sachet", bagsProduced: 38, piecesPerBag: 20, shift: "evening" },
  ],
  sales: [
    { id: "1", date: getToday(), customerId: "1", customerName: "Mama Ngozi", bagsSold: 10, pricePerBag: 350, total: 3500, paymentType: "cash", amountPaid: 3500, balance: 0 },
    { id: "2", date: getToday(), customerId: "2", customerName: "Alhaji Musa", bagsSold: 20, pricePerBag: 350, total: 7000, paymentType: "credit", amountPaid: 5000, balance: 2000 },
  ],
  customers: [
    { id: "1", name: "Mama Ngozi", phone: "08012345678", totalDebt: 0 },
    { id: "2", name: "Alhaji Musa", phone: "08087654321", totalDebt: 2000 },
    { id: "3", name: "Mr. Chukwu", phone: "09011223344", totalDebt: 5500 },
  ],
  expenses: [
    { id: "1", date: getToday(), category: "nylon", amount: 15000, notes: "2 rolls of nylon" },
    { id: "2", date: getToday(), category: "fuel", amount: 8000, notes: "Generator fuel" },
  ],
  inventory: {
    nylonRolls: 3,
    bagsInStore: 120,
    bottledWater: 50,
  },

  addProduction: (production) =>
    set((state) => ({
      productions: [...state.productions, { ...production, id: generateId() }],
    })),

  addSale: (sale) =>
    set((state) => {
      const newSales = [...state.sales, { ...sale, id: generateId() }]
      const customers = state.customers.map((c) =>
        c.id === sale.customerId ? { ...c, totalDebt: c.totalDebt + sale.balance } : c
      )
      return { sales: newSales, customers }
    }),

  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, { ...customer, id: generateId() }],
    })),

  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, { ...expense, id: generateId() }],
    })),

  updateInventory: (inventory) =>
    set((state) => ({
      inventory: { ...state.inventory, ...inventory },
    })),

  getTodayStats: () => {
    const state = get()
    const today = getToday()

    const bagsProduced = state.productions
      .filter((p) => p.date === today)
      .reduce((sum, p) => sum + p.bagsProduced, 0)

    const salesToday = state.sales
      .filter((s) => s.date === today)
      .reduce((sum, s) => sum + s.amountPaid, 0)

    const expensesToday = state.expenses
      .filter((e) => e.date === today)
      .reduce((sum, e) => sum + e.amount, 0)

    const profitToday = salesToday - expensesToday

    return { bagsProduced, salesToday, expensesToday, profitToday }
  },
}))
