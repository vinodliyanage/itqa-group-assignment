import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Utility function for encoding credentials
function encodeCredentials(username, password) {
  return btoa(`${username}:${password}`);
}

// Function to fetch books using the API
function getBooks(auth) {
  return cy.request({
    method: "GET",
    url: "/api/books",
    headers: {
      Authorization: `Basic ${auth}`, // Pass encoded credentials
    },
  });
}

// Step 1: Setting the Books API endpoint
Given("the Books API endpoint is {string}", (endpoint) => {
  cy.wrap(endpoint).as("apiEndpoint");
});

// Step 2: Logging in as Admin
Given("I am logged in as Admin", function () {
  const username = "admin";
  const password = "password";
  const encodedAuth = encodeCredentials(username, password);
  cy.wrap(encodedAuth).as("credentials");
});

// Step 3: Logging in as User
Given("I am logged in as User", function () {
  const username = "user";
  const password = "password";
  const encodedAuth = encodeCredentials(username, password);
  cy.wrap(encodedAuth).as("credentials");
});

// Step 4: Sending a GET request
When("I send a GET request", function () {
  const credentials = this.credentials;
  getBooks(credentials).then((res) => {
    this.response = res; // Save response for validation
    cy.log("Response Body:", JSON.stringify(res.body, null, 2)); // Log the response
  });
});

// Step 5: Verifying the response status code
Then("the response status should be {int}", function (statusCode) {
  cy.wrap(this.response.status).should("equal", statusCode);
});

// Step 6: Verifying the response contains a list of books
Then("the response body should contain list of books", function () {
  cy.wrap(this.response.body).should("be.an", "array").and("not.be.empty");
});

// Step 7: Verifying the response contains a field with a value that is a number
Then(
  "the response body should contain list of books with {string} with value that is a string",
  function (field) {
    cy.wrap(this.response.body).each((book) => {
      expect(book).to.have.property(field);
      if (book[field] !== null) {
        expect(book[field]).to.be.a("string");
      } else {
        cy.log(`Field "${field}" is null for book:`, book);
      }
    });
  }
);

// Step 8: Verifying the response contains a field with a value that is a string
Then(
  "the response body should contain list of books with {string} with value that is a string",
  function (field) {
    cy.wrap(this.response.body).each((book) => {
      expect(book).to.have.property(field).that.is.a("string");
    });
  }
);
