const ink = '#17211b';
const muted = '#667169';
const green = '#245c3f';
const amber = '#a86918';
const red = '#a54f45';
const line = 'rgba(23,33,27,0.12)';

const frameStyle = {
  marginTop: 24,
  border: '1px solid rgba(255,255,255,0.72)',
  borderRadius: 18,
  padding: 18,
  background: 'rgba(238,244,239,0.78)',
  boxShadow: '0 18px 50px rgba(36,92,63,0.08), inset 0 0 0 1px rgba(23,33,27,0.07)',
  backdropFilter: 'blur(12px)',
  overflowX: 'auto',
};

const sheetStyle = {
  minWidth: 680,
  border: `1px solid ${line}`,
  borderRadius: 12,
  overflow: 'hidden',
  background: '#fff',
  fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
};

const cellStyle = {
  borderRight: `1px solid ${line}`,
  borderBottom: `1px solid ${line}`,
  padding: '9px 10px',
  fontSize: 12,
  lineHeight: 1.4,
};

function ExhibitFrame({ visual, children }) {
  return (
    <figure style={frameStyle}>
      <figcaption style={{ marginBottom: 14 }}>
        <div style={{ color: green, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Worked visual
        </div>
        <div style={{ color: ink, fontSize: 17, fontWeight: 760, marginTop: 5 }}>{visual.title}</div>
        <div style={{ color: muted, fontSize: 13, lineHeight: 1.55, marginTop: 4 }}>{visual.note}</div>
      </figcaption>
      {children}
    </figure>
  );
}

function GridRow({ values, header = false, highlight = -1, total = false }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${values.length}, minmax(88px, 1fr))` }}>
      {values.map((value, index) => (
        <div
          key={`${value}_${index}`}
          style={{
            ...cellStyle,
            color: header ? '#fff' : total ? ink : '#344139',
            background: header ? ink : index === highlight ? '#fff1cf' : total ? '#e8f2eb' : '#fff',
            fontWeight: header || total || index === highlight ? 750 : 500,
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

function AccountingEquation() {
  return (
    <div style={sheetStyle} role="table" aria-label="Accounting equation transaction worksheet">
      <GridRow header values={['Transaction (₹ lakh)', 'Cash', 'Receivable', 'PPE', 'Liability', 'Equity', 'Check']} />
      <GridRow values={['Opening position', '5.0', '0.0', '5.0', '4.0', '6.0', '10 = 10']} />
      <GridRow values={['Borrow ₹2.0', '+2.0', '—', '—', '+2.0', '—', '12 = 12']} highlight={4} />
      <GridRow values={['Buy PPE for ₹1.5 cash', '−1.5', '—', '+1.5', '—', '—', '12 = 12']} highlight={3} />
      <GridRow values={['Credit sale ₹1.2', '—', '+1.2', '—', '—', '+1.2 profit', '13.2 = 13.2']} highlight={5} />
      <GridRow total values={['Closing position', '5.5', '1.2', '6.5', '6.0', '7.2', '13.2 = 13.2 ✓']} />
    </div>
  );
}

function BookkeepingFlow() {
  const stages = [
    { label: 'Tax invoice', body: 'Customer A · ₹1,20,000', icon: '▤' },
    { label: 'Sales journal', body: 'AR Dr 1,20,000\nSales Cr 1,20,000', icon: '↕' },
    { label: 'Ledgers', body: 'Customer A: Dr 1,20,000\nSales: Cr 1,20,000', icon: 'T' },
    { label: 'Trial balance', body: 'Debits +1,20,000\nCredits +1,20,000', icon: '⚖' },
  ];
  return (
    <div style={{ minWidth: 760, display: 'grid', gridTemplateColumns: '1fr 32px 1fr 32px 1fr 32px 1fr', alignItems: 'stretch' }}>
      {stages.flatMap((stage, index) => {
        const stageNode = (
          <div key={stage.label} style={{ border: `1px solid ${line}`, borderRadius: 14, background: '#fff', padding: 15 }}>
            <div aria-hidden="true" style={{ color: green, fontSize: 25, fontWeight: 800, height: 34 }}>{stage.icon}</div>
            <div style={{ color: ink, fontSize: 13, fontWeight: 800 }}>{stage.label}</div>
            <div style={{ color: muted, whiteSpace: 'pre-line', fontSize: 12, lineHeight: 1.55, marginTop: 7 }}>{stage.body}</div>
          </div>
        );
        if (index === stages.length - 1) return [stageNode];
        return [
          stageNode,
          <div key={`${stage.label}_arrow`} aria-hidden="true" style={{ color: green, display: 'grid', placeItems: 'center', fontSize: 22 }}>→</div>,
        ];
      })}
    </div>
  );
}

function RectificationSheet() {
  return (
    <div style={sheetStyle} role="table" aria-label="Rectification difference worksheet">
      <GridRow header values={['₹40,000 payment', 'Debit', 'Credit', 'Status']} />
      <GridRow values={['Recorded', 'Advertising expense', 'Bank', 'Wrong debit']} highlight={1} />
      <GridRow values={['Required', 'Prepaid rent', 'Bank', 'Correct event']} />
      <GridRow total values={['Difference entry', 'Prepaid rent Dr', 'Advertising expense Cr', 'Bank untouched ✓']} />
      <div style={{ padding: '11px 12px', color: red, background: '#fff8f5', fontSize: 12 }}>
        Marking rule: cancel the account that should not exist; introduce the account that is missing.
      </div>
    </div>
  );
}

function StatementBridge() {
  return (
    <div style={{ minWidth: 720, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(190px, 1fr))', gap: 14 }}>
      {[
        { title: 'Income statement', amount: '+₹5 lakh revenue', detail: '+₹5 lakh profit', color: green },
        { title: 'Balance sheet', amount: '+₹5 lakh receivable', detail: '+₹5 lakh retained earnings', color: amber },
        { title: 'Cash-flow statement', amount: '₹0 total cash', detail: 'PAT +₹5 − AR increase ₹5', color: '#416c91' },
      ].map((item, index) => (
        <div key={item.title} style={{ position: 'relative', border: `1px solid ${line}`, borderRadius: 14, background: '#fff', padding: 16 }}>
          <div style={{ height: 7, borderRadius: 999, background: item.color, width: index === 2 ? '8%' : '82%', transition: 'width 300ms ease' }} />
          <div style={{ color: ink, fontSize: 14, fontWeight: 800, marginTop: 14 }}>{item.title}</div>
          <div style={{ color: item.color, fontSize: 18, fontWeight: 800, marginTop: 12 }}>{item.amount}</div>
          <div style={{ color: muted, fontSize: 12, lineHeight: 1.5, marginTop: 6 }}>{item.detail}</div>
        </div>
      ))}
    </div>
  );
}

function CashFlowBridge() {
  const rows = [
    ['PAT', '+20', '20'],
    ['Depreciation', '+4', '24'],
    ['Receivables increase', '−5', '19'],
    ['Inventory decrease', '+2', '21'],
    ['Payables decrease', '−1', '20'],
  ];
  return (
    <div style={sheetStyle} role="table" aria-label="Indirect cash flow running reconciliation">
      <GridRow header values={['CFO bridge (₹ lakh)', 'Adjustment', 'Running cash']} />
      {rows.map((row, index) => <GridRow key={row[0]} values={row} highlight={1} total={index === rows.length - 1} />)}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 14 }}>
        <div style={{ color: green, fontSize: 12, fontWeight: 750 }}>Operating asset ↑ → subtract cash</div>
        <div style={{ color: amber, fontSize: 12, fontWeight: 750 }}>Operating liability ↓ → subtract cash</div>
      </div>
    </div>
  );
}

function DupontTree() {
  const drivers = [
    { title: 'Net margin', formula: 'PAT ÷ Sales', value: '8%' },
    { title: 'Asset turnover', formula: 'Sales ÷ Assets', value: '1.5×' },
    { title: 'Equity multiplier', formula: 'Assets ÷ Equity', value: '2.0×' },
  ];
  return (
    <div style={{ minWidth: 700 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {drivers.map((driver) => (
          <div key={driver.title} style={{ border: `1px solid ${line}`, borderRadius: 14, background: '#fff', padding: 15, textAlign: 'center' }}>
            <div style={{ color: muted, fontSize: 12 }}>{driver.title}</div>
            <div style={{ color: green, fontSize: 25, fontWeight: 820, marginTop: 7 }}>{driver.value}</div>
            <div style={{ color: muted, fontSize: 11, marginTop: 5 }}>{driver.formula}</div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" style={{ textAlign: 'center', color: green, fontSize: 23, lineHeight: 1.2 }}>↘ &nbsp; ↓ &nbsp; ↙</div>
      <div style={{ width: 210, margin: '0 auto', border: `2px solid ${green}`, borderRadius: 14, background: '#e8f2eb', padding: 14, textAlign: 'center' }}>
        <div style={{ color: muted, fontSize: 12 }}>Return on equity</div>
        <div style={{ color: green, fontSize: 27, fontWeight: 850, marginTop: 4 }}>24%</div>
        <div style={{ color: muted, fontSize: 11 }}>8% × 1.5 × 2.0</div>
      </div>
    </div>
  );
}

function NpvSheet() {
  return (
    <div style={sheetStyle} role="table" aria-label="NPV discount worksheet">
      <GridRow header values={['Row', 'Year 0', 'Year 1', 'Year 2', 'Year 3']} />
      <GridRow values={['Cash flow (₹ lakh)', '−10.00', '+4.50', '+4.50', '+4.50']} />
      <GridRow values={['10% discount factor', '1.0000', '0.9091', '0.8264', '0.7513']} />
      <GridRow values={['Present value', '−10.00', '+4.09', '+3.72', '+3.38']} highlight={4} />
      <GridRow total values={['NPV', '', '', '', '+₹1.19 lakh → Accept']} />
    </div>
  );
}

function WorkingCapitalTimeline() {
  return (
    <div style={{ minWidth: 720, border: `1px solid ${line}`, borderRadius: 14, background: '#fff', padding: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', color: muted, fontSize: 11, marginBottom: 10 }}>
        <span>Day 0</span><span>Day 25</span><span>Day 45</span><span style={{ textAlign: 'right' }}>Day 75</span>
      </div>
      <div style={{ height: 12, borderRadius: 999, background: '#e8ece9', overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: '60%', background: '#dca94f' }} title="Inventory held for 45 days" />
        <div style={{ width: '40%', background: '#6c9f7d' }} title="Receivable collection for 30 days" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', fontSize: 12, marginTop: 8 }}>
        <div style={{ color: amber }}>DIO 45 days · inventory converts to sale</div>
        <div style={{ color: green }}>DSO 30 days · sale converts to cash</div>
      </div>
      <div style={{ marginTop: 18, height: 10, borderRadius: 999, background: '#cfdae5', width: '33.33%' }} />
      <div style={{ color: '#416c91', fontSize: 12, marginTop: 7 }}>DPO 25 days · supplier credit delays cash payment</div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${line}`, display: 'flex', justifyContent: 'space-between', gap: 20 }}>
        <strong style={{ color: ink, fontSize: 13 }}>Cash conversion cycle</strong>
        <strong style={{ color: green, fontSize: 15 }}>45 + 30 − 25 = 50 days</strong>
      </div>
    </div>
  );
}

export default function IronSidesConceptVisual({ visual }) {
  if (!visual) return null;

  const exhibits = {
    'accounting-equation': <AccountingEquation />,
    'bookkeeping-flow': <BookkeepingFlow />,
    'rectification-sheet': <RectificationSheet />,
    'statement-bridge': <StatementBridge />,
    'cashflow-bridge': <CashFlowBridge />,
    'dupont-tree': <DupontTree />,
    'npv-sheet': <NpvSheet />,
    'working-capital-timeline': <WorkingCapitalTimeline />,
  };

  const exhibit = exhibits[visual.type];
  if (!exhibit) return null;

  return <ExhibitFrame visual={visual}>{exhibit}</ExhibitFrame>;
}
