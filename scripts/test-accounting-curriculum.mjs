import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { accountingCoreCards } from '../src/data/accountingCoreCards.js';
import { accountingAptitudeCards } from '../src/data/accountingAptitudeCards.js';
import { accountingAdvancedCards } from '../src/data/accountingAdvancedCards.js';
import {
  accountingInterviewConceptCards,
  accountingInterviewAptitudeCards,
} from '../src/data/accountingInterviewExpansionCards.js';

const cardViewSource = await readFile(new URL('../src/components/CramCard.jsx', import.meta.url), 'utf8');
const focusCardSource = await readFile(new URL('../src/components/FlashCard.jsx', import.meta.url), 'utf8');
const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const accountingCards = [
  ...accountingCoreCards,
  ...accountingAdvancedCards,
  ...accountingInterviewConceptCards,
];
const aptitudeCards = [
  ...accountingAptitudeCards,
  ...accountingInterviewAptitudeCards,
];
const allCards = [...accountingCards, ...aptitudeCards];
const normalizedQuestion = (question) => question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const requiredFields = ['id', 'category', 'subcategory', 'difficulty', 'card_type', 'question', 'answer', 'explanation', 'source'];
const requiredIds = [
  'acct_int_001',
  'acct_int_014',
  'acct_int_017',
  'acct_int_026',
  'acct_int_031',
  'acct_int_033',
  'acct_int_034',
  'acct_int_039',
  'acct_int_041',
  'acct_formula_001',
  'acct_formula_005',
  'acct_formula_014',
  'acct_formula_020',
  'acct_formula_028',
  'acct_formula_033',
  'acct_formula_039',
  'acct_formula_043',
  'acct_aptx_001',
  'acct_aptx_014',
  'acct_aptx_027',
  'acct_aptx_030',
  'acct_aptx_036',
];

assert.ok(accountingCards.length >= 145, `Expected at least 145 Accounting cards, got ${accountingCards.length}`);
assert.ok(aptitudeCards.length >= 80, `Expected at least 80 Accounting Aptitude cards, got ${aptitudeCards.length}`);
assert.equal(new Set(allCards.map((card) => card.id)).size, allCards.length, 'Accounting card IDs must be unique');
assert.equal(
  new Set(allCards.map((card) => normalizedQuestion(card.question))).size,
  allCards.length,
  'Accounting questions must not be duplicated after normalization',
);

for (const card of allCards) {
  for (const field of requiredFields) {
    assert.ok(card[field], `${card.id} is missing required field ${field}`);
  }
  assert.ok(['Accounting', 'Accounting Aptitude'].includes(card.category), `${card.id} has invalid category ${card.category}`);
}

for (const id of requiredIds) {
  assert.ok(allCards.some((card) => card.id === id), `Missing required accounting concept ${id}`);
}

const formulaCards = allCards.filter((card) => card.formula);
assert.ok(formulaCards.length >= 65, `Expected at least 65 formula-bearing cards, got ${formulaCards.length}`);
assert.ok(formulaCards.every((card) => card.formula.length >= 5), 'Formula fields must contain usable text');
assert.ok(
  allCards.every((card) => !/[Ãâï¿½]/.test(`${card.question} ${card.answer} ${card.explanation} ${card.formula ?? ''}`)),
  'Accounting copy must not contain mojibake',
);
assert.ok(
  allCards.some((card) => card.tags?.includes('Moody’s')),
  'Moody’s-aligned concepts should be tagged',
);
assert.ok(
  allCards.some((card) => card.tags?.includes('Oxane Partners')),
  'Oxane Partners-aligned concepts should be tagged',
);
assert.ok(
  allCards.some((card) => card.tags?.includes('Ironsides Advisory')),
  'Ironsides Advisory-aligned concepts should be tagged',
);

assert.match(cardViewSource, /card\.formula/);
assert.match(focusCardSource, /card\.formula/);
assert.match(appSource, /\.\.\.accountingInterviewConceptCards/);
assert.match(appSource, /\.\.\.accountingInterviewAptitudeCards/);
assert.match(appSource, /card\.tags\.join\(' '\)/);

console.log(
  `Accounting curriculum checks passed for ${accountingCards.length} concepts, ${aptitudeCards.length} aptitude cards, and ${formulaCards.length} formula cards.`,
);
