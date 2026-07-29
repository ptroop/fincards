import assert from 'node:assert/strict';
import { interviewReadyCards } from './interviewReadyCards.js';
import {
  ironsidesAssessmentQuestions,
  ironsidesModuleOrder,
  ironsidesModules,
} from './ironsidesAssessment.js';
import { zeroToHeroSourceCount } from './ironsidesZeroToHero.js';

assert.equal(ironsidesModules.length, 14, 'IronSides must cover the complete zero-to-hero curriculum plus aptitude practice.');
assert.deepEqual(
  ironsidesModuleOrder,
  [
    'bookkeeping',
    'journal_entries',
    'rectification',
    'accounting_measurement',
    'financial_statements',
    'cash_flow',
    'ratios',
    'cost_management',
    'financial_management',
    'capital_budgeting',
    'financing_decisions',
    'working_capital',
    'arithmetic',
    'logical_reasoning',
  ],
  'IronSides concepts must remain in the intended learning order.',
);

const moduleIds = new Set(ironsidesModules.map((module) => module.id));
assert.equal(moduleIds.size, ironsidesModules.length, 'IronSides module IDs must be unique.');

const conceptIds = ironsidesModules.flatMap((module) => module.concepts.map((item) => item.id));
assert.equal(new Set(conceptIds).size, conceptIds.length, 'IronSides concept IDs must be unique.');
assert.ok(conceptIds.length >= 46, 'IronSides needs a substantial concept layer.');

const questionIds = ironsidesAssessmentQuestions.map((card) => card.id);
assert.equal(new Set(questionIds).size, questionIds.length, 'IronSides question IDs must be unique.');
assert.equal(ironsidesAssessmentQuestions.length, 139, 'IronSides assessment question count changed unexpectedly.');

for (const module of ironsidesModules) {
  assert.ok(module.description.length >= 80, `${module.id} needs a meaningful module explanation.`);
  assert.ok(module.concepts.length >= 3, `${module.id} needs at least three ordered concept chapters.`);
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
  assert.ok(cards.length >= 4, `${module.id} needs at least four assessment questions.`);
  assert.ok(cards.some((card) => card.type === 'mcq'), `${module.id} is missing MCQs.`);
  assert.ok(cards.some((card) => card.type === 'solving'), `${module.id} is missing solving questions.`);
}

for (const card of ironsidesAssessmentQuestions) {
  assert.ok(moduleIds.has(card.moduleId), `${card.id} references an unknown module.`);
  assert.ok(['mcq', 'solving'].includes(card.type), `${card.id} has an unsupported question type.`);
  assert.ok(card.answer.length >= 3, `${card.id} needs an explicit answer.`);
  assert.ok(card.explanation.length >= 50, `${card.id} needs worked reasoning.`);
  assert.ok(card.answer.length + card.explanation.length >= 90, `${card.id} needs a detailed answer and explanation.`);
  if (card.type === 'mcq') {
    assert.equal(card.options.length, 4, `${card.id} must have four options.`);
    assert.ok(Number.isInteger(card.correctOption) && card.correctOption >= 0 && card.correctOption < 4, `${card.id} has an invalid correct option.`);
  }
}

assert.ok(zeroToHeroSourceCount >= 12, 'The curriculum needs a diverse authoritative and practitioner source base.');
assert.ok(
  ironsidesAssessmentQuestions.filter((card) => card.questionClass === 'accounting_aptitude').length >= 15,
  'IronSides needs a dedicated accounting-aptitude question bank.',
);
assert.ok(
  ironsidesAssessmentQuestions.filter((card) => card.questionClass === 'journal_entry').length >= 5,
  'Journal entries must retain extra assessment weight.',
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
  'inventory',
  'depreciation',
  'break-even',
  'wacc',
  'weighted averages',
  'valid conclusions',
]) {
  const curriculumText = JSON.stringify(ironsidesModules).toLowerCase();
  assert.ok(curriculumText.includes(requiredPhrase), `Missing core IronSides concept: ${requiredPhrase}`);
}

console.log('IronSides MBA assessment coverage contract passed.');
