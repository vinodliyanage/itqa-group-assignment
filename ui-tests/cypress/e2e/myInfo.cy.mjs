import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit OrangeHRM.com", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
});

Then("I should login", () => {
  // Enter the username
  cy.get("input[name='username']").type("Admin");

  // Enter the password
  cy.get("input[name='password']").type("admin123");

  // Click the login button
  cy.get("button[type='submit']").click();
  cy.wait(10000);
});
Then("I can update my first name", () => {
  // Click the "My Info" menu item
  cy.contains("span", "My Info").click();
  cy.wait(1000);

  // Click the "Personal Details" link
  cy.get('a[href*="viewPersonalDetails"]').click();
  cy.wait(1000);

  // Clear the existing First Name and fill in the new name
  cy.get("input[name='firstName']").clear().type("Sara");

  // Click the Save button
  cy.get("button[type='submit']").contains("Save").click();
  cy.wait(1000);

  // Assert the First Name field has the updated value
  cy.get("input[name='firstName']").should("have.value", "Sara");
});

Then("I can update my gender", () => {
  // Click the "My Info" menu item
  cy.contains("span", "My Info").click();
  cy.wait(1000);

  // Click the "Personal Details" link
  cy.get('a[href*="viewPersonalDetails"]').click();
  cy.wait(1000);

  // Ensure the Female radio button is in view and not covered
  cy.get('input[type="radio"][value="2"]')
    .scrollIntoView() // Scroll to ensure the element is visible
    .click({ force: true }); // Force click if it's covered

  // Wait for the radio button to be selected
  cy.wait(500); // Wait for page to update after selection

  // Assert the Female radio button is checked
  cy.get('input[type="radio"][value="2"]').should("be.checked");
});
Then("I can update my middle name", () => {
  // Click the "My Info" menu item
  cy.contains("span", "My Info").click();
  cy.wait(1000);

  // Click the "Personal Details" link
  cy.get('a[href*="viewPersonalDetails"]').click();
  cy.wait(1000);

  // Clear the existing Middle Name and fill in the new name
  cy.get("input[name='middleName']").clear().type("Lee");

  // Click the Save button
  cy.get("button[type='submit']").contains("Save").click();
  cy.wait(1000);

  // Assert the Middle Name field has the updated value
  cy.get("input[name='middleName']").should("have.value", "Lee");
});
