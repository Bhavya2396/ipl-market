import { render, screen } from '@/lib/test-utils'
import { MatchCard } from '../match-card'
import { mockMatch } from '@/lib/test-utils'

describe('MatchCard', () => {
  it('renders match information correctly', () => {
    render(<MatchCard match={mockMatch} />)

    // Check if team names are displayed
    expect(screen.getByText('Team A')).toBeInTheDocument()
    expect(screen.getByText('Team B')).toBeInTheDocument()

    // Check if venue and city are displayed
    expect(screen.getByText('Test Stadium')).toBeInTheDocument()
    expect(screen.getByText('Test City')).toBeInTheDocument()

    // Check if status badge is displayed
    expect(screen.getByText('UPCOMING')).toBeInTheDocument()
  })

  it('displays correct status badge color for different match statuses', () => {
    const { rerender } = render(<MatchCard match={mockMatch} />)
    expect(screen.getByText('UPCOMING')).toHaveClass('bg-blue-500')

    const liveMatch = { ...mockMatch, status: 'LIVE' }
    rerender(<MatchCard match={liveMatch} />)
    expect(screen.getByText('LIVE')).toHaveClass('bg-green-500')

    const completedMatch = { ...mockMatch, status: 'COMPLETED' }
    rerender(<MatchCard match={completedMatch} />)
    expect(screen.getByText('COMPLETED')).toHaveClass('bg-gray-500')
  })

  it('displays match date in correct format', () => {
    render(<MatchCard match={mockMatch} />)
    const date = new Date(mockMatch.date)
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    expect(screen.getByText(formattedDate)).toBeInTheDocument()
  })

  it('renders team logos if available', () => {
    const matchWithLogos = {
      ...mockMatch,
      homeTeam: {
        ...mockMatch.homeTeam,
        logo: 'https://example.com/team-a.png',
      },
      awayTeam: {
        ...mockMatch.awayTeam,
        logo: 'https://example.com/team-b.png',
      },
    }
    render(<MatchCard match={matchWithLogos} />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute('src', 'https://example.com/team-a.png')
    expect(images[1]).toHaveAttribute('src', 'https://example.com/team-b.png')
  })

  it('renders fallback content when match data is missing', () => {
    const incompleteMatch = {
      ...mockMatch,
      homeTeam: undefined,
      awayTeam: undefined,
    }
    render(<MatchCard match={incompleteMatch} />)

    expect(screen.getByText('Match details not available')).toBeInTheDocument()
  })
}) 