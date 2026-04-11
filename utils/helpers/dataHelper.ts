import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Loads a typed JSON data file from the data/ directory.
 * @param relativePath – path relative to the project-root data/ folder, e.g. 'auth/registration.data.json'
 */
export function loadTestData<T>(relativePath: string): T {
  const fullPath = path.resolve(__dirname, '../../data', relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Test data file not found: ${fullPath}`);
  }
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

/** Generate a unique email for test isolation */
export function generateUniqueEmail(prefix = 'testuser'): string {
  const id = uuidv4().slice(0, 8);
  return `${prefix}+${id}@test.example.com`;
}

/** Generate a random phone number (10-digit US format) */
export function generateRandomPhone(): string {
  const areaCode = Math.floor(200 + Math.random() * 800);
  const mid = Math.floor(100 + Math.random() * 900);
  const last = Math.floor(1000 + Math.random() * 9000);
  return `${areaCode}${mid}${last}`;
}

/** Generate a random alphanumeric string of given length */
export function generateRandomString(length = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join(
    '',
  );
}

/** Generate a random password meeting typical complexity requirements */
export function generateStrongPassword(length = 14): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%&*';
  const all = upper + lower + digits + special;

  // Guarantee at least one from each category
  let password =
    upper.charAt(Math.floor(Math.random() * upper.length)) +
    lower.charAt(Math.floor(Math.random() * lower.length)) +
    digits.charAt(Math.floor(Math.random() * digits.length)) +
    special.charAt(Math.floor(Math.random() * special.length));

  for (let i = password.length; i < length; i++) {
    password += all.charAt(Math.floor(Math.random() * all.length));
  }
  // Shuffle
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}
