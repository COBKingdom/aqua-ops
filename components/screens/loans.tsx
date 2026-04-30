"use client"

import { useState, useEffect } from "react"

type Loan = {
  id: string
  source: string
  amount: number
  amountPaid: number
}

export function Loans() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [source, setSource] = useState("")
  const [amount, setAmount] = useState("")

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("loans")
    if (saved) setLoans(JSON.parse(saved))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("loans", JSON.stringify(loans))
  }, [loans])

  const addLoan = () => {
    if (!source || !amount) return

    const newLoan: Loan = {
      id: Date.now().toString(),
      source,
      amount: Number(amount),
      amountPaid: 0,
    }

    setLoans([newLoan, ...loans])
    setSource("")
    setAmount("")
  }

  const repayLoan = (id: string, value: number) => {
    setLoans(loans.map(l =>
      l.id === id
        ? { ...l, amountPaid: l.amountPaid + value }
        : l
    ))
  }

  const totalLoans = loans.reduce((s, l) => s + l.amount, 0)
  const totalPaid = loans.reduce((s, l) => s + l.amountPaid, 0)

  return (
    <div className="space-y-4">

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Total Loans</p>
        <p className="text-lg font-bold">€{totalLoans}</p>

        <p className="text-xs text-gray-500 mt-2">Repaid</p>
        <p className="text-lg font-bold">€{totalPaid}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
        <input
          placeholder="Source (Bank, MD, etc)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={addLoan}
          className="w-full bg-[#0d1b3e] text-white py-2 rounded"
        >
          Add Loan
        </button>
      </div>

      {loans.map((loan) => (
        <div key={loan.id} className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-bold">{loan.source}</p>
          <p>Total: €{loan.amount}</p>
          <p>Paid: €{loan.amountPaid}</p>
          <p>Remaining: €{loan.amount - loan.amountPaid}</p>

          <button
            onClick={() => repayLoan(loan.id, 100)}
            className="mt-2 text-sm bg-gray-200 px-3 py-1 rounded"
          >
            +€100 Repayment
          </button>
        </div>
      ))}
    </div>
  )
}