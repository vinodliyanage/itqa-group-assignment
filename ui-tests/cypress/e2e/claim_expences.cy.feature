Feature: Reset Event Form
  As a user
  I want to reset the Event form
  So that I can clear the "Event Name" and "Status" fields


Scenario: User resets the Event form
  Given I am on the Events page
  When I fill in the Event form with valid data
  And I click the Reset button
  Then the "Event Name" field should be cleared
  And the "Status" field should be cleared
