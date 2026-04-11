import type { Locator, Page } from '@playwright/test';

/** Describes a single locator candidate with its strategy and confidence */
export interface LocatorCandidate {
  /** Human-readable description */
  description: string;
  /** Resolution strategy used */
  strategy: 'role' | 'label' | 'text' | 'testId' | 'css' | 'xpath' | 'mcp';
  /** The Playwright Locator instance */
  locator: Locator;
  /** Confidence score 0-1 for future AI ranking */
  confidence: number;
}

/**
 * Centralized locator resolution helper.
 * Preferred order: getByRole → getByLabel → getByText → fallback CSS/XPath.
 *
 * Designed as an extension point for future MCP/DOM-scan-based
 * locator generation and self-healing workflows.
 */
export class LocatorHelper {
  constructor(private readonly page: Page) {}

  /**
   * Resolve an element using the preferred strategy cascade.
   * Returns the first match that is attached to the DOM.
   */
  async resolveLocator(candidates: LocatorCandidate[]): Promise<LocatorCandidate> {
    // Sort by confidence descending, then by preferred strategy order
    const strategyOrder: Record<string, number> = {
      role: 0,
      label: 1,
      text: 2,
      testId: 3,
      css: 4,
      xpath: 5,
      mcp: 6,
    };

    const sorted = [...candidates].sort((a, b) => {
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      return (strategyOrder[a.strategy] ?? 99) - (strategyOrder[b.strategy] ?? 99);
    });

    for (const candidate of sorted) {
      try {
        const count = await candidate.locator.count();
        if (count > 0) {
          return candidate;
        }
      } catch {
        // Continue to next candidate
      }
    }

    throw new Error(
      `No valid locator found among ${candidates.length} candidates: ${candidates.map((c) => c.description).join(', ')}`,
    );
  }

  /** Build a role-based LocatorCandidate */
  byRole(
    role: Parameters<Page['getByRole']>[0],
    options?: Parameters<Page['getByRole']>[1],
    confidence = 0.9,
  ): LocatorCandidate {
    return {
      description: `role=${String(role)}${options?.name ? ` name="${String(options.name)}"` : ''}`,
      strategy: 'role',
      locator: this.page.getByRole(role, options),
      confidence,
    };
  }

  /** Build a label-based LocatorCandidate */
  byLabel(text: string | RegExp, confidence = 0.85): LocatorCandidate {
    return {
      description: `label=${String(text)}`,
      strategy: 'label',
      locator: this.page.getByLabel(text),
      confidence,
    };
  }

  /** Build a text-based LocatorCandidate */
  byText(text: string | RegExp, options?: { exact?: boolean }, confidence = 0.7): LocatorCandidate {
    return {
      description: `text=${String(text)}`,
      strategy: 'text',
      locator: this.page.getByText(text, options),
      confidence,
    };
  }

  /** Build a CSS-based LocatorCandidate (fallback) */
  byCss(selector: string, confidence = 0.5): LocatorCandidate {
    return {
      description: `css=${selector}`,
      strategy: 'css',
      locator: this.page.locator(selector),
      confidence,
    };
  }

  /** Placeholder for future MCP/DOM-scan generated locator */
  byMcp(locator: Locator, description: string, confidence = 0.6): LocatorCandidate {
    return {
      description: `mcp: ${description}`,
      strategy: 'mcp',
      locator,
      confidence,
    };
  }
}
