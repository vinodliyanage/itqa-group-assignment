Feature: Reset Project form
  As a user
  I want to reset the Project Form Customer Name
  So that I can clear the "Customer Name"

Scenario: User resets the Project form
  Given I am on the Project page
  When I fill in the Project name with valid data
  And I click the View button to display the project details