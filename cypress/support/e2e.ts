// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide XHR requests from command log
const app = window.top;
if (app) {
  app.console.log = () => {};
}

// Add custom commands
Cypress.Commands.add('login', () => {
  // Mock authentication
  cy.window().then((win) => {
    win.localStorage.setItem('next-auth.session-token', 'mock-token');
  });
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('next-auth.session-token');
  });
});

// Add custom assertions
Cypress.Commands.add('shouldHaveText', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject).should('have.text', text);
});

Cypress.Commands.add('shouldBeVisible', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('be.visible');
});

// Add custom selectors
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByRole', (role: string) => {
  return cy.get(`[role="${role}"]`);
});

// Add custom waiting
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().should('have.property', 'document').its('readyState').should('eq', 'complete');
});

// Add custom navigation
Cypress.Commands.add('navigateTo', (path: string) => {
  cy.visit(path);
  cy.waitForPageLoad();
});

// Add custom form interactions
Cypress.Commands.add('fillForm', (fields: Record<string, string>) => {
  Object.entries(fields).forEach(([selector, value]) => {
    cy.get(selector).type(value);
  });
});

// Add custom API mocking
Cypress.Commands.add('mockApi', (method: string, url: string, response: any) => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response,
  });
});

// Add custom error handling
Cypress.Commands.add('handleError', (error: Error) => {
  cy.log('Error:', error.message);
  cy.screenshot('error-screenshot');
}); 