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

Cypress.Commands.add("createBook", (data, endpoint, token) => {
  return cy.request({
    method: "POST",
    url: endpoint,
    body: data,
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
  });
});

Cypress.Commands.add("updateBook", (data, endpoint, token) => {
  return cy.request({
    method: "PUT",
    url: endpoint,
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,  // Use Bearer for token-based authentication
      "Content-Type": "application/json",
    },
  });
});

Cypress.Commands.add("getAuthToken", (username, password) => {
  const token = btoa(`${username}:${password}`);
  return token;
});


