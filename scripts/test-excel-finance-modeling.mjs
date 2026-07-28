import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import cardsData from '../src/data/cards.json' with { type: 'json' };
import { excelFinanceModelingCards } from '../src/data/excelFinanceModelingCards.js';
import { aptitudeShortcutOverrides } from '../src/data/aptitudeShortcutOverrides.js';

const normalize = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const legacyModelCards = cardsData.filter((card) => card.category === 'Excel & Financial Modeling');
const modelQuestions = excelFinanceModelingCards.map((card) => normalize(card.question));
const modelIds = excelFinanceModelingCards.map((card) => card.id);

assert.equal(legacyModelCards.length, 60, `Expected 60 legacy modeling cards, got ${legacyModelCards.length}`);
assert.ok(excelFinanceModelingCards.length >= 65, `Expected a complete replacement deck, got ${excelFinanceModelingCards.length}`);
assert.equal(new Set(modelIds).size, modelIds.length, 'Modeling card IDs must be unique');
assert.equal(new Set(modelQuestions).size, modelQuestions.length, 'Modeling questions must be unique after normalization');
assert.equal(excelFinanceModelingCards.filter((card) => card.answer.includes('crucial Excel function')).length, 0, 'Generated template answers must be removed');
assert.equal(
  legacyModelCards.filter((card) => !modelIds.includes(card.id)).length,
  0,
  'Every legacy modeling ID must be preserved for progress continuity',
);

for (const card of excelFinanceModelingCards) {
  for (const field of ['id', 'category', 'difficulty', 'card_type', 'question', 'answer', 'explanation', 'source']) {
    assert.ok(card[field], `${card.id} is missing ${field}`);
  }
  assert.equal(card.category, 'Excel & Financial Modeling');
  assert.ok(card.explanation.length >= 80, `${card.id} needs an interview-standard explanation`);
  assert.ok(card.real_world_example, `${card.id} needs a practical example`);
}

assert.equal(Object.keys(aptitudeShortcutOverrides).length, 20, 'All legacy shortcuts need reviewed overrides');
for (const [id, override] of Object.entries(aptitudeShortcutOverrides)) {
  assert.ok(override.question && override.answer && override.explanation, `${id} override is incomplete`);
  assert.equal(override.explanation.includes('**'), false, `${id} still contains Markdown emphasis markers`);
  assert.match(override.explanation, /Examples?:/, `${id} needs a worked example`);
}

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
assert.match(appSource, /excelFinanceModelingCards/);
assert.match(appSource, /card\.category !== 'Excel & Financial Modeling'/);
assert.match(appSource, /aptitudeShortcutOverrides/);

console.log(`Excel and Finance Modeling checks passed: ${excelFinanceModelingCards.length} replacement cards, ${Object.keys(aptitudeShortcutOverrides).length} shortcut overrides.`);
