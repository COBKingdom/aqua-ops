export default function Home() {
  return (
    <main className="min-h-screen bg-[#eef0f5] py-6 px-4 flex justify-center">
      <div className="w-full max-w-sm space-y-5 pb-10">

        {/* NAVBAR */}
        <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#0d1b3e] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="10" width="3" height="8" rx="1" fill="#f5a623"/>
                <rect x="7" y="6" width="3" height="12" rx="1" fill="white"/>
                <rect x="12" y="2" width="3" height="16" rx="1" fill="white"/>
                <polyline points="3.5,9 8.5,5 13.5,1" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round"/>
                <polygon points="14,0 17,3 13,3" fill="#f5a623"/>
              </svg>
            </div>
            <div>
              <p className="text-[#0d1b3e] font-bold text-sm">TrueOps</p>
              <p className="text-gray-400 text-xs">Platform</p>
            </div>
          </div>
          <button className="flex flex-col gap-1.5 p-1">
            <span className="block w-5 h-0.5 bg-gray-700 rounded"></span>
            <span className="block w-5 h-0.5 bg-gray-700 rounded"></span>
            <span className="block w-5 h-0.5 bg-gray-700 rounded"></span>
          </button>
        </div>

        {/* HERO */}
        <div className="text-center space-y-3 pt-2">
          <h1 className="text-2xl font-extrabold text-[#0d1b3e] leading-tight">
            Stop guessing your<br />business numbers
          </h1>

          <div className="flex justify-center">
            <svg width="100" height="10" viewBox="0 0 120 12">
              <path d="M4 8 Q60 0 116 8" stroke="#f5a623" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
            Track your real profit, expenses and customer debt — all in one place.
          </p>
        </div>

        {/* BRAND CARD */}
        <div className="bg-gradient-to-r from-[#0d1b3e] to-[#1a2e63] rounded-2xl p-4 text-white text-sm shadow">
          <p className="font-semibold">TrueOps Platform</p>
          <p className="text-xs text-white/80">
            Understand your business clearly — profit, costs and debt.
          </p>
        </div>

{/* PROBLEM CARD */}
<div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-sm p-5">
  <h2 className="text-sm font-semibold mb-2">The Problem</h2>

  <p className="text-sm text-white/90">
    You are making sales but don’t know your real profit.
  </p>
</div>

{/* SOLUTION CARD */}
<div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
  <h2 className="text-sm font-bold text-[#0d1b3e]">The Solution</h2>

  <p className="text-xs text-gray-500">
    TrueOps gives you a simple way to track:
  </p>

  <div className="grid grid-cols-5 gap-2 text-center text-[10px]">

    {/* Production */}
    <div className="flex flex-col items-center gap-1">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="10" width="3" height="8" rx="1" stroke="#2563eb" strokeWidth="1.5"/>
          <rect x="8" y="6" width="3" height="12" rx="1" stroke="#2563eb" strokeWidth="1.5"/>
          <rect x="14" y="2" width="3" height="16" rx="1" stroke="#2563eb" strokeWidth="1.5"/>
        </svg>
      </div>
      <span className="text-gray-600">Production</span>
    </div>

    {/* Sales */}
    <div className="flex flex-col items-center gap-1">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 4h2l2 8h8l2-6H6" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="15" r="1" fill="#2563eb"/>
          <circle cx="15" cy="15" r="1" fill="#2563eb"/>
        </svg>
      </div>
      <span className="text-gray-600">Sales</span>
    </div>

    {/* Expenses */}
    <div className="flex flex-col items-center gap-1">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="6" width="14" height="8" rx="2" stroke="#2563eb" strokeWidth="1.5"/>
          <path d="M3 9h14" stroke="#2563eb" strokeWidth="1.5"/>
        </svg>
      </div>
      <span className="text-gray-600">Expenses</span>
    </div>

    {/* Debts */}
    <div className="flex flex-col items-center gap-1">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="7" cy="7" r="3" stroke="#2563eb" strokeWidth="1.5"/>
          <circle cx="13" cy="7" r="3" stroke="#2563eb" strokeWidth="1.5"/>
          <path d="M2 16c1.5-3 4-4 8-4s6.5 1 8 4" stroke="#2563eb" strokeWidth="1.5"/>
        </svg>
      </div>
      <span className="text-gray-600">Debts</span>
    </div>

    {/* Profit */}
    <div className="flex flex-col items-center gap-1">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polyline points="2,14 7,9 11,12 18,5" stroke="#2563eb" strokeWidth="1.5"/>
          <polyline points="14,5 18,5 18,9" stroke="#2563eb" strokeWidth="1.5"/>
        </svg>
      </div>
      <span className="text-gray-600 text-center">Profit</span>
    </div>

  </div>

  <p className="text-xs text-gray-500">
    So instead of guessing, you see the true state of your business.
  </p>
</div>

        {/* USE CASES */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-[#0d1b3e]">Use Cases</h2>

          <div className="grid grid-cols-3 gap-3">

            <div className="border-2 border-blue-400 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-blue-500">AquaOps</p>
              <p className="text-[10px] text-gray-400">Water factories</p>
            </div>

            <div className="border rounded-xl p-3 text-center opacity-60">
              <p className="text-xs font-bold text-[#0d1b3e]">RetailOps</p>
              <p className="text-[10px] text-gray-400">Coming soon</p>
            </div>

            <div className="border rounded-xl p-3 text-center opacity-60">
              <p className="text-xs font-bold text-[#0d1b3e]">FactoryOps</p>
              <p className="text-[10px] text-gray-400">Coming soon</p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <a
            href="/aquaops"
            className="block w-full bg-[#0d1b3e] text-white py-4 rounded-2xl font-bold text-base text-center shadow-md hover:bg-[#162a5a] transition"
          >
            Try AquaOps →
          </a>

          <p className="text-center text-sm text-gray-500">
            If you run a water factory, you can try it now.
          </p>
        </div>

      </div>
    </main>
  )
}