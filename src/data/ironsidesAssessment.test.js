import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { interviewReadyCards } from './interviewReadyCards.js';
import {
  ironsidesAssessmentQuestions,
  ironsidesModuleOrder,
  ironsidesModules,
} from './ironsidesAssessment.js';
import { zeroToHeroModules, zeroToHeroSourceCount } from './ironsidesZeroToHero.js';

assert.equal(ironsidesModules.length, 9, 'IronSides must use the seven requested recruitment topics plus Arithmetic and Logical Reasoning.');
assert.deepEqual(
  ironsidesModuleOrder,
  [
    'financial_management',
    'accounting',
    'financial_statements',
    'book_entry',
    'ratios',
    'rectification_entries',
    'journal_entries',
    'arithmetic',
    'logical_reasoning',
  ],
  'IronSides must remain organised by the reported recruitment topics rather than course difficulty.',
);

const moduleIds = new Set(ironsidesModules.map((module) => module.id));
assert.equal(moduleIds.size, ironsidesModules.length, 'IronSides module IDs must be unique.');

const conceptIds = ironsidesModules.flatMap((module) => module.concepts.map((item) => item.id));
assert.equal(new Set(conceptIds).size, conceptIds.length, 'IronSides concept IDs must be unique.');
assert.equal(conceptIds.length, 62, 'IronSides concept count changed unexpectedly.');
const visualConcepts = ironsidesModules.flatMap((module) => module.concepts).filter((item) => item.visual);
assert.equal(visualConcepts.length, 8, 'IronSides needs exactly eight high-value teaching exhibits.');
assert.deepEqual(
  new Set(visualConcepts.map((item) => item.visual.type)),
  new Set([
    'accounting-equation',
    'bookkeeping-flow',
    'rectification-sheet',
    'statement-bridge',
    'cashflow-bridge',
    'dupont-tree',
    'npv-sheet',
    'working-capital-timeline',
  ]),
  'Each teaching exhibit must represent a distinct accounting or finance transformation.',
);

const questionIds = ironsidesAssessmentQuestions.map((card) => card.id);
assert.equal(new Set(questionIds).size, questionIds.length, 'IronSides question IDs must be unique.');
assert.equal(ironsidesAssessmentQuestions.length, 308, 'IronSides assessment question count changed unexpectedly.');
assert.ok(ironsidesAssessmentQuestions.every((card) => ['reported interview question', 'assessment-standard'].includes(card.evidenceType)), 'Every question must disclose whether it is reported or assessment-standard.');
assert.ok(ironsidesAssessmentQuestions.filter((card) => card.evidenceType === 'reported interview question').every((card) => card.sourceUrl), 'Reported questions must retain public source provenance.');

for (const module of ironsidesModules) {
  assert.ok(module.description.length >= 80, `${module.id} needs a complete topic scope.`);
  assert.ok(module.capability.length >= 120, `${module.id} needs a specific assessable capability.`);
  assert.ok(module.concepts.length >= 2, `${module.id} needs independently expandable subtopics.`);
  for (const item of module.concepts) {
    assert.ok((item.definition || item.explanation).length >= 100, `${item.id} needs an academic definition.`);
    assert.ok(item.simpleMeaning.length >= 35, `${item.id} needs a plain-language translation.`);
    assert.ok(item.eli5.length >= 35, `${item.id} needs an ELI5 intuition.`);
    assert.ok(item.explanation.length >= 180, `${item.id} needs detailed academic prose.`);
    assert.ok(item.example.length >= 35, `${item.id} needs an applied example.`);
    assert.ok(item.trap.length >= 25, `${item.id} needs a common-trap explanation.`);
    if (!['arithmetic', 'logical_reasoning'].includes(module.id)) {
      assert.ok(item.subconcepts.length >= 4, `${item.id} needs ordered sub-concepts.`);
      assert.ok(item.indianExample.length >= 50, `${item.id} needs an Indian application.`);
      assert.ok(item.realEvent.length >= 50, `${item.id} needs a real business event or context.`);
      assert.ok(item.sources.length >= 2, `${item.id} needs cited factual sources.`);
      assert.ok(item.sources.every((itemSource) => /^https:\/\//.test(itemSource.url)), `${item.id} has an invalid source URL.`);
    }
  }

  const cards = ironsidesAssessmentQuestions.filter((card) => card.moduleId === module.id);
  assert.ok(cards.length >= 8, `${module.id} needs at least eight assessment questions.`);
  assert.ok(cards.some((card) => card.type === 'mcq'), `${module.id} is missing MCQs.`);
  assert.ok(cards.some((card) => card.type === 'solving'), `${module.id} is missing solving questions.`);
}

for (const card of ironsidesAssessmentQuestions) {
  assert.ok(moduleIds.has(card.moduleId), `${card.id} references an unknown module.`);
  assert.ok(['mcq', 'solving'].includes(card.type), `${card.id} has an unsupported question type.`);
  assert.ok(card.answer.length >= 3, `${card.id} needs an explicit answer.`);
  assert.ok(card.explanation.length >= 80, `${card.id} needs detailed worked reasoning.`);
  assert.ok(card.answer.length + card.explanation.length >= 90, `${card.id} needs a detailed answer and explanation.`);
  if (card.type === 'mcq') {
    assert.equal(card.options.length, 4, `${card.id} must have four options.`);
    assert.equal(new Set(card.options.map((option) => option.trim().toLowerCase())).size, 4, `${card.id} has repeated answer options.`);
    assert.ok(Number.isInteger(card.correctOption) && card.correctOption >= 0 && card.correctOption < 4, `${card.id} has an invalid correct option.`);
  }
}

const normalise = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
assert.equal(
  new Set(ironsidesAssessmentQuestions.map((card) => normalise(card.question))).size,
  ironsidesAssessmentQuestions.length,
  'IronSides contains repeated questions.',
);
assert.equal(
  new Set(ironsidesAssessmentQuestions.map((card) => normalise(card.answer))).size,
  ironsidesAssessmentQuestions.length,
  'IronSides contains repeated answers.',
);
assert.ok(
  ironsidesAssessmentQuestions.every((card) => normalise(card.answer) !== normalise(card.explanation)),
  'An answer must not repeat its explanation verbatim.',
);

assert.ok(zeroToHeroSourceCount >= 12, 'The curriculum needs a diverse authoritative and practitioner source base.');
assert.ok(
  ironsidesAssessmentQuestions.filter((card) => card.questionClass === 'accounting_aptitude').length >= 15,
  'IronSides needs a dedicated accounting-aptitude question bank.',
);
assert.ok(
  ironsidesAssessmentQuestions.filter((card) => card.questionClass === 'journal_entry').length >= 5,
  'Journal entries must retain extra assessment weight.',
);
assert.ok(
  ironsidesAssessmentQuestions.filter((card) => card.questionClass === 'ledger_practice').length >= 8,
  'Book Entry must include explicit ledger-posting and reconciliation practice.',
);
assert.equal(
  ironsidesAssessmentQuestions.filter((card) => card.questionClass === 'interview_practice').length,
  35,
  'The interview-standard practice expansion must contain 35 complete questions.',
);
for (const topicId of [
  'financial_management',
  'accounting',
  'financial_statements',
  'book_entry',
  'ratios',
  'rectification_entries',
  'journal_entries',
]) {
  assert.ok(
    ironsidesAssessmentQuestions.filter((card) => card.questionClass === 'interview_practice' && card.moduleId === topicId).length >= 5,
    `${topicId} needs at least five interview-standard practice questions.`,
  );
}
const standardQuestions = ironsidesAssessmentQuestions.filter((card) => card.id.startsWith('isa_standard_'));
assert.equal(standardQuestions.length, 44, 'The standard-difficulty expansion must add exactly 44 complete questions.');
assert.ok(
  standardQuestions.every((card) => ['Easy', 'Medium'].includes(card.difficulty)),
  'The standard expansion must not use artificial Hard labels.',
);
assert.ok(
  standardQuestions.filter((card) => card.difficulty === 'Medium').length >= 39,
  'The standard expansion should be concentrated at ordinary MBA-assessment difficulty.',
);
assert.ok(
  ironsidesAssessmentQuestions.filter((card) => card.difficulty === 'Medium').length / ironsidesAssessmentQuestions.length >= 0.75,
  'At least three quarters of the full bank should be calibrated to standard Medium difficulty.',
);
assert.ok(
  ironsidesAssessmentQuestions.filter((card) => card.difficulty === 'Hard').length / ironsidesAssessmentQuestions.length <= 0.20,
  'No more than one fifth of the full bank should be genuinely advanced.',
);
for (const topicId of [
  'financial_management',
  'accounting',
  'financial_statements',
  'book_entry',
  'ratios',
  'rectification_entries',
  'journal_entries',
]) {
  assert.ok(
    standardQuestions.filter((card) => card.moduleId === topicId).length >= 5,
    `${topicId} needs at least five newly added standard questions.`,
  );
}
const questionsByTopic = Object.fromEntries(ironsidesModules.map((module) => [
  module.id,
  ironsidesAssessmentQuestions.filter((card) => card.moduleId === module.id).length,
]));
assert.ok(questionsByTopic.journal_entries >= 20, 'Journal Entries needs a substantial dedicated question bank.');
assert.ok(questionsByTopic.journal_entries > questionsByTopic.book_entry, 'Journal Entries must carry more weight than Book Entry.');
assert.ok(questionsByTopic.journal_entries > questionsByTopic.rectification_entries, 'Journal Entries must carry more weight than Rectification Entries.');
assert.equal(
  ironsidesAssessmentQuestions.reduce((sum, card) => sum + Number(moduleIds.has(card.moduleId)), 0),
  ironsidesAssessmentQuestions.length,
  'Every question must be assigned to exactly one requested topic.',
);

const archive = interviewReadyCards.filter((card) => card.tag === 'archive' && /ironsides/i.test(card.firm || ''));
assert.equal(archive.length, 32, 'All legacy IronSides archive questions must be migrated.');
assert.equal(new Set(archive.map((card) => card.id)).size, archive.length, 'Migrated archive IDs must remain unique.');
assert.ok(archive.every((card) => card.answer && card.subcategory), 'Every migrated archive card needs its original answer and subcategory.');

for (const requiredPhrase of [
  'accounting equation',
  'journal entries',
  'rectification',
  'cash flow',
  'ratio analysis',
  'capital budgeting',
  'cost and management accounting',
  'working capital',
  'bank reconciliation',
  'subsidiary ledgers',
  'control accounts',
  'tds payable',
  'petty cash',
  'bills receivable',
  'inventory',
  'depreciation',
  'break-even',
  'wacc',
  'price-earnings ratio',
  'weighted averages',
  'valid conclusions',
]) {
  const curriculumText = JSON.stringify(ironsidesModules).toLowerCase();
  assert.ok(curriculumText.includes(requiredPhrase), `Missing core IronSides concept: ${requiredPhrase}`);
}

const requiredTopicCoverage = {
  financial_management: [
    'investment decision',
    'financial planning',
    'external financing need',
    'sources of finance',
    'time value of money',
    'compounding',
    'annuity',
    'beta',
    'capm',
    'initial flow',
    'terminal flow',
    'npv',
    'irr',
    'payback',
    'profitability index',
    'accounting rate of return',
    'capital rationing',
    'bond value',
    'preference-share value',
    'gordon growth value',
    'sensitivity',
    'scenario',
    'decision tree',
    'cost of debt',
    'cost of equity',
    'wacc',
    'operating leverage',
    'financial leverage',
    'dividend',
    'repurchase',
    'cash conversion cycle',
    'factoring',
    'treds',
    'eoq',
    'safety stock',
  ],
  accounting: [
    'accrual accounting',
    'accounting equation',
    'accounting policy',
    'accounting estimate',
    'materiality',
    'substance over form',
    'capital expenditure',
    'revenue expenditure',
    'provision versus reserve',
    'assets',
    'liabilities',
    'contra-account',
    'inventory',
    'fifo',
    'weighted average',
    'net realisable value',
    'depreciation',
    'impairment',
    'intangible assets',
    'leases',
    'revenue five-step',
    'provision',
    'contingent liability',
    'temporary difference',
    'cost object',
    'fixed cost',
    'variable cost',
    'cost sheet',
    'contribution',
    'break-even',
    'relevant cost',
    'flexible budget',
    'standard variances',
    'overhead absorption',
  ],
  financial_statements: [
    'income statement',
    'balance sheet',
    'equity movement',
    'schedule iii',
    'three statements',
    'earnings quality',
    'common-size',
    'trend index',
    'funds-flow statement',
    'funds from operations',
    'cash equivalents',
    'direct method',
    'indirect method',
    'operating',
    'investing',
    'financing',
    'free cash flow',
    'fcff',
    'fcfe',
    'cash conversion',
  ],
  book_entry: [
    'source documents',
    'books of original entry',
    'sales book',
    'purchases book',
    'ledger',
    'trial balance',
    'closing process',
    'subsidiary ledgers',
    'control accounts',
    'cash book',
    'petty cash',
    'bills receivable and payable',
    'bank reconciliation',
  ],
  ratios: [
    'current ratio',
    'quick ratio',
    'dio',
    'dso',
    'dpo',
    'cash conversion cycle',
    'gross margin',
    'ebitda margin',
    'asset turnover',
    'roa',
    'roe',
    'roic',
    'dupont',
    'debt/ebitda',
    'interest coverage',
    'debt-service coverage',
    'roce',
    'basic eps',
    'price-earnings ratio',
    'dividend payout',
  ],
  rectification_entries: [
    'accrued expense',
    'accrued income',
    'prepayment',
    'unearned revenue',
    'cut-off',
    'errors of omission',
    'errors of commission',
    'errors of principle',
    'compensating errors',
    'one-sided errors',
    'two-sided errors',
    'suspense account',
    'difference method',
    'profit effect',
  ],
  journal_entries: [
    'debit',
    'credit',
    'simple entry',
    'compound entry',
    'cash purchases',
    'credit purchases',
    'output gst',
    'input gst',
    'tds',
    'payroll',
    'sales returns',
    'purchase returns',
    'trade discounts',
    'cash discounts',
    'receivable',
    'payable',
    'perpetual inventory',
    'periodic inventory',
    'expected credit losses',
    'capital expenditure',
    'depreciation',
    'borrowing',
    'owner contributions',
    'dividends',
    'disposal',
  ],
};

for (const [topicId, requiredPhrases] of Object.entries(requiredTopicCoverage)) {
  const topicText = JSON.stringify(ironsidesModules.find((module) => module.id === topicId)).toLowerCase();
  for (const requiredPhrase of requiredPhrases) {
    assert.ok(topicText.includes(requiredPhrase), `${topicId} is missing required subtopic: ${requiredPhrase}`);
  }
}

const interviewBenchmarkText = JSON.stringify(ironsidesAssessmentQuestions).toLowerCase();
for (const benchmarkPhrase of [
  'accrued',
  'prepaid',
  'depreciation',
  'unearned revenue',
  'bad debt',
  'inventory write-down',
  'three statements',
  'capital expenditure',
  'bank reconciliation',
  'journal',
  'ledger',
  'ratio',
  'working capital',
]) {
  assert.ok(
    interviewBenchmarkText.includes(benchmarkPhrase),
    `Question bank is missing comparable finance-interview pattern: ${benchmarkPhrase}`,
  );
}

const ironSidesViewSource = readFileSync(new URL('../components/IronSidesView.jsx', import.meta.url), 'utf8');
const ironSidesVisualSource = readFileSync(new URL('../components/IronSidesConceptVisual.jsx', import.meta.url), 'utf8');
for (const removedFiller of [
  'Business evidence',
  'Tomorrow-first plan',
  'Read for the decision rule',
  'Attempt first',
  'No prior accounting knowledge is assumed',
  'ELI5',
  'Why it matters',
]) {
  assert.ok(!ironSidesViewSource.includes(removedFiller), `IronSides UI still contains filler: ${removedFiller}`);
}
assert.ok(ironSidesViewSource.includes('function TopicNavigation'), 'IronSides needs bottom topic navigation.');
assert.ok(ironSidesViewSource.includes('<IronSidesConceptVisual visual={item.visual} />'), 'Concept visuals must render inside their teaching subtopics.');
for (const visualEvidence of [
  'Accounting equation transaction worksheet',
  'Wrong debit',
  'Running cash',
  'Return on equity',
  'Cash conversion cycle',
  'Present value',
]) {
  assert.ok(ironSidesVisualSource.includes(visualEvidence), `IronSides visual system is missing: ${visualEvidence}`);
}
assert.ok(ironSidesViewSource.includes('subconcept.title'), 'IronSides must render named subtopics directly in the reading flow.');
assert.ok(ironSidesViewSource.includes('<details '), 'IronSides subtopics must open on demand instead of rendering as an undifferentiated wall of text.');
assert.ok(ironSidesViewSource.includes('<summary '), 'IronSides subtopics need clickable summaries.');
assert.ok(ironSidesViewSource.includes('How to post a journal entry into a ledger') || zeroToHeroModules.some((module) => module.concepts.some((concept) => concept.subconcepts?.some((subconcept) => /post.*ledger/i.test(subconcept.title)))), 'IronSides must teach ledger posting as an explicit procedure.');
assert.ok(ironSidesViewSource.includes('<TopicNavigation previousTopic={previousTopic} nextTopic={nextTopic} onSelect={selectModule} />'), 'Learn and Practice must render topic navigation.');
assert.ok((ironSidesViewSource.match(/<TopicNavigation /g) || []).length === 2, 'Both Learn and Practice require bottom Previous/Next topic navigation.');
assert.ok(ironSidesViewSource.includes("scrollIntoView({ behavior: 'smooth', block: 'start' })"), 'Topic navigation must automatically scroll to the topic heading.');
assert.ok(ironSidesViewSource.includes("['assessment-standard', `Practice ("), 'Practice questions must be separately filterable from reported questions.');
assert.ok(ironSidesViewSource.includes("card.evidenceType === questionEvidence"), 'The question bank must apply the reported/practice provenance filter.');
assert.ok(ironSidesViewSource.includes(": 'Practice'"), 'Practice questions must be labelled clearly in each question card.');

console.log('IronSides MBA assessment coverage contract passed.');
