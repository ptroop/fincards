import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import cardsData from '../src/data/cards.json' with { type: 'json' };
import {
  oxaneAptitudeCards,
  oxaneAptitudeSubcategories,
} from '../src/data/oxaneAptitudeCards.js';

const normalizeQuestion = (question) => String(question).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const legacyAptitude = cardsData.filter((card) => card.category === 'Aptitude');
const legacyShortcuts = legacyAptitude.filter((card) => card.subcategory === 'Shortcuts' || card.card_type === 'shortcut');
const newQuestions = oxaneAptitudeCards.map((card) => normalizeQuestion(card.question));
const newIds = oxaneAptitudeCards.map((card) => card.id);
const requiredFields = ['id', 'category', 'subcategory', 'difficulty', 'card_type', 'question', 'answer', 'explanation', 'source'];

assert.ok(oxaneAptitudeCards.length >= 190, `Expected at least 190 new Oxane Aptitude cards, got ${oxaneAptitudeCards.length}`);
assert.equal(new Set(newIds).size, newIds.length, 'Oxane Aptitude IDs must be unique');
assert.equal(new Set(newQuestions).size, newQuestions.length, 'Oxane Aptitude questions must be unique after normalization');
assert.equal(legacyShortcuts.length, 20, `Expected to preserve 20 legacy Shortcut cards, got ${legacyShortcuts.length}`);
assert.equal(
  oxaneAptitudeCards.filter((card) => card.subcategory === 'Shortcuts' && card.card_type === 'shortcut').length,
  10,
  'Expected ten new shortcut cards',
);

for (const card of oxaneAptitudeCards) {
  for (const field of requiredFields) {
    assert.ok(card[field], `${card.id} is missing required field ${field}`);
  }
  assert.equal(card.category, 'Aptitude', `${card.id} must belong to Aptitude`);
  assert.ok(card.tags?.includes('Oxane Partners'), `${card.id} must retain Oxane provenance tag`);
}

for (const subcategory of oxaneAptitudeSubcategories) {
  const count = subcategory === 'Shortcuts'
    ? legacyShortcuts.length + oxaneAptitudeCards.filter((card) => card.subcategory === subcategory).length
    : oxaneAptitudeCards.filter((card) => card.subcategory === subcategory).length;
  assert.ok(count >= 20, `${subcategory} must contain at least 20 cards, got ${count}`);
  assert.ok(count <= 30, `${subcategory} must contain at most 30 cards, got ${count}`);
}

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
assert.match(appSource, /oxaneAptitudeCards/);
assert.match(appSource, /isPreservedAptitudeShortcut/);
assert.match(appSource, /oxaneAptitudeSubcategories/);
assert.match(appSource, /liveCards\.filter\(c => c\.id && c\.question\)/);

console.log(`Oxane Aptitude checks passed: ${oxaneAptitudeCards.length} new cards, ${legacyShortcuts.length} legacy shortcuts preserved, ${oxaneAptitudeSubcategories.length} subcategories.`);
