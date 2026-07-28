export const aptitudeShortcutSections = [
  {
    id: 'arithmetic',
    title: 'Arithmetic & Commercial Math',
    description: 'Percentages, ratios, averages, pricing, interest and number properties.',
  },
  {
    id: 'motion-work',
    title: 'Motion, Work & Mixtures',
    description: 'Rate-based methods for journeys, workers, pipes, ages and allocation.',
  },
  {
    id: 'probability',
    title: 'Probability & Statistics',
    description: 'Probability laws, counting, Bayes, distributions, expectation and dispersion.',
  },
  {
    id: 'reasoning-di',
    title: 'Reasoning & Data Interpretation',
    description: 'Pattern recognition, constraints, set logic, sufficiency and chart calculations.',
  },
  {
    id: 'excel',
    title: 'Excel & Model Review',
    description: 'Lookups, conditional aggregation, references, cleaning and reconciliation.',
  },
  {
    id: 'finance',
    title: 'Finance & Markets',
    description: 'Valuation, returns, credit ratios, cash flow, bonds and securitization.',
  },
  {
    id: 'verbal-strategy',
    title: 'Verbal Reasoning & Test Strategy',
    description: 'Evidence-led writing, critical reasoning and timed-assessment control.',
  },
];

const meta = (section, order, formulae = []) => ({ shortcut_section: section, shortcut_order: order, formulae });

export const aptitudeShortcutStructure = {
  'percentages-successive-change': meta('arithmetic', 1),
  'ratios-proportion-variation': meta('arithmetic', 2),
  'averages-weighted-replacement': meta('arithmetic', 3),
  'profit-markup-margin-discount': meta('arithmetic', 4),
  'interest-compounding-rule72': meta('arithmetic', 5),
  'divisibility-remainders-unit-digits': meta('arithmetic', 6),
  'hcf-lcm-factorization': meta('arithmetic', 7),

  'speed-units-relative-motion': meta('motion-work', 1),
  'average-speed': meta('motion-work', 2),
  'trains-boats-streams': meta('motion-work', 3),
  'time-work-efficiency': meta('motion-work', 4),
  'pipes-cisterns': meta('motion-work', 5),
  'mixtures-alligation': meta('motion-work', 6),
  ages: meta('motion-work', 7),
  'partnership-capital-time': meta('motion-work', 8),

  'probability-complement-inclusion': meta('probability', 1, [
    { label: 'Complement', expression: 'P(Aᶜ) = 1 - P(A)' },
    { label: 'Addition law', expression: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)' },
    { label: 'Mutually exclusive', expression: 'P(A ∪ B) = P(A) + P(B)' },
    { label: 'At least one', expression: 'P(at least one) = 1 - P(none)' },
  ]),
  'conditional-probability-bayes': meta('probability', 2, [
    { label: 'Conditional probability', expression: 'P(A|B) = P(A ∩ B) / P(B)' },
    { label: 'Multiplication law', expression: 'P(A ∩ B) = P(A|B)P(B)' },
    { label: 'Independence', expression: 'P(A ∩ B) = P(A)P(B)' },
    { label: 'Total probability', expression: 'P(B) = Σ P(B|Aᵢ)P(Aᵢ)' },
    { label: 'Bayes', expression: 'P(Aᵢ|B) = P(B|Aᵢ)P(Aᵢ) / P(B)' },
  ]),
  'permutations-combinations': meta('probability', 3, [
    { label: 'Factorial', expression: 'n! = n(n-1)…1; 0! = 1' },
    { label: 'Permutation', expression: 'ⁿPᵣ = n! / (n-r)!' },
    { label: 'Combination', expression: 'ⁿCᵣ = n! / [r!(n-r)!]' },
    { label: 'Circular arrangement', expression: '(n-1)!' },
  ]),
  'expected-value': meta('probability', 4, [
    { label: 'Expected value', expression: 'E[X] = Σ xᵢpᵢ' },
    { label: 'Expected function', expression: 'E[g(X)] = Σ g(xᵢ)pᵢ' },
    { label: 'Variance', expression: 'Var(X) = E[X²] - (E[X])²' },
    { label: 'Linearity', expression: 'E[aX+b] = aE[X] + b' },
  ]),
  'binomial-probability': meta('probability', 5, [
    { label: 'Point probability', expression: 'P(X=k) = ⁿCₖ pᵏ(1-p)ⁿ⁻ᵏ' },
    { label: 'Mean', expression: 'E[X] = np' },
    { label: 'Variance', expression: 'Var(X) = np(1-p)' },
    { label: 'Standard deviation', expression: 'σ = √[np(1-p)]' },
  ]),
  'statistics-core': meta('probability', 6, [
    { label: 'z-score', expression: 'z = (x-μ) / σ' },
    { label: 'Coefficient of variation', expression: 'CV = σ / μ' },
    { label: 'Correlation', expression: 'ρ = Cov(X,Y) / (σXσY)' },
  ]),

  'data-interpretation-growth': meta('reasoning-di', 1),
  'data-sufficiency': meta('reasoning-di', 2),
  'number-letter-patterns': meta('reasoning-di', 3),
  'syllogisms-set-logic': meta('reasoning-di', 4),
  'arrangements-ordering': meta('reasoning-di', 5),

  'excel-lookup-choice': meta('excel', 1),
  'excel-conditional-aggregation': meta('excel', 2),
  'excel-references-errors': meta('excel', 3),
  'excel-pivots-cleaning': meta('excel', 4),
  'excel-audit-reconciliation': meta('excel', 5),

  'time-value-discounting': meta('finance', 1),
  'npv-irr': meta('finance', 2),
  'wacc-capm-cost-debt': meta('finance', 3),
  'bond-price-duration': meta('finance', 4),
  'credit-ratios': meta('finance', 5),
  'working-capital-free-cash-flow': meta('finance', 6),
  'securitization-waterfall': meta('finance', 7),
  'rates-inflation-fx': meta('finance', 8),

  'verbal-critical-reasoning': meta('verbal-strategy', 1),
  'assessment-time-management': meta('verbal-strategy', 2),
};

export const getAptitudeShortcutStructure = (shortcutTopic) => (
  aptitudeShortcutStructure[shortcutTopic] || meta('reasoning-di', 999)
);
