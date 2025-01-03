import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const baseUrl = "http://localhost:7081/api/books";

// Scenario: Fail when updating a book with an unexpected parameter
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

Then("the response status should be {int}", function (statusCode) {
  cy.get("@response").its("status").should("eq", statusCode);
});

Then("the response body should contain {string}", function (message) {
  cy.get("@response").its("body").should("contain", message);
});


// Scenario: Fail when updating a book with invalid title and author types
Given(
  "I attempt to update a book with invalid title and author types",
  function () {
    const invalidUpdateData = {
      id: 1, 
      title: 1234, 
      author: false, 
    };

    cy.wrap(invalidUpdateData).as("invalidUpdateData");
  }
);

When("I send an update request with invalid data types", function () {
  const invalidUpdateData = this.invalidUpdateData;

  cy.request({
    method: "PUT",
    url: `${baseUrl}/${invalidUpdateData.id}`,
    auth: {
      username: "admin",
      password: "password",
    },
    body: invalidUpdateData,
    failOnStatusCode: false,
  }).as("response");
});

Then(
  "the response status for invalid update should be {int}",
  function (statusCode) {
    cy.get("@response").its("status").should("eq", statusCode);
  }
);

Then(
  "the response body should contain an error message {string}",
  function (message) {
    cy.get("@response").its("body").should("contain", message);
  }
);

// Scenario: Update only the author field without changing the title
Given("I have a valid book with ID {int}", (id) => {
  cy.request({
    method: "POST",
    url: baseUrl,
    auth: {
      username: "admin",
      password: "password",
    },
    body: {
      id: id,
      title: "Original Title",
      author: "Original Author",
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status !== 201) {
      cy.log(`Book with ID ${id} already exists.`);
    } else {
      expect(response.status).to.eq(201);
    }
  });

  cy.wrap(id).as("bookId");
});

When("I update only the author field", function () {
  const bookId = this.bookId;

  const updateAuthorOnlyData = {
    id: bookId,
    title: "Original Title", 
    author: "Updated Author",
  };

  cy.request({
    method: "PUT",
    url: `${baseUrl}/${bookId}`,
    auth: {
      username: "admin",
      password: "password",
    },
    body: updateAuthorOnlyData,
    failOnStatusCode: false,
  }).as("response");
});

Then("the response status for update should be {int}", function (statusCode) {
  cy.get("@response").its("status").should("eq", statusCode);
});

Then("the response should return the updated author", function () {
  cy.get("@response")
    .its("body")
    .then((body) => {
      expect(body).to.have.property("title", "Original Title"); 
      expect(body).to.have.property("author", "Updated Author"); 
    });
});
