Feature: Purge Employee Functional Tests

  Scenario: Verify Admin Access to Purge Employee Section
    Given I am logged in as an admin
    When I navigate to the "Maintenance" section
    And I enter the admin password "admin123"
    Then I should see the "Purge Employee Records" page

  Scenario: Verify Purge Employee Form Validation
    Given I am logged in as an admin
    When I navigate to the "Maintenance" section
    And I enter the admin password "admin123"
    And I click on the "Search" button without entering any details
    Then I should see an error message for the "Required" field


  



