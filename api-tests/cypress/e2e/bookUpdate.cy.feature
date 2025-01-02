Feature: Update Book API - Validate Response Codes and Data

  Scenario: Fail when updating a book with an unexpected parameter
    Given I have a book with ID 1
    When I send a PUT request to update the book with an unexpected parameter
    Then the response status should be 400
    And the response body should contain "Invalid parameters"

  Scenario: Fail when updating a book with an invalid ID
    Given the book with ID 999 does not exist
    When I send a PUT request with valid data
    Then the response status should be 404
    And the response body should contain "Book not found"


 





















