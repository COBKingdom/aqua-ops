export default function AquaOpsPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">

      <p className="text-sm text-gray-500">Powered by TrueOps</p>

      <h1 className="text-3xl font-bold">💧 AquaOps</h1>

      <p className="text-gray-600">
        AquaOps helps water factory owners clearly track daily production,
        sales, expenses, and customer debt — so you can see your real profit.
      </p>

      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Track daily production</li>
        <li>Record sales and outstanding payments</li>
        <li>Capture all expenses</li>
        <li>See real profit instantly</li>
      </ul>

      <a
        href="/app"
        className="inline-block bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
      >
        Open AquaOps App
      </a>

    </main>
  );
}