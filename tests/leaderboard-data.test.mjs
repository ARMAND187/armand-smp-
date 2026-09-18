import test from 'node:test';
import assert from 'node:assert/strict';
import { isLeaderboardData, LEADERBOARD_CATEGORIES } from '../lib/leaderboard-data.ts';

const snapshot = () => ({
  ...Object.fromEntries(LEADERBOARD_CATEGORIES.map(category => [category, [
    { rank: 1, name: '.Bedrock_Player', value: '20h 11m' },
    { rank: 2, name: '---', value: '---\n' },
  ]])),
  server: { online: 0, max: 20 },
});

test('accepts zero-player snapshots, Bedrock names, formatted scores and legacy whitespace', () => {
  assert.equal(isLeaderboardData(snapshot()), true);
});

test('rejects malformed payloads before they can reach player rendering', () => {
  for (const value of [null, [], {}, { server: null }]) assert.equal(isLeaderboardData(value), false);
  for (const change of [
    data => { data.money = {}; },
    data => { data.money[0].value = 12; },
    data => { data.money[0].name = '<script>'.repeat(20); },
    data => { data.money[0].value = 'a'.repeat(65); },
    data => { data.money[0].name = '   '; },
    data => { data.money[0].rank = 1.5; },
    data => { data.money[1].rank = 1; },
    data => { data.money = Array.from({ length: 11 }, (_, i) => ({ rank: i + 1, name: 'Player', value: '1' })); },
    data => { delete data.playtime; },
    data => { data.server.online = 21; },
    data => { data.server.max = '20'; },
    data => { data.server.online = -1; },
  ]) {
    const data = snapshot();
    change(data);
    assert.equal(isLeaderboardData(data), false);
  }
});
