import test from 'node:test';
import assert from 'node:assert/strict';
import { isServerOnline, formatLastSync, OFFLINE_AFTER_MS } from '../lib/leaderboard-status.ts';

const saved = '2026-09-14T02:29:46.114153+00:00';
const timestamp = Date.parse(saved);

test('uses saved Minecraft time, not the browser refresh time', () => {
  assert.equal(formatLastSync(saved), 'Sep 14, 2026 \u2022 05:29 AM');
  assert.equal(formatLastSync(saved, false), '05:29:46 AM');
});
test('online across normal 45-second upload intervals, offline after two missed uploads', () => {
  assert.equal(isServerOnline(saved, timestamp + 45_000), true);
  assert.equal(isServerOnline(saved, timestamp + OFFLINE_AFTER_MS - 1), true);
  assert.equal(isServerOnline(saved, timestamp + OFFLINE_AFTER_MS), false);
  assert.equal(isServerOnline(saved, timestamp + 3 * 86_400_000), false);
});
test('rejects missing, invalid and implausibly future timestamps', () => {
  for (const value of [null, '', 'invalid']) assert.equal(isServerOnline(value, timestamp), false);
  assert.equal(isServerOnline(saved, timestamp - 60_000), false);
  assert.equal(formatLastSync('invalid'), 'Not available');
});
test('returns online after a fresh upload, including a zero-player server', () => {
  const now = timestamp + 86_400_000;
  assert.equal(isServerOnline(saved, now), false);
  assert.equal(isServerOnline(new Date(now).toISOString(), now), true);
});
