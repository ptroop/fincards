import { zeroToHeroModules, zeroToHeroQuestions } from './ironsidesZeroToHero.js';
import { ironsidesAuditQuestions } from './ironsidesAuditQuestions.js';
import { ironsidesStandardQuestions } from './ironsidesStandardQuestions.js';

const concept = (id, title, explanation, formulae = [], example = '', trap = '') => ({
  id,
  title,
  explanation,
  formulae,
  example,
  trap,
});

const mcq = (id, moduleId, difficulty, question, options, correctOption, answer, explanation, formula = '') => ({
  id: `isa_${id}`,
  moduleId,
  type: 'mcq',
  difficulty,
  question,
  options,
  correctOption,
  answer,
  explanation,
  formula,
});

const solve = (id, moduleId, difficulty, question, answer, explanation, formula = '') => ({
  id: `isa_${id}`,
  moduleId,
  type: 'solving',
  difficulty,
  question,
  answer,
  explanation,
  formula,
});

const legacyIronsidesModules = [
  {
    id: 'bookkeeping',
    order: 1,
    title: 'Accounting Foundations & Bookkeeping',
    shortTitle: 'Bookkeeping',
    description: 'Build the accounting equation, account classification, debit-credit logic, source books, ledgers, and trial balance before attempting adjustments.',
    concepts: [
      concept(
        'bookkeeping_equation',
        'Accounting equation and dual effect',
        'Every transaction has at least two effects because every resource controlled by a business must be financed by either creditors or owners. Revenue increases equity through profit, expenses reduce equity, drawings reduce owner equity directly, and asset exchanges can leave the total unchanged.',
        [{ label: 'Accounting equation', expression: 'Assets = Liabilities + Equity', variables: 'Assets are resources; liabilities are creditor claims; equity is the residual owner claim.' }],
        'Buying equipment for cash increases equipment and decreases cash by the same amount, so total assets and the equation remain unchanged.',
        'Do not assume every transaction changes profit. Borrowing, owner investment, and buying an asset for cash have no immediate income-statement effect.',
      ),
      concept(
        'bookkeeping_accounts',
        'Account classification and normal balances',
        'Assets, expenses, and drawings normally carry debit balances. Liabilities, equity, and income normally carry credit balances. A contra-account carries the opposite balance to the account it offsets: accumulated depreciation is a credit-balance contra-asset, while sales returns is a debit-balance contra-revenue account.',
        [{ label: 'Expanded equation', expression: 'Assets + Expenses + Drawings = Liabilities + Equity + Income', variables: 'The left side normally increases with debits; the right side normally increases with credits.' }],
        'Recording rent expense debits rent expense and credits cash or rent payable.',
        '“Debit” does not mean bad and “credit” does not mean good. The effect depends on the type of account.',
      ),
      concept(
        'bookkeeping_cycle',
        'Books of original entry, ledger, and trial balance',
        'Transactions begin with source documents, enter a journal or special-purpose book, post to individual ledger accounts, and are summarized in a trial balance. Adjusting entries are then recorded before financial statements are prepared and temporary accounts are closed.',
        [],
        'A credit sale is recorded in the sales journal, posted to the customer ledger and sales account, and included in the trial balance.',
        'A balanced trial balance proves only that total debits equal total credits. It cannot detect complete omissions, compensating errors, or posting to the wrong account on the correct side.',
      ),
      concept(
        'bookkeeping_basis',
        'Accrual basis, recognition, and matching',
        'Accrual accounting records revenue when earned and expenses when resources are consumed or obligations arise, not merely when cash moves. Matching places costs in the period in which they help generate revenue, while prudence prevents unsupported asset or income recognition.',
        [{ label: 'Period profit', expression: 'Profit = Revenue earned − Expenses incurred', variables: 'Cash collected and cash paid can occur in different periods.' }],
        'A twelve-month insurance premium paid upfront is initially an asset and becomes expense as coverage is consumed.',
        'Cash received is not automatically revenue; it may create a liability such as unearned revenue.',
      ),
    ],
  },
  {
    id: 'journal_entries',
    order: 2,
    title: 'Journal Entries',
    shortTitle: 'Journal Entries',
    description: 'The highest-priority block: identify the accounts, classify them, decide what changes, record the entry, and trace the statement impact.',
    concepts: [
      concept(
        'journal_method',
        'A reliable five-step entry method',
        'First identify the economic event. Second identify every affected account. Third classify each account. Fourth determine whether each account increased or decreased. Fifth apply the normal-balance rule and verify that total debits equal total credits.',
        [],
        'For wages incurred but unpaid: wage expense increases, so debit it; wages payable increases, so credit it.',
        'Do not begin with a memorized debit or credit. Begin with the economic event and account movement.',
      ),
      concept(
        'journal_revenue',
        'Sales, receivables, returns, and collections',
        'A credit sale recognizes revenue and a receivable when performance is complete. Collection later converts receivables into cash without creating new revenue. Returns reverse revenue through a contra-revenue account and reduce the customer balance or cash.',
        [],
        'Credit sale: Accounts Receivable Dr; Sales Revenue Cr. Later collection: Cash Dr; Accounts Receivable Cr.',
        'Recording revenue again when cash is collected overstates both revenue and profit.',
      ),
      concept(
        'journal_expenses',
        'Expenses, accruals, prepayments, and provisions',
        'Cash timing determines whether an item is an immediate expense, prepaid asset, accrued liability, or settlement of an existing liability. Estimates such as doubtful-debt allowances use an expense and a contra-asset rather than waiting until every customer default is known.',
        [],
        'Year-end accrued interest: Interest Expense Dr; Interest Payable Cr.',
        'Paying an already accrued expense reduces cash and the payable; it does not create the expense a second time.',
      ),
      concept(
        'journal_noncurrent',
        'Fixed assets, depreciation, and disposal',
        'A qualifying long-term asset is capitalized at attributable cost. Depreciation allocates depreciable cost over useful life using a contra-asset. On disposal, remove both original cost and accumulated depreciation, record consideration received, and recognize the balancing gain or loss.',
        [{ label: 'Straight-line depreciation', expression: 'Annual depreciation = (Cost − Residual value) ÷ Useful life', variables: 'Cost includes directly attributable costs; residual value is expected disposal value.' }],
        'Depreciation entry: Depreciation Expense Dr; Accumulated Depreciation Cr.',
        'Do not credit the asset account for annual depreciation when the accumulated-depreciation method is used.',
      ),
      concept(
        'journal_financing',
        'Capital, drawings, debt, interest, and dividends',
        'Owner contributions and share issues increase cash and equity but are not revenue. Borrowings increase cash and a liability but are not income. Principal repayment reduces debt, while interest is an expense. Dividends are distributions of equity, not operating expenses.',
        [],
        'Loan instalment containing ₹80 principal and ₹20 interest: Loan Dr ₹80; Interest Expense Dr ₹20; Bank Cr ₹100.',
        'Combining principal and interest as one expense understates liabilities and overstates expenses.',
      ),
    ],
  },
  {
    id: 'rectification',
    order: 3,
    title: 'Adjustments & Rectification Entries',
    shortTitle: 'Rectification',
    description: 'Correct timing, classification, valuation, and posting errors without losing the original transaction logic.',
    concepts: [
      concept(
        'rectification_types',
        'Errors disclosed and not disclosed by trial balance',
        'One-sided posting or casting errors usually disturb the trial balance and may temporarily use a suspense account. Complete omission, error of principle, compensating errors, and posting the correct amount to the wrong account on the correct side can leave the trial balance balanced.',
        [],
        'Furniture debited to purchases is an error of principle: debit furniture and credit purchases.',
        'Never assume a balanced trial balance means the accounts are correct.',
      ),
      concept(
        'rectification_process',
        'Difference-entry method',
        'Determine what was recorded, determine what should have been recorded, and post only the difference needed to transform the wrong entry into the correct entry. If one side is unknown before errors are located, use suspense temporarily and clear it when rectified.',
        [],
        'If sales of ₹9,800 were posted as ₹8,900, credit sales by the ₹900 difference.',
        'Reversing the entire wrong entry and posting the correct entry works, but it creates unnecessary movement when a simple difference entry is sufficient.',
      ),
      concept(
        'adjusting_entries',
        'Period-end adjusting entries',
        'Adjusting entries enforce cut-off and accrual accounting. Accrued income creates an asset and income; accrued expense creates an expense and liability; prepayments defer expense into an asset; unearned income defers revenue into a liability; depreciation and allowances update carrying values.',
        [],
        'Insurance paid ₹24,000 for twelve months with three months consumed: Insurance Expense Dr ₹6,000; Prepaid Insurance Dr ₹18,000; Bank Cr ₹24,000 at payment, or adjust the existing posting by the required difference.',
        'Use the remaining benefit or obligation at the reporting date, not simply the original cash amount.',
      ),
      concept(
        'inventory_cutoff',
        'Inventory, purchases, and cut-off',
        'Inventory belongs to the entity that controls it at period end. Goods received before year-end may require inventory and payable recognition even when the invoice arrives later. Closing inventory reduces cost of goods sold and appears as a current asset.',
        [{ label: 'Cost of goods sold', expression: 'COGS = Opening inventory + Purchases + Direct costs − Closing inventory', variables: 'Adjust purchases for returns, carriage inward, and other policy-defined direct costs.' }],
        'Goods received before year-end but invoiced afterward require an accrual when control and the obligation already exist.',
        'Do not determine cut-off only from invoice date; inspect dispatch, receipt, shipping terms, and control transfer.',
      ),
    ],
  },
  {
    id: 'financial_statements',
    order: 4,
    title: 'Financial Statements & Cash Flow',
    shortTitle: 'Statements',
    description: 'Prepare and connect the income statement, balance sheet, cash-flow statement, and equity movement after adjustments.',
    concepts: [
      concept(
        'statements_income',
        'Income statement architecture',
        'Revenue less cost of goods sold gives gross profit. Operating expenses produce operating profit or EBIT. Financing costs and non-operating items lead to profit before tax, and tax leads to net income. Classification matters because users compare margins and recurring performance.',
        [
          { label: 'Gross profit', expression: 'Gross profit = Revenue − COGS', variables: 'COGS contains direct costs associated with goods or services sold.' },
          { label: 'Operating profit', expression: 'EBIT = Gross profit − Operating expenses', variables: 'EBIT includes depreciation and amortization unless separately defined.' },
        ],
        'Capitalizing an operating cost can increase current EBITDA and profit while creating future depreciation.',
        'EBITDA is not cash flow because it ignores capex, working capital, tax, and financing.',
      ),
      concept(
        'statements_balance',
        'Balance sheet structure and working capital',
        'The balance sheet reports assets, liabilities, and equity at a date. Current classification focuses on the operating cycle or expected settlement within the applicable period. Operating working capital generally excludes cash, investments, and interest-bearing debt.',
        [{ label: 'Operating NWC', expression: 'Operating NWC = Operating current assets − Operating current liabilities', variables: 'Often AR + Inventory + other operating current assets − AP − operating accruals.' }],
        'An increase in receivables from credit sales raises assets and profit but usually consumes operating cash.',
        'A large current asset is not automatically liquid; inspect aging, recoverability, and restrictions.',
      ),
      concept(
        'statements_cashflow',
        'Cash flow by operating, investing, and financing activity',
        'Operating cash flow converts accrual profit to operating cash by adjusting non-cash items, non-operating gains or losses, and working-capital movements. Investing captures long-term asset investment and disposal. Financing captures debt, equity, dividends, and similar capital flows.',
        [{ label: 'Indirect CFO', expression: 'CFO = Net income + Non-cash charges − Non-operating gains + Non-operating losses − Increase in operating NWC', variables: 'A decrease in operating NWC releases cash and therefore reverses the sign.' }],
        'Depreciation reduces net income but is added back in CFO because the current-period expense is non-cash.',
        'Adding depreciation back does not mean depreciation creates cash; it merely reverses a non-cash expense in the reconciliation.',
      ),
      concept(
        'statements_links',
        'Three-statement linkage',
        'Net income flows into retained earnings and usually starts the indirect cash-flow statement. Ending cash from the cash-flow statement becomes balance-sheet cash. Capital expenditure increases PP&E and investing outflow; depreciation reduces PP&E and profit; debt affects liabilities, cash, and financing flows.',
        [{ label: 'Retained earnings', expression: 'Ending retained earnings = Beginning retained earnings + Net income − Dividends ± Prior-period adjustments', variables: 'Other equity movements may be presented separately.' }],
        'A credit sale raises revenue, net income, retained earnings, and receivables, but not cash until collection.',
        'Always state tax effects when walking through a change in an expense.',
      ),
    ],
  },
  {
    id: 'ratios',
    order: 5,
    title: 'Ratio Analysis & Interpretation',
    shortTitle: 'Ratios',
    description: 'Calculate liquidity, profitability, efficiency, leverage, and return ratios, then explain what moved and why.',
    concepts: [
      concept(
        'ratios_liquidity',
        'Liquidity ratios',
        'The current ratio compares all current assets with current liabilities, while the quick ratio excludes less-liquid items such as inventory and prepayments. Ratios must be interpreted with operating cycle, asset quality, seasonality, and committed funding.',
        [
          { label: 'Current ratio', expression: 'Current ratio = Current assets ÷ Current liabilities', variables: 'Both balances are measured at the same reporting date.' },
          { label: 'Quick ratio', expression: 'Quick ratio = (Cash + Marketable securities + Receivables) ÷ Current liabilities', variables: 'Exact definitions may vary by assessment.' },
        ],
        'Paying a current liability with cash can raise the current ratio when it is already above 1.0, despite reducing cash.',
        'A higher current ratio can reflect obsolete inventory or overdue receivables rather than stronger liquidity.',
      ),
      concept(
        'ratios_profit',
        'Profitability and returns',
        'Margins measure profit at different stages of the income statement. ROA relates profit to resources controlled, ROE relates profit to shareholder capital, and ROCE or ROIC focuses on operating returns on long-term capital. Use average balance-sheet denominators when possible.',
        [
          { label: 'Net margin', expression: 'Net margin = Net income ÷ Revenue', variables: 'Use profit attributable to the relevant shareholders when needed.' },
          { label: 'ROE', expression: 'ROE = Net income available to common ÷ Average common equity', variables: 'Average equity reduces distortion from period-end transactions.' },
          { label: 'DuPont ROE', expression: 'ROE = Net margin × Asset turnover × Equity multiplier', variables: 'Separates margin, efficiency, and leverage.' },
        ],
        'ROE can increase after a debt-funded buyback even if operating profit is unchanged.',
        'Never call a higher ROE automatically better without checking leverage and the size of the equity base.',
      ),
      concept(
        'ratios_efficiency',
        'Turnover and cash conversion',
        'Turnover ratios connect flows from the income statement with average balance-sheet stocks. DSO measures collection time, DIO measures inventory holding time, DPO measures supplier-payment time, and the cash conversion cycle combines them.',
        [
          { label: 'DSO', expression: 'DSO = Average receivables ÷ Credit sales × Days', variables: 'Use credit sales when available.' },
          { label: 'DIO', expression: 'DIO = Average inventory ÷ COGS × Days', variables: 'COGS matches inventory at cost.' },
          { label: 'DPO', expression: 'DPO = Average payables ÷ Credit purchases × Days', variables: 'COGS is an approximation when purchases are unavailable.' },
          { label: 'Cash conversion cycle', expression: 'CCC = DIO + DSO − DPO', variables: 'Measures approximate operating cash lock-up in days.' },
        ],
        'A rise in DSO can indicate weaker collections, looser credit terms, disputes, or revenue cut-off problems.',
        'Extending DPO may release cash but can damage supplier relationships or signal stress.',
      ),
      concept(
        'ratios_leverage',
        'Leverage and debt service',
        'Debt-to-equity measures balance-sheet financing mix, debt-to-EBITDA compares debt with an operating earnings proxy, and interest coverage measures the cushion over financing cost. Analyze covenant definitions, leases, debt-like items, cash, maturity, and cyclicality.',
        [
          { label: 'Debt to equity', expression: 'Debt-to-equity = Total debt ÷ Shareholders’ equity', variables: 'Specify gross or net debt and book or market equity.' },
          { label: 'Interest coverage', expression: 'Interest coverage = EBIT ÷ Interest expense', variables: 'Some lenders use EBITDA or fixed-charge coverage instead.' },
        ],
        'A company can have acceptable leverage but weak liquidity if a large maturity is due before cash is generated.',
        'Do not mix net debt in the numerator with gross interest expense without explaining the convention.',
      ),
    ],
  },
  {
    id: 'financial_management',
    order: 6,
    title: 'Financial Management',
    shortTitle: 'Financial Management',
    description: 'Cover time value, capital budgeting, cost of capital, leverage, working-capital policy, and financing decisions.',
    concepts: [
      concept(
        'fm_tvm',
        'Time value of money',
        'Money today is worth more than the same nominal amount later because it can earn a return and because future cash is uncertain. Compounding moves present money forward; discounting brings future cash back to today using a rate consistent with timing and risk.',
        [
          { label: 'Future value', expression: 'FV = PV × (1 + r)^n', variables: 'PV is present value; r is periodic rate; n is number of periods.' },
          { label: 'Present value', expression: 'PV = FV ÷ (1 + r)^n', variables: 'Rate and periods must use the same frequency.' },
        ],
        '₹1,000 invested at 10% for two years becomes ₹1,210.',
        'Do not use an annual rate with monthly periods unless the rate has been converted consistently.',
      ),
      concept(
        'fm_budgeting',
        'NPV, IRR, payback, and project choice',
        'NPV discounts all incremental project cash flows at the required return and measures value added today. IRR is the discount rate that sets NPV to zero. Payback measures liquidity and speed of recovery but ignores value after cutoff and, in its basic form, time value.',
        [
          { label: 'Net present value', expression: 'NPV = Σ[CF_t ÷ (1 + r)^t] − Initial investment', variables: 'CF_t is incremental cash flow at time t; r is the required return.' },
          { label: 'Internal rate of return', expression: '0 = Σ[CF_t ÷ (1 + IRR)^t] − Initial investment', variables: 'IRR is solved iteratively.' },
        ],
        'Accept an independent project with positive NPV when assumptions and capital constraints permit.',
        'For mutually exclusive projects, NPV normally outranks IRR when scale or timing creates conflict.',
      ),
      concept(
        'fm_cost_capital',
        'Cost of equity, after-tax debt, and WACC',
        'The cost of capital is the opportunity cost demanded by providers of funds. CAPM estimates cost of equity from risk-free return, systematic risk, and market risk premium. Interest is generally tax-deductible, so WACC uses after-tax cost of debt and market-value weights.',
        [
          { label: 'CAPM', expression: 'Cost of equity = Risk-free rate + Beta × Market risk premium', variables: 'Beta measures systematic equity risk.' },
          { label: 'After-tax cost of debt', expression: 'After-tax Kd = Pre-tax Kd × (1 − Tax rate)', variables: 'The tax shield applies only when deductible and usable.' },
          { label: 'WACC', expression: 'WACC = E/(D+E) × Ke + D/(D+E) × Kd × (1−T)', variables: 'Use market values and a capital structure appropriate for the project.' },
        ],
        'A project with business risk materially different from the company may require a project-specific discount rate.',
        'Do not use book-value capital weights merely because they are easy to find.',
      ),
      concept(
        'fm_leverage',
        'Operating and financial leverage',
        'Operating leverage arises from fixed operating costs and magnifies the effect of sales changes on EBIT. Financial leverage arises from fixed financing costs and magnifies the effect of EBIT changes on earnings available to equity. Combined leverage captures both effects.',
        [
          { label: 'Degree of operating leverage', expression: 'DOL = Contribution ÷ EBIT', variables: 'Measured at a particular activity level.' },
          { label: 'Degree of financial leverage', expression: 'DFL = EBIT ÷ Earnings before tax', variables: 'Simple form assumes interest as the fixed financing charge.' },
          { label: 'Combined leverage', expression: 'DCL = DOL × DFL', variables: 'Shows approximate EPS sensitivity to sales.' },
        ],
        'A high-fixed-cost business can experience a large EBIT decline from a modest sales decline.',
        'Leverage is not inherently good or bad; it increases both upside sensitivity and downside risk.',
      ),
      concept(
        'fm_working_capital',
        'Working-capital policy and financing',
        'Working-capital management balances liquidity, profitability, and resilience. An aggressive policy holds fewer current assets and relies more on short-term finance; a conservative policy carries larger liquidity buffers and more stable long-term funding. The operating cycle determines how long cash is committed.',
        [
          { label: 'Net working capital', expression: 'NWC = Current assets − Current liabilities', variables: 'For operating analysis, exclude cash and interest-bearing debt as instructed.' },
          { label: 'Operating cycle', expression: 'Operating cycle = DIO + DSO', variables: 'The cash cycle subtracts DPO.' },
        ],
        'Reducing inventory can release cash, but excessive reduction can cause stock-outs and lost sales.',
        'The lowest working capital is not automatically optimal.',
      ),
    ],
  },
  {
    id: 'arithmetic',
    order: 7,
    title: 'Basic Arithmetic & Data Interpretation',
    shortTitle: 'Arithmetic',
    description: 'Build fast, accurate percentage, ratio, average, growth, interest, profit, and table-reading skills.',
    concepts: [
      concept(
        'arithmetic_percent',
        'Percentages and percentage-point changes',
        'A percentage change compares the absolute change with the original base. A percentage-point change subtracts two percentages directly. Successive percentage changes multiply; they do not simply add when the base changes.',
        [{ label: 'Percentage change', expression: 'Percentage change = (New − Old) ÷ Old × 100%', variables: 'Old is the comparison base.' }],
        'A margin moving from 20% to 25% rises by 5 percentage points but by 25% relative to its original level.',
        'A 20% fall followed by a 20% rise does not return to the starting value.',
      ),
      concept(
        'arithmetic_ratios',
        'Ratios, proportions, and weighted averages',
        'A ratio expresses relative quantities and can be converted into shares of a total. Weighted averages multiply each value by its economic weight before summing. Use weighted—not simple—averages for prices, costs of capital, portfolio returns, and mixed margins.',
        [{ label: 'Weighted average', expression: 'Weighted average = Σ(Value × Weight) ÷ ΣWeights', variables: 'Weights must represent comparable quantities.' }],
        'A 60:40 debt-equity mix means debt is 60% and equity is 40% of total capital.',
        'A simple average is wrong when observations represent different volumes.',
      ),
      concept(
        'arithmetic_growth',
        'Growth rates and CAGR',
        'Year-on-year growth measures one-period change, while CAGR is the constant annual rate that links beginning and ending values over multiple periods. CAGR smooths volatility and does not describe the path taken.',
        [{ label: 'CAGR', expression: 'CAGR = (Ending value ÷ Beginning value)^(1/n) − 1', variables: 'n is the number of compounding periods.' }],
        'A value doubling over three years has CAGR of approximately 26.0%, not 33.3%.',
        'Count periods, not data points: four year-end observations contain three annual intervals.',
      ),
      concept(
        'arithmetic_interest',
        'Simple and compound interest',
        'Simple interest applies the rate only to original principal. Compound interest applies it to principal plus accumulated interest. Finance assessments often test rate-period consistency and the difference between nominal and effective growth.',
        [
          { label: 'Simple interest', expression: 'SI = Principal × Rate × Time', variables: 'Rate and time must use consistent units.' },
          { label: 'Compound amount', expression: 'Amount = Principal × (1 + r)^n', variables: 'r is the rate per compounding period.' },
        ],
        '₹10,000 compounded annually at 10% for two years becomes ₹12,100.',
        'Do not multiply a compound rate by years as though it were simple interest.',
      ),
      concept(
        'arithmetic_averages',
        'Averages, combined averages, and mixtures',
        'An arithmetic mean equals the total of observations divided by their count. A combined average reconstructs the underlying totals of two or more groups before division by the combined count. Mixture questions use the same weighted-average principle: concentration, price, return, or score must be weighted by the relevant quantity rather than averaged without regard to volume.',
        [
          { label: 'Arithmetic mean', expression: 'Mean = Sum of observations ÷ Number of observations', variables: 'Every observation receives equal weight.' },
          { label: 'Combined average', expression: '(n₁a₁ + n₂a₂) ÷ (n₁ + n₂)', variables: 'n is group size and a is group average.' },
        ],
        'A team of 20 has average salary ₹6 lakh and a team of 30 has average ₹8 lakh. Combined average is (20×6 + 30×8)÷50 = ₹7.2 lakh.',
        'Do not average group averages directly unless group sizes are equal.',
      ),
      concept(
        'arithmetic_profit_discount',
        'Profit, loss, markup, margin, and discount',
        'Profit is selling price less cost, while profit percentage may be stated on cost or sales. Markup is commonly measured on cost; margin is measured on selling price. A discount applies to the marked or quoted price. Successive discounts multiply their remaining-price factors and cannot be added unless the question explicitly defines a single combined discount.',
        [
          { label: 'Profit on cost', expression: '(Selling price − Cost) ÷ Cost × 100%', variables: 'The denominator is cost.' },
          { label: 'Margin on sales', expression: '(Selling price − Cost) ÷ Selling price × 100%', variables: 'The denominator is selling price.' },
        ],
        'An item costing ₹800 and sold for ₹1,000 has 25% markup on cost but 20% margin on sales.',
        'Markup and margin are not interchangeable because they use different denominators.',
      ),
      concept(
        'arithmetic_work_speed',
        'Time and work, speed, distance, and relative motion',
        'Work-rate problems convert completion time into work performed per unit of time; combined rates are added only when parties work simultaneously on the same task. Speed equals distance divided by time. Relative speed is the rate at which separation changes: add speeds for opposite directions and subtract for the same direction. Units must be converted before calculation.',
        [
          { label: 'Combined work rate', expression: '1/T = 1/T₁ + 1/T₂', variables: 'T values are individual completion times for the same whole task.' },
          { label: 'Motion', expression: 'Distance = Speed × Time', variables: 'Use consistent distance and time units.' },
        ],
        'If A completes a task in 6 days and B in 3 days, their combined daily rate is 1/6 + 1/3 = 1/2, so completion takes 2 days.',
        'Do not add completion times; add work rates.',
      ),
      concept(
        'arithmetic_data_interpretation',
        'Tables, charts, and numerical data interpretation',
        'Data interpretation requires extraction of the correct observations, preservation of units, selection of an appropriate denominator, and a calculation tied to the exact comparison requested. Common tasks include totals, shares, weighted averages, growth, index changes, margins, and inference from incomplete data. Approximation is appropriate only when answer choices permit it.',
        [],
        'If revenue rises from ₹80 crore to ₹100 crore while profit rises from ₹8 crore to ₹9 crore, revenue grows 25%, profit grows 12.5%, and margin falls from 10% to 9%.',
        'Do not infer causation from a chart that establishes only association or change.',
      ),
    ],
  },
  {
    id: 'logical_reasoning',
    order: 8,
    title: 'Logical Reasoning',
    shortTitle: 'Logical Reasoning',
    description: 'Practise valid inference, arrangements, sequences, coding, directions, and data sufficiency under time pressure.',
    concepts: [
      concept(
        'lr_syllogism',
        'Syllogisms and valid conclusions',
        'Treat statements as set relationships and accept only conclusions that must follow. “All A are B” does not imply “All B are A.” “Some” establishes existence, while universal statements alone may not establish that any member exists under standard aptitude conventions.',
        [],
        'All analysts are graduates; some graduates are accountants. It does not follow that some analysts are accountants.',
        'Do not import real-world knowledge or assume a converse.',
      ),
      concept(
        'lr_arrangement',
        'Linear and circular arrangements',
        'Translate each condition into a compact positional constraint, anchor fixed information first, and test remaining possibilities systematically. In circular arrangements, relative position matters and rotations are equivalent unless a direction or fixed seat is specified.',
        [],
        'If A sits immediately left of B, place the pair as a block before using weaker clues.',
        'Do not solve complex arrangements mentally; a small diagram prevents repeated work.',
      ),
      concept(
        'lr_sequences',
        'Number and letter sequences',
        'Check first differences, second differences, ratios, alternating patterns, squares, cubes, primes, and position-based letter movement. Prefer the simplest rule that explains every term rather than a rule fitted only to the last pair.',
        [],
        '2, 6, 12, 20, 30 follows n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6.',
        'Do not commit to a pattern until it explains the whole sequence.',
      ),
      concept(
        'lr_data_sufficiency',
        'Data sufficiency',
        'The task is to decide whether the information is sufficient, not necessarily to calculate the final value. Test each statement independently before combining them and watch whether multiple valid solutions remain.',
        [],
        'To determine x, x+y=10 is insufficient and x−y=2 is insufficient; together they are sufficient.',
        'Finding one possible answer does not prove sufficiency; establish uniqueness.',
      ),
      concept(
        'lr_critical_reasoning',
        'Arguments, assumptions, strengthen, and weaken',
        'A critical-reasoning argument contains evidence and a conclusion connected by an inferential gap. An assumption is an unstated condition required for the conclusion to follow. A strengthening statement makes the conclusion more probable by supporting the link or excluding an alternative explanation; a weakening statement damages that link without needing to prove the opposite conclusion.',
        [],
        'If sales rose after an advertisement, the claim that the advertisement caused the increase assumes that no other material cause, such as a price reduction, explains the rise.',
        'Do not select a statement merely because it discusses the same subject; it must affect the argument’s inferential link.',
      ),
      concept(
        'lr_order_inequality',
        'Ordering, ranking, and coded inequalities',
        'Ordering questions translate comparative statements into a consistent chain. Ranking from opposite ends uses the total-count relationship, while coded inequalities require substitution of the symbol meanings before inference. Equality and strict inequality must be preserved; if two elements are only known to exceed a third, their order relative to each other remains undetermined.',
        [{ label: 'Opposite-end rank', expression: 'Total persons = Rank from left/top + Rank from right/bottom − 1', variables: 'Both ranks refer to the same person.' }],
        'If A>B, C>A and D<C, then C>A>B is certain, while the relative order of D and A is not determined without another condition.',
        'Do not impose a complete order when the statements establish only a partial order.',
      ),
      concept(
        'lr_relations_directions',
        'Family relations and direction sense',
        'Family-relation problems should be represented by generation, gender, marriage, and parent-child links rather than verbal intuition. Direction questions should be placed on a coordinate grid: north-south movements affect the vertical coordinate and east-west movements affect the horizontal coordinate. Final displacement is distinct from total distance travelled.',
        [{ label: 'Displacement', expression: '√(Horizontal change² + Vertical change²)', variables: 'Use only net coordinate changes, not the full path length.' }],
        'A person walking 4 km north, 3 km east and 4 km south finishes 3 km east of the start after travelling 11 km.',
        'Do not treat “brother of my father” and “father of my brother” as equivalent relationships.',
      ),
      concept(
        'lr_statement_analysis',
        'Statements, assumptions, cause-effect, and courses of action',
        'Statement-analysis questions distinguish what is explicitly established from what is merely plausible. A valid assumption is necessary or taken for granted by the statement. A cause must precede and plausibly produce the stated effect; temporal association alone is insufficient. A course of action must address the problem, be feasible, and avoid relying on facts absent from the prompt.',
        [],
        'A decline in collections after credit terms were extended is consistent with the policy causing slower cash conversion, but customer distress or billing errors remain alternative causes unless excluded.',
        'Do not choose an extreme course of action when a narrower response directly addresses the stated problem.',
      ),
    ],
  },
];

const legacyIronsidesAssessmentQuestions = [
  mcq('001', 'bookkeeping', 'Easy', 'A company receives ₹500,000 from issuing shares. Which effect is correct?', ['Revenue and cash increase', 'Cash and share capital increase', 'Cash and loan liability increase', 'Share capital increases and retained earnings decrease'], 1, 'Cash and share capital increase by ₹500,000.', 'A share issue is an owner-financing transaction. It increases an asset and contributed equity but does not create revenue or profit.'),
  mcq('002', 'bookkeeping', 'Medium', 'Which error can remain undetected even when the trial balance agrees?', ['Posting a debit amount to the credit side', 'Posting only one side of an entry', 'Purchasing machinery but debiting purchases', 'Under-casting the debit total of an account'], 2, 'Purchasing machinery but debiting purchases.', 'Both entries debit an account and credit cash or payable, so debits still equal credits. The mistake is an error of principle because a capital asset was treated as an operating purchase.'),
  mcq('003', 'bookkeeping', 'Medium', 'Which account normally has a credit balance?', ['Prepaid insurance', 'Sales returns', 'Accumulated depreciation', 'Drawings'], 2, 'Accumulated depreciation.', 'Accumulated depreciation is a contra-asset with a normal credit balance. Prepayments are assets, while sales returns and drawings normally carry debit balances.'),
  mcq('004', 'bookkeeping', 'Medium', 'A customer pays an invoice that was recorded as revenue last month. What happens now?', ['Revenue and cash increase', 'Cash increases and receivables decrease', 'Cash and deferred revenue increase', 'Receivables and revenue decrease'], 1, 'Cash increases and accounts receivable decreases.', 'Revenue was recognized when it was earned. Collection only converts one asset into another and has no new income-statement effect.'),
  solve('005', 'bookkeeping', 'Medium', 'Opening assets are ₹900, liabilities are ₹400, and equity is ₹500. The company borrows ₹200 and immediately buys equipment for ₹150 cash. Calculate closing assets, liabilities, and equity.', 'Closing assets are ₹1,100, liabilities are ₹600, and equity remains ₹500.', 'Borrowing raises cash and liabilities by ₹200, so assets become ₹1,100 and liabilities ₹600. Buying equipment for cash exchanges ₹150 of cash for ₹150 of equipment, leaving total assets unchanged. The equation remains ₹1,100 = ₹600 + ₹500.', 'Assets = Liabilities + Equity'),
  solve('006', 'bookkeeping', 'Medium', 'Prepare the accounting effect of paying ₹36,000 for a twelve-month insurance policy on the first day of the year and recognizing three months of coverage.', 'At payment: Prepaid Insurance Dr ₹36,000; Bank Cr ₹36,000. After three months: Insurance Expense Dr ₹9,000; Prepaid Insurance Cr ₹9,000. The remaining prepaid asset is ₹27,000.', 'The payment creates a future economic benefit. Expense is recognized as coverage is consumed: ₹36,000 ÷ 12 × 3 = ₹9,000.', 'Expense recognized = Premium × Months consumed ÷ Total coverage months'),
  solve('007', 'bookkeeping', 'Hard', 'A trial balance agrees. Later, a ₹75,000 vehicle purchase is found in the purchases account. Explain why the trial balance agreed and give the correcting entry.', 'The trial balance agreed because the wrong entry still contained equal debits and credits. Correct it with Vehicle Dr ₹75,000; Purchases Cr ₹75,000.', 'Cash or the supplier was already credited correctly. The rectification reclassifies the debit from an operating purchase to a non-current asset without changing total debits or credits.'),
  solve('008', 'bookkeeping', 'Hard', 'Explain the complete accounting cycle for a ₹120,000 credit sale, from source document to financial statements.', 'Create the sales invoice, record Accounts Receivable Dr ₹120,000 and Sales Revenue Cr ₹120,000, post to the customer and sales ledgers, include both balances in the trial balance, and present receivables as an asset and sales in revenue. Profit increases equity through retained earnings; no cash flow occurs until collection.', 'The cycle connects evidence, journal entry, ledger posting, trial balance, adjustment review, and statement presentation. Collection later debits cash and credits receivables.'),

  mcq('009', 'journal_entries', 'Easy', 'Wages of ₹40,000 have been incurred but will be paid next month. Which entry is correct?', ['Wages Payable Dr; Wages Expense Cr', 'Wages Expense Dr; Bank Cr', 'Wages Expense Dr; Wages Payable Cr', 'Prepaid Wages Dr; Bank Cr'], 2, 'Wages Expense Dr ₹40,000; Wages Payable Cr ₹40,000.', 'The employee service has already been consumed, so the expense is recognized now. Non-payment creates a liability.'),
  mcq('010', 'journal_entries', 'Medium', 'A customer prepays ₹240,000 for a twelve-month service contract. What is the entry on receipt?', ['Cash Dr; Revenue Cr', 'Cash Dr; Unearned Revenue Cr', 'Receivable Dr; Revenue Cr', 'Unearned Revenue Dr; Cash Cr'], 1, 'Cash Dr ₹240,000; Unearned Revenue Cr ₹240,000.', 'The company has cash but still owes future service. Revenue is recognized as the performance obligation is satisfied.'),
  mcq('011', 'journal_entries', 'Medium', 'A company increases its allowance for doubtful debts by ₹12,000. Which entry is correct?', ['Allowance Dr; Receivables Cr', 'Bad Debt Expense Dr; Allowance Cr', 'Cash Dr; Bad Debt Expense Cr', 'Receivables Dr; Allowance Cr'], 1, 'Bad Debt Expense Dr ₹12,000; Allowance for Doubtful Debts Cr ₹12,000.', 'The estimate reduces net receivables through a contra-asset and recognizes the expected credit cost in profit.'),
  mcq('012', 'journal_entries', 'Medium', 'A loan instalment includes ₹90,000 principal and ₹10,000 interest. Which treatment is correct?', ['Loan Expense Dr ₹100,000; Bank Cr ₹100,000', 'Loan Dr ₹90,000; Interest Expense Dr ₹10,000; Bank Cr ₹100,000', 'Interest Expense Dr ₹100,000; Bank Cr ₹100,000', 'Bank Dr ₹100,000; Loan Cr ₹90,000; Interest Income Cr ₹10,000'], 1, 'Loan Dr ₹90,000; Interest Expense Dr ₹10,000; Bank Cr ₹100,000.', 'Principal reduces the liability; interest is the cost of borrowing for the period.'),
  mcq('013', 'journal_entries', 'Hard', 'Goods costing ₹30,000 are withdrawn by the proprietor for personal use. Which entry is best?', ['Drawings Dr; Purchases/Inventory Cr', 'Salary Expense Dr; Inventory Cr', 'Cash Dr; Sales Cr', 'Purchases Dr; Capital Cr'], 0, 'Drawings Dr ₹30,000; Purchases or Inventory Cr ₹30,000, depending on the inventory system.', 'The withdrawal is not a business expense or sale. It reduces owner equity and removes goods from business resources.'),
  solve('014', 'journal_entries', 'Medium', 'A machine costs ₹600,000, has residual value ₹60,000, and a six-year useful life. Record one year of straight-line depreciation.', 'Annual depreciation is ₹90,000. Entry: Depreciation Expense Dr ₹90,000; Accumulated Depreciation—Machine Cr ₹90,000.', 'Depreciable cost is ₹600,000 − ₹60,000 = ₹540,000. Dividing by six gives ₹90,000 per year.', 'Annual depreciation = (Cost − Residual value) ÷ Useful life'),
  solve('015', 'journal_entries', 'Hard', 'Equipment costing ₹500,000 with accumulated depreciation of ₹320,000 is sold for ₹150,000 cash. Prepare the disposal entry.', 'Cash Dr ₹150,000; Accumulated Depreciation Dr ₹320,000; Loss on Disposal Dr ₹30,000; Equipment Cr ₹500,000.', 'Net book value is ₹180,000. Proceeds are ₹30,000 below book value, so the difference is a loss. The entry removes both cost and accumulated depreciation.', 'Gain/(Loss) = Sale proceeds − Net book value'),
  solve('016', 'journal_entries', 'Medium', 'A company makes credit sales of ₹800,000 and later accepts returns of ₹50,000 from those customers. Record both entries, ignoring inventory cost.', 'Sale: Accounts Receivable Dr ₹800,000; Sales Revenue Cr ₹800,000. Return: Sales Returns Dr ₹50,000; Accounts Receivable Cr ₹50,000.', 'The return uses a contra-revenue account so gross sales and returns remain visible. Net receivables and net revenue are both ₹750,000 before collections.'),
  solve('017', 'journal_entries', 'Hard', 'At year-end, interest of ₹24,000 has accrued on a bank loan. It is paid in the next period. Record both dates and explain the profit effect.', 'Year-end: Interest Expense Dr ₹24,000; Interest Payable Cr ₹24,000. Payment date: Interest Payable Dr ₹24,000; Bank Cr ₹24,000. Profit falls in the year the interest accrues, not when it is paid.', 'Accrual accounting recognizes the financing cost in the period the loan is used. The later payment settles the liability and does not create a second expense.'),
  solve('018', 'journal_entries', 'Hard', 'A company pays a single invoice of ₹1,180,000 for machinery. The total includes ₹100,000 refundable tax, ₹50,000 delivery, and ₹30,000 staff training. Determine capitalized cost and prepare the entry.', 'Capitalized machinery cost is ₹1,050,000. Entry: Machinery Dr ₹1,050,000; Tax Receivable Dr ₹100,000; Training Expense Dr ₹30,000; Bank Cr ₹1,180,000.', 'Start with the all-inclusive invoice and remove amounts that are not part of asset cost: ₹1,180,000 − ₹100,000 refundable tax − ₹30,000 training = ₹1,050,000. Delivery remains capitalized because it is directly attributable to bringing the machinery to its required location.', 'Capitalized cost = Total invoice − Refundable tax − Non-capital costs'),
  solve('019', 'journal_entries', 'Hard', 'A company declares a ₹200,000 dividend on 28 March and pays it on 15 April. Record both entries and identify the statement affected at declaration.', '28 March: Retained Earnings/Dividends Dr ₹200,000; Dividend Payable Cr ₹200,000. 15 April: Dividend Payable Dr ₹200,000; Bank Cr ₹200,000. Declaration reduces equity and creates a liability; it is not an income-statement expense.', 'The obligation arises when the dividend is validly declared. Cash changes only when payment occurs.'),
  solve('020', 'journal_entries', 'Hard', 'Inventory purchased on credit for ₹300,000 is later paid with a 2% settlement discount. Record purchase and payment under a gross approach.', 'Purchase: Inventory/Purchases Dr ₹300,000; Accounts Payable Cr ₹300,000. Payment: Accounts Payable Dr ₹300,000; Bank Cr ₹294,000; Purchase Discount/Inventory Cr ₹6,000.', 'The discount is ₹300,000 × 2% = ₹6,000. The credit treatment depends on the inventory system and accounting policy, but the payable must be cleared in full.'),

  mcq('021', 'rectification', 'Medium', 'The sales book is undercast by ₹8,000. Which correction is required?', ['Debit Sales ₹8,000', 'Credit Sales ₹8,000', 'Debit Suspense ₹8,000', 'Credit Receivables ₹8,000'], 1, 'Credit Sales ₹8,000.', 'An undercast sales book means sales were credited too little. The corresponding customer postings are assumed correct in this standard one-sided error.'),
  mcq('022', 'rectification', 'Hard', 'Which error is most likely to require a suspense account before correction?', ['Complete omission of a transaction', 'Furniture recorded as purchases', 'A credit purchase posted to the supplier but omitted from purchases', 'Equal understatement of sales and receivables'], 2, 'A credit purchase posted to the supplier but omitted from purchases.', 'Only the credit side was posted, so the trial balance differs. Suspense temporarily holds the missing debit until the error is corrected.'),
  mcq('023', 'rectification', 'Medium', 'Closing inventory is omitted from the financial statements. What is the immediate effect?', ['Profit and assets are overstated', 'Profit and assets are understated', 'Profit is overstated and liabilities understated', 'Only cash flow is affected'], 1, 'Profit and assets are understated.', 'Closing inventory is a current asset and reduces cost of goods sold. Omitting it understates both inventory and gross profit.'),
  solve('024', 'rectification', 'Medium', 'A credit sale of ₹46,000 was correctly recorded in sales but posted to the customer account as ₹64,000. Give the rectification entry.', 'Suspense Dr ₹18,000; Accounts Receivable—Customer Cr ₹18,000.', 'The customer was over-debited by ₹18,000. Crediting the customer removes the excess. Because only the receivable ledger side was wrong, suspense supplies the correcting debit.'),
  solve('025', 'rectification', 'Hard', 'A repair expense of ₹90,000 was wrongly capitalized as machinery. Record correction and explain the effect on profit and assets.', 'Repairs Expense Dr ₹90,000; Machinery Cr ₹90,000. Profit decreases by ₹90,000 before tax and non-current assets decrease by ₹90,000, ignoring any depreciation already recorded.', 'The expenditure restores rather than creates or substantially improves future economic benefits, so it belongs in current expense. If depreciation was already recorded, reverse the related excess or shortfall separately.'),
  solve('026', 'rectification', 'Hard', 'Rent of ₹120,000 was paid and fully expensed on 1 October for twelve months. The year ends 31 December. Prepare the adjustment.', 'Prepaid Rent Dr ₹90,000; Rent Expense Cr ₹90,000. Only ₹30,000, representing October through December, remains as current-year expense.', 'Nine months of benefit remain after year-end: ₹120,000 × 9/12 = ₹90,000. The adjustment creates an asset and reverses excess expense.', 'Prepayment = Cash paid × Unexpired months ÷ Total months'),
  solve('027', 'rectification', 'Hard', 'Goods costing ₹70,000 were received before year-end, but the invoice arrived afterward and nothing was recorded. Give the year-end adjustment.', 'Inventory/Purchases Dr ₹70,000; Accrued Liability/Accounts Payable Cr ₹70,000.', 'Control and the obligation existed before year-end, so both the asset or purchase and liability must be recognized for correct cut-off. Invoice timing alone does not determine recognition.'),
  solve('028', 'rectification', 'Hard', 'The trial balance difference is a ₹25,000 excess debit. Later, a supplier credit of ₹25,000 is found to have been omitted. Show the correction.', 'Suspense Dr ₹25,000; Accounts Payable—Supplier Cr ₹25,000.', 'The omitted supplier credit caused credits to be short, leaving excess debits. Crediting the supplier and debiting suspense clears the difference.'),
  solve('029', 'rectification', 'Hard', 'A company estimated closing inventory at ₹500,000, but a physical count identifies obsolete goods costing ₹80,000 with net realizable value of ₹30,000. Calculate adjusted inventory and the write-down.', 'Write inventory down by ₹50,000 and report closing inventory of ₹450,000. Entry: Inventory Write-down/COGS Dr ₹50,000; Inventory/Allowance Cr ₹50,000.', 'The obsolete goods are measured at the lower of cost ₹80,000 and NRV ₹30,000. The loss is ₹50,000.', 'Write-down = Cost − NRV when NRV < Cost'),
  solve('030', 'rectification', 'Hard', 'Explain how to rectify an error when the wrong entry was Advertising Expense Dr ₹40,000; Bank Cr ₹40,000, but the payment was actually for prepaid rent.', 'Prepaid Rent Dr ₹40,000; Advertising Expense Cr ₹40,000.', 'The bank credit is already correct. The difference entry removes the incorrect expense and recognizes the correct asset.'),

  mcq('031', 'financial_statements', 'Medium', 'Which transaction increases net income but does not immediately increase cash?', ['Collection of an old receivable', 'Credit sale with no collection', 'Bank borrowing', 'Issue of shares'], 1, 'A credit sale with no collection.', 'Revenue and receivables increase when the sale is earned, while cash waits until collection. Borrowing and share issues raise cash but not income.'),
  mcq('032', 'financial_statements', 'Medium', 'Under the indirect cash-flow method, an increase in inventory is generally:', ['Added to net income', 'Subtracted from net income', 'Classified as financing inflow', 'Ignored because inventory is non-cash'], 1, 'Subtracted from net income.', 'An inventory increase generally represents cash invested in goods not yet expensed through cost of sales.'),
  mcq('033', 'financial_statements', 'Hard', 'Capitalizing a cost that should have been expensed will initially cause which combination?', ['Assets understated and profit understated', 'Assets overstated and profit overstated', 'Liabilities overstated and cash understated', 'Profit understated with no balance-sheet effect'], 1, 'Assets and profit are overstated initially.', 'The improper capitalization avoids current expense and creates an unsupported asset. Later periods may contain excess depreciation or amortization.'),
  solve('034', 'financial_statements', 'Medium', 'Revenue is ₹2,000,000, COGS ₹1,200,000, operating expenses excluding depreciation ₹400,000, and depreciation ₹100,000. Calculate gross profit, EBITDA, EBIT, and relevant margins.', 'Gross profit is ₹800,000 with 40% gross margin. EBITDA is ₹400,000 with 20% EBITDA margin. EBIT is ₹300,000 with 15% EBIT margin.', 'Gross profit = ₹2,000,000 − ₹1,200,000. EBITDA subtracts cash operating expenses of ₹400,000; EBIT also subtracts ₹100,000 depreciation.'),
  solve('035', 'financial_statements', 'Hard', 'Net income is ₹250,000. Depreciation is ₹60,000, receivables increase ₹40,000, inventory decreases ₹25,000, payables decrease ₹15,000, and there are no other adjustments. Calculate CFO.', 'CFO is ₹280,000.', 'Start with ₹250,000, add depreciation ₹60,000, subtract AR increase ₹40,000, add inventory decrease ₹25,000, and subtract AP decrease ₹15,000: ₹250,000 + ₹60,000 − ₹40,000 + ₹25,000 − ₹15,000 = ₹280,000.', 'CFO = Net income + Non-cash charges − Increase in operating assets + Increase in operating liabilities'),
  solve('036', 'financial_statements', 'Hard', 'A company purchases equipment for ₹500,000 cash and records ₹50,000 annual depreciation. Explain the first-year effect across all three statements, ignoring tax.', 'Income statement: depreciation lowers EBIT and net income by ₹50,000. Cash flow: CFO adds back ₹50,000 depreciation, while investing cash flow records ₹500,000 capex outflow, so total cash falls ₹500,000. Balance sheet: cash falls ₹500,000, gross PP&E rises ₹500,000, accumulated depreciation rises ₹50,000, net PP&E rises ₹450,000, and retained earnings fall ₹50,000.', 'The balance sheet remains balanced because total assets fall net ₹50,000 and equity falls ₹50,000.'),
  solve('037', 'financial_statements', 'Hard', 'Beginning retained earnings are ₹900,000, net income is ₹240,000, dividends declared are ₹80,000, and a prior-period correction reduces equity by ₹20,000. Calculate ending retained earnings.', 'Ending retained earnings are ₹1,040,000.', 'Begin with ₹900,000, add current-period net income of ₹240,000, subtract the ₹80,000 distribution and subtract the ₹20,000 direct correction: ₹900,000 + ₹240,000 − ₹80,000 − ₹20,000 = ₹1,040,000.', 'Ending retained earnings = Beginning retained earnings + Net income − Dividends ± Prior-period adjustments'),
  solve('038', 'financial_statements', 'Hard', 'A company reports rising EBITDA but falling operating cash flow. Give four analytical explanations and state what schedules you would inspect.', 'Possible explanations include slower customer collections, inventory build, faster supplier payment, higher cash taxes, restructuring cash costs, or aggressive revenue recognition. Inspect AR aging and DSO, inventory by SKU and DIO, AP aging and DPO, tax payments, one-time cash-cost schedules, and the EBITDA-to-CFO bridge.', 'EBITDA excludes working capital, tax, capex, and many cash timing effects. The correct answer reconciles the two measures rather than treating either as automatically superior.'),
  solve('039', 'financial_statements', 'Hard', 'Current assets are ₹1,500,000 including ₹300,000 cash, and current liabilities are ₹1,000,000 including ₹200,000 short-term debt. Calculate reported NWC and operating NWC assuming all other balances are operating.', 'Reported NWC is ₹500,000. Operating current assets are ₹1,200,000 and operating current liabilities are ₹800,000, so operating NWC is ₹400,000.', 'Reported NWC uses all current balances. Operating NWC excludes cash and interest-bearing debt to isolate capital tied up in operations.'),
  solve('040', 'financial_statements', 'Hard', 'Explain the statement effect of a ₹100 increase in depreciation at a 30% tax rate.', 'EBIT falls ₹100, tax expense falls ₹30, and net income falls ₹70. CFO adds back ₹100 depreciation but starts from net income lower by ₹70, so cash rises by the ₹30 tax shield if taxes are paid. PP&E falls ₹100, cash rises ₹30, and retained earnings fall ₹70, leaving assets and equity both lower by ₹70.', 'The answer must include the tax shield. Without tax, depreciation has no cash effect; with deductible depreciation, it reduces cash taxes by ₹30.'),

  mcq('041', 'ratios', 'Medium', 'A company with a current ratio of 2.0 pays a current liability using cash. What generally happens to the current ratio?', ['It falls', 'It rises', 'It remains exactly unchanged', 'It becomes zero'], 1, 'It generally rises.', 'If current assets are twice current liabilities, subtracting the same amount from both leaves a higher quotient. Example: 200/100 becomes 150/50 = 3.0.'),
  mcq('042', 'ratios', 'Hard', 'ROE rises while net margin and asset turnover are unchanged. Under DuPont analysis, the most direct explanation is:', ['Lower equity multiplier', 'Higher equity multiplier', 'Lower revenue', 'Higher tax rate'], 1, 'A higher equity multiplier.', 'With margin and turnover unchanged, ROE can rise through greater financial leverage or a smaller equity base.'),
  mcq('043', 'ratios', 'Medium', 'Which change normally lengthens the cash conversion cycle?', ['Higher DPO', 'Lower DSO', 'Higher DIO', 'Lower DIO'], 2, 'Higher DIO.', 'Inventory remains on hand longer. Higher DPO and lower DSO or DIO shorten the cash cycle, all else equal.'),
  solve('044', 'ratios', 'Medium', 'Cash is ₹100, receivables ₹250, inventory ₹350, other current assets ₹50, and current liabilities ₹500. Calculate current and quick ratios.', 'Current assets are ₹750, so current ratio is 1.50x. Quick assets are ₹350, so quick ratio is 0.70x.', 'Current ratio includes all stated current assets. The quick ratio here includes cash and receivables only: (₹100 + ₹250) ÷ ₹500.'),
  solve('045', 'ratios', 'Medium', 'Annual credit sales are ₹7,300, average receivables ₹600, COGS ₹4,380, average inventory ₹540, credit purchases ₹3,650, and average payables ₹250. Calculate DSO, DIO, DPO, and CCC using 365 days.', 'DSO = 30 days; DIO = 45 days; DPO = 25 days; CCC = 50 days.', 'DSO = 600/7,300×365. DIO = 540/4,380×365. DPO = 250/3,650×365. CCC = 45 + 30 − 25.', 'CCC = DIO + DSO − DPO'),
  solve('046', 'ratios', 'Hard', 'Net income is ₹180, revenue ₹2,000, average assets ₹1,500, and average equity ₹600. Calculate DuPont components and ROE.', 'Net margin is 9%, asset turnover is 1.333x, equity multiplier is 2.5x, and ROE is 30%.', '9% × 1.333 × 2.5 ≈ 30%. Directly, ₹180 ÷ ₹600 = 30%, confirming the decomposition.', 'ROE = Net margin × Asset turnover × Equity multiplier'),
  solve('047', 'ratios', 'Hard', 'Debt is ₹1,200, cash ₹200, EBITDA ₹300, EBIT ₹220, and interest expense ₹55. Calculate gross leverage, net leverage, and EBIT interest coverage.', 'Gross leverage is 4.0x, net leverage is 3.33x, and EBIT interest coverage is 4.0x.', 'Gross debt/EBITDA = 1,200/300. Net debt/EBITDA = (1,200−200)/300. EBIT/interest = 220/55.'),
  solve('048', 'ratios', 'Hard', 'A company’s gross margin falls from 40% to 34% while revenue rises from ₹100 million to ₹120 million. Calculate gross profit in both periods and interpret.', 'Gross profit rises only slightly, from ₹40 million to ₹40.8 million—an increase of ₹0.8 million or 2% despite 20% revenue growth.', 'New gross profit is ₹120 million × 34% = ₹40.8 million. The business needs ₹20 million more revenue to generate only ₹0.8 million more gross profit, indicating severe margin pressure and weak incremental economics.'),
  solve('049', 'ratios', 'Hard', 'Inventory turnover improves from 5x to 7x. Explain why this may be positive and why it may be risky.', 'It may indicate faster selling, better purchasing, lower obsolescence, and less cash tied up. It may also reflect understocking, lost sales, supplier disruption, or inventory write-downs reducing the denominator.', 'Ratio analysis requires a causal bridge. Check service levels, stock-outs, gross margin, inventory aging, purchase terms, and demand trends before concluding.'),
  solve('050', 'ratios', 'Hard', 'Current ratio increases from 1.4x to 2.1x, but quick ratio falls from 0.9x to 0.6x. Interpret the combined signal.', 'The improvement is concentrated in inventory or other non-quick current assets rather than cash and receivables. Liquidity may have weakened despite the higher current ratio.', 'Investigate inventory build, obsolescence, prepayments, receivable collections, and short-term obligations. The quality and convertibility of current assets matter more than the headline ratio.'),

  mcq('051', 'financial_management', 'Medium', 'For mutually exclusive projects with conflicting IRR and NPV rankings, which criterion should generally dominate?', ['Payback period', 'Accounting profit', 'NPV', 'Highest initial cash inflow'], 2, 'NPV should generally dominate.', 'NPV measures absolute value added using the required return. IRR can mis-rank projects because of scale, timing, or unconventional cash flows.'),
  mcq('052', 'financial_management', 'Medium', 'Which capital component receives a tax adjustment in the standard WACC formula?', ['Cost of equity', 'Risk-free rate', 'Pre-tax cost of debt', 'Equity market value'], 2, 'Pre-tax cost of debt.', 'Interest deductibility can create a tax shield, so debt cost is multiplied by one minus the tax rate when the shield is usable.'),
  mcq('053', 'financial_management', 'Hard', 'A project has substantially greater business risk than the company’s existing operations. The best discount-rate approach is to:', ['Use the company WACC unchanged', 'Use the risk-free rate', 'Estimate a project-appropriate cost of capital', 'Use the project IRR as the discount rate'], 2, 'Estimate a project-appropriate cost of capital.', 'The discount rate must match the project’s systematic risk and financing assumptions. Company WACC can misvalue a project with different risk.'),
  solve('054', 'financial_management', 'Medium', 'Calculate the future value of ₹500,000 invested for three years at 8% compounded annually.', 'Future value is ₹629,856.', 'Apply the annual growth factor three times: ₹500,000 × 1.08³ = ₹629,856. The second and third years earn returns on previously accumulated returns, which is why the compound result exceeds simple interest.', 'FV = PV × (1 + r)^n'),
  solve('055', 'financial_management', 'Medium', 'A project costs ₹1,000,000 and generates ₹450,000 at each year-end for three years. Calculate NPV at 10%.', 'NPV is approximately ₹119,083.', 'PV of inflows = ₹450,000/1.10 + ₹450,000/1.10² + ₹450,000/1.10³ ≈ ₹1,119,083. Subtract initial investment ₹1,000,000. The positive NPV suggests acceptance, subject to assumptions and capital constraints.', 'NPV = Σ[CF_t ÷ (1 + r)^t] − Initial investment'),
  solve('056', 'financial_management', 'Hard', 'Risk-free rate is 6%, market risk premium 7%, and beta 1.2. Calculate cost of equity using CAPM.', 'Cost of equity is 14.4%.', 'CAPM gives 6% + 1.2×7% = 14.4%. Beta scales the equity risk premium for systematic market exposure; it does not measure total volatility or probability of default.', 'Ke = Rf + β × Market risk premium'),
  solve('057', 'financial_management', 'Hard', 'A company is financed by 40% debt and 60% equity. Pre-tax debt cost is 9%, equity cost 15%, and tax rate 25%. Calculate WACC.', 'WACC is 11.7%.', 'Equity component = 60% × 15% = 9.0%. Debt component = 40% × 9% × (1−25%) = 2.7%. Total = 11.7%.', 'WACC = E/V × Ke + D/V × Kd × (1−T)'),
  solve('058', 'financial_management', 'Hard', 'Sales are ₹2,000, variable costs ₹1,200, fixed operating costs ₹500, and interest ₹100. Calculate DOL, DFL, and DCL.', 'Contribution is ₹800, EBIT is ₹300, and earnings before tax are ₹200. DOL = 2.67x, DFL = 1.50x, and DCL = 4.0x.', 'DOL = 800/300. DFL = 300/200. DCL = 2.67×1.5 ≈ 4.0, meaning a 1% sales change produces roughly a 4% pre-tax earnings change near this operating level.', 'DOL = Contribution/EBIT; DFL = EBIT/EBT; DCL = DOL × DFL'),
  solve('059', 'financial_management', 'Hard', 'Project A requires ₹1 million and has NPV ₹250,000. Project B requires ₹5 million and has NPV ₹700,000. A has the higher IRR. If projects are mutually exclusive and capital is available, which should be selected?', 'Select Project B based on its higher NPV, assuming comparable risk and correctly estimated cash flows.', 'IRR gives a percentage return and can favor the smaller project. NPV shows Project B adds ₹450,000 more absolute value.'),
  solve('060', 'financial_management', 'Hard', 'A company reduces DIO by 10 days. Annual COGS is ₹365 million. Estimate the cash released, assuming the change is sustainable.', 'Estimated cash release is ₹10 million.', 'Daily COGS is ₹365 million ÷ 365 = ₹1 million. A 10-day inventory reduction releases approximately ₹10 million.', 'Cash release ≈ Reduction in days × Annual flow ÷ 365'),
  solve('061', 'financial_management', 'Hard', 'Compare aggressive and conservative working-capital policies for a seasonal retailer.', 'An aggressive policy minimizes inventory and liquidity buffers and uses more short-term funding, improving apparent returns but increasing stock-out, refinancing, and disruption risk. A conservative policy carries more seasonal inventory and committed long-term funding, reducing risk but increasing carrying and financing costs.', 'The right answer balances profitability with resilience and aligns funding maturity with the seasonal cash cycle.'),
  solve('062', 'financial_management', 'Hard', 'Explain why a project can have multiple IRRs and how you would evaluate it.', 'Multiple IRRs can arise when cash flows change sign more than once, causing the NPV profile to cross zero repeatedly. Evaluate the project using NPV at the appropriate required return and inspect the full NPV profile or use a modified IRR if requested.', 'IRR assumes a single economically meaningful root, which unconventional cash flows can violate.'),

  mcq('063', 'arithmetic', 'Easy', 'A margin rises from 20% to 25%. Which statement is correct?', ['It rises by 5% and 5 percentage points', 'It rises by 25% and 5 percentage points', 'It rises by 20% and 25 percentage points', 'It rises by 5% and 25 percentage points'], 1, 'It rises by 25% relative to the original margin and by 5 percentage points.', 'Relative change is (25−20)/20 = 25%. Percentage-point change is 25%−20% = 5 points.'),
  mcq('064', 'arithmetic', 'Medium', 'A value falls by 20% and then rises by 20%. Compared with the original value, it is:', ['Unchanged', '4% lower', '4% higher', '8% lower'], 1, 'It is 4% lower.', 'Starting from 100, the value falls to 80 and then rises to 96. Successive percentages apply to different bases.'),
  mcq('065', 'arithmetic', 'Medium', 'A portfolio has 60% invested at an 8% return and 40% at a 14% return. The weighted return is:', ['10.0%', '10.4%', '11.0%', '11.6%'], 1, '10.4%.', 'Weight each return by the proportion of capital exposed to it: 0.60×8% + 0.40×14% = 4.8% + 5.6% = 10.4%. A simple average of 11% would incorrectly give both investments equal economic weight.'),
  solve('066', 'arithmetic', 'Medium', 'Revenue rises from ₹80 million to ₹125 million over three years. Calculate CAGR.', 'CAGR is approximately 16.0%.', '(125/80)^(1/3) − 1 ≈ 16.0%. The three-year period contains three compounding intervals.', 'CAGR = (Ending/Beginning)^(1/n) − 1'),
  solve('067', 'arithmetic', 'Medium', 'A product costs ₹800 and is marked up by 25% on cost, then discounted by 10% on selling price. Calculate final price and profit percentage on cost.', 'Marked price is ₹1,000. Final price is ₹900. Profit is ₹100, or 12.5% of cost.', 'Apply the markup to cost: ₹800×1.25 = ₹1,000. Apply the discount to marked price: ₹1,000×0.90 = ₹900. Profit is ₹900−₹800 = ₹100, and ₹100÷₹800 = 12.5% on cost.'),
  solve('068', 'arithmetic', 'Medium', 'The ratio of debt to equity is 3:2 and total capital is ₹25 million. Calculate debt and equity.', 'Debt is ₹15 million and equity is ₹10 million.', 'The total contains five ratio parts. Each part equals ₹25 million ÷ 5 = ₹5 million. Debt has three parts and equity two.'),
  solve('069', 'arithmetic', 'Hard', 'Division A earns a 30% margin on ₹40 million revenue and Division B earns a 10% margin on ₹60 million. Calculate the consolidated margin.', 'Consolidated profit is ₹18 million and consolidated margin is 18%.', 'Division A profit is ₹12 million and Division B profit ₹6 million. Total profit ₹18 million divided by total revenue ₹100 million gives 18%. A simple average of 30% and 10% would be wrong.'),
  solve('070', 'arithmetic', 'Medium', '₹200,000 earns 12% simple interest for 18 months. Calculate interest and maturity amount.', 'Interest is ₹36,000 and maturity amount is ₹236,000.', 'Convert 18 months to 1.5 years because the rate is annual. Simple interest is ₹200,000×12%×1.5 = ₹36,000. Adding interest to principal gives a maturity amount of ₹236,000.', 'SI = Principal × Rate × Time'),
  solve('071', 'arithmetic', 'Hard', 'Revenue is 20% above budget, but price is 10% below budget. Assuming one product, estimate unit volume relative to budget.', 'Unit volume is approximately 33.3% above budget.', 'Revenue = Price×Volume. Actual revenue index is 1.20 and price index 0.90, so volume index = 1.20/0.90 = 1.333.'),
  solve('072', 'arithmetic', 'Hard', 'A table shows sales of ₹100, ₹120, and ₹150 million over three years, with margins of 20%, 18%, and 16%. Calculate profit each year and explain the trend.', 'Profit is ₹20 million, ₹21.6 million, and ₹24 million. Profit rises, but incremental profitability weakens because margin declines each year.', 'Compute sales×margin. Revenue grows 50% from year one to three, while profit grows only 20%, indicating margin dilution.'),

  mcq('073', 'logical_reasoning', 'Medium', 'Statements: All auditors are accountants. Some auditors are analysts. Which conclusion must follow?', ['Some accountants are analysts', 'All analysts are accountants', 'No accountant is an analyst', 'All accountants are auditors'], 0, 'Some accountants are analysts.', 'The people identified as both auditors and analysts must also be accountants because every auditor belongs to the accountant set. The statements do not establish that all analysts are accountants or that all accountants are auditors.'),
  mcq('074', 'logical_reasoning', 'Medium', 'Find the next number: 3, 8, 15, 24, 35, ?', ['46', '47', '48', '49'], 2, '48.', 'The differences are 5, 7, 9, and 11; the next difference is 13. Therefore 35+13 = 48. Equivalently, terms follow n²+2n.'),
  mcq('075', 'logical_reasoning', 'Medium', 'If FINANCE is coded as GJOBODF by shifting each letter forward once, how is RATIO coded?', ['SBUJP', 'SBTJP', 'QZSHN', 'SBUKO'], 0, 'SBUJP.', 'Apply the same transformation independently to every letter rather than looking for a whole-word pattern: R→S, A→B, T→U, I→J, and O→P. Combining the transformed letters produces SBUJP.'),
  mcq('076', 'logical_reasoning', 'Hard', 'Statement 1: x + y = 20. Statement 2: x − y = 4. Are the statements sufficient to determine x?', ['Statement 1 alone', 'Statement 2 alone', 'Both together, neither alone', 'Even both together are insufficient'], 2, 'Both together are sufficient, but neither alone is sufficient.', 'Each equation alone permits many pairs. Together they produce 2x = 24, so x = 12 uniquely.'),
  solve('077', 'logical_reasoning', 'Medium', 'Five people A, B, C, D, and E sit in a row. B is immediately right of A. C is at the left end. E is immediately left of D. If A is not next to C, determine the order.', 'The order is C, E, D, A, B.', 'Treat AB and ED as blocks. C occupies position 1. AB cannot occupy positions 2–3 because A would be next to C, so AB must occupy 4–5 and ED occupies 2–3.'),
  solve('078', 'logical_reasoning', 'Medium', 'A person walks 6 km north, 8 km east, and 6 km south. How far and in which direction is the person from the starting point?', 'The person is 8 km east of the starting point.', 'Represent the path on coordinates. The 6 km north and 6 km south movements cancel to zero vertical displacement. The horizontal coordinate changes by 8 km east, so final displacement is 8 km east although total distance travelled is 20 km.'),
  solve('079', 'logical_reasoning', 'Hard', 'Four reports P, Q, R, and S are reviewed one at a time. P is before Q, R is after Q, and S is before P. Determine the only valid order.', 'S, P, Q, R.', 'The constraints form a complete chain: S before P before Q before R. No alternative order satisfies all three.'),
  solve('080', 'logical_reasoning', 'Hard', 'A box contains eight identical-looking balls; one is heavier. What is the minimum number of balance-scale weighings needed to guarantee finding it?', 'Two weighings.', 'Weigh three against three. If equal, the heavy ball is among the remaining two, requiring one final weighing. If unequal, it is among the heavier group of three; weigh two of those against each other to identify it.'),
  solve('081', 'logical_reasoning', 'Hard', 'In a six-person circular arrangement, A sits opposite D, B sits immediately clockwise of A, and C sits immediately clockwise of D. Explain what can and cannot yet be determined.', 'The relative positions of A, B, C, and D are fixed up to rotation: place A anywhere, D opposite, B clockwise of A, and C clockwise of D. The remaining two people can occupy the two unfilled seats in either order.', 'Circular rotations are equivalent without a fixed reference point. The clues do not distinguish the remaining pair, so a unique full arrangement cannot be claimed.'),
  solve('082', 'logical_reasoning', 'Hard', 'Statements: Some managers are accountants. No accountant is a lawyer. Evaluate whether “Some managers are not lawyers” follows.', 'Yes, it follows.', 'The managers who are accountants cannot be lawyers because no accountant is a lawyer. Therefore at least some managers are not lawyers.'),
];

const assessmentOnlyModules = legacyIronsidesModules
  .filter((module) => ['arithmetic', 'logical_reasoning'].includes(module.id))
  .map((module, index) => ({
    ...module,
    order: zeroToHeroModules.length + index + 1,
    description: module.id === 'arithmetic'
      ? 'Scope: percentages; ratios and proportions; averages and weighted averages; growth and interest; profit, markup and discount; mixtures; time, work and speed; and numerical data interpretation.'
      : 'Scope: syllogisms; arrangements; sequences; coding; directions; data sufficiency; ordering and inequalities; family relations; critical reasoning; assumptions; and cause-effect analysis.',
    concepts: module.concepts.map((item) => ({
      ...item,
      definition: item.explanation,
      simpleMeaning: item.example,
      eli5: module.id === 'arithmetic'
        ? 'Translate the words into a base value, identify what changes, and preserve units before calculating.'
        : 'Convert every sentence into a precise condition, then accept only conclusions forced by all conditions.',
      subconcepts: [],
      workedExample: item.example,
      indianExample: item.example,
      realEvent: '',
      journalEntries: [],
      sources: [],
    })),
  }));

const sourceModules = [...zeroToHeroModules, ...assessmentOnlyModules];
const sourceModuleById = new Map(sourceModules.map((module) => [module.id, module]));
const supplementalConcept = ({
  id,
  title,
  definition,
  explanation,
  subconcepts,
  formulae = [],
  workedExample,
  indianExample,
  realEvent,
  trap,
  sources,
}) => ({
  id,
  title,
  definition,
  simpleMeaning: definition,
  eli5: workedExample,
  explanation,
  subconcepts,
  formulae,
  workedExample,
  indianExample,
  realEvent,
  journalEntries: [],
  trap,
  sources,
  example: workedExample,
});

const accountingSources = [
  { label: 'ICAI — Foundation Accounting curriculum', url: 'https://www.icai.org/post/sm-foundation-p1-may2025' },
  { label: 'NPTEL — Financial Accounting, IIT Bombay', url: 'https://www.nptel.ac.in/courses/110101131' },
];
const financeSources = [
  { label: 'NPTEL — Financial Management for Managers', url: 'https://www.nptel.ac.in/courses/110107144' },
  { label: 'IGNOU — MBA Financial Management', url: 'https://www.ignou.ac.in/schools/programme/MBAFM' },
];

const supplementalConcepts = [
  supplementalConcept({
    id: 'gap_accounting_framework',
    title: 'Accounting concepts, policies, estimates, and materiality',
    definition: 'Accounting concepts are the underlying assumptions and qualitative principles used to recognise, measure and present transactions; an accounting policy is the specific basis selected for recurring treatment, while an estimate is a measured amount subject to uncertainty.',
    explanation: 'Accrual records economic effects when rights and obligations arise. Going concern assumes the entity will continue operating unless evidence indicates otherwise. Consistency supports comparison across periods, but does not prohibit a justified policy change. Prudence requires caution under uncertainty without deliberate understatement. Materiality asks whether omission or misstatement could influence a user’s decision. Substance over form requires accounting for economic reality rather than relying only on legal labels. An accounting policy change alters the governing recognition or measurement basis; an accounting estimate change updates an amount because new information becomes available. An error is a misuse or omission of information that was available when the statements were prepared.',
    subconcepts: [
      { title: 'Accrual and going concern', explanation: 'Accrual determines timing from economic events; going concern affects measurement and classification because forced-sale assumptions are normally inappropriate for a continuing business.' },
      { title: 'Consistency and comparability', explanation: 'Apply policies consistently and disclose justified changes so users can compare like periods without treating consistency as a ban on better information.' },
      { title: 'Prudence and materiality', explanation: 'Exercise caution in uncertain estimates and focus reporting effort on matters capable of influencing decisions; materiality depends on size, nature and context.' },
      { title: 'Policy, estimate, and error', explanation: 'A policy is the rule applied, an estimate is an uncertain amount calculated under that rule, and an error is an incorrect use or omission of information that was available.' },
    ],
    workedExample: 'Changing the expected useful life of a machine after new maintenance evidence is an estimate change applied prospectively. Discovering that last year’s invoice was omitted despite being available is an error, not an estimate revision.',
    indianExample: 'An Indian company applying Ind AS cannot classify a change in inventory cost formula as a routine estimate update merely to smooth profit. The nature, justification and applicable transition treatment must be identified.',
    realEvent: 'Accounting failures commonly begin with aggressive judgements being presented as mechanical facts. Separating policy choice, estimation uncertainty and error is therefore central to both audit and financial due diligence.',
    trap: 'Do not describe every revised number as an error. New information can legitimately change an estimate without making the earlier estimate incorrect.',
    sources: accountingSources,
  }),
  supplementalConcept({
    id: 'gap_capital_revenue',
    title: 'Capital and revenue expenditure, receipts, provisions, and reserves',
    definition: 'Capital expenditure creates or improves a controlled resource expected to benefit future periods; revenue expenditure consumes a service or maintains current operations. Capital and revenue receipts are classified by their economic source rather than simply by whether cash was received.',
    explanation: 'Expenditure is capitalised only when it satisfies the relevant asset-recognition requirements and is directly attributable to bringing the resource to the condition required for use. Routine repairs, training, advertising and general administration are normally current expenses. Borrowing and owner contributions are capital receipts because they finance the business without creating operating income; customer revenue is a revenue receipt when earned. A provision is a liability recognised for a present obligation whose timing or amount is uncertain. A reserve is part of equity, commonly representing retained profit or another prescribed equity component. Misclassifying expenditure affects both current profit and the balance sheet and often reverses through future depreciation or amortisation.',
    subconcepts: [
      { title: 'Capital expenditure', explanation: 'Acquisition, construction and qualifying improvement costs are capitalised when they create future benefit and satisfy recognition requirements.' },
      { title: 'Revenue expenditure', explanation: 'Costs that maintain existing capacity or consume current-period services are expensed, even when they may indirectly support future sales.' },
      { title: 'Capital and revenue receipts', explanation: 'Debt and owner funding create liability or equity; earned sales and service consideration create income. Cash receipt alone does not establish revenue.' },
      { title: 'Provision versus reserve', explanation: 'A provision is a liability charged against profit when recognised; a reserve is an equity appropriation or component and is not a substitute for an obligation.' },
    ],
    workedExample: '₹8 lakh spent replacing a machine component that substantially extends useful life may be capitalised if recognition criteria are met. ₹80,000 of routine servicing that merely preserves current performance is expensed.',
    indianExample: 'For factory installation, non-recoverable taxes and necessary freight may form part of asset cost, while recoverable GST and general staff training are separated from the capitalised amount.',
    realEvent: 'Capitalising ordinary operating expenditure can temporarily inflate EBITDA and profit while creating future depreciation. Transaction and audit teams therefore test additions for invoices, business purpose and evidence of incremental future benefit.',
    trap: 'A large payment is not automatically capital expenditure, and expenditure does not become an asset merely because management expects it to help future business.',
    sources: accountingSources,
  }),
  supplementalConcept({
    id: 'gap_statement_comparative',
    title: 'Comparative, common-size, and trend analysis',
    definition: 'Comparative analysis measures absolute and percentage change across periods, common-size analysis expresses each statement line as a common base, and trend analysis converts a time series into index numbers relative to a selected base period.',
    explanation: 'Comparative statements show where balances and flows changed, but percentage growth can be misleading when the base is small or negative. A common-size income statement normally expresses each line as a percentage of revenue, revealing changes in cost structure and margins. A common-size balance sheet commonly expresses each line as a percentage of total assets or total financing, revealing shifts in asset intensity and funding mix. Trend indices help compare growth paths across several years. These methods do not replace ratio or cash-flow analysis: they identify patterns that require causal investigation, policy normalisation and comparison with volume, price, acquisitions and one-off items.',
    subconcepts: [
      { title: 'Absolute change', explanation: 'Subtract the earlier amount from the later amount to show the rupee movement and preserve economic scale.' },
      { title: 'Percentage change', explanation: 'Divide change by the appropriate earlier-period base, while flagging zero, near-zero or negative bases that make the result unstable.' },
      { title: 'Common-size statements', explanation: 'Use revenue for income-statement lines and total assets or total financing for balance-sheet lines, with the chosen convention stated.' },
      { title: 'Trend index', explanation: 'Set a base year to 100 and express later values relative to it so divergent growth rates become visible.' },
    ],
    formulae: [
      { label: 'Percentage change', expression: '(Current amount − Prior amount) ÷ Prior amount × 100', variables: 'The prior amount is the comparison base and must be economically meaningful.' },
      { label: 'Trend index', expression: 'Current-period amount ÷ Base-period amount × 100', variables: 'The base-period index equals 100.' },
    ],
    workedExample: 'Revenue rises from ₹100 crore to ₹120 crore while COGS rises from ₹60 crore to ₹78 crore. Revenue grows 20%, COGS grows 30%, and gross margin falls from 40% to 35%.',
    indianExample: 'A multi-year analysis of an Indian retailer should compare common-size inventory and lease-related balances with store expansion, seasonality and like-for-like sales rather than treating every increase as deterioration.',
    realEvent: 'Analysts use common-size and trend schedules to locate where a reported earnings change originated before testing ledger detail, management explanations and cash conversion.',
    trap: 'Do not calculate a percentage change mechanically when the earlier amount is zero or negative; explain why the percentage is undefined or economically misleading.',
    sources: [
      { label: 'NPTEL — Managerial Accounting', url: 'https://nptel.ac.in/courses/110101003' },
      { label: 'NPTEL — Decision Making Using Financial Accounting', url: 'https://archive.nptel.ac.in/content/syllabus_pdf/110106135.pdf' },
    ],
  }),
  supplementalConcept({
    id: 'gap_financial_planning',
    title: 'Financial planning, forecasting, and sources of finance',
    definition: 'Financial planning converts operating assumptions into forecast statements and funding requirements; financing then selects instruments whose cost, maturity, risk and control implications fit those requirements.',
    explanation: 'A forecast begins with operational drivers such as volume, price, margins, collection days, inventory policy, capital expenditure and tax. These assumptions produce forecast income, balance-sheet and cash-flow statements and reveal the external financing need. Short-term operating gaps may use bank facilities, commercial credit, factoring or commercial paper where available. Long-term investment may use retained earnings, term debt, leases, equity or hybrid instruments. The selection is not based on nominal cost alone: maturity matching, refinancing exposure, security, covenants, dilution, tax effects, cash-flow volatility and financial flexibility matter. Sustainable growth is constrained by profitability, asset intensity, payout and leverage when the firm does not issue new equity.',
    subconcepts: [
      { title: 'Forecast drivers', explanation: 'Build statements from volume, price, cost, working-capital and investment assumptions rather than applying one unsupported growth percentage to every line.' },
      { title: 'External financing need', explanation: 'Funding is required when internally generated cash and existing liquidity are insufficient for operating and investment plans.' },
      { title: 'Short- and long-term sources', explanation: 'Match instrument maturity and repayment pattern with the life and cash-generation profile of the financed need.' },
      { title: 'Financing constraints', explanation: 'Cost, covenants, collateral, dilution, market access, refinancing risk and flexibility can dominate the stated coupon or dividend expectation.' },
    ],
    formulae: [
      { label: 'External financing need', expression: 'Forecast asset requirement − Forecast spontaneous liabilities − Forecast retained earnings − Existing available funding', variables: 'The exact model depends on how cash, debt and dividends are forecast.' },
    ],
    workedExample: 'If seasonal inventory requires ₹4 crore for four months, a revolving working-capital facility may fit better than permanent equity. A five-year plant should not depend entirely on a facility repayable on demand.',
    indianExample: 'An Indian MSME may compare bank working-capital limits, supplier credit, invoice discounting through TReDS and promoter funds while considering collateral, customer concentration and payment timing.',
    realEvent: 'Rapidly growing businesses can report rising profit while facing a funding shortage because receivables, inventory and capex absorb cash before earnings are collected.',
    trap: 'Do not treat forecast profit as available cash or select the cheapest quoted source without checking maturity, repayment timing, covenants and refinancing risk.',
    sources: financeSources,
  }),
  supplementalConcept({
    id: 'gap_arr_rationing',
    title: 'Accounting rate of return and capital rationing',
    definition: 'Accounting rate of return relates average accounting profit to an investment base, while capital rationing allocates a limited investment budget among acceptable projects to maximise value subject to funding and project constraints.',
    explanation: 'ARR uses accounting profit rather than cash flow and does not discount timing, so it is a supplementary screening measure rather than a value criterion. The denominator may be initial investment or average investment; an assessment must state the convention. Capital rationing arises when all positive-NPV projects cannot be funded. For divisible projects under a single-period constraint, profitability index can help rank value created per rupee invested. For indivisible projects, combinations must be evaluated because selecting the highest individual PI may leave unused budget or produce less total NPV. Mutually exclusive projects still require direct comparison of incremental value and risk.',
    subconcepts: [
      { title: 'ARR numerator', explanation: 'Use average annual accounting profit after depreciation under the convention stated, not project cash inflow.' },
      { title: 'ARR denominator', explanation: 'Use initial or average investment exactly as defined; average investment often reflects depreciating book value plus working capital.' },
      { title: 'Divisible projects', explanation: 'PI can rank NPV generated per unit of scarce capital when projects can be undertaken fractionally and assumptions are comparable.' },
      { title: 'Indivisible projects', explanation: 'Evaluate feasible project combinations and select the set with the highest total NPV within the budget.' },
    ],
    formulae: [
      { label: 'Accounting rate of return', expression: 'Average annual accounting profit ÷ Stated investment base × 100', variables: 'Confirm whether the base is initial investment or average book investment.' },
      { label: 'Profitability index', expression: 'Present value of future cash inflows ÷ Initial investment', variables: 'A PI above one corresponds to positive NPV for a conventional project.' },
    ],
    workedExample: 'A ₹10 lakh project earns average annual accounting profit of ₹1.5 lakh. ARR on initial investment is 15%. That result does not reveal whether late cash flows create positive NPV.',
    indianExample: 'A company with a ₹20 crore capex ceiling should test combinations of indivisible expansion projects by total NPV rather than automatically funding projects in descending ARR order.',
    realEvent: 'Internal investment committees often display payback and ARR because they are easy to communicate, but value decisions still require incremental cash flows, discount rates and NPV.',
    trap: 'Do not confuse ARR with IRR: ARR uses accounting profit and no discounting, whereas IRR is the discount rate that sets cash-flow NPV to zero.',
    sources: financeSources,
  }),
  supplementalConcept({
    id: 'gap_security_valuation',
    title: 'Bond, preference-share, and equity valuation',
    definition: 'The value of a financial security is the present value of the cash flows its holder expects to receive, discounted at a required return consistent with the timing and risk of those cash flows.',
    explanation: 'A conventional bond pays coupons and principal; its price equals the present value of both. When required yield rises above the coupon rate, price falls below face value, and the reverse holds when required yield falls. A perpetual preference share is valued by dividing its fixed annual dividend by the required return. Ordinary equity has no fixed maturity, so valuation depends on expected distributable cash flows and growth. The Gordon growth model values a stable-growth share from next-period dividend, required return and perpetual growth, with required return exceeding growth. Market price can differ from estimated intrinsic value because assumptions, information and risk assessments differ.',
    subconcepts: [
      { title: 'Bond cash flows', explanation: 'Discount each coupon and the redemption amount at a yield appropriate to maturity, credit risk, currency and liquidity.' },
      { title: 'Yield and price', explanation: 'For an existing fixed-coupon bond, required yield and price move inversely because promised cash flows do not change with market rates.' },
      { title: 'Preference shares', explanation: 'A perpetual fixed dividend is a perpetuity when payment and risk assumptions support that treatment.' },
      { title: 'Ordinary equity', explanation: 'Stable-growth dividend valuation requires sustainable payout and growth; high-growth or irregular businesses require a multi-stage or cash-flow approach.' },
    ],
    formulae: [
      { label: 'Bond value', expression: 'Σ[Coupon ÷ (1 + yield)^t] + Face value ÷ (1 + yield)^n', variables: 'Use the cash-flow frequency and periodic yield consistently.' },
      { label: 'Preference-share value', expression: 'Annual preference dividend ÷ Required return', variables: 'Assumes a perpetual fixed dividend.' },
      { label: 'Gordon growth value', expression: 'Next-period dividend ÷ (Required return − Growth rate)', variables: 'Required return must exceed a sustainable perpetual growth rate.' },
    ],
    workedExample: 'A three-year ₹1,000 bond with an ₹80 annual coupon and 10% required yield is worth less than ₹1,000 because its 8% coupon rate is below the market-required return.',
    indianExample: 'When RBI-linked market yields rise, prices of existing fixed-rate Indian government and corporate bonds generally fall, with longer-duration securities usually showing greater sensitivity.',
    realEvent: 'Interest-rate cycles repeatedly demonstrate that a fixed promised coupon does not make a bond price stable. Market value changes as the return demanded on comparable securities changes.',
    trap: 'Do not discount a bond’s face value alone or use the coupon rate as the discount rate merely because it appears on the certificate.',
    sources: financeSources,
  }),
  supplementalConcept({
    id: 'gap_funds_flow',
    title: 'Funds flow and statement of changes in working capital',
    definition: 'A funds-flow statement explains sources and applications of long-term funds between two balance-sheet dates, commonly using changes in net working capital as the connecting measure rather than tracking cash and cash equivalents alone.',
    explanation: 'An increase in net working capital is an application of funds because more long-term financing is tied in current assets net of current liabilities; a decrease is a source. Long-term sources commonly include share issues, long-term borrowing, asset-sale proceeds and funds generated from operations. Applications include acquisition of non-current assets, repayment of long-term debt, dividends and tax under the convention stated. Funds from operations adjusts accounting profit for non-fund and non-operating items such as depreciation and gains on asset sale. The funds-flow statement is broader and older than the modern cash-flow statement: it can explain financing of working-capital change but does not report operating, investing and financing cash movements with the same precision.',
    subconcepts: [
      { title: 'Working-capital schedule', explanation: 'Compare eligible current assets and current liabilities across dates to calculate the increase or decrease in net working capital.' },
      { title: 'Funds from operations', explanation: 'Adjust profit for non-fund and non-operating items to estimate internally generated long-term funds under the stated convention.' },
      { title: 'Sources of funds', explanation: 'Identify long-term financing inflows and releases from non-current assets rather than treating every current-liability movement as a separate source.' },
      { title: 'Applications of funds', explanation: 'Identify long-term investment, financing repayment and distributions, then reconcile sources with applications and working-capital change.' },
    ],
    formulae: [
      { label: 'Net working capital', expression: 'Current assets − Current liabilities', variables: 'Use the classification convention required by the question.' },
      { label: 'Funds-flow reconciliation', expression: 'Sources of funds − Applications of funds = Increase in net working capital', variables: 'A decrease in net working capital reverses the direction.' },
    ],
    workedExample: 'If current assets rise from ₹20 lakh to ₹27 lakh while current liabilities rise from ₹12 lakh to ₹15 lakh, net working capital rises from ₹8 lakh to ₹12 lakh. The ₹4 lakh increase is an application of funds.',
    indianExample: 'Indian university and aptitude questions may still test funds-flow schedules even though published company reporting focuses on the statutory cash-flow statement. The two statements should not be treated as synonyms.',
    realEvent: 'A business can raise long-term debt and use part of it to build inventory and receivables. Funds-flow analysis shows the financing source and working-capital application even before operating cash conversion improves.',
    trap: 'Do not classify every increase in a current liability as a standalone source in the funds-flow statement; it is normally incorporated into the net working-capital schedule.',
    sources: [
      { label: 'IGNOU — Financial Management curriculum', url: 'https://www.ignou.ac.in/schools/programme/MCOMOL' },
      { label: 'NPTEL — Managerial Accounting', url: 'https://nptel.ac.in/courses/110101003' },
    ],
  }),
  supplementalConcept({
    id: 'gap_extended_ratios',
    title: 'Operating, solvency, and market ratios',
    definition: 'Operating ratios connect revenue with cost structure and asset use, solvency ratios assess long-term financial claims and payment capacity, and market ratios connect accounting performance with the price investors assign to equity.',
    explanation: 'Operating ratio compares operating cost with revenue; a lower result generally indicates more operating margin, subject to classification consistency. Asset turnover relates revenue to average assets, fixed-asset turnover to average net PPE, and working-capital turnover to average operating working capital. Debt-to-equity and proprietary ratios describe funding structure but not maturity. Interest coverage uses earnings before interest, while debt-service coverage should use a stated cash or earnings measure against interest plus scheduled principal. EPS uses profit attributable to ordinary shareholders and weighted-average shares. P/E divides price by EPS and becomes uninformative when earnings are negative or unusually depressed. Dividend payout and yield answer different questions: distribution relative to earnings versus cash dividend relative to market price.',
    subconcepts: [
      { title: 'Operating and asset-use ratios', explanation: 'Match revenue or operating cost with the average resource base used to generate it and investigate outsourcing, idle capacity and acquisitions.' },
      { title: 'Capital-structure ratios', explanation: 'Debt-to-equity and proprietary ratio show claim mix; definitions must state whether debt is gross, net, interest-bearing or total liabilities.' },
      { title: 'Debt-service capacity', explanation: 'Interest coverage tests interest cushion, while DSCR includes scheduled principal and therefore addresses a different burden.' },
      { title: 'Market ratios', explanation: 'EPS, P/E, payout and dividend yield link reported earnings and distributions with share count and market price.' },
    ],
    formulae: [
      { label: 'Asset turnover', expression: 'Revenue ÷ Average total assets', variables: 'Use average assets for a period flow where possible.' },
      { label: 'Debt-service coverage', expression: 'Cash available for debt service ÷ (Interest + Scheduled principal)', variables: 'State the exact cash-available convention used.' },
      { label: 'Dividend payout', expression: 'Ordinary dividends ÷ Profit attributable to ordinary shareholders', variables: 'May also be expressed as dividend per share divided by EPS.' },
    ],
    workedExample: 'Revenue of ₹120 crore on average assets of ₹80 crore gives asset turnover of 1.5x. If net margin is 6%, the corresponding ROA is approximately 9% before definitional differences.',
    indianExample: 'When comparing Indian listed companies, use consolidated or standalone figures consistently and check whether promoter holdings, exceptional items or a recent share issue distort EPS and market multiples.',
    realEvent: 'A company can report a low P/E because the market expects decline or because current earnings are temporarily high. The multiple is therefore a valuation signal, not a standalone recommendation.',
    trap: 'Do not compare P/E when EPS is negative as though the resulting negative multiple had the same meaning as an ordinary positive P/E.',
    sources: [
      { label: 'NPTEL — Financial Accounting and Analysis', url: 'https://www.nptel.ac.in/courses/110107073' },
      { label: 'NPTEL — Financial Accounting, IIT Bombay', url: 'https://www.nptel.ac.in/courses/110101131' },
    ],
  }),
];

const conceptVisuals = {
  zth_equation_accounts: {
    type: 'accounting-equation',
    title: 'Transaction-to-equation worksheet',
    note: 'Each row preserves Assets = Liabilities + Equity while showing whether profit changes.',
  },
  zth_cycle_evidence: {
    type: 'bookkeeping-flow',
    title: 'Invoice-to-trial-balance posting map',
    note: 'Follow one ₹1.20 lakh credit sale through the books without recording revenue twice.',
  },
  zth_errors_rectification: {
    type: 'rectification-sheet',
    title: 'Wrong entry → required entry → correcting difference',
    note: 'The marked cells isolate the minimum entry needed to transform the books.',
  },
  zth_three_statement: {
    type: 'statement-bridge',
    title: 'Three-statement bridge for a credit sale',
    note: 'The same transaction changes profit and receivables but creates no immediate cash.',
  },
  zth_indirect_cfo: {
    type: 'cashflow-bridge',
    title: 'Indirect CFO reconciliation worksheet',
    note: 'Running totals make every working-capital sign visible.',
  },
  zth_profit_return_leverage: {
    type: 'dupont-tree',
    title: 'DuPont return-driver tree',
    note: 'ROE is decomposed into margin, asset use and leverage rather than treated as one score.',
  },
  zth_npv_irr: {
    type: 'npv-sheet',
    title: 'Capital-budgeting discount worksheet',
    note: 'Cash flows are moved to one date before the accept/reject decision.',
  },
  zth_wc_cycle: {
    type: 'working-capital-timeline',
    title: 'Cash-conversion operating timeline',
    note: 'Inventory and collection days absorb cash; supplier credit delays the cash payment.',
  },
};

const sourceConceptById = new Map(
  [
    ...sourceModules.flatMap((module) => module.concepts),
    ...supplementalConcepts,
  ].map((item) => [
    item.id,
    conceptVisuals[item.id] ? { ...item, visual: conceptVisuals[item.id] } : item,
  ]),
);

const topic = ({
  id,
  order,
  title,
  shortTitle,
  description,
  capability,
  conceptIds,
  assessmentWeight = '',
}) => ({
  id,
  order,
  title,
  shortTitle,
  description,
  capability,
  assessmentWeight,
  concepts: conceptIds.map((conceptId) => {
    const item = sourceConceptById.get(conceptId);
    if (!item) throw new Error(`Unknown IronSides concept: ${conceptId}`);
    return item;
  }),
});

export const ironsidesModules = [
  topic({
    id: 'financial_management',
    order: 1,
    title: 'Financial Management',
    shortTitle: 'Financial Management',
    description: 'Financial planning and forecasting; sources of finance; time value of money; bond, preference-share and equity valuation; risk and return; capital budgeting; project cash flows; NPV, IRR, ARR, payback, profitability index and capital rationing; project risk; cost of capital; capital structure; leverage; dividend policy; working-capital management; and short-term finance.',
    capability: 'Value cash flows, evaluate investment proposals, estimate required returns and financing costs, analyse financing and payout choices, and quantify the liquidity and risk consequences of working-capital decisions.',
    conceptIds: [
      'zth_fm_objective',
      'gap_financial_planning',
      'zth_tvm',
      'zth_risk_return',
      'zth_project_cashflow',
      'zth_npv_irr',
      'gap_arr_rationing',
      'gap_security_valuation',
      'zth_project_risk',
      'zth_cost_capital',
      'zth_capital_structure',
      'zth_dividend',
      'zth_wc_cycle',
      'zth_cash_receivables',
      'zth_inventory_payables',
    ],
  }),
  topic({
    id: 'accounting',
    order: 2,
    title: 'Accounting',
    shortTitle: 'Accounting',
    description: 'Transaction recognition; accounting equation; account classification; accounting concepts, policies, estimates and materiality; capital and revenue classification; accrual accounting; inventory; PPE and depreciation; intangibles; revenue; provisions, reserves and contingencies; foreign exchange and tax timing; cost classification; contribution; break-even; relevant costing; budgets; variances; and inventory control.',
    capability: 'Analyse the substance of a transaction, apply recognition and measurement rules, distinguish financial from management-accounting treatments, and calculate the accounting amounts used in commercial and operating decisions.',
    conceptIds: [
      'zth_accounting_purpose',
      'zth_equation_accounts',
      'gap_accounting_framework',
      'gap_capital_revenue',
      'zth_inventory',
      'zth_ppe_intangibles',
      'zth_revenue_provisions',
      'zth_cost_classification',
      'zth_cvp_relevant',
      'zth_budget_variance_eoq',
    ],
  }),
  topic({
    id: 'financial_statements',
    order: 3,
    title: 'Financial Statements',
    shortTitle: 'Financial Statements',
    description: 'Income statement; balance sheet; statement of changes in equity; Schedule III presentation; three-statement linkage; earnings quality; comparative, common-size and trend analysis; funds flow and changes in working capital; cash-flow classification; indirect operating cash flow; capital expenditure; free cash flow; and cash conversion.',
    capability: 'Read, construct and connect the principal financial statements, classify cash flows, reconcile profit to operating cash, calculate free cash flow, and identify accounting-quality signals across statements and notes.',
    conceptIds: [
      'zth_income_balance',
      'zth_three_statement',
      'zth_quality_analysis',
      'gap_statement_comparative',
      'gap_funds_flow',
      'zth_cash_classification',
      'zth_indirect_cfo',
      'zth_fcf',
    ],
  }),
  topic({
    id: 'book_entry',
    order: 4,
    title: 'Book Entry',
    shortTitle: 'Book Entry',
    description: 'Source documents; books of original entry; subsidiary books; journal and ledger roles; posting and balancing; personal ledgers; receivables and payables control accounts; cash book; petty cash; bills receivable and payable; trial balance; closing; and bank reconciliation.',
    capability: 'Move a transaction from source evidence through the appropriate book of original entry and ledger, balance accounts, reconcile control totals and bank balances, and prepare a trial balance without confusing bookkeeping records with financial statements.',
    conceptIds: [
      'zth_cycle_evidence',
      'zth_ledgers_control_accounts',
      'zth_brs',
    ],
  }),
  topic({
    id: 'ratios',
    order: 5,
    title: 'Ratios',
    shortTitle: 'Ratios',
    description: 'Ratio-analysis method; comparability and average balances; liquidity; operating and asset turnover; DSO, DIO and DPO; cash conversion cycle; margins; ROA, ROE, ROIC and DuPont; leverage, proprietary ratio, interest coverage and DSCR; EPS, P/E, payout and dividend yield; and interpretation of business drivers.',
    capability: 'Calculate the principal liquidity, efficiency, profitability, return, market and leverage ratios with consistent inputs, then explain the operating or financing drivers behind a movement instead of treating the number as a conclusion.',
    conceptIds: [
      'zth_ratio_framework',
      'zth_liquidity_efficiency',
      'zth_profit_return_leverage',
      'gap_extended_ratios',
    ],
  }),
  topic({
    id: 'rectification_entries',
    order: 6,
    title: 'Rectification Entries',
    shortTitle: 'Rectification',
    description: 'Accrued income and expenses; prepayments; unearned income; cut-off adjustments; errors disclosed and not disclosed by a trial balance; errors of omission, commission and principle; compensating errors; suspense accounts; profit effects; and difference-entry rectification.',
    capability: 'Determine what was recorded and what should have been recorded, identify whether the error affects the trial balance or profit, and post the minimum adjusting or rectification entry with the correct use of suspense.',
    conceptIds: [
      'zth_accrual_deferral',
      'zth_errors_rectification',
    ],
  }),
  topic({
    id: 'journal_entries',
    order: 7,
    title: 'Journal Entries',
    shortTitle: 'Journal Entries',
    description: 'Debit-credit method; simple and compound entries; cash and credit transactions; sales, purchases, returns and discounts; receivables and payables; accruals and deferrals; inventory; GST and TDS; payroll; provisions; fixed assets and depreciation; disposals; loans; equity; drawings; and dividends.',
    capability: 'Construct balanced journal entries from economic substance and explain the effect of each entry on profit, cash, assets, liabilities and equity across operating, statutory, asset and financing transactions.',
    assessmentWeight: 'Highest accounting weight',
    conceptIds: [
      'zth_journal_method',
      'zth_indian_commercial_entries',
      'zth_operating_entries',
      'zth_financing_asset_entries',
    ],
  }),
  topic({
    id: 'arithmetic',
    order: 8,
    title: sourceModuleById.get('arithmetic').title,
    shortTitle: sourceModuleById.get('arithmetic').shortTitle,
    description: sourceModuleById.get('arithmetic').description,
    capability: 'Solve the percentage, ratio, average, growth, interest, profit, work-rate and data-interpretation calculations used throughout the assessment without denominator or unit errors.',
    conceptIds: sourceModuleById.get('arithmetic').concepts.map((item) => item.id),
  }),
  topic({
    id: 'logical_reasoning',
    order: 9,
    title: sourceModuleById.get('logical_reasoning').title,
    shortTitle: sourceModuleById.get('logical_reasoning').shortTitle,
    description: sourceModuleById.get('logical_reasoning').description,
    capability: 'Translate verbal information into sets, orders, positions, relations and argument structures, then select only conclusions forced by the stated evidence.',
    conceptIds: sourceModuleById.get('logical_reasoning').concepts.map((item) => item.id),
  }),
];

const bookkeepingQuestionTopics = {
  book_entry: new Set([
    'isa_008',
    'isa_zth_051',
    'isa_zth_052',
    'isa_zth_053',
    'isa_audit_033',
    'isa_audit_034',
  ]),
  rectification_entries: new Set([
    'isa_002',
    'isa_006',
    'isa_007',
    'isa_zth_004',
    'isa_zth_054',
  ]),
};

const rectificationQuestionTopics = {
  book_entry: new Set(['isa_zth_010', 'isa_zth_011']),
  accounting: new Set(['isa_023', 'isa_029']),
};

const topicIdForQuestion = (card) => {
  if (card.moduleId === 'bookkeeping') {
    if (bookkeepingQuestionTopics.book_entry.has(card.id)) return 'book_entry';
    if (bookkeepingQuestionTopics.rectification_entries.has(card.id)) return 'rectification_entries';
    return 'accounting';
  }
  if (card.moduleId === 'rectification') {
    if (rectificationQuestionTopics.book_entry.has(card.id)) return 'book_entry';
    if (rectificationQuestionTopics.accounting.has(card.id)) return 'accounting';
    return 'rectification_entries';
  }
  if (['accounting_measurement', 'cost_management'].includes(card.moduleId)) return 'accounting';
  if (['financial_statements', 'cash_flow'].includes(card.moduleId)) return 'financial_statements';
  if (['financial_management', 'capital_budgeting', 'financing_decisions', 'working_capital'].includes(card.moduleId)) return 'financial_management';
  return card.moduleId;
};

const sourceAssessmentQuestions = [
  ...legacyIronsidesAssessmentQuestions,
  ...zeroToHeroQuestions,
  ...ironsidesAuditQuestions,
  ...ironsidesStandardQuestions,
];

const genuinelyAdvancedQuestionIds = new Set([
  'isa_058',
  'isa_062',
  'isa_zth_042',
  'isa_zth_045',
  'isa_zth_046',
  'isa_zth_049',
  'isa_zth_050',
  'isa_audit_015',
  'isa_audit_018',
  'isa_audit_024',
  'isa_zth_033',
  'isa_audit_009',
  'isa_audit_011',
  'isa_audit_012',
  'isa_038',
  'isa_040',
  'isa_zth_020',
  'isa_zth_021',
  'isa_zth_025',
  'isa_audit_008',
  'isa_audit_034',
  'isa_zth_027',
  'isa_zth_029',
  'isa_018',
  'isa_zth_007',
  'isa_zth_056',
  'isa_069',
  'isa_071',
  'isa_072',
  'isa_audit_026',
  'isa_audit_028',
  'isa_076',
  'isa_079',
  'isa_080',
  'isa_081',
  'isa_082',
  'isa_audit_029',
  'isa_audit_031',
  'isa_audit_032',
]);

export const ironsidesAssessmentQuestions = sourceAssessmentQuestions
  .map((card) => ({
    ...card,
    moduleId: topicIdForQuestion(card),
    difficulty: card.difficulty === 'Hard' && !genuinelyAdvancedQuestionIds.has(card.id)
      ? 'Medium'
      : card.difficulty,
  }));

export const ironsidesModuleOrder = ironsidesModules
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((module) => module.id);
