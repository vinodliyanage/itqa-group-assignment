import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Verify Admin Access to Purge Employee Section

Given("I am logged in as an admin", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  cy.get('input[name="username"]').type("Admin");
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
});

When("I navigate to the {string} section", (section) => {
  cy.contains(section).click();
});

When("I enter the admin password {string}", (password) => {
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Then("I should see the {string} page", (pageTitle) => {
  cy.contains(pageTitle).should("be.visible");
});

// Scenario: Verify Purge Employee Form Validation

When("I click on the {string} button without entering any details", (buttonText) => {
  cy.get('button.oxd-button').contains(buttonText).click();
});

Then("I should see an error message for the {string} field", (errorMessage) => {
  cy.get('.oxd-input-field-error-message') // Select the error message element
    .should("have.text", errorMessage); // Verify the exact text matches "Required"
});
