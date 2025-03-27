/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>
    logout(): Chainable<void>
    shouldHaveText(text: string): Chainable<void>
    shouldBeVisible(): Chainable<void>
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
    getByRole(role: string): Chainable<JQuery<HTMLElement>>
    waitForPageLoad(): Chainable<void>
    navigateTo(path: string): Chainable<void>
    fillForm(fields: Record<string, string>): Chainable<void>
    mockApi(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, response: any): Chainable<void>
    handleError(error: Error): Chainable<void>
  }
}

// Custom commands implementation
Cypress.Commands.add('login', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('next-auth.session-token', 'mock-token');
  });
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('next-auth.session-token');
  });
});

Cypress.Commands.add('shouldHaveText', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject).should('have.text', text);
});

Cypress.Commands.add('shouldBeVisible', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('be.visible');
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByRole', (role: string) => {
  return cy.get(`[role="${role}"]`);
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().should('have.property', 'document').its('readyState').should('eq', 'complete');
});

Cypress.Commands.add('navigateTo', (path: string) => {
  cy.visit(path);
  cy.waitForPageLoad();
});

Cypress.Commands.add('fillForm', (fields: Record<string, string>) => {
  Object.entries(fields).forEach(([selector, value]) => {
    cy.get(selector).type(value);
  });
});

Cypress.Commands.add('mockApi', (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, response: any) => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response,
  });
});

Cypress.Commands.add('handleError', (error: Error) => {
  cy.log('Error:', error.message);
  cy.screenshot('error-screenshot');
}); 