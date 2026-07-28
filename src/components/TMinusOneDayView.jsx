import { useMemo, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { tMinusOneDayTopics } from '../data/tMinusOneDayCards';

const pageFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif';
const displayFont = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif';
const ink = '#17152b';
const muted = '#6f6a82';
const purple = '#6d4aff';
const border = '#e5defb';

function renderFormula(formula) {
  if (!formula) return null;
  try {
    return katex.renderToString(formula, { throwOnError: false, displayMode: false });
  } catch {
    return null;
  }
}
function FormulaBox({ formula }) {
  const rendered = renderFormula(formula);
  return (
    <div style={{ marginTop: 20, padding: '14px 16px', borderRadius: 14, background: '#21183f', color: '#fff', overflowX: 'auto' }}>
      <div style={{ color: '#c8baff', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Formula</div>
      {rendered ? (
        <div style={{ fontSize: 16, whiteSpace: 'nowrap' }} dangerouslySetInnerHTML={{ __html: rendered }} />
      ) : (
        <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 13, whiteSpace: 'pre-wrap' }}>{formula}</div>
      )}
    </div>
  );
}

function AnswerText({ text }) {
  return (
    <div style={{ display: 'grid', gap: 13 }}>
      {String(text || '').split(/\n\n+/).filter(Boolean).map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 20)}-${index}`} style={{ margin: 0 }}>{paragraph}</p>
      ))}
    </div>
  );
}

function GlossyButton({ active, children, onClick, wide = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        border: `1px solid ${active ? 'rgba(255,255,255,0.28)' : border}`,
        borderRadius: 14,
        background: active ? 'linear-gradient(135deg, #5235d8 0%, #7656ff 48%, #b18cff 100%)' : 'rgba(255,255,255,0.82)',
        color: active ? '#fff' : '#50486a',
        boxShadow: active ? '0 8px 20px rgba(109,74,255,0.26), inset 0 1px 0 rgba(255,255,255,0.42)' : '0 4px 12px rgba(50,35,100,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
        padding: wide ? '11px 18px' : '10px 14px',
        cursor: 'pointer',
        fontFamily: pageFont,
        fontSize: 13,
        fontWeight: 750,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ position: 'absolute', left: '-15%', top: -22, width: '70%', height: 34, background: 'rgba(255,255,255,0.22)', transform: 'rotate(-12deg)', filter: 'blur(8px)', pointerEvents: 'none' }} />
      <span style={{ position: 'relative' }}>{children}</span>
    </button>
  );
}

function QuestionItem({ card, open, onToggle }) {
  return (
    <article style={{ padding: '30px 0', borderBottom: '1px solid rgba(30,20,70,0.09)' }}>
      <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ color: purple, fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{card.tMinusOneDayTopic}</span>
        {card.tMinusOneDayRelated && <span style={{ color: '#9991ac', fontSize: 12 }}>· Existing Interview Ready</span>}
      </div>
      <h3 style={{ margin: '0 0 18px', color: ink, fontFamily: displayFont, fontSize: 'clamp(22px, 3.2vw, 30px)', lineHeight: 1.2, letterSpacing: '-0.035em', fontWeight: 600 }}>{card.question}</h3>
      <button type="button" onClick={onToggle} style={{ border: 0, background: 'transparent', color: purple, padding: 0, cursor: 'pointer', fontFamily: pageFont, fontSize: 15, fontWeight: 750 }}>
        {open ? 'Hide solution ↑' : 'View solution ↓'}
      </button>
      {open && (
        <div style={{ paddingTop: 22, color: '#443d56', fontSize: 16, lineHeight: 1.62, fontWeight: 400 }}>
          <AnswerText text={card.answer} />
          {card.explanation && <p style={{ margin: '16px 0 0', color: muted }}>{card.explanation}</p>}
          <FormulaBox formula={card.formula} />
        </div>
      )}
    </article>
  );
}

export default function TMinusOneDayView({ cards, onBack }) {
  const [view, setView] = useState('questions');
  const [activeTopic, setActiveTopic] = useState(null);
  const [openCardId, setOpenCardId] = useState(null);

  const topicCards = useMemo(() => cards.filter((card) => !activeTopic || card.tMinusOneDayTopic === activeTopic), [cards, activeTopic]);
  const formulaCards = useMemo(() => cards.filter((card) => card.formula && (!activeTopic || card.tMinusOneDayTopic === activeTopic)), [cards, activeTopic]);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: '#fbfaff', color: ink, fontFamily: pageFont }}>
      <div style={{ width: '100%', maxWidth: 1120, margin: '0 auto', padding: '18px clamp(18px, 4vw, 42px) 100px', boxSizing: 'border-box' }}>
        <button type="button" onClick={onBack} style={{ border: 0, background: 'transparent', color: muted, padding: '8px 0', marginBottom: 24, cursor: 'pointer', fontFamily: pageFont, fontSize: 14, fontWeight: 700 }}>← Back to Interview Ready</button>

        <header style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, padding: 'clamp(28px, 6vw, 58px)', marginBottom: 20, background: 'linear-gradient(135deg, #21183f 0%, #4930aa 48%, #8967ff 100%)', color: '#fff', boxShadow: '0 18px 42px rgba(67,44,155,0.24), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
          <div style={{ position: 'absolute', width: 340, height: 150, right: -70, top: -55, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', filter: 'blur(10px)', transform: 'rotate(-18deg)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d7cdff', marginBottom: 14 }}>Interview Ready · Final Revision</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ margin: 0, fontFamily: displayFont, fontSize: 'clamp(44px, 8vw, 78px)', lineHeight: 0.95, letterSpacing: '-0.06em', fontWeight: 650 }}>T - 1 Day</h1>
                <p style={{ maxWidth: 680, margin: '20px 0 0', color: '#eeeaff', fontSize: 'clamp(16px, 2.3vw, 21px)', lineHeight: 1.45 }}>A focused final pass across technical finance, Oxane-style questions, formulas, and the stories you must be ready to explain.</p>
              </div>
              <div style={{ display: 'flex', gap: 20, color: '#eeeaff', fontSize: 13, fontWeight: 700 }}>
                <span><strong style={{ display: 'block', color: '#fff', fontSize: 28 }}>{cards.length}</strong>questions</span>
                <span><strong style={{ display: 'block', color: '#fff', fontSize: 28 }}>{tMinusOneDayTopics.length}</strong>topics</span>
              </div>
            </div>
          </div>
        </header>

        <nav aria-label="T - 1 Day sections" style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 0 16px', background: 'rgba(251,250,255,0.9)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}>
          <GlossyButton active={view === 'questions'} onClick={() => setView('questions')}>Questions</GlossyButton>
          <GlossyButton active={view === 'topics'} onClick={() => setView('topics')}>Topics</GlossyButton>
          <GlossyButton active={view === 'formulae'} onClick={() => setView('formulae')}>Formulae</GlossyButton>
        </nav>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '2px 0 20px', scrollbarWidth: 'none' }}>
          <GlossyButton active={!activeTopic} onClick={() => setActiveTopic(null)}>All</GlossyButton>
          {tMinusOneDayTopics.map(([topic]) => (
            <GlossyButton key={topic} active={activeTopic === topic} onClick={() => { setActiveTopic(topic); setView('questions'); }}>{topic}</GlossyButton>
          ))}
        </div>

        {view === 'topics' && (
          <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))', gap: 14, paddingTop: 18 }}>
            {tMinusOneDayTopics.map(([topic, description], index) => {
              const count = cards.filter((card) => card.tMinusOneDayTopic === topic).length;
              return (
                <button key={topic} type="button" onClick={() => { setActiveTopic(topic); setView('questions'); }} style={{ textAlign: 'left', border: `1px solid ${border}`, borderRadius: 18, background: '#fff', padding: 22, cursor: 'pointer', boxShadow: '0 8px 22px rgba(50,35,100,0.06)', fontFamily: pageFont }}>
                  <span style={{ color: '#9a8bd5', fontSize: 11, fontWeight: 850, letterSpacing: '0.12em' }}>{String(index + 1).padStart(2, '0')}</span>
                  <h2 style={{ margin: '10px 0 8px', color: ink, fontFamily: displayFont, fontSize: 23, lineHeight: 1.1, letterSpacing: '-0.03em' }}>{topic}</h2>
                  <p style={{ margin: 0, color: muted, fontSize: 14, lineHeight: 1.55 }}>{description}</p>
                  <div style={{ marginTop: 18, color: purple, fontSize: 12, fontWeight: 800 }}>{count} questions →</div>
                </button>
              );
            })}
          </main>
        )}

        {view === 'formulae' && (
          <main style={{ display: 'grid', gap: 16, paddingTop: 18 }}>
            {formulaCards.map((card) => (
              <article key={card.id} style={{ border: `1px solid ${border}`, borderRadius: 18, background: '#fff', padding: 22, boxShadow: '0 8px 22px rgba(50,35,100,0.05)' }}>
                <div style={{ color: purple, fontSize: 12, fontWeight: 850, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{card.tMinusOneDayTopic}</div>
                <h2 style={{ margin: '10px 0 0', fontFamily: displayFont, fontSize: 23, lineHeight: 1.18, letterSpacing: '-0.03em' }}>{card.question}</h2>
                <FormulaBox formula={card.formula} />
              </article>
            ))}
          </main>
        )}

        {view === 'questions' && (
          <main style={{ paddingTop: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, borderBottom: `1px solid ${border}`, padding: '22px 0 14px' }}>
              <h2 style={{ margin: 0, fontFamily: displayFont, fontSize: 'clamp(27px, 4vw, 42px)', letterSpacing: '-0.045em' }}>{activeTopic || 'Final revision questions'}</h2>
              <span style={{ color: muted, fontSize: 13, fontWeight: 750, whiteSpace: 'nowrap' }}>{topicCards.length} questions</span>
            </div>
            {topicCards.map((card) => (
              <QuestionItem key={card.id} card={card} open={openCardId === card.id} onToggle={() => setOpenCardId(openCardId === card.id ? null : card.id)} />
            ))}
          </main>
        )}
      </div>
    </div>
  );
}
