/// <reference types="cypress" />
/// <reference types="@cypress/react" />

import { mockMatch } from '../../src/lib/test-utils';
import { MatchCard } from '../../src/components/match-card';

describe('MatchCard Component', () => {
  it('renders match information correctly', () => {
    cy.mount(<MatchCard match={mockMatch} />);
    
    cy.getByTestId('match-card').should('be.visible');
    cy.getByTestId('match-card').should('contain', mockMatch.homeTeam.name);
    cy.getByTestId('match-card').should('contain', mockMatch.awayTeam.name);
    cy.getByTestId('match-card').should('contain', mockMatch.venue);
    cy.getByTestId('match-card').should('contain', mockMatch.city);
    cy.getByTestId('team1-short-name').should('contain', mockMatch.homeTeam.shortName);
    cy.getByTestId('team2-short-name').should('contain', mockMatch.awayTeam.shortName);
  });

  it('displays match date in correct format', () => {
    cy.mount(<MatchCard match={mockMatch} />);
    
    const formattedDate = new Date(mockMatch.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    cy.getByTestId('match-card').should('contain', formattedDate);
  });

  it('shows correct status badge color based on match status', () => {
    const statuses = [
      { status: 'UPCOMING', class: 'bg-yellow-100' },
      { status: 'LIVE', class: 'bg-green-100' },
      { status: 'COMPLETED', class: 'bg-gray-100' },
    ];

    statuses.forEach(({ status, class: expectedClass }) => {
      const matchWithStatus = { ...mockMatch, status };
      cy.mount(<MatchCard match={matchWithStatus} />);
      cy.getByTestId('status-badge').should('have.class', expectedClass);
    });
  });

  it('handles click event correctly', () => {
    const onMatchClick = cy.stub().as('onMatchClick');
    cy.mount(<MatchCard match={mockMatch} onMatchClick={onMatchClick} />);
    
    cy.getByTestId('match-card').click();
    cy.get('@onMatchClick').should('have.been.calledWith', mockMatch.id);
  });

  it('handles missing data gracefully', () => {
    const incompleteMatch = {
      ...mockMatch,
      venue: undefined,
      city: undefined,
    };
    
    cy.mount(<MatchCard match={incompleteMatch} />);
    
    cy.getByTestId('match-card').should('be.visible');
    cy.getByTestId('match-card').should('contain', 'Venue TBD');
    cy.getByTestId('match-card').should('contain', 'Location TBD');
  });
}); 