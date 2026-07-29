import { useMemo, useState } from 'react';

const pageFont = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
const textFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
const ink = '#17211b';
const muted = '#667169';
const green = '#245c3f';
const pale = '#eef4ef';
const border = 'rgba(23,33,27,0.10)';

function LongText({ text }) {
  if (!text) return null;
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {text.split(/\n{2,}/).map((paragraph) => (
        <p key={paragraph} style={{ margin: 0 }}>{paragraph}</p>
      ))}
    </div>
  );
}

function Formula({ item }) {
  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 14, padding: '14px 16px', background: '#f7f9f7' }}>
      <div style={{ color: green, fontSize: 12, fontWeight: 700, marginBottom: 7, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {item.label}
      </div>
      <div style={{ color: ink, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 15, lineHeight: 1.5, overflowX: 'auto' }}>
        {item.expression}
      </div>
      {item.variables && <div style={{ color: muted, fontSize: 13, lineHeight: 1.55, marginTop: 8 }}>{item.variables}</div>}
    </div>
  );
}

function LessonBlock({ label, children, tone = 'plain' }) {
  if (!children) return null;
  const styles = {
    plain: { background: '#f6f8f6', border: '#dfe7e1', color: '#334038' },
    simple: { background: '#eef4ef', border: '#cddfd2', color: '#274334' },
    eli5: { background: '#fff7e9', border: '#ead8b5', color: '#59482d' },
    event: { background: '#f7f1ec', border: '#e4d2c3', color: '#574337' },
  }[tone];

  return (
    <div style={{ marginTop: 16, border: `1px solid ${styles.border}`, borderRadius: 16, background: styles.background, padding: '17px 18px', color: styles.color }}>
      <div style={{ color: tone === 'eli5' ? '#8b642b' : green, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 15, lineHeight: 1.68, fontFamily: textFont }}>
        {typeof children === 'string' ? <LongText text={children} /> : children}
      </div>
    </div>
  );
}

function ConceptCard({ item, index }) {
  return (
    <article style={{ padding: '34px 0', borderBottom: `1px solid ${border}` }}>
      <div style={{ color: green, fontSize: 12, fontWeight: 750, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
        Executive note {index + 1}
      </div>
      <h3 style={{ color: ink, fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 560, lineHeight: 1.15, margin: '0 0 16px', letterSpacing: '-0.025em' }}>
        {item.title}
      </h3>
      <LessonBlock label="Core rule">
        <LongText text={item.definition || item.explanation} />
      </LessonBlock>
      <LessonBlock label="Why it matters" tone="simple">
        <LongText text={item.simpleMeaning || item.example} />
      </LessonBlock>
      {item.subconcepts?.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ color: green, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Mechanism — follow this order</div>
          <div style={{ display: 'grid', gap: 9 }}>
            {item.subconcepts.map((subconcept, subIndex) => (
              <div key={`${item.id}_${subconcept.title}`} style={{ borderLeft: '3px solid #b8cfbf', padding: '4px 0 4px 14px' }}>
                <div style={{ color: ink, fontSize: 15, fontWeight: 750 }}>{subIndex + 1}. {subconcept.title}</div>
                <div style={{ color: muted, fontSize: 14, lineHeight: 1.6, marginTop: 3 }}>{subconcept.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {(item.formulae?.length ?? 0) > 0 && (
        <div style={{ display: 'grid', gap: 10, marginTop: 22 }}>
          {item.formulae.map((formula) => <Formula key={`${item.id}_${formula.label}`} item={formula} />)}
        </div>
      )}
      <LessonBlock label="Indian mini-case" tone="eli5"><LongText text={item.indianExample || item.workedExample || item.example} /></LessonBlock>
      {item.workedExample && item.workedExample !== item.indianExample && (
        <LessonBlock label="Apply it"><LongText text={item.workedExample} /></LessonBlock>
      )}
      <LessonBlock label="Business evidence" tone="event"><LongText text={item.realEvent} /></LessonBlock>
      {item.journalEntries?.length > 0 && (
        <div style={{ marginTop: 18, borderRadius: 16, background: '#17211b', color: '#eaf1ec', padding: '17px 18px' }}>
          <div style={{ color: '#9cc2a8', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 9 }}>Journal-entry patterns</div>
          <div style={{ display: 'grid', gap: 8, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 13, lineHeight: 1.6 }}>
            {item.journalEntries.map((entry) => <div key={entry}>{entry}</div>)}
          </div>
        </div>
      )}
      {item.trap && (
        <div style={{ marginTop: 12, paddingLeft: 16, borderLeft: '3px solid #c8925f', color: '#564231', fontSize: 15, lineHeight: 1.6 }}>
          <strong>Interview decision: </strong>{item.trap}
        </div>
      )}
      {item.sources?.length > 0 && (
        <details style={{ marginTop: 20 }}>
          <summary style={{ color: muted, fontSize: 12, fontWeight: 750, cursor: 'pointer' }}>Sources used for this note</summary>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {item.sources.map((itemSource) => (
              <a key={itemSource.url} href={itemSource.url} target="_blank" rel="noreferrer" style={{ color: green, border: `1px solid ${border}`, background: '#fff', borderRadius: 999, padding: '7px 10px', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                {itemSource.label} ↗
              </a>
            ))}
          </div>
        </details>
      )}
    </article>
  );
}

function QuestionCard({ card, number }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const answered = card.type === 'mcq' ? selectedOption !== null : showSolution;
  const isCorrect = card.type === 'mcq' && selectedOption === card.correctOption;

  return (
    <article style={{ padding: '34px 0', borderBottom: `1px solid ${border}` }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ color: green, fontSize: 12, fontWeight: 750, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
          Question {number}
        </span>
        <span style={{ color: '#a2aaa4' }}>·</span>
        <span style={{ color: muted, fontSize: 13 }}>{card.type === 'mcq' ? 'MCQ' : 'Solving question'}</span>
        <span style={{ color: '#a2aaa4' }}>·</span>
        <span style={{ color: muted, fontSize: 13 }}>{card.difficulty}</span>
        {card.questionClass && (
          <>
            <span style={{ color: '#a2aaa4' }}>·</span>
            <span style={{ color: muted, fontSize: 13 }}>{card.questionClass.replaceAll('_', ' ')}</span>
          </>
        )}
      </div>

      <h3 style={{ color: ink, fontSize: 'clamp(21px, 3vw, 28px)', lineHeight: 1.3, fontWeight: 540, margin: '0 0 22px', letterSpacing: '-0.018em' }}>
        {card.question}
      </h3>

      {card.type === 'mcq' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          {card.options.map((option, optionIndex) => {
            const isSelected = selectedOption === optionIndex;
            const isAnswer = answered && optionIndex === card.correctOption;
            const isWrong = answered && isSelected && !isAnswer;
            return (
              <button
                type="button"
                key={option}
                onClick={() => setSelectedOption(optionIndex)}
                style={{
                  border: `1px solid ${isAnswer ? '#4f8a68' : isWrong ? '#b86c60' : border}`,
                  background: isAnswer ? '#e8f3eb' : isWrong ? '#f8ecea' : '#fff',
                  color: ink,
                  borderRadius: 14,
                  padding: '14px 16px',
                  textAlign: 'left',
                  fontFamily: textFont,
                  fontSize: 15,
                  lineHeight: 1.45,
                  cursor: 'pointer',
                }}
              >
                <strong style={{ marginRight: 8 }}>{String.fromCharCode(65 + optionIndex)}.</strong>{option}
              </button>
            );
          })}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowSolution((value) => !value)}
          style={{ border: 0, borderRadius: 999, padding: '11px 18px', background: green, color: '#fff', fontFamily: textFont, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          {showSolution ? 'Hide solution' : 'Show worked solution'}
        </button>
      )}

      {answered && (
        <div style={{ marginTop: 22, borderRadius: 16, background: pale, padding: 20 }}>
          {card.type === 'mcq' && (
            <div style={{ color: isCorrect ? green : '#9a5148', fontSize: 13, fontWeight: 800, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isCorrect ? 'Correct' : `Correct answer: ${String.fromCharCode(65 + card.correctOption)}`}
            </div>
          )}
          <div style={{ color: ink, fontSize: 17, lineHeight: 1.65, fontWeight: 580 }}>{card.answer}</div>
          <div style={{ color: '#405048', fontSize: 15, lineHeight: 1.7, marginTop: 12, fontFamily: textFont }}>
            <LongText text={card.explanation} />
          </div>
          {card.formula && (
            <div style={{ marginTop: 15, color: ink, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 14, lineHeight: 1.6, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.72)', overflowX: 'auto' }}>
              {card.formula}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function ArchiveCard({ card }) {
  const [open, setOpen] = useState(false);
  return (
    <article style={{ padding: '28px 0', borderBottom: `1px solid ${border}` }}>
      <div style={{ color: green, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{card.subcategory}</div>
      <h3 style={{ color: ink, fontSize: 'clamp(20px, 3vw, 26px)', lineHeight: 1.3, fontWeight: 520, margin: '0 0 16px' }}>{card.question}</h3>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        style={{ border: 0, background: 'transparent', padding: 0, color: green, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
      >
        {open ? 'Hide archive answer' : 'View archive answer'}
      </button>
      {open && (
        <div style={{ marginTop: 20, color: '#334038', fontSize: 16, lineHeight: 1.72, fontFamily: textFont }}>
          <LongText text={card.answer} />
          {card.formula && <div style={{ marginTop: 16, padding: 14, background: pale, borderRadius: 12, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', overflowX: 'auto' }}>{card.formula}</div>}
        </div>
      )}
    </article>
  );
}

export default function IronSidesView({ modules, questions, archiveCards, onBack }) {
  const [section, setSection] = useState('learn');
  const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id ?? null);
  const [questionType, setQuestionType] = useState('all');
  const activeModule = modules.find((module) => module.id === activeModuleId) ?? modules[0];

  const moduleQuestions = useMemo(
    () => questions.filter((card) => card.moduleId === activeModule?.id && (questionType === 'all' || card.type === questionType)),
    [activeModule, questionType, questions],
  );

  const totals = useMemo(() => ({
    concepts: modules.reduce((sum, module) => sum + module.concepts.length, 0),
    mcq: questions.filter((card) => card.type === 'mcq').length,
    solving: questions.filter((card) => card.type === 'solving').length,
  }), [modules, questions]);

  const changeSection = (nextSection) => {
    setSection(nextSection);
    document.getElementById('ironsides-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: '#fbfcfa', fontFamily: pageFont }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '28px 24px 120px' }}>
        <button type="button" onClick={onBack} style={{ border: 0, background: 'transparent', color: muted, padding: '8px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          ← Back
        </button>

        <header style={{ padding: '66px 0 54px' }}>
          <div style={{ color: green, fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
            MBA assessment preparation
          </div>
          <h1 style={{ color: ink, fontSize: 'clamp(52px, 10vw, 88px)', fontWeight: 520, lineHeight: 0.95, letterSpacing: '-0.055em', margin: 0 }}>
            IronSides.
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(19px, 3vw, 26px)', lineHeight: 1.4, maxWidth: 760, margin: '24px 0 0', fontWeight: 380 }}>
            A last-day executive course: learn the rule, follow the mechanism, decide the Indian mini-case, and immediately test it.
          </p>
          <div style={{ marginTop: 24, maxWidth: 780, border: `1px solid ${border}`, borderRadius: 16, background: '#fff', padding: '16px 18px' }}>
            <div style={{ color: green, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>Tomorrow-first plan</div>
            <div style={{ color: '#334038', fontSize: 14, lineHeight: 1.65 }}>
              First finish Modules 1–7, then Modules 9–12. Use Cost Accounting if time remains. End with Journal Entries, Rectification, Accounting Aptitude, and the Archive. Arithmetic and LR need timed practice, not theory rereading.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
            {[
              `${totals.concepts} concepts`,
              `${totals.mcq} MCQs`,
              `${totals.solving} solving questions`,
              `${archiveCards.length} archive questions`,
            ].map((label) => (
              <span key={label} style={{ border: `1px solid ${border}`, background: '#fff', color: muted, borderRadius: 999, padding: '8px 12px', fontSize: 13 }}>{label}</span>
            ))}
          </div>
        </header>

        <div style={{ position: 'sticky', top: 0, zIndex: 20, margin: '0 -24px', padding: '14px 24px', background: 'rgba(251,252,250,0.92)', backdropFilter: 'blur(18px)', borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {[
              ['learn', '1. Learn'],
              ['practice', '2. Practice'],
              ['archive', `Archive (${archiveCards.length})`],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => changeSection(value)}
                style={{ flexShrink: 0, border: 0, borderRadius: 999, padding: '10px 17px', background: section === value ? green : '#e9eeea', color: section === value ? '#fff' : ink, fontSize: 14, fontWeight: 750, cursor: 'pointer' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div id="ironsides-content" style={{ scrollMarginTop: 80, paddingTop: 34 }}>
          {section !== 'archive' && (
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 18 }}>
              {modules.map((module) => (
                <button
                  type="button"
                  key={module.id}
                  onClick={() => setActiveModuleId(module.id)}
                  style={{ flexShrink: 0, border: `1px solid ${activeModule?.id === module.id ? green : border}`, borderRadius: 12, padding: '11px 14px', background: activeModule?.id === module.id ? pale : '#fff', color: activeModule?.id === module.id ? green : muted, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  {module.order}. {module.shortTitle}
                </button>
              ))}
            </div>
          )}

          {section === 'learn' && activeModule && (
            <section>
              <div style={{ padding: '20px 0 8px' }}>
                <div style={{ color: green, fontSize: 13, fontWeight: 750, marginBottom: 8 }}>Module {activeModule.order} of {modules.length}</div>
                <h2 style={{ color: ink, fontSize: 'clamp(34px, 6vw, 52px)', lineHeight: 1.05, fontWeight: 540, letterSpacing: '-0.04em', margin: '0 0 16px' }}>{activeModule.title}</h2>
                <p style={{ color: muted, fontSize: 17, lineHeight: 1.6, maxWidth: 760, margin: 0 }}>{activeModule.description}</p>
                <p style={{ color: green, fontSize: 13, lineHeight: 1.6, maxWidth: 760, margin: '12px 0 0', fontWeight: 700 }}>
                  Read for the decision rule. Do not memorise prose; be able to explain the mechanism and entry in your own words.
                </p>
              </div>
              {activeModule.concepts.map((item, index) => <ConceptCard key={item.id} item={item} index={index} />)}
            </section>
          )}

          {section === 'practice' && activeModule && (
            <section>
              <div style={{ padding: '20px 0 12px' }}>
                <div style={{ color: green, fontSize: 13, fontWeight: 750, marginBottom: 8 }}>Assessment practice</div>
                <h2 style={{ color: ink, fontSize: 'clamp(34px, 6vw, 52px)', lineHeight: 1.05, fontWeight: 540, letterSpacing: '-0.04em', margin: '0 0 16px' }}>{activeModule.title}</h2>
                <p style={{ color: muted, fontSize: 17, lineHeight: 1.6, margin: 0 }}>Attempt first. Reveal the reasoning only after committing to an answer.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                  {[
                    ['all', 'All'],
                    ['mcq', 'MCQs'],
                    ['solving', 'Solving'],
                  ].map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setQuestionType(value)}
                      style={{ border: 0, borderRadius: 999, padding: '9px 14px', background: questionType === value ? ink : '#e9eeea', color: questionType === value ? '#fff' : ink, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {moduleQuestions.map((card, index) => <QuestionCard key={card.id} card={card} number={index + 1} />)}
            </section>
          )}

          {section === 'archive' && (
            <section>
              <div style={{ padding: '20px 0 18px' }}>
                <div style={{ color: green, fontSize: 13, fontWeight: 750, marginBottom: 8 }}>Migrated from Interview Ready</div>
                <h2 style={{ color: ink, fontSize: 'clamp(34px, 6vw, 52px)', lineHeight: 1.05, fontWeight: 540, letterSpacing: '-0.04em', margin: '0 0 16px' }}>IronSides Archive</h2>
                <p style={{ color: muted, fontSize: 17, lineHeight: 1.6, maxWidth: 780, margin: 0 }}>
                  These {archiveCards.length} legacy questions retain their original IDs, answers, formulas, and subcategories. They are removed from the Interview Ready screen and collected here.
                </p>
              </div>
              {archiveCards.map((card) => <ArchiveCard key={card.id} card={card} />)}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
