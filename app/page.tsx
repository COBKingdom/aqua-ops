export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto space-y-10">

      {/* HERO */}
      <section className="text-center space-y-4">

        <p className="text-sm text-gray-500">TrueOps Platform</p>

        <h1 className="text-4xl font-bold">
          Stop guessing your business numbers.
        </h1>

        <p className="text-lg text-gray-600">
          Most businesses are working daily… but don’t actually know their real profit.
        </p>

        <p className="text-lg text-gray-600">
          Track your real profit, expenses, and customer debt — all in one place.
        </p>

      </section>

      {/* PROBLEM */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">The Problem</h2>

        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>You are making sales… but don’t know your real profit</li>
          <li>Cash in hand feels like profit (but it’s not)</li>
          <li>Customers owe you money, but it’s not clearly tracked</li>
        </ul>
      </section>

      {/* SOLUTION */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">The Solution</h2>

        <p className="text-gray-700">
          TrueOps gives you a simple way to track:
        </p>

        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Production</li>
          <li>Sales (including customer debt)</li>
          <li>Expenses</li>
          <li>Real profit — calculated automatically</li>
        </ul>

        <p className="text-gray-700 font-medium">
          So instead of guessing… you see the true state of your business.
        </p>
      </section>

      {/* USE CASES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Use Cases</h2>

        <p className="text-gray-600">
          TrueOps can be adapted to different types of businesses:
        </p>

        <div className="border p-4 rounded-xl">
          <h3 className="font-bold">💧 AquaOps</h3>
          <p className="text-gray-600">For water factories</p>
        </div>

        <div className="border p-4 rounded-xl opacity-50">
          <h3 className="font-bold">🏪 RetailOps (Coming)</h3>
          <p className="text-gray-600">For retail and small shops</p>
        </div>

        <div className="border p-4 rounded-xl opacity-50">
          <h3 className="font-bold">🏭 FactoryOps (Coming)</h3>
          <p className="text-gray-600">For general manufacturing</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-xl font-semibold">
          Try AquaOps
        </h2>

        <p className="text-gray-600">
          If you run a water factory, you can try it now.
        </p>

        <a
          href="/aquaops"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Open AquaOps
        </a>
      </section>

    </main>
  );
}