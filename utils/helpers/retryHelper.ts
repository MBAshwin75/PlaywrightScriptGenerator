/**
 * Retry classification helper.
 * Designed as an extension point for future AI-based retry intelligence.
 */

/** Classification of a test execution issue */
export type IssueClassification = 'flaky' | 'environment' | 'product_defect' | 'unknown';

/** Result of a retry classification analysis */
export interface RetryClassification {
  classification: IssueClassification;
  confidence: number;
  reason: string;
  suggestRetry: boolean;
}

/** Describes an execution issue for classification */
export interface ExecutionIssue {
  errorMessage: string;
  errorStack?: string;
  testTitle: string;
  attempt: number;
  duration: number;
}

/** Result from a self-healing attempt */
export interface HealingResult {
  healed: boolean;
  originalLocator: string;
  newLocator?: string;
  strategy?: string;
  confidence: number;
  reason: string;
}

/**
 * Classify a test failure to determine whether it should be retried.
 *
 * Current implementation uses simple heuristics.
 * Future AI agent can replace this with ML-based classification.
 */
export function classifyFailure(issue: ExecutionIssue): RetryClassification {
  const msg = issue.errorMessage.toLowerCase();

  // Timeout-related failures are likely environment/flaky
  if (msg.includes('timeout') || msg.includes('timed out')) {
    return {
      classification: 'flaky',
      confidence: 0.7,
      reason: 'Timeout error – likely infrastructure or timing issue',
      suggestRetry: true,
    };
  }

  // Navigation failures
  if (msg.includes('net::err') || msg.includes('navigation')) {
    return {
      classification: 'environment',
      confidence: 0.8,
      reason: 'Network or navigation error – likely environment issue',
      suggestRetry: true,
    };
  }

  // Assertion failures are likely real defects
  if (msg.includes('expect') || msg.includes('assertion') || msg.includes('toequal')) {
    return {
      classification: 'product_defect',
      confidence: 0.6,
      reason: 'Assertion failure – likely a product defect',
      suggestRetry: false,
    };
  }

  // Locator not found – could be flaky or a real issue
  if (msg.includes('locator') || msg.includes('not found') || msg.includes('no element')) {
    return {
      classification: 'flaky',
      confidence: 0.5,
      reason: 'Locator resolution failure – may be flaky or stale locator',
      suggestRetry: true,
    };
  }

  return {
    classification: 'unknown',
    confidence: 0.3,
    reason: 'Unclassified failure – manual review recommended',
    suggestRetry: issue.attempt < 2,
  };
}
