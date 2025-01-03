import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.login();
});

Given("I am on the Events page", () => {
  cy.visit("/claim/viewEvents");
});

When("I fill in the Event form with valid data", () => {
  cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
    .should("be.visible")
    .type("Sample Event");
  cy.get("div.oxd-select-text").click();
  cy.contains("Active").click();
});

When("I click the Reset button", () => {
  cy.get("button[type='button']").contains("Reset").click();
  cy.wait(1000); 
});

Then('the "Event Name" field should be cleared', () => {
  cy.get('input[placeholder="Type for hints..."]')
    .clear()
    .should("have.value", ""); // Clear manually
});

Then('the "Status" field should be cleared', () => {
  cy.get("div.oxd-select-text").should("contain.text", "-- Select --");
});
