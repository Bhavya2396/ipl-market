/// <reference types="cypress" />
/// <reference types="@cypress/react" />

import { mount } from '@cypress/react18'
import { SessionProvider } from 'next-auth/react'
import '../../src/app/globals.css'
import React from 'react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      mount: typeof mount
      mountWithProviders: typeof mount
      mountWithCustomProviders(
        component: React.ReactNode,
        providers: Array<[React.ComponentType<any>, Record<string, any>]>
      ): Chainable<void>
    }
  }
}

// Add mount command
Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)

// Add custom component mounting with providers
Cypress.Commands.add('mountWithProviders', (component) => {
  return mount(
    <SessionProvider session={null}>
      {component}
    </SessionProvider>
  )
})

// Example use:
// cy.mountWithProviders(<MyComponent />)

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