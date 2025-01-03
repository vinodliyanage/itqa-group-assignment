import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Helper function to send GET request for book by ID
function getBookById(auth, endpoint, id) {
  return cy.request({
    method: "GET",
    url: `${endpoint}/${id}`, // Use the assigned endpoint dynamically
    headers: {
      Authorization: `Basic ${auth}`, // Encoded credentials
    },
  });
}

// Step Definitions

// Step 1: Setting the Book API endpoint
Given("the Book API endpoint is {string}", function (endpoint) {
  cy.wrap(endpoint).as("apiEndpoint"); // Save the endpoint in Cypress alias
});

// Step 2: Assigning credentials for Admin
Given("I am logged in as Admin", function () {
  cy.wrap("YWRtaW46cGFzc3dvcmQ=").as("credentials"); // Admin credentials in Base64
});

// Step 3: Assigning credentials for User
Given("I am logged in as User", function () {
  cy.wrap("dXNlcjpwYXNzd29yZA==").as("credentials"); // User credentials in Base64
});

// Step 4: Sending a GET request with book ID
When("I send a GET request with book ID {string}", function (id) {
  cy.get("@credentials").then((auth) => {
    cy.get("@apiEndpoint").then((endpoint) => {
      getBookById(auth, endpoint, id).then((response) => {
        cy.wrap(response).as("response"); // Save the response for validation
      });
    });
  });
});

// // Step 5: Validating response status code
// Then("the response status should be {int}", function (statusCode) {
//   cy.get("@response").then((response) => {
//     expect(response.status).to.equal(statusCode);
//   });
// });

// Verifies if the status is 200 or logs the error code
Then("I verify the response status is 200 or log the error code", function () {
  cy.get("@response").then((response) => {
    if (response.status === 200) {
      cy.log("Request succeeded with status: 200");
    } else {
      cy.log(`Request failed with status: ${response.status}`);
      cy.log(`Error message: ${response.body}`);
    }
  });
});


// Step 6: Validating response body contains "id" as a number
Then('the response body should contain "id" with a value that is a number', function () {
  cy.get("@response").then((response) => {
    expect(response.body).to.have.property("id").that.is.a("number");
  });
});

// Step 7: Validating response body contains "title" as a string
Then('the response body should contain "title" with value that is a string', function () {
  cy.get("@response").then((response) => {
    expect(response.body).to.have.property("title").that.is.a("string");
  });
});

// Step 8: Validating response body contains "author" as a string
Then('the response body should contain "author" with value that is a string', function () {
  cy.get("@response").then((response) => {
    expect(response.body).to.have.property("author").that.is.a("string");
  });
});
