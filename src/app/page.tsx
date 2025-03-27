import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          IPL 2025 Predictions Market
        </h1>
        <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Predict match outcomes, trade positions, and compete with other fans in the most exciting cricket tournament of the year.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/markets"
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            View Markets
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            How it Works
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 p-8">
          <h3 className="text-lg font-semibold leading-8 text-gray-900">Predict Match Outcomes</h3>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Make predictions on match results, player performances, and team statistics.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-8">
          <h3 className="text-lg font-semibold leading-8 text-gray-900">Trade Positions</h3>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Buy and sell prediction positions to maximize your potential returns.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-8">
          <h3 className="text-lg font-semibold leading-8 text-gray-900">Compete & Win</h3>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Compete with other fans and climb the leaderboard to win rewards.
          </p>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Upcoming Matches</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((match) => (
            <div key={match} className="rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Match {match}</p>
                  <p className="text-sm text-gray-500">March 26, 2025</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Open
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-900">Team A</div>
                  <div className="text-sm text-gray-500">vs</div>
                  <div className="text-sm font-medium text-gray-900">Team B</div>
                </div>
                <Link
                  href={`/markets/match-${match}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Predict →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-blue-600 px-6 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to start predicting?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Connect your wallet and start making predictions on your favorite IPL matches.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Connect Wallet
            </button>
            <Link
              href="/how-it-works"
              className="text-sm font-semibold leading-6 text-white"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
