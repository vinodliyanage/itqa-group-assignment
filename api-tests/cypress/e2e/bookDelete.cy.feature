Feature: Book Deleteion

  Scenario: Admin user can successfully delete a book
    Given I am authenticated as "admin" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title delete 1 | author delete 1 |
    Then the create response status code should be 201
    And the response body should contain "title" with value "title delete 1"
    And the response body should contain "author" with value "author delete 1"
    When I make a DELETE request to "/api/books/" with the id
    Then the delete response status code should be 200

  Scenario: check regular user can delete a book
    Given I am authenticated as "user" with password "password"
    When I make a POST request to "/api/books" with the following body:
      | title   | author   |
      | title delete 2 | author delete 2 |
    Then the create response status code should be 201
    And the response body should contain "title" with value "title delete 2"
    And the response body should contain "author" with value "author delete 2"
    When I make a DELETE request to "/api/books/" with the id
    Then the delete response status code should be 403