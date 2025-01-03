Feature: Admin Section Functional Tests

  Scenario: Verify Required Fields Validation
    Given I am logged in as an admin
    When I navigate to the "Admin" section
    And I click on the "Add" button
    And I click on the "Save" button
    Then I should see error messages for required fields

