import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import cardsData from '../src/data/cards.json' with { type: 'json' };
import {
  oxaneAptitudeCards,
  oxaneAptitudeEvidence,
  oxaneAptitudeSubcategories,
} from '../src/data/oxaneAptitudeCards.js';
import { aptitudeShortcutOverrides } from '../src/data/aptitudeShortcutOverrides.js';
import {
  aptitudeShortcutSections,
  aptitudeShortcutStructure,
} from '../src/data/aptitudeShortcutStructure.js';

const normalizeQuestion = (question) => String(question).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const wordCount = (value) => String(value).trim().split(/\s+/).filter(Boolean).length;
const legacyAptitude = cardsData.filter((card) => card.category === 'Aptitude');
const legacyShortcuts = legacyAptitude.filter((card) => card.subcategory === 'Shortcuts' || card.card_type === 'shortcut');
const mergedLegacyShortcuts = legacyShortcuts.map((card) => ({ ...card, ...aptitudeShortcutOverrides[card.id] }));
const newShortcuts = oxaneAptitudeCards.filter((card) => card.subcategory === 'Shortcuts' && card.card_type === 'shortcut');
const allShortcuts = [...mergedLegacyShortcuts, ...newShortcuts];
const newQuestions = oxaneAptitudeCards.map((card) => normalizeQuestion(card.question));
const newIds = oxaneAptitudeCards.map((card) => card.id);
const requiredFields = [
  'id',
  'category',
  'subcategory',
  'difficulty',
  'card_type',
  'question',
  'answer',
  'explanation',
  'source',
  'source_url',
  'provenance',
  'evidence_confidence',
  'evidence_note',
];
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
  newShortcuts.length,
  21,
  'Expected twenty-one new shortcut cards after adding the binomial formula reference',
);
assert.ok(oxaneAptitudeEvidence.length >= 3, 'Maintain a public Oxane evidence ledger with multiple independent reports');

for (const card of oxaneAptitudeCards) {
  for (const field of requiredFields) {
    assert.ok(card[field], `${card.id} is missing required field ${field}`);
  }
  assert.equal(card.category, 'Aptitude', `${card.id} must belong to Aptitude`);
  assert.ok(card.tags?.includes('Oxane Partners'), `${card.id} must retain Oxane provenance tag`);
  assert.match(card.source_url, /^https:\/\//, `${card.id} must link to its public evidence basis`);
  assert.ok(
    ['reported-topic reconstruction', 'publicly reported question', 'academic shortcut reference'].includes(card.provenance),
    `${card.id} has unsupported provenance value ${card.provenance}`,
  );
  const visibleAnswerDepth = wordCount(`${card.answer} ${card.formula || ''} ${card.explanation}`);
  assert.ok(visibleAnswerDepth >= 20, `${card.id} needs a detailed answer, method, and reasoning; found ${visibleAnswerDepth} words`);
}

for (const card of allShortcuts) {
  assert.ok(card.shortcut_topic, `${card.id} must declare a distinct academic shortcut topic`);
  assert.ok(card.shortcut_section, `${card.id} must belong to a structured Shortcut section`);
  assert.ok(Number.isFinite(card.shortcut_order), `${card.id} must have a stable order inside its Shortcut section`);
  assert.match(card.explanation, /Worked examples?:/i, `${card.id} must include a worked example`);
  assert.match(card.explanation, /Use when:/i, `${card.id} must explain when the shortcut applies`);
  assert.match(card.explanation, /Trap:/i, `${card.id} must state a trap or limitation`);
}
assert.equal(
  new Set(allShortcuts.map((card) => card.shortcut_topic)).size,
  41,
  'All 41 Shortcut cards must cover non-overlapping topics',
);
assert.equal(aptitudeShortcutSections.length, 7, 'Shortcut syllabus must retain seven named sections');
assert.ok(
  allShortcuts.every((card) => aptitudeShortcutStructure[card.shortcut_topic]),
  'Every Shortcut topic must be declared in the syllabus structure',
);
const probabilityShortcuts = allShortcuts.filter((card) => card.shortcut_section === 'probability');
assert.equal(probabilityShortcuts.length, 6, 'Probability & Statistics must contain six structured methods');
assert.ok(
  probabilityShortcuts.reduce((sum, card) => sum + (card.formulae?.length || 0), 0) >= 20,
  'Probability & Statistics must expose a comprehensive formula bank',
);
assert.match(
  probabilityShortcuts.find((card) => card.shortcut_topic === 'binomial-probability')?.formula || '',
  /P\(X=k\).*nCk/i,
  'Binomial shortcut must include point probability, mean, and variance',
);

for (const subcategory of oxaneAptitudeSubcategories) {
  const count = subcategory === 'Shortcuts'
    ? legacyShortcuts.length + oxaneAptitudeCards.filter((card) => card.subcategory === subcategory).length
    : oxaneAptitudeCards.filter((card) => card.subcategory === subcategory).length;
  assert.ok(count >= 20, `${subcategory} must contain at least 20 cards, got ${count}`);
  const upperBound = subcategory === 'Shortcuts' ? 45 : 30;
  assert.ok(count <= upperBound, `${subcategory} must contain at most ${upperBound} cards, got ${count}`);
}

assert.equal(cardById('oxane_apt_quant_018').answer, '1.', 'The 4:7 to 5:8 ratio card must solve to 1');
assert.match(cardById('oxane_apt_quant_015').answer, /both 3 and 9/i, '4,572 is divisible by both 3 and 9');
assert.match(cardById('oxane_apt_speed_020').answer, /108\/7/, 'The split-distance cycling card must use total distance over total time');
assert.match(cardById('oxane_apt_speed_017').answer, /A 35; B 15/, 'The age equations must match the stated total and future-age condition');
assert.match(cardById('oxane_apt_probability_006').answer, /33\.1%/, 'The Bayes card must calculate the posterior default probability');
assert.match(cardById('oxane_apt_probability_010').answer, /z-score is 1\.5/i, 'The z-score card must state the exact interpretation without an unsupported outlier claim');
assert.match(cardById('oxane_apt_data_007').answer, /450.*24/, 'The portfolio table card must reconcile both missing exposure and non-performing amount');

const visualRequiredDataIds = [
  'oxane_apt_data_001',
  'oxane_apt_data_002',
  'oxane_apt_data_003',
  'oxane_apt_data_004',
  'oxane_apt_data_005',
  'oxane_apt_data_006',
  'oxane_apt_data_007',
  'oxane_apt_data_008',
  'oxane_apt_data_009',
  'oxane_apt_data_010',
  'oxane_apt_data_015',
];
for (const id of visualRequiredDataIds) {
  const visual = cardById(id).visual;
  assert.ok(visual?.type, `${id} must include a rendered DI exhibit`);
  assert.ok(visual?.title, `${id} DI exhibit must have an accessible title`);
}
assert.equal(
  oxaneAptitudeCards.filter((card) => card.subcategory === 'Data Interpretation and Verbal Ability' && card.visual).length,
  visualRequiredDataIds.length,
  'Only dataset-dependent DI questions should carry an exhibit',
);
assert.deepEqual(
  cardById('oxane_apt_data_001').visual.series[0].values,
  [800, 920, 1058],
  'Revenue chart values must match the CAGR question exactly',
);
assert.deepEqual(
  cardById('oxane_apt_data_015').visual.series.map((series) => series.values),
  [[2, 4], [2, 2.5]],
  'Difference-in-differences chart must match treated and control rates',
);

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

const replacementQualityTargets = [
  ['Logical Reasoning and Puzzles', 28],
  ['Market Awareness and Financial GK', 20],
];
for (const [subcategory, expectedHardCards] of replacementQualityTargets) {
  const cards = oxaneAptitudeCards.filter((card) => card.subcategory === subcategory);
  assert.equal(cards.length, expectedHardCards, `${subcategory} card count changed unexpectedly`);
  assert.ok(cards.every((card) => card.difficulty === 'Hard'), `${subcategory} must contain genuinely multi-step Hard questions`);
  assert.ok(
    cards.every((card) => !normalizeQuestion(card.question).startsWith('what is ')),
    `${subcategory} must use applied questions rather than definition recall`,
  );
}
const excelAssessmentCards = oxaneAptitudeCards.filter((card) => card.subcategory === 'Excel and Spreadsheet Assessment');
assert.equal(excelAssessmentCards.length, 20, 'Excel assessment must retain twenty applied cards');
assert.ok(excelAssessmentCards.every((card) => card.difficulty !== 'Easy'), 'Excel assessment cannot regress to Easy definition cards');
assert.ok(excelAssessmentCards.filter((card) => card.difficulty === 'Hard').length >= 15, 'Excel assessment must be dominated by practical Hard tasks');
assert.ok(
  excelAssessmentCards.every((card) => !/^what (is|does) /i.test(card.question)),
  'Excel assessment must use workbook tasks rather than function-definition recall',
);
assert.equal(
  cardById('oxane_apt_logic_015').provenance,
  'publicly reported question',
  'The uneven-rope puzzle must retain its explicit public-report provenance',
);
for (const id of ['oxane_apt_excel_005', 'oxane_apt_excel_007']) {
  assert.equal(cardById(id).provenance, 'publicly reported question', `${id} must retain reported Excel-topic provenance`);
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
  'complete the word pattern ace bdf ceg',
  'what is the value of credit',
  'arrange the letters of credit alphabetically',
  'which word is the odd one out audit verify reconcile estimate',
  'how many odd days are in an ordinary year',
  'what does vlookup do',
  'what does indirect do',
  'what is offset used for',
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
const dataVisualSource = await readFile(new URL('../src/components/AptitudeDataVisual.jsx', import.meta.url), 'utf8');
const shortcutViewSource = await readFile(new URL('../src/components/ShortcutView.jsx', import.meta.url), 'utf8');
const shortcutOverrideSource = await readFile(new URL('../src/data/aptitudeShortcutOverrides.js', import.meta.url), 'utf8');
assert.match(appSource, /oxaneAptitudeCards/);
assert.match(appSource, /isPreservedAptitudeShortcut/);
assert.match(appSource, /oxaneAptitudeSubcategories/);
assert.match(appSource, /liveCards\.filter\(c => c\.id && c\.question\)/);
assert.match(appSource, /card\.subcategory === 'Shortcuts'/);
assert.doesNotMatch(appSource, /explanation.*includes\('shortcut'\)/, 'Shortcut filtering must use taxonomy, not words inside card content');
assert.match(flashCardSource, /alwaysOpen=\{card\.category === 'Aptitude'\}/);
assert.match(cramCardSource, /alwaysOpen=\{card\.category === 'Aptitude'\}/);
assert.match(flashCardSource, /AptitudeDataVisual visual=\{card\.visual\}/);
assert.match(cramCardSource, /AptitudeDataVisual visual=\{card\.visual\}/);
assert.match(learnMoreSource, /aria-label=\{label\}/);
assert.match(dataVisualSource, /Question exhibit/);
assert.match(dataVisualSource, /<table/);
assert.match(dataVisualSource, /role="img"/);
assert.match(shortcutViewSource, /aptitudeShortcutSections/);
assert.match(shortcutViewSource, /FormulaPanel/);
assert.match(shortcutViewSource, /Trap \/ limitation/);
assert.equal(
  Object.keys(aptitudeShortcutOverrides).length,
  legacyShortcuts.length,
  'Every preserved legacy Shortcut card must be academically rewritten',
);
assert.doesNotMatch(shortcutOverrideSource, /multiply a two-digit number by 11|square a number ending in 5|handshakes occur/i);

console.log(`Oxane Aptitude checks passed: ${oxaneAptitudeCards.length} new cards, ${legacyShortcuts.length} legacy shortcuts preserved, ${oxaneAptitudeSubcategories.length} subcategories.`);
