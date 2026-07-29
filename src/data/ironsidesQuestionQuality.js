const explanationOverrides = {
  isa_zth_009: 'The original entry treated the entire bank payment as interest: Interest Expense Dr Rs 1,10,000; Bank Cr Rs 1,10,000. Only Rs 30,000 is a financing cost. The remaining Rs 80,000 repays principal, so debit Borrowing and credit Interest Expense by Rs 80,000. Bank is not touched again because its Rs 1,10,000 credit was correct.',
  isa_zth_016: 'Compute NRV per unit as selling price Rs 900 less completion cost Rs 120 and selling cost Rs 30, giving Rs 750. Compare that amount with historical cost of Rs 1,000. Because NRV is lower, report inventory at Rs 750 and recognise a Rs 250 write-down in COGS or a separate inventory-loss account.',
  isa_zth_027: 'DSO uses credit sales because receivables arise from sales; DIO uses COGS because inventory leaves the books at cost; DPO uses credit purchases because payables arise from supplier purchases. The resulting cycle is about 45 days, meaning cash is tied up in inventory and receivables for roughly forty-five days after allowing for supplier credit.',
  isa_zth_042: 'Weight each scenario NPV by its probability: Rs 5 lakh from upside, Rs 3 lakh from base and negative Rs 2.5 lakh from downside. Expected NPV is therefore Rs 5.5 lakh. A positive average does not remove the Rs 10 lakh downside, and the decision remains sensitive to subjective probabilities and omitted extreme outcomes.',
  isa_audit_027: 'Convert each completion time into a daily work rate. A completes 1/12 of the job per day and B completes 1/18. Their combined rate is 3/36 + 2/36 = 5/36 per day. Time is the reciprocal: 36/5 = 7.2 days, which is appropriately less than either individual completion time.',
  isa_030: 'Compare the wrong entry with the correct one. Bank Cr Rs 40,000 appears in both and is already right. The wrong debit to Advertising Expense must be cancelled with a credit, and the unused rent benefit must be recognised as Prepaid Rent with a debit. Profit rises and current assets rise by Rs 40,000 after correction.',
  isa_045: 'Calculate each operating interval with the matching flow: DSO = 600/7,300 x 365 = 30 days; DIO = 540/4,380 x 365 = 45 days; DPO = 250/3,650 x 365 = 25 days. The cash conversion cycle is 45 + 30 - 25 = 50 days, the approximate period financed by the business.',
  isa_046: 'Net margin is 180/2,000 = 9%. Asset turnover is 2,000/1,500 = 1.333 times. The equity multiplier is 1,500/600 = 2.5 times. Multiplying 9% x 1.333 x 2.5 gives approximately 30%, which agrees with the direct ROE calculation of 180/600.',
  isa_047: 'Gross leverage = debt/EBITDA = 1,200/300 = 4.0 times. Net debt is 1,000 after deducting cash, so net leverage = 1,000/300 = 3.33 times. EBIT interest coverage = 220/55 = 4.0 times. The ratios show both debt burden and the earnings cushion available for interest.',
  isa_057: 'Use market-value capital weights as supplied. Equity contributes 60% x 15% = 9.0%. After-tax debt cost is 9% x (1 - 25%) = 6.75%, and its weighted contribution is 40% x 6.75% = 2.7%. WACC is therefore 11.7%, suitable for comparable-risk unlevered cash flows.',
  isa_060: 'Annual COGS of Rs 365 million implies average daily cost of Rs 1 million. Reducing DIO by ten days lowers average inventory by about Rs 10 million and releases the same amount of cash. Confirm that the reduction is operationally sustainable rather than caused by stock-outs, write-offs or temporary purchasing cuts.',
  isa_066: 'CAGR is the constant annual rate that compounds Rs 80 million to Rs 125 million over three intervals. Compute (125/80)^(1/3) - 1 = approximately 16.0%. Dividing the total 56.25% increase by three would be incorrect because growth compounds on a changing base.',
  isa_068: 'Debt and equity together contain five equal ratio parts. Each part is Rs 25 million / 5 = Rs 5 million. Debt receives three parts, or Rs 15 million, and equity receives two parts, or Rs 10 million. The two amounts sum back to total capital, completing the check.',
  isa_071: 'Set budget revenue, price and volume indices to 1.00. Actual revenue is 1.20 and actual price is 0.90. Because Revenue = Price x Volume, actual volume index = 1.20/0.90 = 1.333. Unit volume is therefore approximately 33.3% above budget, not merely the difference between 20% and negative 10%.',
  isa_079: 'Translate the statements into inequalities: S < P, P < Q and Q < R. Combining them creates the complete chain S < P < Q < R. Because every report is included and every relative position is fixed, no alternative order can satisfy all three conditions.',
  isa_082: 'The premise “Some managers are accountants” guarantees at least one person in both sets. “No accountant is a lawyer” places every accountant outside the lawyer set. That guaranteed manager-accountant is therefore not a lawyer, so at least some managers are not lawyers. The conclusion necessarily follows.',
};

const moduleChecks = {
  financial_management: 'Finish by applying the relevant decision rule and checking whether the cash-flow and discount-rate assumptions are consistent.',
  accounting: 'Finish by tracing the amount to profit and the closing asset, liability or equity balance.',
  financial_statements: 'Finish by checking the statement linkage and confirming that Assets = Liabilities + Equity.',
  book_entry: 'Finish by checking the contra-account posting, closing balance and trial-balance side.',
  ratios: 'Finish by stating the unit and interpreting the result using the underlying business driver.',
  rectification_entries: 'Finish by checking whether Suspense is required and whether the correction repairs profit and the trial-balance difference.',
  journal_entries: 'Finish by confirming total debits equal total credits and tracing the entry to the ledger and financial statements.',
  arithmetic: 'Finish with a unit and direction check against the facts in the question.',
  logical_reasoning: 'Finish by testing the conclusion against every stated condition and rejecting any merely possible alternative.',
};

const splitIntoSteps = (text) => text
  .split(/(?<=[.!?])\s+|\n+/)
  .map((part) => part.trim())
  .filter((part) => part.length >= 18);

export const enrichIronSidesQuestion = (card) => {
  const explanation = explanationOverrides[card.id] ?? card.explanation;
  if (card.type !== 'solving' || card.solutionSteps?.length) {
    return { ...card, explanation };
  }

  const candidates = [
    ...splitIntoSteps(card.answer),
    ...(card.formula ? [`Use the governing relationship: ${card.formula}.`] : []),
    ...splitIntoSteps(explanation),
  ];
  const seen = new Set();
  const solutionSteps = candidates.filter((step) => {
    const key = step.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 6);

  if (solutionSteps.length < 3) {
    solutionSteps.push(moduleChecks[card.moduleId]);
  }

  return {
    ...card,
    explanation,
    solutionSteps,
  };
};
