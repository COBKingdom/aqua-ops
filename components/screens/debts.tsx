"use client"

import { useState, useEffect } from "react"

export function Debts() {
  const [debts, setDebts] = useState<any[]>([])

  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("debts") || "[]")
    setDebts(saved)
  }, [])

  const handleSubmit = () => {
    if (!form.name || !form.amount) return

    const newDebt = {
      ...form,
      amount: Number(form.amount),
    }

    const updated = [newDebt, ...debts]

    setDebts(updated)
    localStorage.setItem("debts", JSON.stringify(updated))

    setForm({
      name: "",
      amount: "",
      date: form.date,
    })
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      {/* HEADER */}
      <header className="pt-1">
        <h1 className="text-lg font-bold text-[#0d1b3e]">Debts</h1>
        <p className="text-xs text-gray-500">Track customer debts</p>
      </header>

      {/* INPUT CARD */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        {/* CUSTOMER */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#0d1b3e]">
            Customer
          </label>
          <input
            type="text"
            placeholder="Customer name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
        </div>

        {/* AMOUNT */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#0d1b3e]">
            Amount (₦)
          </label>
          <input
            type="number"
            placeholder="e.g. 10000"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
        </div>

        {/* DATE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#0d1b3e]">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={!form.name || !form.amount}
          className="w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97]"
        >
          Add Debt
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-3 rounded-xl shadow-sm">

        <p className="text-xs text-gray-500 mb-2">
          Recent Debts
        </p>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">

          {debts.length === 0 && (
            <p className="text-xs text-gray-400 text-center">
              No debts yet
            </p>
          )}

          {debts.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-blue-50 px-3 py-2 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-[#2563eb]">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">
                  {item.date}
                </p>
              </div>

              <p className="text-sm font-semibold text-red-500">
                ₦{item.amount.toLocaleString()}
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}