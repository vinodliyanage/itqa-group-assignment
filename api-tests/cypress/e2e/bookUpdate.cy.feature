Feature: Update Book API

  Scenario: Successfully update a book
    Given the application is running
    And a book with ID "1" exists
    When I send a PUT request to "/api/books/1" with the following data:
      | id  | title          | author           |
      | 1   | Updated Title  | Updated Author   |
    Then the response status code should be 200
    And the response body should contain "title" with value "Updated Title"
    And the response body should contain "author" with value "Updated Author"

  Scenario: Update a book with missing required fields
    Given the application is running
    And a book with ID "2" exists
    When I send a PUT request to "/api/books/2" with the following data:
      | id  | title | author           |
      | 2   |       | Updated Author   |
    Then the response status code should be 400
    And the response body should indicate invalid input



