import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import { faker } from "@faker-js/faker";

before(() => {
  const seed = Math.floor(Math.random() * 1000);
  faker.seed(seed);
});

beforeEach(() => {
  cy.login();
});

Given("I am on the buzz feed page", () => {
  cy.visit("/buzz/viewBuzz");
});

// //////////////////////////////            create new post            /////////////////////////////////

When("I enter text in the post input", () => {
  cy.wait(4000);
  const text = faker.lorem.sentence(6);
  cy.wrap(text).as("text");
  cy.get(".orangehrm-buzz-create-post-header textarea").type(text);
});

When("I click the post button", () => {
  cy.get(".oxd-buzz-post-slot button").contains("Post").click();
});

Then("I see the create post Successful notification", () => {
  cy.get(".oxd-toast-container--toast")
    .contains(/Successfully saved/i)
    .should("exist");
});

Then("I should see my post at the top of the feed", () => {
  cy.get("@text").then((text) => {
    cy.get(".oxd-grid-item", { timeout: 50000 })
      .first()
      .within(() => {
        cy.get(".orangehrm-buzz-post-body p")
          .should("be.visible")
          .and("contain", text);
      });
  });
});


// /////////////////////         Like Post           ////////////////////////////////////

Then("I save the initial like count on the first post", () => {
  cy.get(".orangehrm-buzz-stats")
    .first()
    .find(".orangehrm-buzz-stats-row p")
    .as("status")
    .invoke("text") // Extract the text content
    .then((text) => {
      const initialCount = parseInt(text.replace(" Likes", "")); // Convert to number
      cy.wrap(initialCount).as("initialLikeCount");
    });
});

When("I click the heart icon on a post", () => {
  cy.get("#heart-svg").first().as("firstPost").click();
});

Then("the heart color should change from grey to active color", () => {
  cy.get("@firstPost").should("not.have.attr", "fill", "#e2264d");
});

Then("the like count should increase by one", () => {
  cy.get("@initialLikeCount").then((initialCount) => {
    cy.wait(3000);
    cy.get(".orangehrm-buzz-stats")
      .first()
      .find(".orangehrm-buzz-stats-row p")
      .invoke("text")
      .then((updatedText) => {
        const updatedCount = parseInt(updatedText.replace(" Likes", ""));
        expect(updatedCount).to.equal(initialCount + 1);
      });
  });
});

// /////////////////////////            Delete post           ////////////////////////////////

When("I click the three dots on the first post", () => {
  cy.get(".orangehrm-buzz-post-header-config button")
    .first()
    .as("firstPostDelete")
    .click();
});

Then("I can see the drop down menu", () => {
  cy.get(".oxd-dropdown-menu").as("dropdown").should("exist");
});

When("I click the delete button on the drop down menu", () => {
  cy.get("@dropdown")
    .find(".orangehrm-buzz-post-header-config-item p")
    .contains("Delete Post")
    .click();
});

Then("I see the confirmation dialog box", () => {
  cy.get(".orangehrm-dialog-popup").as("confirmationDialog").should("exist");
});

When("I click the delete button on the confirmation dialog box", () => {
  cy.get("@confirmationDialog")
    .find(".orangehrm-modal-footer button")
    .contains(/Yes, Delete/i)
    .click();
});

Then("I see the delete confirmation notification", () => {
  cy.get(".oxd-toast-container--toast")
    .contains(/Successfully deleted/i)
    .should("exist");
});
