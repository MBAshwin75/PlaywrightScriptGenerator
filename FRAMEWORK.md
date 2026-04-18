# Page Object Model (POM) Framework

## Overview

This testing framework follows the **Page Object Model** design pattern for Playwright tests.

## Architecture

- `pages/BasePage.ts` - Base class with common methods
- `pages/*.ts` - Page object classes extending BasePage
- `features/*.feature` - Gherkin feature files
- `*.spec.ts` - Test specifications

## BasePage Methods

### Navigation
- `navigateTo(url)` - Navigate to URL
- `getCurrentUrl()` - Get current URL
- `reloadPage()` - Reload page
- `goBack()/goForward()` - Browser history

### Element Interaction
- `clickElement(selector)` - Click element
- `fillText(selector, value)` - Fill input
- `selectOption(selector, value)` - Select dropdown
- `doubleClickElement(selector)` - Double-click
- `pressKey(key)` - Press key

### Element Queries
- `getElement(selector)` - Get locator
- `getElementText(selector)` - Get text
- `isElementVisible(selector)` - Check visibility
- `isElementPresent(selector)` - Check existence
- `waitForElement(selector)` - Wait for element

### Utilities
- `wait(ms)` - Wait time
- `scrollToElement(selector)` - Scroll to element
- `scrollToTop()/scrollToBottom()` - Scroll page
- `takeScreenshot(name)` - Take screenshot

## Best Practices

1. All page objects should extend BasePage
2. Keep selectors as private class properties
3. Use descriptive method names
4. Return `this` for method chaining
5. Reuse inherited methods from BasePage
6. Keep test logic in test files, not pages
