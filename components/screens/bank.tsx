"use client"

import { useState, useEffect } from "react"

type Transaction = {
  id: string
  type: "deposit" | "withdraw"
  amount: number
}

export function Bank() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [amount, setAmount] = useState("")

  // Load
  useEffect(() => {
    const saved = localStorage.getItem("bank")
    if (saved) setTransactions(JSON.parse(saved))
  }, [])

  // Save
  useEffect(() => {
    localStorage.setItem("bank", JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (type: "deposit" | "withdraw") => {
    if (!amount) return

    const newTx: Transaction = {
      id: Date.now().toString(),
      type,
      amount: Number(amount),
    }

    setTransactions([newTx, ...transactions])
    setAmount("")
  }

  const deposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((s, t) => s + t.amount, 0)

  const withdrawals = transactions
    .filter(t => t.type === "withdraw")
    .reduce((s, t) => s + t.amount, 0)

  const balance = deposits - withdrawals

  return (
    <div className="space-y-4">

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Bank Balance</p>
        <p className="text-lg font-bold">€{balance}</p>

        <p className="text-xs text-gray-500 mt-2">Deposited</p>
        <p>€{deposits}</p>

        <p className="text-xs text-gray-500">Withdrawn</p>
        <p>€{withdrawals}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <button
            onClick={() => addTransaction("deposit")}
            className="flex-1 bg-green-600 text-white py-2 rounded"
          >
            Deposit
          </button>

          <button
            onClick={() => addTransaction("withdraw")}
            className="flex-1 bg-red-600 text-white py-2 rounded"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}