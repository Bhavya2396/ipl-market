/// <reference types="cypress" />
/// <reference types="@cypress/react" />

import { mount } from '@cypress/react18'
import { MatchCard } from '../../src/components/match-card'
import { mockMatch } from '../../src/lib/test-utils'
import { MatchStatus } from '@prisma/client'

describe('MatchCard', () => {
  it('renders match information correctly', () => {
    mount(<MatchCard match={mockMatch} />)

    // Check team names
    cy.get('[data-testid="team1-name"]').should('contain', mockMatch.homeTeam.name)
    cy.get('[data-testid="team2-name"]').should('contain', mockMatch.awayTeam.name)

    // Check venue and city
    cy.get('[data-testid="venue"]').should('contain', mockMatch.venue)
    cy.get('[data-testid="city"]').should('contain', mockMatch.city)

    // Check status badge
    cy.get('[data-testid="status-badge"]')
      .should('contain', mockMatch.status)
      .and('have.class', 'bg-blue-100')
  })

  it('displays correct status badge color for different statuses', () => {
    const statuses = ['UPCOMING', 'LIVE', 'COMPLETED', 'CANCELLED'] as const
    const expectedColors = {
      UPCOMING: 'bg-blue-100',
      LIVE: 'bg-green-100',
      COMPLETED: 'bg-gray-100',
      CANCELLED: 'bg-red-100',
    }

    statuses.forEach((status) => {
      mount(<MatchCard match={{ ...mockMatch, status }} />)
      cy.get('[data-testid="status-badge"]')
        .should('contain', status)
        .and('have.class', expectedColors[status])
    })
  })

  it('displays match date in correct format', () => {
    mount(<MatchCard match={mockMatch} />)
    cy.get('[data-testid="match-date"]').should('contain', 'Mar 15, 2025')
  })

  it('renders team logos when available', () => {
    mount(<MatchCard match={mockMatch} />)
    cy.get('[data-testid="team1-logo"]')
      .should('have.attr', 'src', mockMatch.homeTeam.logo)
      .and('have.attr', 'alt', `${mockMatch.homeTeam.name} logo`)
    cy.get('[data-testid="team2-logo"]')
      .should('have.attr', 'src', mockMatch.awayTeam.logo)
      .and('have.attr', 'alt', `${mockMatch.awayTeam.name} logo`)
  })

  it('handles incomplete match data gracefully', () => {
    const incompleteMatch = {
      ...mockMatch,
      homeTeam: { ...mockMatch.homeTeam, logo: null },
      awayTeam: { ...mockMatch.awayTeam, logo: null },
      venue: '',
      city: '',
    }
    mount(<MatchCard match={incompleteMatch} />)

    // Should still render team names
    cy.get('[data-testid="team1-name"]').should('contain', incompleteMatch.homeTeam.name)
    cy.get('[data-testid="team2-name"]').should('contain', incompleteMatch.awayTeam.name)

    // Should not render venue and city
    cy.get('[data-testid="venue"]').should('not.exist')
    cy.get('[data-testid="city"]').should('not.exist')

    // Should render default team logos
    cy.get('[data-testid="team1-logo"]').should('have.attr', 'src', '/images/team-placeholder.png')
    cy.get('[data-testid="team2-logo"]').should('have.attr', 'src', '/images/team-placeholder.png')
  })
}) 