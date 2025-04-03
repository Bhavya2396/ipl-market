import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Image from "next/image";
import { Clock, Trophy, Users } from "lucide-react";
import { TodayMatches } from "@/components/today-matches";
import { Leaderboard } from "@/components/leaderboard";

async function getUpcomingMatches() {
  const now = new Date();
  const matches = await prisma.match.findMany({
    where: {
      status: "UPCOMING",
      date: {
        gte: now,
      },
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
    orderBy: {
      date: "asc",
    },
    take: 3,
  });
  return matches;
}

export default async function Home() {
  const matches = await getUpcomingMatches();

  return (
    <main className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">IPL Prediction Market</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <TodayMatches />
        </div>
        <div>
          <Leaderboard />
        </div>
      </div>

      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            IPL 2024 Predictions Market
          </h1>
          <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Predict match outcomes and compete with other fans in the most exciting cricket tournament of the year.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/matches"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Matches
            </Link>
            <Link href="/leaderboard" className="text-sm font-semibold leading-6 text-gray-900">
              View Leaderboard <span aria-hidden="true">→</span>
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
            {matches.map((match) => (
              <div key={match.id} className="rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">{match.homeTeam.name} vs {match.awayTeam.name}</p>
                    <p className="text-sm text-gray-500">{format(new Date(match.date), "MMMM d, yyyy")}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Open
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={match.homeTeam.logo || ""}
                        alt={match.homeTeam.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div className="text-sm font-medium text-gray-900">{match.homeTeam.shortName}</div>
                    </div>
                    <div className="text-sm text-gray-500">vs</div>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={match.awayTeam.logo || ""}
                        alt={match.awayTeam.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div className="text-sm font-medium text-gray-900">{match.awayTeam.shortName}</div>
                    </div>
                  </div>
                  <Link
                    href={`/matches/${match.id}`}
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
              <Link
                href="/auth/signin"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Sign In
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Clock className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Real-time Updates
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Get instant updates on match progress and market results.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Trophy className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Compete & Win
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Compete with other fans and climb the leaderboard with accurate predictions.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Users className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Community
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Join a community of cricket enthusiasts and share your predictions.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
