// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    getBySel(selector: string, ...args: any): Chainable<JQueryWithSelector>;
    getByFormControlName(
      selector: string,
      ...args: any
    ): Chainable<JQueryWithSelector>;
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getByFormControlName', (selector, ...args) => {
  return cy.get(`[formControlName=${selector}]`, ...args);
});
