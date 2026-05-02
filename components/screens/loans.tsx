"use client"

import { useState, useEffect } from "react"

export function Loans() {
  const [loans, setLoans] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [repayment, setRepayment] = useState("")

  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("loans") || "[]")
    setLoans(saved)
  }, [])

  const handleSubmit = () => {
    if (!form.source || !form.amount) return

    const newLoan = {
      ...form,
      amount: Number(form.amount),
      amount_paid: 0,
    }

    const updated = [newLoan, ...loans]

    setLoans(updated)
    localStorage.setItem("loans", JSON.stringify(updated))

    setForm({
      source: "",
      amount: "",
      date: form.date,
    })
  }

  const handleRepayment = () => {
    if (selectedIndex === null || !repayment) return

    const updated = [...loans]

    const loan = updated[selectedIndex]

    const pay = Number(repayment)
    const totalPaid = Number(loan.amount_paid || 0) + pay

    if (totalPaid > loan.amount) {
      alert("Repayment exceeds loan amount")
      return
    }

    loan.amount_paid = totalPaid

    setLoans(updated)
    localStorage.setItem("loans", JSON.stringify(updated))

    setRepayment("")
    setSelectedIndex(null)
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      <header className="pt-1">
        <h1 className="text-lg font-bold text-[#0d1b3e]">Loans</h1>
        <p className="text-xs text-gray-500">Track business loans</p>
      </header>

      {/* ADD LOAN */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        <div className="space-y-1">
          <label className="text-sm font-medium text-[#0d1b3e]">Source</label>
          <input
            type="text"
            placeholder="e.g. MD, Friend"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[#0d1b3e]">Amount (₦)</label>
          <input
            type="number"
            placeholder="e.g. 50000"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[#0d1b3e]">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!form.source || !form.amount}
          className="w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97]"
        >
          Add Loan
        </button>
      </div>

      {/* LOANS LIST */}
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500 mb-2">Recent Loans</p>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">

          {loans.length === 0 && (
            <p className="text-xs text-gray-400 text-center">
              No loans yet
            </p>
          )}

          {loans.map((item, index) => {
            const balance =
              item.amount - (item.amount_paid || 0)

            return (
              <div
                key={index}
                className="bg-blue-50 px-3 py-2 rounded-lg space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-[#2563eb]">
                      {item.source}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0d1b3e]">
                      ₦{item.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-red-500">
                      Balance: ₦{balance.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* REPAY BUTTON */}
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg"
                >
                  Repay
                </button>

                {/* REPAYMENT INPUT */}
                {selectedIndex === index && (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={repayment}
                      onChange={(e) => setRepayment(e.target.value)}
                      className="flex-1 h-9 border rounded px-2 text-sm"
                    />
                    <button
                      onClick={handleRepayment}
                      className="bg-green-600 text-white px-3 rounded text-sm"
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            )
          })}

        </div>
      </div>

    </div>
  )
}