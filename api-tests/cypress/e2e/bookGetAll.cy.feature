Feature: Books API Testing

  Scenario: Successfully get all Books by user as Admin
    Given the Books API endpoint is "/api/books"
    And I am logged in as Admin
    When I send a GET request
    Then the response status should be 200
    And the response body should contain list of books

  Scenario: Successfully get all Books by user as User
    Given the Books API endpoint is "/api/books"
    And I am logged in as User
    When I send a GET request
    Then the response status should be 200
    And the response body should contain list of books
