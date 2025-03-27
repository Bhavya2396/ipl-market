import { mockMatch } from '../../src/lib/test-utils';

describe('Matches Page', () => {
  beforeEach(() => {
    cy.login();
    cy.navigateTo('/matches');
    cy.mockApi('GET', '/api/matches', {
      data: [mockMatch],
      pagination: {
        total: 1,
        page: 1,
        limit: 10,
      },
    });
  });

  it('displays match information correctly', () => {
    cy.getByTestId('match-card').should('be.visible');
    cy.getByTestId('match-card').should('contain', mockMatch.homeTeam.name);
    cy.getByTestId('match-card').should('contain', mockMatch.awayTeam.name);
    cy.getByTestId('match-card').should('contain', mockMatch.venue);
    cy.getByTestId('match-card').should('contain', mockMatch.city);
  });

  it('shows correct status badge color', () => {
    cy.getByTestId('status-badge').should('have.class', 'bg-yellow-100');
  });

  it('displays match date in correct format', () => {
    const formattedDate = new Date(mockMatch.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    cy.getByTestId('match-card').should('contain', formattedDate);
  });

  it('displays team short names when logos are not available', () => {
    cy.getByTestId('team1-short-name').should('contain', mockMatch.homeTeam.shortName);
    cy.getByTestId('team2-short-name').should('contain', mockMatch.awayTeam.shortName);
  });

  it('handles match data loading state', () => {
    cy.intercept('GET', '/api/matches', (req) => {
      req.reply({
        delay: 1000,
        statusCode: 200,
        body: {
          data: [mockMatch],
          pagination: {
            total: 1,
            page: 1,
            limit: 10,
          },
        },
      });
    });

    cy.getByTestId('loading-skeleton').should('be.visible');
    cy.getByTestId('match-card').should('be.visible');
  });

  it('handles API error gracefully', () => {
    cy.intercept('GET', '/api/matches', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    });

    cy.getByTestId('error-message').should('be.visible');
    cy.getByTestId('error-message').should('contain', 'Failed to load matches');
  });

  it('navigates to match details on click', () => {
    cy.getByTestId('match-card').click();
    cy.url().should('include', `/matches/${mockMatch.id}`);
  });

  afterEach(() => {
    cy.logout();
  });
}); 