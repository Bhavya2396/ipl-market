import Link from "next/link";
import { getServerSession } from "next-auth";
import { handler } from "@/lib/auth";
import { SignInButton } from "./sign-in-button";
import { UserNav } from "./user-nav";

export async function Navbar() {
  const session = await getServerSession(handler);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                IPL Market
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/matches"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Matches
                </Link>
                <Link
                  href="/leaderboard"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {session ? <UserNav user={session.user} /> : <SignInButton />}
          </div>
        </div>
      </div>
    </nav>
  );
} 