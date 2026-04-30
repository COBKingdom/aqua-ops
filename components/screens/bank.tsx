"use client"

import { useState, useEffect } from "react"

export function Bank() {
  const [records, setRecords] = useState<any[]>([])

  const [form, setForm] = useState({
    type: "deposit",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bank") || "[]")
    setRecords(saved)
  }, [])

  const handleSubmit = () => {
    if (!form.amount) return

    const newRecord = {
      ...form,
      amount: Number(form.amount),
    }

    const updated = [newRecord, ...records]

    setRecords(updated)
    localStorage.setItem("bank", JSON.stringify(updated))

    setForm({
      ...form,
      amount: "",
    })
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      <header className="pt-1">
        <h1 className="text-lg font-bold text-[#0d1b3e]">Bank</h1>
        <p className="text-xs text-gray-500">Manage deposits & withdrawals</p>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        <div className="grid grid-cols-2 gap-2">

          <button
            onClick={() => setForm({ ...form, type: "deposit" })}
            className={`h-11 rounded-lg text-sm font-medium ${
              form.type === "deposit"
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb]"
            }`}
          >
            Deposit
          </button>

          <button
            onClick={() => setForm({ ...form, type: "withdraw" })}
            className={`h-11 rounded-lg text-sm font-medium ${
              form.type === "withdraw"
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb]"
            }`}
          >
            Withdraw
          </button>

        </div>

        <input
          type="number"
          placeholder="Amount (₦)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
        />

        <button
          onClick={handleSubmit}
          disabled={!form.amount}
          className="w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold"
        >
          Save
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500 mb-2">Transactions</p>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">

          {records.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-blue-50 px-3 py-2 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-[#2563eb]">
                  {item.type}
                </p>
                <p className="text-xs text-gray-400">
                  {item.date}
                </p>
              </div>

              <p className="text-sm font-semibold text-[#0d1b3e]">
                ₦{item.amount.toLocaleString()}
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}