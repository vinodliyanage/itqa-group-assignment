import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

function postBook(data) {
  return cy.request({
    method: "POST",
    url: "/api/books",
    body: data,
    headers: {
      Authorization: "Basic YWRtaW46cGFzc3dvcmQ=",
      "Content-Type": "application/json",
    },
  });
}

// TODO: test authentication

// Step 1: Making a POST request with valid data
Given("I make a POST request to {string} with the following body:", function (url, dataTable) {
  const data = dataTable.hashes()[0]; 
  postBook(data).then((res) => {
    this.response = res; 
  });
});

// Step 2: Verifying the response status code is 201
Then("the response status code should be 201", function () {
  cy.wrap(this.response.status).should("equal", 201);
});

// Step 3: Verifying the response body contains "id" with a number
Then('the response body should contain "id" with a value that is a number', function () {
  cy.wrap(this.response.body.id).should("be.a", "number");
});

// Step 4: Verifying the response body contains the correct title
Then('the response body should contain "title" with value {string}', function (expectedTitle) {
  cy.wrap(this.response.body.title).should("equal", expectedTitle);
});

// Step 5: Verifying the response body contains the correct author
Then('the response body should contain "author" with value {string}', function (expectedAuthor) {
  cy.wrap(this.response.body.author).should("equal", expectedAuthor);
});

// TODO: Add more steps to test the other fields in the response body