Feature: Buzz Newsfeed
  As a user
  I want to create a new post
  And I want to add likes to the post
  And I want to delete the post

  Scenario: Successfully create a new post 
    Given I am on the buzz feed page
    When I enter text in the post input
    When I click the post button
    Then I see the create post Successful notification
    And I should see my post at the top of the feed

  Scenario: Like a post
    Given I am on the buzz feed page
    Then I save the initial like count on the first post
    When I click the heart icon on a post
    Then the heart color should change from grey to active color
    And the like count should increase by one

  Scenario: Delete the post 
    Given I am on the buzz feed page
    When I click the three dots on the first post
    Then I can see the drop down menu
    When I click the delete button on the drop down menu
    Then I see the confirmation dialog box
    When I click the delete button on the confirmation dialog box
    Then I see the delete confirmation notification
