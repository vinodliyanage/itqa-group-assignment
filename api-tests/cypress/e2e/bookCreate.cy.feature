Feature: Book Creation

  # Scenario 1: Successfully create a book with valid title and author
  Scenario: Successfully create a book with valid title and author
    Given I make a POST request to "/api/books" with the following body:
      | title      | author    |
      | Book Title | Author A  |
    Then the response status code should be 201
    And the response body should contain "id" with a value that is a number
    And the response body should contain "title" with value "Book Title"
    And the response body should contain "author" with value "Author A"

  # Scenario 2: Fail to create a book with missing title
  Scenario: Fail to create a book with missing title
    Given I make a POST request to "/api/books" with the following body:
      | author    |
      | Author B  |
    Then the response status code should be 400
    And the response body should contain an error message

  # Scenario 3: Fail to create a book with missing author
  Scenario: Fail to create a book with missing author
    Given I make a POST request to "/api/books" with the following body:
      | title     |
      | Book Title|
    Then the response status code should be 400
    And the response body should contain an error message

  