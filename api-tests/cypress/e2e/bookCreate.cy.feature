Feature: Book Creation

  Scenario: Regular user can successfully create a book
    Given I am authenticated as "user" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title 1 | author 1 |
    Then the response status code should be 201
    And the response body should contain "title" with value "title 1"
    And the response body should contain "author" with value "author 1"

  Scenario: Regular user can successfully create a book with optional id field
    Given I am authenticated as "user" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | id   | title   | author   |
      | 1000 | title 2 | author 2 |
    Then the response status code should be 201
    And the response body should contain "id" with value "1000"
    And the response body should contain "title" with value "title 2"
    And the response body should contain "author" with value "author 2"