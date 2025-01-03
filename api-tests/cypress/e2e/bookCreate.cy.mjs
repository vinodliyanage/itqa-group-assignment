import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.wrap(null).as("response");
  cy.wrap("").as("authToken");
});

Given("I am authenticated as {string} with password {string}", (username, password) => {
  cy.getAuthToken(username, password).as("authToken");
});

When("I make a POST request to {string} with the following body:", (endpoint, dataTable) => {
  const rawTable = dataTable.rawTable;

  const headers = rawTable[0];
  const row = rawTable[1];

  const requestData = Object.fromEntries(headers.map((key, index) => [key, row[index]]));

  cy.get("@authToken").then((token) => {
    cy.createBook(requestData, endpoint, token).as("response");
  });
});

Then("the response status code should be {int}", (statusCode) => {
  cy.get("@response").its("status").should("eq", statusCode);
});

Then("the response body should contain {string} with value {string}", (field, value) => {
  cy.get("@response").its("body").should("have.property", field).and("eq", value);
});
