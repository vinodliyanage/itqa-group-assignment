import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const baseUrl = "http://localhost:7081/api/books";

Given("I have a book with ID {int}", (id) => {
  cy.wrap(id).as("bookId");
});

When(
  "I send a PUT request to update the book with an unexpected parameter",
  function () {
    const bookId = this.bookId;
    const invalidUpdateData = {
      id: bookId,
      title: "Updated Book Title",
      author: "Updated Author",
      unexpectedParam: "InvalidParam",
    };

    cy.request({
      method: "PUT",
      url: `${baseUrl}/${bookId}`,
      auth: {
        username: "admin",
        password: "password",
      },
      body: invalidUpdateData,
      failOnStatusCode: false,
    }).as("response");
  }
);

When("I send a PUT request with valid data", function () {
  const invalidBookId = 999;
  const validUpdateData = {
    title: "Valid Book Title",
    author: "Valid Author",
  };

  cy.request({
    method: "PUT",
    url: `${baseUrl}/${invalidBookId}`,
    auth: {
      username: "admin",
      password: "password",
    },
    body: validUpdateData,
    failOnStatusCode: false,
  }).as("response");
});

Then("the response status should be {int}", function (statusCode) {
  cy.get("@response").its("status").should("eq", statusCode);
});

Then("the response body should contain {string}", function (message) {
  cy.get("@response").its("body").should("contain", message);
});

Given("the book with ID {int} does not exist", function (bookId) {
  cy.request({
    method: "GET",
    url: `${baseUrl}/${bookId}`,
    auth: {
      username: "admin",
      password: "password",
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(404); 
  });
});
