Feature: Books API Testing 
As a User
I want to test the Books API
So that I can Verify its functionality

  Scenario: Get all Books
    Given the Books API endpoint is "/books"
    When I send a GET request
    Then the response status should be 200
    And the response should contain a list of books
