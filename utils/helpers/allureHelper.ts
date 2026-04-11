import type { TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../logger/Logger';

/**
 * Allure helper utilities for enriching reports with metadata,
 * environment info, and custom attachments.
 */
export class AllureHelper {
  /**
   * Write allure environment.properties into the results directory.
   * Call once before report generation (e.g. in globalSetup).
   */
  static writeEnvironmentInfo(
    outputDir: string,
    info: Record<string, string>,
  ): void {
    const lines = Object.entries(info)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');
    const envFile = path.join(outputDir, 'environment.properties');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(envFile, lines, 'utf-8');
  }

  /**
   * Copy allure categories.json into the results directory
   * so Allure report can classify failures.
   */
  static copyCategoriesConfig(outputDir: string): void {
    const src = path.resolve(__dirname, '../../config/allure.categories.json');
    const dest = path.join(outputDir, 'categories.json');
    if (fs.existsSync(src)) {
      fs.mkdirSync(outputDir, { recursive: true });
      fs.copyFileSync(src, dest);
    }
  }

  /** Attach a text blob to the current Allure report via TestInfo */
  static async attachText(
    testInfo: TestInfo,
    name: string,
    content: string,
  ): Promise<void> {
    await testInfo.attach(name, { body: content, contentType: 'text/plain' });
  }

  /** Attach a JSON payload to the current Allure report via TestInfo */
  static async attachJSON(
    testInfo: TestInfo,
    name: string,
    data: unknown,
  ): Promise<void> {
    await testInfo.attach(name, {
      body: JSON.stringify(data, null, 2),
      contentType: 'application/json',
    });
  }

  /** Attach a screenshot buffer to the current Allure report via TestInfo */
  static async attachScreenshot(
    testInfo: TestInfo,
    name: string,
    screenshot: Buffer,
  ): Promise<void> {
    await testInfo.attach(name, { body: screenshot, contentType: 'image/png' });
  }

  /** Attach logger output to Allure report */
  static async attachLogs(testInfo: TestInfo, logger: Logger): Promise<void> {
    const formattedLogs = logger.getFormattedLogs();
    if (formattedLogs.length > 0) {
      await AllureHelper.attachText(testInfo, 'Test Logs', formattedLogs);
    }
  }
}
