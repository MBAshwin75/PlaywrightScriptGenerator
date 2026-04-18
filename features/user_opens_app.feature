Feature: user opens app

  Scenario: user opens app
    Given user opens app
    When clicking login
    Then redirected to dashboard
