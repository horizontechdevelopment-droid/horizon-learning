import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createSessionToken,
  hashPassword,
  hashSessionToken,
  normalizeEmail,
  validatePassword,
  verifyPassword,
} from '../src/security.js';

test('normalizes email addresses', () => {
  assert.equal(normalizeEmail('  Learner@Example.COM '), 'learner@example.com');
});

test('requires passwords between 12 and 128 characters', () => {
  assert.equal(validatePassword('short'), false);
  assert.equal(validatePassword('correct horse'), true);
  assert.equal(validatePassword('x'.repeat(129)), false);
});

test('password hashes are salted and verify correctly', async () => {
  const first = await hashPassword('correct horse battery staple');
  const second = await hashPassword('correct horse battery staple');
  assert.notEqual(first, second);
  assert.equal(await verifyPassword('correct horse battery staple', first), true);
  assert.equal(await verifyPassword('wrong password', first), false);
});

test('session tokens are random and only hashes need persistence', async () => {
  const first = createSessionToken();
  const second = createSessionToken();
  assert.notEqual(first, second);
  assert.ok(first.length >= 40);
  assert.notEqual(await hashSessionToken(first), first);
  assert.notEqual(await hashSessionToken(first), await hashSessionToken(second));
});
