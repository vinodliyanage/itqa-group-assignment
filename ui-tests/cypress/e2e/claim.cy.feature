Feature: Delete Event

  Scenario: Delete an Event
    Given I am on the Events page
    When I click on the delete button for the first event
    Then I should see a confirmation dialog
    And I click on the confirm button
    Then I should see a successfully deleted message
