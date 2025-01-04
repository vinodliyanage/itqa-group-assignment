import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

before(() => {
  const seed = Math.floor(Math.random() * 1000);
  faker.seed(seed);
});

beforeEach(() => {
  cy.login();
});

Given("I am on the PIM page", () => {
  cy.visit("/pim/viewEmployeeList");
});

When("I click on the add employee button", () => {
  cy.get("button").contains(/add/i).click();
});

Then("I should see the add employee form", () => {
  cy.get("form", { timeout: 5000 }).should("exist");
});

Then("I fill all the fields in the employee form with valid data", () => {
  const firstName = faker.person.firstName();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const employeeId = faker.number.int(10000000, 99999999);

  cy.wrap(employeeId).as("employeeId");

  cy.fillAddEmployeeForm({ firstName, middleName, lastName, employeeId });
});

Then("I submit the form with valid data", () => {
  cy.intercept("POST", "**/pim/employees").as("createEmployee");
  cy.get("form", { timeout: 5000 }).submit();
  cy.wait("@createEmployee").its("response.statusCode").should("eq", 200);
});

Then("I submit the form with invalid data", () => {
  cy.intercept("POST", "**/pim/employees").as("createEmployee");
  cy.get("form", { timeout: 5000 }).submit();
  cy.wait("@createEmployee").its("response.statusCode").should("eq", 400);
});

Then("I search for an employee", () => {
  cy.visit("/pim/viewEmployeeList");

  cy.intercept("GET", "**/pim/employees*").as("searchEmployee");

  cy.get("@employeeId").then((employeeId) => {
    cy.get(".oxd-input-group")
      .contains("label", /Employee Id/i)
      .parents(".oxd-input-group")
      .find("input")
      .clear()
      .type(employeeId);

    cy.get("form").submit();

    cy.wait("@searchEmployee").its("response.statusCode").should("eq", 200);
  });
});

Then("I should see the employee in the employee table", () => {
  cy.get("@employeeId").then((employeeId) => {
    cy.get(`[role="table"]`).contains(employeeId).should("exist");
  });
});

Then(
  "I fill first name, middle name and last name the fields in the employee form with invalid data",
  () => {
    const firstName = faker.string.symbol({ min: 10, max: 15 });
    const middleName = faker.string.numeric(15);
    const lastName = faker.string.hexadecimal({ length: 10 });

    const employeeId = faker.number.int(10000000, 99999999);

    cy.wrap(employeeId).as("employeeId");

    cy.fillAddEmployeeForm({ firstName, middleName, lastName, employeeId });
  }
);

Then("I should see validation error messages", () => {
  cy.get(".oxd-input-field-error-message").should("have.length", 3);
});

Then("I click on the delete button on first employee", () => {
  cy.get(`[role="table"] [role="row"]`).find(".bi-trash").first().click();
});

Then("I should see a confirmation dialog", () => {
  cy.get(".oxd-dialog-sheet")
    .as("deleteDialog")
    .contains(
      /The selected record will be permanently deleted. Are you sure you want to continue?/i
    )
    .should("exist");
});

Then("I click on the confirm button", () => {
  cy.intercept("DELETE", "**/pim/employees*").as("deleteEmployee");

  cy.get("@deleteDialog")
    .get("button")
    .contains(/delete/i)
    .click();

  cy.wait("@deleteEmployee").its("response.statusCode").should("eq", 200);
});

Then("I should see a successfully deleted message", () => {
  cy.get(".oxd-toast-content-text")
    .should("exist")
    .contains(/successfully deleted/i);
});
