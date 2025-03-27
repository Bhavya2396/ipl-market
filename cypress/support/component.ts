import { mount } from 'cypress/react18'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      mountWithProviders: (component: React.ReactNode) => Chainable<void>
      mountWithCustomProviders: (
        component: React.ReactNode,
        providers: Array<[React.ComponentType<any>, Record<string, any>]>
      ) => Chainable<void>
    }
  }
}

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)

// Add custom component mounting with providers
Cypress.Commands.add('mountWithProviders', (component: React.ReactNode) => {
  return cy.mount(
    <SessionProvider>
      {component}
    </SessionProvider>
  )
})

// Add custom component mounting with custom providers
Cypress.Commands.add('mountWithCustomProviders', (
  component: React.ReactNode,
  providers: Array<[React.ComponentType<any>, Record<string, any>]>
) => {
  return cy.mount(
    providers.reduce((acc, [Provider, props]) => {
      return <Provider {...props}>{acc}</Provider>
    }, component)
  )
}) 