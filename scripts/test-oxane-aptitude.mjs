import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import cardsData from '../src/data/cards.json' with { type: 'json' };
import {
  oxaneAptitudeCards,
  oxaneAptitudeSubcategories,
} from '../src/data/oxaneAptitudeCards.js';

const normalizeQuestion = (question) => String(question).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const wordCount = (value) => String(value).trim().split(/\s+/).filter(Boolean).length;
const legacyAptitude = cardsData.filter((card) => card.category === 'Aptitude');
const legacyShortcuts = legacyAptitude.filter((card) => card.subcategory === 'Shortcuts' || card.card_type === 'shortcut');
const newQuestions = oxaneAptitudeCards.map((card) => normalizeQuestion(card.question));
const newIds = oxaneAptitudeCards.map((card) => card.id);
const requiredFields = ['id', 'category', 'subcategory', 'difficulty', 'card_type', 'question', 'answer', 'explanation', 'source'];
const cardById = (id) => {
  const found = oxaneAptitudeCards.find((card) => card.id === id);
  assert.ok(found, `Missing expected Aptitude card ${id}`);
  return found;
};

assert.ok(oxaneAptitudeCards.length >= 190, `Expected at least 190 new Oxane Aptitude cards, got ${oxaneAptitudeCards.length}`);
assert.equal(new Set(newIds).size, newIds.length, 'Oxane Aptitude IDs must be unique');
assert.equal(new Set(newQuestions).size, newQuestions.length, 'Oxane Aptitude questions must be unique after normalization');
assert.equal(legacyShortcuts.length, 20, `Expected to preserve 20 legacy Shortcut cards, got ${legacyShortcuts.length}`);
assert.equal(
  oxaneAptitudeCards.filter((card) => card.subcategory === 'Shortcuts' && card.card_type === 'shortcut').length,
  20,
  'Expected twenty new shortcut cards',
);

for (const card of oxaneAptitudeCards) {
  for (const field of requiredFields) {
    assert.ok(card[field], `${card.id} is missing required field ${field}`);
  }
  assert.equal(card.category, 'Aptitude', `${card.id} must belong to Aptitude`);
  assert.ok(card.tags?.includes('Oxane Partners'), `${card.id} must retain Oxane provenance tag`);
  const visibleAnswerDepth = wordCount(`${card.answer} ${card.formula || ''} ${card.explanation}`);
  assert.ok(visibleAnswerDepth >= 20, `${card.id} needs a detailed answer, method, and reasoning; found ${visibleAnswerDepth} words`);
}

for (const subcategory of oxaneAptitudeSubcategories) {
  const count = subcategory === 'Shortcuts'
    ? legacyShortcuts.length + oxaneAptitudeCards.filter((card) => card.subcategory === subcategory).length
    : oxaneAptitudeCards.filter((card) => card.subcategory === subcategory).length;
  assert.ok(count >= 20, `${subcategory} must contain at least 20 cards, got ${count}`);
  const upperBound = subcategory === 'Shortcuts' ? 40 : 30;
  assert.ok(count <= upperBound, `${subcategory} must contain at most ${upperBound} cards, got ${count}`);
}

assert.equal(cardById('oxane_apt_quant_018').answer, '1.', 'The 4:7 to 5:8 ratio card must solve to 1');
assert.match(cardById('oxane_apt_quant_015').answer, /both 3 and 9/i, '4,572 is divisible by both 3 and 9');
assert.match(cardById('oxane_apt_speed_020').answer, /108\/7/, 'The split-distance cycling card must use total distance over total time');
assert.match(cardById('oxane_apt_speed_017').answer, /A 35; B 15/, 'The age equations must match the stated total and future-age condition');
assert.match(cardById('oxane_apt_probability_006').answer, /33\.1%/, 'The Bayes card must calculate the posterior default probability');
assert.match(cardById('oxane_apt_probability_010').answer, /z-score is 1\.5/i, 'The z-score card must state the exact interpretation without an unsupported outlier claim');
assert.match(cardById('oxane_apt_data_007').answer, /450.*24/, 'The portfolio table card must reconcile both missing exposure and non-performing amount');

const coreReasoningSubcategories = [
  'Quantitative Foundations',
  'Speed, Work and Ages',
  'Probability and Statistics',
  'Logical Reasoning and Puzzles',
  'Data Interpretation and Verbal Ability',
];

for (const subcategory of coreReasoningSubcategories) {
  const easyCount = oxaneAptitudeCards.filter((card) => card.subcategory === subcategory && card.difficulty === 'Easy').length;
  assert.ok(easyCount <= 1, `${subcategory} should be interview-level; found ${easyCount} Easy cards`);
}

const addedPatternCards = [
  'oxane_apt_logic_021',
  'oxane_apt_logic_022',
  'oxane_apt_logic_023',
  'oxane_apt_logic_024',
  'oxane_apt_logic_025',
  'oxane_apt_logic_026',
  'oxane_apt_logic_027',
  'oxane_apt_logic_028',
];
for (const id of addedPatternCards) {
  assert.equal(cardById(id).subcategory, 'Logical Reasoning and Puzzles');
}

const bannedShallowPrompts = [
  'a five-year table shows',
  'a bar chart shows',
  'a line chart shows',
  'a caselet gives',
  'a chart shows average loan size',
  'summarize a financial-news paragraph',
  'what did brexit refer to',
  'what is the european union',
  'what is aum',
];
for (const fragment of bannedShallowPrompts) {
  assert.ok(
    !newQuestions.some((question) => question.includes(normalizeQuestion(fragment))),
    `Replace shallow or context-free prompt containing "${fragment}"`,
  );
}

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const flashCardSource = await readFile(new URL('../src/components/FlashCard.jsx', import.meta.url), 'utf8');
const cramCardSource = await readFile(new URL('../src/components/CramCard.jsx', import.meta.url), 'utf8');
const learnMoreSource = await readFile(new URL('../src/components/LearnMore.jsx', import.meta.url), 'utf8');
assert.match(appSource, /oxaneAptitudeCards/);
assert.match(appSource, /isPreservedAptitudeShortcut/);
assert.match(appSource, /oxaneAptitudeSubcategories/);
assert.match(appSource, /liveCards\.filter\(c => c\.id && c\.question\)/);
assert.match(flashCardSource, /alwaysOpen=\{card\.category === 'Aptitude'\}/);
assert.match(cramCardSource, /alwaysOpen=\{card\.category === 'Aptitude'\}/);
assert.match(learnMoreSource, /aria-label=\{label\}/);

console.log(`Oxane Aptitude checks passed: ${oxaneAptitudeCards.length} new cards, ${legacyShortcuts.length} legacy shortcuts preserved, ${oxaneAptitudeSubcategories.length} subcategories.`);
