import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Step: Logging in as Admin
Given("I am logged in as an admin", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  cy.get('input[name="username"]').type("Admin");
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
});

// Step: Navigating to a Section
When("I navigate to the {string} section", (section) => {
  cy.contains(section).click();
});

// Step: Clicking a Button
When("I click on the {string} button", (button) => {
  cy.get('button').contains(button).click();
});

// Step: Verifying Error Messages for Required Fields
Then("I should see error messages for required fields", () => {
  cy.get('.oxd-input-field-error-message').should("be.visible");
});


