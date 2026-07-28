import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { interviewReadyCards } from '../src/data/interviewReadyCards.js';
import {
  getTMinusOneDayDeck,
  tMinusOneDayCards,
  tMinusOneDayTopics,
} from '../src/data/tMinusOneDayCards.js';

const normalize = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const freshQuestions = tMinusOneDayCards.map((card) => normalize(card.question));
const deck = getTMinusOneDayDeck(interviewReadyCards);

assert.equal(tMinusOneDayTopics.length, 31, 'T - 1 Day should include the 30 requested topics plus behavioral/company preparation');
assert.ok(tMinusOneDayCards.length >= 85, `Expected at least 85 fresh T - 1 Day cards, got ${tMinusOneDayCards.length}`);
assert.equal(new Set(freshQuestions).size, freshQuestions.length, 'Fresh T - 1 Day questions must be unique');
assert.equal(new Set(deck.map((card) => card.id)).size, deck.length, 'Merged T - 1 Day IDs must be unique');
assert.equal(new Set(deck.map((card) => normalize(card.question))).size, deck.length, 'Merged T - 1 Day questions must be unique');
assert.ok(deck.some((card) => card.tMinusOneDayRelated), 'T - 1 Day must include related existing Interview Ready cards');

for (const [topic] of tMinusOneDayTopics) {
  const topicCards = tMinusOneDayCards.filter((card) => card.tMinusOneDayTopic === topic);
  assert.ok(topicCards.length >= 1, `${topic} needs at least one study card`);
}

for (const card of tMinusOneDayCards) {
  for (const field of ['id', 'category', 'subcategory', 'tMinusOneDayTopic', 'difficulty', 'card_type', 'question', 'answer', 'explanation', 'source']) {
    assert.ok(card[field], `${card.id} is missing ${field}`);
  }
  assert.equal(card.category, 'Interview Ready');
  assert.equal(card.subcategory, 'T - 1 Day');
  assert.ok(card.explanation.length >= 40, `${card.id} needs an explanation`);
}

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const interviewViewSource = await readFile(new URL('../src/components/InterviewReadyView.jsx', import.meta.url), 'utf8');
const tMinusViewSource = await readFile(new URL('../src/components/TMinusOneDayView.jsx', import.meta.url), 'utf8');
assert.match(appSource, /TMinusOneDayView/);
assert.match(appSource, /setActiveCategory\('T - 1 Day'\)/);
assert.match(interviewViewSource, /T - 1 Day/);
assert.match(tMinusViewSource, /Questions/);
assert.match(tMinusViewSource, /Topics/);
assert.match(tMinusViewSource, /Formulae/);
assert.match(tMinusViewSource, /linear-gradient/);

console.log(`T - 1 Day checks passed: ${tMinusOneDayCards.length} fresh cards, ${deck.length} merged cards, ${tMinusOneDayTopics.length} topics.`);
