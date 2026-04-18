Feature: user clicks button

  Scenario: user clicks button
    Given user clicks button
    When page loads
    Then success message shows
