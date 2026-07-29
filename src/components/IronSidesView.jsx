import { useMemo, useState } from 'react';
import IronSidesConceptVisual from './IronSidesConceptVisual';

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
      <div style={{ color: ink, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 16, lineHeight: 1.6, overflowX: 'auto' }}>
        {item.expression}
      </div>
      {item.variables && <div style={{ color: muted, fontSize: 15, lineHeight: 1.6, marginTop: 8 }}>{item.variables}</div>}
    </div>
  );
}

function ConceptCard({ item, index }) {
  const openingDefinition = item.definition && item.definition !== item.explanation ? item.definition : null;

  return (
    <article id={item.id} style={{ borderBottom: `1px solid ${border}`, padding: '38px 0 46px', scrollMarginTop: 110 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '42px minmax(0, 1fr)', gap: 16, alignItems: 'start' }}>
        <div style={{ color: green, fontSize: 13, fontWeight: 800, paddingTop: 5 }}>{String(index + 1).padStart(2, '0')}</div>
        <div>
          <h3 style={{ color: ink, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 560, lineHeight: 1.17, margin: 0, letterSpacing: '-0.025em' }}>
            {item.title}
          </h3>
          {openingDefinition && (
            <p style={{ color: ink, fontSize: 20, lineHeight: 1.7, fontWeight: 560, margin: '18px 0 16px', fontFamily: textFont }}>
              {openingDefinition}
            </p>
          )}
        </div>
      </div>
      <div style={{ marginLeft: 58, paddingTop: openingDefinition ? 0 : 18 }}>
      {item.simpleMeaning && (
        <p style={{ color: ink, fontSize: 20, lineHeight: 1.78, margin: '0 0 18px', fontFamily: textFont }}>{item.simpleMeaning}</p>
      )}
      <div style={{ color: '#334038', fontSize: 20, lineHeight: 1.86, fontFamily: textFont }}>
        <LongText text={item.tutorial || item.explanation} />
      </div>
      <IronSidesConceptVisual visual={item.visual} />
      {item.subconcepts?.length > 0 && (
        <div style={{ marginTop: 28, display: 'grid', gap: 22 }}>
          {item.subconcepts.map((subconcept) => (
            <section key={`${item.id}_${subconcept.title}`}>
              <h4 style={{ color: ink, fontSize: 20, lineHeight: 1.35, fontWeight: 700, margin: '0 0 6px' }}>{subconcept.title}</h4>
              <p style={{ color: '#46534b', fontSize: 19, lineHeight: 1.82, margin: 0, fontFamily: textFont }}>{subconcept.explanation}</p>
            </section>
          ))}
        </div>
      )}
      {(item.formulae?.length ?? 0) > 0 && (
        <div style={{ display: 'grid', gap: 10, marginTop: 22 }}>
          {item.formulae.map((formula) => <Formula key={`${item.id}_${formula.label}`} item={formula} />)}
        </div>
      )}
      {(item.indianExample || item.workedExample || item.example) && (
        <div style={{ marginTop: 26, padding: '16px 18px', borderLeft: '3px solid #79a88d', background: '#f5f8f5' }}>
          <div style={{ color: '#334038', fontSize: 17, lineHeight: 1.8, fontFamily: textFont }}><LongText text={item.indianExample || item.workedExample || item.example} /></div>
        </div>
      )}
      {item.realEvent && (
        <p style={{ margin: '18px 0 0', color: '#46534b', fontSize: 17, lineHeight: 1.8, fontFamily: textFont }}>{item.realEvent}</p>
      )}
      {item.workedExample && item.workedExample !== item.indianExample && (
        <div style={{ marginTop: 18 }}>
          <h4 style={{ color: ink, fontSize: 18, fontWeight: 750, margin: '0 0 8px' }}>Worked example</h4>
          <div style={{ color: '#334038', fontSize: 17, lineHeight: 1.8, fontFamily: textFont }}><LongText text={item.workedExample} /></div>
        </div>
      )}
      {item.journalEntries?.length > 0 && (
        <div style={{ marginTop: 18, borderRadius: 16, background: '#17211b', color: '#eaf1ec', padding: '17px 18px' }}>
          <div style={{ color: '#9cc2a8', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 9 }}>Entry</div>
          <div style={{ display: 'grid', gap: 8, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 15, lineHeight: 1.7 }}>
            {item.journalEntries.map((entry) => <div key={entry}>{entry}</div>)}
          </div>
        </div>
      )}
      {item.trap && (
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${border}`, color: '#564231', fontSize: 16, lineHeight: 1.72 }}>
            {item.trap}
        </div>
      )}
      {item.sources?.length > 0 && (
        <details style={{ marginTop: 20 }}>
          <summary style={{ color: muted, fontSize: 12, fontWeight: 750, cursor: 'pointer' }}>References</summary>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {item.sources.map((itemSource) => (
              <a key={itemSource.url} href={itemSource.url} target="_blank" rel="noreferrer" style={{ color: green, border: `1px solid ${border}`, background: '#fff', borderRadius: 999, padding: '7px 10px', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                {itemSource.label} ↗
              </a>
            ))}
          </div>
        </details>
      )}
      </div>
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
        {card.evidenceType && (
          <>
            <span style={{ color: '#a2aaa4' }}>·</span>
            <span style={{ color: muted, fontSize: 13 }}>
              {card.evidenceType === 'reported interview question' ? `Reported${card.company ? ` · ${card.company}` : ''}` : 'Practice'}
            </span>
          </>
        )}
        <span style={{ color: '#a2aaa4' }}>·</span>
      </div>

      <h3 style={{ color: ink, fontSize: 'clamp(23px, 3vw, 30px)', lineHeight: 1.34, fontWeight: 540, margin: '0 0 22px', letterSpacing: '-0.018em' }}>
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
                  fontSize: 17,
                  lineHeight: 1.55,
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
          <div style={{ color: ink, fontSize: 20, lineHeight: 1.75, fontWeight: 580 }}>{card.answer}</div>
          <div style={{ color: '#405048', fontSize: 19, lineHeight: 1.84, marginTop: 12, fontFamily: textFont }}>
            <LongText text={card.explanation} />
          </div>
          {card.sourceUrl && (
            <a href={card.sourceUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 14, color: green, fontSize: 14, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Public interview source ↗
            </a>
          )}
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
    <article style={{ padding: '30px 0', borderBottom: `1px solid ${border}` }}>
      <div style={{ color: green, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{card.subcategory}</div>
      <h3 style={{ color: ink, fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.34, fontWeight: 520, margin: '0 0 16px' }}>{card.question}</h3>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        style={{ border: 0, background: 'transparent', padding: 0, color: green, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
      >
        {open ? 'Hide archive answer' : 'View archive answer'}
      </button>
      {open && (
        <div style={{ marginTop: 20, color: '#334038', fontSize: 18, lineHeight: 1.8, fontFamily: textFont }}>
          <LongText text={card.answer} />
          {card.formula && <div style={{ marginTop: 16, padding: 14, background: pale, borderRadius: 12, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', overflowX: 'auto' }}>{card.formula}</div>}
        </div>
      )}
    </article>
  );
}

function TopicNavigation({ previousTopic, nextTopic, onSelect }) {
  return (
    <nav aria-label="Topic navigation" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, paddingTop: 30 }}>
      <button
        type="button"
        disabled={!previousTopic}
        onClick={() => previousTopic && onSelect(previousTopic.id)}
        style={{ border: `1px solid ${border}`, borderRadius: 14, background: '#fff', color: previousTopic ? ink : '#aeb5b0', padding: '14px 16px', textAlign: 'left', cursor: previousTopic ? 'pointer' : 'default', fontFamily: textFont }}
      >
        <div style={{ color: muted, fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Previous topic</div>
        <div style={{ fontSize: 14, fontWeight: 700, marginTop: 5 }}>{previousTopic?.shortTitle || 'First topic'}</div>
      </button>
      <button
        type="button"
        disabled={!nextTopic}
        onClick={() => nextTopic && onSelect(nextTopic.id)}
        style={{ border: `1px solid ${nextTopic ? green : border}`, borderRadius: 14, background: nextTopic ? pale : '#fff', color: nextTopic ? green : '#aeb5b0', padding: '14px 16px', textAlign: 'right', cursor: nextTopic ? 'pointer' : 'default', fontFamily: textFont }}
      >
        <div style={{ color: nextTopic ? green : muted, fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Next topic</div>
        <div style={{ fontSize: 14, fontWeight: 700, marginTop: 5 }}>{nextTopic?.shortTitle || 'Final topic'}</div>
      </button>
    </nav>
  );
}

export default function IronSidesView({ modules, questions, archiveCards, onBack }) {
  const [section, setSection] = useState('learn');
  const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id ?? null);
  const [questionType, setQuestionType] = useState('all');
  const [questionEvidence, setQuestionEvidence] = useState('all');
  const activeModule = modules.find((module) => module.id === activeModuleId) ?? modules[0];
  const activeModuleIndex = modules.findIndex((module) => module.id === activeModule?.id);
  const previousTopic = activeModuleIndex > 0 ? modules[activeModuleIndex - 1] : null;
  const nextTopic = activeModuleIndex >= 0 && activeModuleIndex < modules.length - 1 ? modules[activeModuleIndex + 1] : null;

  const moduleQuestions = useMemo(
    () => questions.filter((card) => (
      card.moduleId === activeModule?.id
      && (questionType === 'all' || card.type === questionType)
      && (questionEvidence === 'all' || card.evidenceType === questionEvidence)
    )),
    [activeModule, questionEvidence, questionType, questions],
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

  const selectModule = (moduleId) => {
    setActiveModuleId(moduleId);
    requestAnimationFrame(() => {
      document.getElementById('ironsides-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
            Accounting, financial management, quantitative aptitude, and logical reasoning for the IronSides assessment.
          </p>
          <p style={{ color: muted, fontSize: 13, lineHeight: 1.6, margin: '24px 0 0' }}>
            {totals.concepts} reading sections · {totals.mcq} multiple-choice questions · {totals.solving} solving questions · {archiveCards.length} archived questions
          </p>
        </header>

        <div style={{ position: 'sticky', top: 0, zIndex: 20, margin: '0 -24px', padding: '14px 24px', background: 'rgba(251,252,250,0.92)', backdropFilter: 'blur(18px)', borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
          <div style={{ display: 'flex', gap: 24, overflowX: 'auto' }}>
            {[
              ['learn', 'Handbook'],
              ['practice', 'Questions'],
              ['archive', `Archive (${archiveCards.length})`],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => changeSection(value)}
                style={{ flexShrink: 0, border: 0, borderBottom: `2px solid ${section === value ? green : 'transparent'}`, borderRadius: 0, padding: '9px 0 8px', background: 'transparent', color: section === value ? ink : muted, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div id="ironsides-content" style={{ scrollMarginTop: 80, paddingTop: 34 }}>
          {section !== 'archive' && (
            <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 18, borderBottom: `1px solid ${border}` }}>
              {modules.map((module) => (
                <button
                  type="button"
                  key={module.id}
                  onClick={() => selectModule(module.id)}
                  style={{ flexShrink: 0, border: 0, borderBottom: `2px solid ${activeModule?.id === module.id ? green : 'transparent'}`, borderRadius: 0, padding: '7px 0 8px', background: 'transparent', color: activeModule?.id === module.id ? ink : muted, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  {module.order}. {module.shortTitle}
                </button>
              ))}
            </div>
          )}

          {section === 'learn' && activeModule && (
            <section>
              <div style={{ padding: '20px 0 8px' }}>
                <h2 style={{ color: ink, fontSize: 'clamp(34px, 6vw, 52px)', lineHeight: 1.05, fontWeight: 540, letterSpacing: '-0.04em', margin: '0 0 16px' }}>{activeModule.title}</h2>
                {activeModule.opening && (
                  <p style={{ color: '#334038', fontSize: 19, lineHeight: 1.78, maxWidth: 850, margin: '18px 0 0', fontFamily: textFont }}>{activeModule.opening}</p>
                )}
                {activeModule.assessmentWeight && (
                  <div style={{ color: green, fontSize: 12, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '-6px 0 16px' }}>{activeModule.assessmentWeight}</div>
                )}
              </div>
              {activeModule.concepts.map((item, index) => <ConceptCard key={item.id} item={item} index={index} />)}
              <TopicNavigation previousTopic={previousTopic} nextTopic={nextTopic} onSelect={selectModule} />
            </section>
          )}

          {section === 'practice' && activeModule && (
            <section>
              <div style={{ padding: '20px 0 12px' }}>
                <div style={{ color: green, fontSize: 13, fontWeight: 750, marginBottom: 8 }}>Question bank</div>
                <h2 style={{ color: ink, fontSize: 'clamp(34px, 6vw, 52px)', lineHeight: 1.05, fontWeight: 540, letterSpacing: '-0.04em', margin: '0 0 16px' }}>{activeModule.title}</h2>
                <p style={{ color: muted, fontSize: 15, lineHeight: 1.65, maxWidth: 760, margin: 0 }}>
                  Reported questions reflect publicly documented interview patterns. Practice questions are original assessment-standard exercises covering the same concepts and the questions you should be able to solve fluently.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                  {[
                    ['all', `All (${questions.filter((card) => card.moduleId === activeModule.id).length})`],
                    ['reported interview question', `Reported (${questions.filter((card) => card.moduleId === activeModule.id && card.evidenceType === 'reported interview question').length})`],
                    ['assessment-standard', `Practice (${questions.filter((card) => card.moduleId === activeModule.id && card.evidenceType === 'assessment-standard').length})`],
                  ].map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setQuestionEvidence(value)}
                      style={{ border: 0, borderRadius: 999, padding: '9px 14px', background: questionEvidence === value ? ink : '#e9eeea', color: questionEvidence === value ? '#fff' : ink, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
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
              {moduleQuestions.length === 0 && (
                <p style={{ color: muted, fontSize: 16, lineHeight: 1.6, padding: '28px 0' }}>No questions match both filters.</p>
              )}
              <TopicNavigation previousTopic={previousTopic} nextTopic={nextTopic} onSelect={selectModule} />
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
