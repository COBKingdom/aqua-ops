import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { getFactoryId, getFactoryCurrency } from "@/lib/factory"
import { formatCurrency } from "@/lib/format"

const MIGRATION_KEY = "loans_migrated_to_supabase_v1"

async function migrateLoansFromLocalStorage(factoryId: string) {
  if (localStorage.getItem(MIGRATION_KEY)) return
  const saved = JSON.parse(localStorage.getItem("loans") || "[]")
  if (!saved.length) {
    localStorage.setItem(MIGRATION_KEY, "true")
    return
  }
  const { data: existing } = await supabase
    .from("loans")
    .select("id")
    .eq("factory_id", factoryId)
    .limit(1)
  if (existing && existing.length > 0) {
    localStorage.setItem(MIGRATION_KEY, "true")
    return
  }
  const records = saved.map((l: any) => ({
    factory_id: factoryId,
    source: l.source || "Unknown",
    amount: Number(l.amount) || 0,
    amount_paid: Number(l.amount_paid) || 0,
    date: l.date || new Date().toISOString().split("T")[0],
    notes: "Migrated from device storage",
    is_historical: false,
  }))
  const { error } = await supabase.from("loans").insert(records)
  if (!error) localStorage.setItem(MIGRATION_KEY, "true")
}

export function Loans() {
  const [loans, setLoans]           = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [repayment, setRepayment]   = useState("")
  const [saving, setSaving]         = useState(false)
  const [factoryId, setFactoryId]   = useState<string | null>(null)
  const [currencyCode, setCurrencyCode]     = useState("NGN")
  const [currencySymbol, setCurrencySymbol] = useState("₦")
  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  })

  const loadLoans = async (fid: string) => {
    const { data } = await supabase
      .from("loans")
      .select("*")
      .eq("factory_id", fid)
      .order("date", { ascending: false })
    setLoans(data ?? [])
  }

  useEffect(() => {
    const init = async () => {
      const fid = await getFactoryId()
      if (!fid) return
      setFactoryId(fid)
      const currency = await getFactoryCurrency()
      setCurrencyCode(currency.code)
      setCurrencySymbol(currency.symbol)
      await migrateLoansFromLocalStorage(fid)
      await loadLoans(fid)
    }
    init()
  }, [])

  const handleSubmit = async () => {
    if (!factoryId || !form.source || !form.amount) return
    setSaving(true)
    try {
      await supabase.from("loans").insert({
        factory_id: factoryId,
        source: form.source,
        amount: Number(form.amount),
        amount_paid: 0,
        date: form.date,
        is_historical: false,
      })
      setForm({ source: "", amount: "", date: new Date().toISOString().split("T")[0] })
      await loadLoans(factoryId)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleRepayment = async () => {
    if (!factoryId || !selectedId || !repayment) return
    const loan = loans.find((l) => l.id === selectedId)
    if (!loan) return
    const pay = Number(repayment)
    const totalPaid = Number(loan.amount_paid || 0) + pay
    if (totalPaid > loan.amount) {
      alert("Repayment exceeds loan amount")
      return
    }
    setSaving(true)
    try {
      await supabase
        .from("loans")
        .update({ amount_paid: totalPaid })
        .eq("id", selectedId)
      setRepayment("")
      setSelectedId(null)
      await loadLoans(factoryId)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4 p-3 pb-20">

      <header className="pt-1">
        <h1 className="text-lg font-bold text-[#0d1b3e]">Loans</h1>
        <p className="text-xs text-gray-500">Track business loans</p>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#0d1b3e]">Amount ({currencySymbol})</label>
          <input
            type="number"
            placeholder="e.g. 50000"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
          />
        </div>

        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <p>Loan Amount: {formatCurrency(Number(form.amount || 0), currencyCode, currencySymbol)}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[#0d1b3e]">Source</label>
          <input
            type="text"
            placeholder="e.g. MD, First Bank, Friend"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
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
          disabled={!form.source || !form.amount || saving}
          className="w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Loan"}
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500 mb-2">All Loans</p>
        <div className="space-y-2 max-h-[320px] overflow-y-auto">

          {loans.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">No loans yet</p>
          )}

          {loans.map((item) => {
            const balance = item.amount - (item.amount_paid || 0)
            return (
              <div key={item.id} className="bg-blue-50 px-3 py-2 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-[#2563eb]">{item.source}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                    {item.is_historical && (
                      <p className="text-xs text-gray-400 italic">Historical</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0d1b3e]">
                      {formatCurrency(item.amount, currencyCode, currencySymbol)}
                    </p>
                    <p className="text-xs text-red-500">
                      Balance: {formatCurrency(balance, currencyCode, currencySymbol)}
                    </p>
                  </div>
                </div>

                {balance > 0 && (
                  <button
                    onClick={() => setSelectedId(item.id)}
                    className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg"
                  >
                    Repay
                  </button>
                )}

                {selectedId === item.id && (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="number"
                      placeholder={`Enter amount (${currencySymbol})`}
                      value={repayment}
                      onChange={(e) => setRepayment(e.target.value)}
                      className="flex-1 h-9 border rounded px-2 text-sm"
                    />
                    <button
                      onClick={handleRepayment}
                      disabled={saving}
                      className="bg-green-600 text-white px-3 rounded text-sm disabled:opacity-50"
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