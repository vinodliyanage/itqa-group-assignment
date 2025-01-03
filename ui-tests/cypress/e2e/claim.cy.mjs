import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.login(); 
});

Given("I am on the Events page", () => {
  cy.visit("/claim/viewEvents");
});

When("I click on the delete button for the first event", () => {
  cy.get("button")
    .find("i.oxd-icon.bi-trash") 
    .first() 
    .click(); 
});

Then("I should see a confirmation dialog", () => {
  cy.get(".oxd-dialog-sheet")
    .should("exist") 
    .contains("Are you sure ?") 
    .should("exist");
});

Then("I click on the confirm button", () => {
  cy.get(".oxd-dialog-sheet")
    .contains("Yes, Delete") 
    .click(); 
});

Then("I should see a successfully deleted message", () => {
  cy.get(".oxd-toast-content-text")
    .should("exist")
    .contains(/successfully deleted/i);
});
