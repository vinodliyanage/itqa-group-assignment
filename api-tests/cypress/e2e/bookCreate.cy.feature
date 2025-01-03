Feature: Book Creation

  Scenario: User can not create a book with missing title
    Given I am authenticated as "user" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | author|
      | test author    |
    Then the response status code should be 400
    And the response body should contain an error message "Invalid | Empty Input Parameters in the Request"

  Scenario: Admin can not create a book with a duplicate title and author 
    Given I am authenticated as "admin" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title a | author a |
    Then the response status code should be 201
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title a | author a |
    Then the response body should contain an error message "Book Already Exists"

  Scenario: User can not create a book with a duplicate title and author 
    Given I am authenticated as "user" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title b | author b |
    Then the response status code should be 201
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title b | author b |
    Then the response body should contain an error message "Book Already Exists"