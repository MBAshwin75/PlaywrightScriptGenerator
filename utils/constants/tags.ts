/**
 * Tagging constants for test classification.
 * Used by tests and the future CSV-to-test AI agent for consistent metadata stamping.
 */

/** Module tags – align with major AUT functional areas */
export const Module = {
  AUTH: '@auth',
  ACCOUNT: '@account',
  CATALOG: '@catalog',
  CART: '@cart',
  CHECKOUT: '@checkout',
  SEARCH: '@search',
  NAVIGATION: '@navigation',
} as const;

/** Priority tags */
export const Priority = {
  P0: '@p0-critical',
  P1: '@p1-high',
  P2: '@p2-medium',
  P3: '@p3-low',
} as const;

/** Feature tags – granular functional area descriptors */
export const Feature = {
  REGISTRATION: '@registration',
  LOGIN: '@login',
  LOGOUT: '@logout',
  PASSWORD_RESET: '@password-reset',
  PROFILE: '@profile',
  PRODUCT_LISTING: '@product-listing',
  PRODUCT_DETAIL: '@product-detail',
  ADD_TO_CART: '@add-to-cart',
  WISHLIST: '@wishlist',
  SEARCH_RESULTS: '@search-results',
} as const;

/** Combine multiple tags into an annotation-friendly string */
export function buildTagAnnotation(...tags: string[]): string {
  return tags.join(' ');
}

export type ModuleTag = (typeof Module)[keyof typeof Module];
export type PriorityTag = (typeof Priority)[keyof typeof Priority];
export type FeatureTag = (typeof Feature)[keyof typeof Feature];
