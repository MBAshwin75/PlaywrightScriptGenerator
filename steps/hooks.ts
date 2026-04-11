import { AfterScenario } from '../fixtures/testFixtures';
import { AllureHelper } from '../utils/helpers/allureHelper';

/**
 * BDD hooks – run before/after scenarios.
 * Attached to the custom test instance via createBdd fixtures.
 */

/** After every scenario: attach structured logs to Allure */
AfterScenario(async ({ logger, $testInfo }) => {
  await AllureHelper.attachLogs($testInfo, logger);
});
