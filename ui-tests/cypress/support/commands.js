// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
  cy.session([username, password], () => {
    cy.intercept("POST", "**/**/auth/validate").as("login");
    cy.intercept("GET", "**/**/dashboard/index").as("dashboard");

    cy.visit("/auth/login");
    cy.get('input[name="username"]', { timeout: 10000 }).type(username);
    cy.get('input[name="password"]', { timeout: 10000 }).type(password);
    cy.get('button[type="submit"]', { timeout: 10000 }).click();

    cy.wait("@login");
    cy.wait("@dashboard");
  });
});
