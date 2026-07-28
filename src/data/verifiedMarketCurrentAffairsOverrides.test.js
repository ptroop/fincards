import assert from 'node:assert/strict';
import fs from 'node:fs';
import { verifiedMarketCurrentAffairsOverrides as overrides } from './verifiedMarketCurrentAffairsOverrides.js';

const cards = JSON.parse(
  fs.readFileSync(new URL('./cards.json', import.meta.url), 'utf8'),
);
const targetCategories = new Set([
  'India-Specific Context',
  'Market Awareness & Current Affairs',
  'Finance GK',
  'Current Affairs',
]);
const targetCards = cards.filter((card) => targetCategories.has(card.category));
const targetIds = new Set(targetCards.map((card) => card.id));
const overrideIds = Object.keys(overrides);

assert.equal(targetCards.length, 351, 'The source deck target-card count changed; re-audit the override set.');
assert.equal(targetIds.size, targetCards.length, 'Target categories contain duplicate card IDs.');
assert.equal(overrideIds.length, targetCards.length, 'Every target card must have exactly one verified override.');

for (const id of targetIds) {
  assert.ok(overrides[id], `Missing verified override for ${id}`);
}
for (const id of overrideIds) {
  assert.ok(targetIds.has(id), `Override ${id} no longer belongs to a target category`);
}

const questions = new Set();
for (const [id, card] of Object.entries(overrides)) {
  assert.match(card.question, /[?.]$/, `${id}: question needs closing punctuation`);
  assert.ok(card.question.length >= 20, `${id}: question is too short to be meaningful`);
  assert.ok(card.answer.length >= 170, `${id}: answer is not detailed enough`);
  assert.equal(card.verified, true, `${id}: missing verified flag`);
  assert.match(card.source_link, /^https:\/\//, `${id}: missing auditable HTTPS source`);
  assert.ok(!questions.has(card.question), `${id}: duplicate question text`);
  questions.add(card.question);
  assert.doesNotMatch(
    `${card.question} ${card.answer}`,
    /\b(?:placeholder|lorem ipsum|balanced coverage|based on latest estimates)\b/i,
    `${id}: learner-facing placeholder language remains`,
  );
}

assert.match(overrides.ca_deal_003.answer, /Tata Sons/i, 'Air India–Vistara ownership correction regressed.');
assert.match(overrides.ca_deal_003.answer, /not Tata Motors/i, 'Incorrect Tata Motors attribution returned.');
assert.match(overrides.ca_b_006.answer, /27 March 2025/, 'Ayana completion date correction regressed.');
assert.match(overrides.gk_rbi_001.answer, /operating floor/i, 'SDF corridor explanation regressed.');
assert.match(overrides.ca_a_013.answer, /2022–23 base-year/i, 'New GDP base-year label is missing.');

const categoryCounts = Object.fromEntries(
  [...targetCategories].map((category) => [
    category,
    targetCards.filter((card) => card.category === category).length,
  ]),
);

console.log(`Verified ${overrideIds.length} factual-awareness rewrites.`);
console.log(categoryCounts);
