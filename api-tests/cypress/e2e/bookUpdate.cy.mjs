import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.wrap(null).as("response");
  cy.wrap("").as("authToken");
});

Given("I am authenticated as {string} with password {string}", (username, password) => {
  cy.getAuthToken(username, password).as("authToken");
});

Given("a book with ID {string} exists", (bookId) => {
  // Wait for the auth token to be fetched before using it to create the book
  cy.get("@authToken").then((token) => {
    cy.createBook({ id: bookId, title: "Original Title", author: "Original Author" }, "/api/books", token);
  });
});

When("I make a PUT request to {string} with the following body:", (endpoint, dataTable) => {
  const rawTable = dataTable.rawTable;
  const headers = rawTable[0];
  const row = rawTable[1];

  const requestData = Object.fromEntries(headers.map((key, index) => [key, row[index]]));
  
  cy.get("@authToken").then((token) => {
    cy.updateBook(requestData, endpoint, token).as("response");
  });
});

Then("the response status code should be {int}", (statusCode) => {
  cy.get("@response").its("status").should("eq", statusCode);
});

Then("the response body should contain {string} with value {string}", (field, value) => {
  cy.get("@response").its("body").should("have.property", field).and("eq", value);
});

Then("the response body should indicate invalid input", () => {
  cy.get("@response").its("body").should("have.property", "error").and("match", /Invalid input/);
});
