@auth @registration
Feature: User Registration
  As a new customer
  I want to register an account on the ecommerce platform
  So that I can shop and track my orders

  Background:
    Given I am on the registration page

  @p0-critical @smoke
  Scenario: Successful registration with valid details
    When I enter first name "TestUser"
    And I enter last name "Automation"
    And I enter a unique email address
    And I enter a random phone number
    And I enter password "SecureP@ss123"
    And I confirm password "SecureP@ss123"
    And I agree to the privacy policy
    And I submit the registration form
    Then I should see the registration success page
    And the success message should contain "Your Account Has Been Created"

  @p1-high @negative
  Scenario: Registration fails when submitting empty form
    When I agree to the privacy policy
    And I submit the registration form
    Then I should remain on the registration page

  @p2-medium @layout
  Scenario: Registration page displays all required fields
    Then the first name field should be visible
    And the last name field should be visible
    And the email field should be visible
    And the telephone field should be visible
    And the password field should be visible
    And the password confirm field should be visible
    And the continue button should be visible
    And the privacy policy checkbox should be present

  @p1-high @data-driven
  Scenario Outline: Registration with test data from JSON
    When I enter first name "<firstName>"
    And I enter last name "<lastName>"
    And I enter a unique email address
    And I enter telephone "<telephone>"
    And I enter password "<password>"
    And I confirm password "<password>"
    And I agree to the privacy policy
    And I submit the registration form
    Then I should see the registration success page

    Examples:
      | firstName | lastName   | telephone  | password      |
      | John      | Doe        | 5551234567 | SecureP@ss123 |
      | Jane      | Smith      | 5559876543 | MyStr0ng!Pass |
