Feature: Book Creation

  Scenario: Fail to create a book with missing title
    Given I am authenticated as "user" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | author|
      | test author    |
    Then the response status code should be 400
    And the response body should contain an error message "Invalid | Empty Input Parameters in the Request"

  Scenario: Fail to create a book with a duplicate title and author when authenticated as admin
    Given I am authenticated as "admin" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title 2 | author 2 |
    Then the response status code should be 201
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title 2 | author 2 |
    Then the response body should contain an error message "Book Already Exists"

  Scenario: Fail to create a book with a duplicate title and author when authenticated as user
    Given I am authenticated as "user" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title 3 | author 3 |
    Then the response status code should be 201
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title 3 | author 3 |
    Then the response body should contain an error message "Book Already Exists"