@auth @login
Feature: User Login
  As a returning customer
  I want to log into my account
  So that I can access my orders and profile

  Background:
    Given I am on the login page

  @p0-critical @smoke
  Scenario: Login page displays returning customer form
    Then the email input should be visible
    And the password input should be visible
    And the login button should be visible
    And the forgotten password link should be visible

  @p1-high @negative
  Scenario: Login fails with invalid credentials
    When I enter login email "invalid@nonexistent.com"
    And I enter login password "WrongPassword123"
    And I click the login button
    Then I should see a login error message

  @p2-medium @navigation
  Scenario: Navigate to registration from login page
    When I click continue to register
    Then I should be on the registration page
