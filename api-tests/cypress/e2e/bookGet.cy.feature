Feature: Get Book by ID API Testing

  Scenario: Successfully get Book by ID as Admin
    Given the Book API endpoint is "/api/books"
    And I am logged in as Admin
    When I send a GET request with book ID "1"
    Then I verify the response status is 200 or log the error code
    And the response body should contain "id" with a value that is a number 
    And the response body should contain "title" with value that is a string 
    And the response body should contain "author" with value that is a string 


  Scenario: Successfully get Book by ID as User
    Given the Book API endpoint is "/api/books"
    And I am logged in as User
    When I send a GET request with book ID "2"
    Then I verify the response status is 200 or log the error code
    And the response body should contain "id" with a value that is a number 
    And the response body should contain "title" with value that is a string 
    And the response body should contain "author" with value that is a string 

