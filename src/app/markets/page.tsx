export default function MarketsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Prediction Markets</h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse and participate in various prediction markets for IPL 2025 matches.
        </p>
      </div>

      {/* Market Categories */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Match Winners",
            description: "Predict the winner of upcoming matches",
            count: "12 markets",
            icon: "🏆",
          },
          {
            title: "Player Performance",
            description: "Predict player statistics and achievements",
            count: "24 markets",
            icon: "👤",
          },
          {
            title: "Team Statistics",
            description: "Predict team-level statistics and records",
            count: "8 markets",
            icon: "📊",
          },
        ].map((category) => (
          <div
            key={category.title}
            className="relative rounded-lg border border-gray-200 p-6 hover:border-gray-300"
          >
            <div className="text-2xl mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold leading-8 text-gray-900">
              {category.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{category.description}</p>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                {category.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Markets */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Active Markets</h2>
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((market) => (
            <div
              key={market}
              className="rounded-lg border border-gray-200 p-6 hover:border-gray-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Match {market} Winner
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Mumbai Indians vs Chennai Super Kings
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Total Volume</div>
                  <div className="mt-1 text-2xl font-semibold text-blue-600">₹{market * 10000}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Mumbai Indians:</span>{" "}
                    <span className="text-green-600">65%</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Chennai Super Kings:</span>{" "}
                    <span className="text-red-600">35%</span>
                  </div>
                </div>
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                  Predict
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 