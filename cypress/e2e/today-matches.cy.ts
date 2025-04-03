describe('Today Matches', () => {
  beforeEach(() => {
    // Mock the API response for today's matches
    cy.intercept('GET', '/api/matches/today', {
      statusCode: 200,
      body: {
        matches: [
          {
            id: '1',
            date: '2024-04-02T14:00:00Z',
            venue: 'M. Chinnaswamy Stadium',
            homeTeam: {
              id: '1',
              name: 'Royal Challengers Bangalore',
              shortName: 'RCB',
            },
            awayTeam: {
              id: '2',
              name: 'Mumbai Indians',
              shortName: 'MI',
            },
            status: 'UPCOMING',
            markets: [
              {
                id: '1',
                type: 'MATCH_WINNER',
                title: 'Match Winner',
                options: [
                  { id: '1', label: 'RCB' },
                  { id: '2', label: 'MI' },
                ],
              },
            ],
          },
        ],
      },
    }).as('getTodayMatches');
  });

  it('displays today\'s matches correctly', () => {
    cy.visit('/');
    cy.wait('@getTodayMatches');

    // Check if the match card is displayed
    cy.get('[data-testid="match-card"]').should('have.length', 1);

    // Check match details
    cy.get('[data-testid="match-card"]').within(() => {
      cy.get('[data-testid="match-title"]').should('contain', 'Royal Challengers Bangalore vs Mumbai Indians');
      cy.get('[data-testid="match-status"]').should('contain', 'UPCOMING');
      cy.get('[data-testid="match-time"]').should('contain', '2:00 PM');
      cy.get('[data-testid="match-venue"]').should('contain', 'M. Chinnaswamy Stadium');
      cy.get('[data-testid="team-home"]').should('contain', 'RCB');
      cy.get('[data-testid="team-away"]').should('contain', 'MI');
    });

    // Check if market is displayed
    cy.get('[data-testid="market-button"]').should('have.length', 1);
    cy.get('[data-testid="market-button"]').should('contain', 'Match Winner');
  });

  it('displays no matches message when there are no matches', () => {
    // Mock empty matches response
    cy.intercept('GET', '/api/matches/today', {
      statusCode: 200,
      body: {
        matches: [],
      },
    }).as('getEmptyMatches');

    cy.visit('/');
    cy.wait('@getEmptyMatches');

    cy.get('[data-testid="no-matches"]').should('contain', 'No matches scheduled for today.');
  });

  it('handles API error gracefully', () => {
    // Mock API error
    cy.intercept('GET', '/api/matches/today', {
      statusCode: 500,
      body: {
        error: 'Failed to fetch today\'s matches',
      },
    }).as('getMatchesError');

    cy.visit('/');
    cy.wait('@getMatchesError');

    // Check if error message is displayed
    cy.get('[data-testid="error-message"]').should('be.visible');
  });
}); 