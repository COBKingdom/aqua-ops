export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto space-y-10">

      {/* HERO */}
<section className="text-center space-y-4">

  <p className="text-sm text-gray-500">TrueOps Platform</p>

  <h1 className="text-4xl font-bold">
    You might be losing money… and not know it.
  </h1>

  <p className="text-lg text-gray-600">
    Track your real profit, expenses, and customer debt — all in one place.
  </p>

  <a
    href="/aquaops"
    className="inline-block bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
  >
    Try AquaOps (Water Factories)
  </a>

</section>

      {/* PROBLEM */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">The Reality</h2>

     <ul className="list-disc pl-5 text-gray-700 space-y-2">
    <li>You are making sales… but don’t know your real profit</li>
    <li>Cash in hand feels like profit (but it’s not)</li>
    <li>Customers owe you money, but it’s not clearly tracked</li>
  </ul>
</section>

      {/* SOLUTION */}
<section className="space-y-3">
  <h2 className="text-2xl font-semibold">What TrueOps Does</h2>

  <p className="text-gray-700">
    TrueOps gives you a simple daily system to track everything that matters:
  </p>

  <ul className="list-disc pl-5 text-gray-700 space-y-2">
    <li>Production</li>
    <li>Sales (including customer debt)</li>
    <li>Expenses</li>
    <li>Real profit — calculated automatically</li>
  </ul>
</section>

      {/* USE CASES */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Use Cases</h2>

        <div className="border p-4 rounded-xl">
          <h3 className="font-bold">💧 AquaOps</h3>
          <p className="text-gray-600">For water factories</p>
          <a href="/aquaops" className="text-blue-600">Learn more →</a>
        </div>

        <div className="border p-4 rounded-xl opacity-50">
          <h3 className="font-bold">🏪 RetailOps (Coming)</h3>
        </div>
      </section>

    </main>
  );
}