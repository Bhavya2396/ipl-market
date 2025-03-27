import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { MatchStatus } from '@prisma/client'

function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }

// Mock data
export const mockUser = {
  id: '1',
  username: 'testuser',
  totalPoints: 1000,
  successRate: 75,
  rank: 1,
}

export const mockMatch = {
  id: '1',
  date: new Date(),
  status: MatchStatus.UPCOMING,
  venue: 'Test Stadium',
  city: 'Test City',
  homeTeamId: '1',
  awayTeamId: '2',
  startTime: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  homeTeam: {
    id: '1',
    name: 'Team A',
    shortName: 'TA',
    createdAt: new Date(),
    updatedAt: new Date(),
    logo: null,
  },
  awayTeam: {
    id: '2',
    name: 'Team B',
    shortName: 'TB',
    createdAt: new Date(),
    updatedAt: new Date(),
    logo: null,
  },
}

export const mockMarket = {
  id: '1',
  type: 'MATCH_WINNER',
  title: 'Match Winner',
  description: 'Predict the winner of the match',
  status: 'ACTIVE',
  options: [
    {
      id: '1',
      label: 'Team A',
      odds: 1.5,
    },
    {
      id: '2',
      label: 'Team B',
      odds: 2.5,
    },
  ],
}

export const mockPrediction = {
  id: '1',
  status: 'ACTIVE',
  points: 0,
  createdAt: new Date().toISOString(),
  market: mockMarket,
  match: mockMatch,
}

// Mock API responses
export const mockApiResponses = {
  matches: {
    data: [mockMatch],
    pagination: {
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  },
  markets: {
    data: [mockMarket],
    pagination: {
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  },
  predictions: {
    data: [mockPrediction],
    pagination: {
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  },
  leaderboard: {
    users: [mockUser],
    pagination: {
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
    userPosition: {
      rank: 1,
      totalPoints: 1000,
      successRate: 75,
    },
  },
} 