Feature: Add Employee
    As a user
    I want to add an employee
    So that I can manage the employee

    Scenario: Add Employee
        Given I am on the PIM page
        When I click on the add employee button
        Then I should see the add employee form
        And I fill all the fields in the employee form with valid data
        And I submit the form with valid data
        Then I search for an employee
        And I should see the employee in the employee table

    Scenario: Add Employee with invalid first name, middle name, and last name
        Given I am on the PIM page
        When I click on the add employee button
        Then I should see the add employee form
        And I fill first name, middle name and last name the fields in the employee form with invalid data
        And I submit the form with invalid data
        Then I should see validation error messages

    Scenario: Delete Employee
        Given I am on the PIM page
        When I click on the delete button on first employee
        Then I should see a confirmation dialog
        And I click on the confirm button
        Then I should see a successfully deleted message