import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.login(); // Login
});

Given("I am on the Project page", () => {
  cy.visit("/time/displayProjectReportCriteria");
});
  
When("I fill in the Project name with valid data", () => {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
      .should("be.visible")
      .clear() // Clear the field 
      .type("ACME Ltd"); // Type the project name
  // Just the wait time because that dropdown need to load sometime
    cy.wait(500); 
  
    // Click on the project name from the search
    cy.contains("ACME Ltd - ACME Ltd").click();
  });
  
  When ("I click the View button to display the project details", () => {
    cy.get("button[type='submit']").contains("View").click();
    cy.wait(1000); // Wait to ensure project details are visible after click on th view button
  });
  
