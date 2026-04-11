# PW Script Generator – BDD + POM Playwright TypeScript Framework

Enterprise-grade **BDD + Page Object Model** Playwright automation framework for **[LambdaTest eCommerce Playground](https://ecommerce-playground.lambdatest.io/)**, designed as the foundation for AI-agent-driven test generation from CSV manual test cases.

---

## Framework Overview

| Aspect | Detail |
|---|---|
| Language | TypeScript |
| Test Framework | Playwright Test + playwright-bdd |
| BDD Syntax | Gherkin (Given / When / Then) |
| Design Pattern | BDD + Page Object Model (POM) |
| Reporting | Allure + Playwright HTML |
| CI/CD | GitHub Actions |
| AUT | LambdaTest eCommerce Playground (OpenCart) |

### Architecture

```
Feature Files (Gherkin)  →  Step Definitions  →  Page Objects (POM)  →  Playwright API
     features/                  steps/                pages/
```

- **Feature files** express behaviour in business-readable Gherkin
- **Step definitions** map Gherkin steps to page object calls – no locator logic
- **Page objects** encapsulate all locators and interactions
- **BasePage** provides shared smart-wait, logging, and action methods

### Key Capabilities

- **BDD with Gherkin** – human-readable scenarios using Given/When/Then
- **Strict Page Object Model** – one class per page, shared logic in `BasePage`
- **Resilient Locators** – prioritises `getByRole`, `getByLabel`, `getByText`; CSS isolated
- **Smart Waits Only** – no `waitForTimeout()`; uses visibility, enabled-state, and URL checks
- **Structured Logging** – every action logged with timestamp, correlation ID, and result
- **Allure Integration** – steps, attachments, tags, environment info, failure categories
- **Self-Healing Extension Points** – MCP fallback stub, retry classification, locator healing interfaces
- **Data-Driven Scenarios** – Scenario Outline + Examples, JSON test data, dynamic generators
- **CI-Ready** – GitHub Actions workflow with bddgen, artifact upload, and Allure reporting
- **AI Agent Ready** – designed for future CSV-to-feature/step generation

---

## Folder Structure

```
project-root/
├── .github/workflows/playwright.yml    # CI pipeline
├── config/
│   ├── env/qa.env                      # QA environment config
│   ├── env/staging.env                 # Staging environment config
│   ├── framework.config.ts             # Central framework settings
│   └── allure.categories.json          # Allure failure categories
├── features/                           # Gherkin feature files
│   ├── auth/
│   │   ├── registration.feature        # Registration scenarios
│   │   └── login.feature               # Login scenarios
│   ├── account/                        # Account module features
│   └── catalog/                        # Catalog module features
├── steps/                              # BDD step definitions
│   ├── auth/
│   │   ├── registration.steps.ts       # Registration steps → POM
│   │   └── login.steps.ts              # Login steps → POM
│   └── hooks.ts                        # BDD hooks (AfterScenario, etc.)
├── pages/                              # Page Object Model classes
│   ├── base/BasePage.ts                # Shared page methods
│   ├── auth/RegistrationPage.ts        # Registration POM
│   ├── auth/LoginPage.ts               # Login POM
│   ├── account/                        # Account page objects
│   └── catalog/                        # Catalog page objects
├── data/
│   ├── auth/registration.data.json     # Registration test data
│   ├── account/                        # Account module data
│   └── catalog/                        # Catalog module data
├── tests/                              # Legacy spec tests (optional)
│   ├── auth/registration.spec.ts       # Non-BDD registration tests
│   ├── account/
│   └── catalog/
├── utils/
│   ├── logger/Logger.ts                # Structured logger
│   ├── helpers/dataHelper.ts           # Data loading & generation
│   ├── helpers/waitHelper.ts           # Smart wait utilities
│   ├── helpers/locatorHelper.ts        # Locator resolution & candidates
│   ├── helpers/allureHelper.ts         # Allure report helpers
│   ├── helpers/retryHelper.ts          # Retry classification
│   ├── validations/assertionHelper.ts  # Assertion wrappers
│   ├── constants/tags.ts               # Module/Priority/Feature tags
│   └── mcp/mcpFallback.ts             # Self-healing extension point
├── fixtures/testFixtures.ts            # BDD-compatible custom fixtures
├── .features-gen/                      # Auto-generated (git-ignored)
├── playwright.config.ts                # Playwright + BDD configuration
├── package.json
├── tsconfig.json
└── .env.example
```

---

## Setup

### Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd PWScriptGenerator

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps chromium
```

### Environment Configuration

Environment configs are stored in `config/env/`. The active environment is controlled by the `TEST_ENV` variable (defaults to `qa`).

```bash
# Use staging environment
TEST_ENV=staging npm test
```

---

## Running Tests

```bash
# Run all BDD tests (generates specs from features, then runs)
npm test

# Run in headed mode
npm run test:headed

# Run in debug mode (Playwright Inspector)
npm run test:debug

# Run with Playwright UI
npm run test:ui

# Generate BDD specs only (no run)
npm run bddgen

# Run by Gherkin tag
npx bddgen && npx playwright test --grep "@smoke"
npx bddgen && npx playwright test --grep "@p0-critical"
npx bddgen && npx playwright test --grep "@auth"
```

---

## BDD Workflow

### 1. Write a Feature (Gherkin)

```gherkin
@auth @registration
Feature: User Registration

  @p0-critical @smoke
  Scenario: Successful registration
    Given I am on the registration page
    When I enter first name "John"
    And I enter last name "Doe"
    And I enter a unique email address
    And I enter a random phone number
    And I enter password "SecureP@ss123"
    And I confirm password "SecureP@ss123"
    And I agree to the privacy policy
    And I submit the registration form
    Then I should see the registration success page
```

### 2. Implement Steps (delegating to POM)

```typescript
Given('I am on the registration page', async ({ registrationPage }) => {
  await registrationPage.navigateToRegistration();
});

When('I enter first name {string}', async ({ registrationPage }, name: string) => {
  await registrationPage.enterFirstName(name);
});
```

### 3. Page Object (POM) handles locators and interactions

```typescript
class RegistrationPage extends BasePage {
  get firstNameInput() { return this.page.locator('#input-firstname'); }

  async enterFirstName(name: string) {
    await this.validateAndFill(this.firstNameInput, name, 'enterFirstName');
  }
}
```

---

## Reporting

### Playwright HTML Report

```bash
npm run report:html
```

### Allure Report

```bash
npm run report:allure
npm run report:allure:open
```

---

## Conventions

### Feature Files

- One `.feature` file per functional area in `features/<module>/`
- Tag with `@module`, `@priority`, and `@feature` at Feature or Scenario level
- Use `Background` for shared Given steps
- Use `Scenario Outline` + `Examples` for data-driven tests

### Step Definitions

- One step file per feature in `steps/<module>/`
- Import `Given`, `When`, `Then` from `fixtures/testFixtures.ts`
- Steps only call page object methods – no raw locators
- Shared hooks in `steps/hooks.ts`

### Page Objects

- One class per page, extending `BasePage`
- All locators defined as getters inside the page class
- All interactions use `BasePage` methods (logging + smart waits)

### Tagging

| Category | Examples | Used in |
|---|---|---|
| Module | `@auth`, `@account`, `@catalog` | Feature-level |
| Priority | `@p0-critical`, `@p1-high`, `@p2-medium` | Scenario-level |
| Feature | `@registration`, `@login`, `@smoke` | Scenario-level |

Filter with `--grep`: `npx bddgen && npx playwright test --grep "@smoke"`

---

## AI Agent Extension Path

This framework is designed as the base for a future AI agent that:

1. **Reads CSV manual test cases** and generates `.feature` files + step definitions
2. **Self-heals broken locators** via the MCP fallback system
3. **Classifies failures** as flaky vs. actual defects

### Extension Points

| File | Purpose |
|---|---|
| `utils/mcp/mcpFallback.ts` | DOM scan + locator regeneration stub |
| `utils/helpers/locatorHelper.ts` | Locator candidate resolution with confidence scoring |
| `utils/helpers/retryHelper.ts` | Failure classification interfaces (flaky, env, defect) |
| `utils/constants/tags.ts` | Reusable tag constants for generated features |
| `fixtures/testFixtures.ts` | BDD fixtures + createBdd for AI-generated steps |

---

## CI/CD

GitHub Actions workflow runs on push to `main`/`develop` and on PRs. It:

1. Installs dependencies and Playwright browsers
2. Runs `bddgen` to generate test specs from feature files
3. Runs all tests with `CI=true`
4. Uploads test results, Allure results, and HTML report as artifacts
5. Generates Allure report

---

## License

Private – Internal use only.
