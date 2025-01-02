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
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait("@login");
    cy.wait("@dashboard");
  });
});

Cypress.Commands.add("fillAddEmployeeForm", (data) => {
  const { firstName, middleName, lastName, employeeId } = data;

  cy.get('input[name="firstName"]').clear().type(firstName);
  cy.get('input[name="middleName"]').clear().type(middleName);
  cy.get('input[name="lastName"]').clear().type(lastName);

  cy.get(".oxd-input-group")
    .contains("label", /Employee Id/i)
    .parents(".oxd-input-group")
    .find("input")
    .clear()
    .type(employeeId);

  cy.get('input[type="file"]').selectFile("cypress/fixtures/profile.jpg", { force: true });
});
