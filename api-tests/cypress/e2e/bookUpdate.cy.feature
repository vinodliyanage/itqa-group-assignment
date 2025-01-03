Feature: Update Book API - Validate Response Codes and Data

  Scenario: Fail when updating a book with an unexpected parameter
    Given I have a book with ID 1
    When I send a PUT request to update the book with an unexpected parameter
    Then the response status should be 400
    And the response body should contain "Invalid parameters"

  Scenario: Fail when updating a book with invalid title and author types
    Given I attempt to update a book with invalid title and author types
    When I send an update request with invalid data types
    Then the response status for invalid update should be 400
    And the response body should contain an error message "Invalid data type"
 
  Scenario: Update only the author field without changing the title
    Given I have a valid book with ID 1
    When I update only the author field
    Then the response status for update should be 200
    And the response should return the updated author