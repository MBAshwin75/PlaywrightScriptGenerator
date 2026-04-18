Feature: Test Scenario

  Scenario: Test Scenario
    Given I navigate to "https://ecommerce-playground.lambdatest.io"
    When I click on "Shop by Category"
    And I click on "Cameras"
    And I click on "canon EOS 5d"
    Then I should see the product details for "canon EOS 5d"
