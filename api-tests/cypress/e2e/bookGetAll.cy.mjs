import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

Given ("the Books API endpoint is {string}", (endpoint) => {
    cy.wrap(endpoint).as("apiEndpoint");
});

When ("I send a GET request", function () {
    cy.request("GET", this.apiEndpoint).as("apiResponse");
});

Then("the response status should be {int}", function (statusCode) {
    cy.get("@apiResponse").its("status").should("equal", statusCode);
});

Then("the response should contain a list of books", function () {
    cy.get("@apiResponse").its("body").should((body) => {
        expect(body).to.be.an("array");//Ensure the response is an array
        expect(body.length).to.be.greaterThan(0);//Ensure the array is not empty
    });
});