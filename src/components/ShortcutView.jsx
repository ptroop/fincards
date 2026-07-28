import { useMemo } from 'react';
import { aptitudeShortcutSections } from '../data/aptitudeShortcutStructure.js';

function parseExplanation(explanation = '') {
  const match = explanation.match(
    /Worked examples?:\s*([\s\S]*?)\n\nUse when:\s*([\s\S]*?)\n\nTrap:\s*([\s\S]*)/i,
  );
  if (!match) return { workedExample: explanation, useWhen: '', trap: '' };
  return {
    workedExample: match[1].trim(),
    useWhen: match[2].trim(),
    trap: match[3].trim(),
  };
}

function FormulaPanel({ card }) {
  const formulae = card.formulae?.length
    ? card.formulae
    : card.formula
      ? [{ label: 'Core formula', expression: card.formula }]
      : [];

  if (!formulae.length) return null;

  return (
    <div className="rounded-[18px] border border-[#0066cc]/15 bg-[#0066cc]/[0.055] p-4 dark:border-[#2997ff]/20 dark:bg-[#2997ff]/10">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0066cc] dark:text-[#64b5ff]">
        Formulae
      </div>
      <div className="space-y-2">
        {formulae.map((formula) => (
          <div key={`${formula.label}-${formula.expression}`} className="grid gap-1 sm:grid-cols-[130px_1fr] sm:gap-3">
            <span className="text-[11px] font-semibold text-[#6e6e73] dark:text-[#a1a1a6]">{formula.label}</span>
            <code className="whitespace-pre-wrap break-words text-[12px] font-semibold leading-relaxed text-[#1d1d1f] dark:text-[#f5f5f7]">
              {formula.expression}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

function MethodBlock({ label, value, tone = 'neutral' }) {
  if (!value) return null;
  const toneClass = tone === 'warning'
    ? 'border-[#ff9500]/20 bg-[#ff9500]/[0.055]'
    : tone === 'use'
      ? 'border-[#34c759]/20 bg-[#34c759]/[0.055]'
      : 'border-black/[0.06] bg-black/[0.025] dark:border-white/10 dark:bg-white/[0.04]';
  return (
    <div className={`rounded-[16px] border p-4 ${toneClass}`}>
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#86868b]">{label}</div>
      <div className="whitespace-pre-wrap text-[13px] font-medium leading-relaxed text-[#1d1d1f] dark:text-[#d1d1d6]">{value}</div>
    </div>
  );
}

export default function ShortcutView({ deck }) {
  const groupedDeck = useMemo(() => aptitudeShortcutSections.map((section) => ({
    ...section,
    cards: deck
      .filter((card) => card.shortcut_section === section.id)
      .sort((a, b) => (a.shortcut_order || 999) - (b.shortcut_order || 999)),
  })).filter((section) => section.cards.length), [deck]);

  const totalFormulae = deck.reduce((sum, card) => (
    sum + (card.formulae?.length || (card.formula ? 1 : 0))
  ), 0);

  return (
    <div className="w-full min-h-full overflow-y-auto bg-[#f5f5f7] pb-24 dark:bg-black">
      <header className="mx-auto max-w-5xl px-5 pb-9 pt-12 text-center md:pb-12 md:pt-20">
        <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">
          Oxane Assessment Toolkit
        </div>
        <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-6xl">
          Methods, formulae, and traps.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6] md:text-lg">
          {deck.length} methods arranged as an academic syllabus, with {totalFormulae} formula references and a worked application for every card.
        </p>

        <nav className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Shortcut sections">
          {groupedDeck.map((section) => (
            <a
              key={section.id}
              href={`#shortcut-${section.id}`}
              className="rounded-full border border-black/[0.07] bg-white px-3.5 py-2 text-[11px] font-semibold text-[#1d1d1f] shadow-sm transition-colors hover:border-[#0066cc]/30 hover:text-[#0066cc] dark:border-white/10 dark:bg-[#1c1c1e] dark:text-[#f5f5f7]"
            >
              {section.title} · {section.cards.length}
            </a>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-5xl space-y-14 px-4 md:px-8">
        {groupedDeck.map((section) => (
          <section key={section.id} id={`shortcut-${section.id}`} className="scroll-mt-6">
            <div className="mb-5 border-b border-black/[0.08] pb-4 dark:border-white/10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0066cc] dark:text-[#2997ff]">
                Section {String(aptitudeShortcutSections.findIndex((item) => item.id === section.id) + 1).padStart(2, '0')}
              </div>
              <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] md:text-3xl">{section.title}</h2>
                <span className="text-[12px] font-semibold text-[#86868b]">{section.cards.length} methods</span>
              </div>
              <p className="mt-2 max-w-3xl text-[14px] font-medium leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6]">{section.description}</p>
            </div>

            <div className="space-y-5">
              {section.cards.map((card, index) => {
                const method = parseExplanation(card.explanation);
                return (
                  <article
                    key={card.id}
                    className="overflow-hidden rounded-[26px] border border-black/[0.055] bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.055)] dark:border-white/[0.08] dark:bg-[#1c1c1e] md:p-8"
                  >
                    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-9">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.09em] text-[#6e6e73] dark:bg-[#2c2c2e] dark:text-[#a1a1a6]">
                          <span className="h-2 w-2 rounded-full bg-[#0066cc]" />
                          Method {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-xl font-bold leading-tight tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] md:text-2xl">
                          {card.question}
                        </h3>
                        <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Rule</div>
                        <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-[#0066cc] dark:text-[#64b5ff] md:text-[17px]">
                          {card.answer}
                        </p>
                        <div className="mt-5">
                          <FormulaPanel card={card} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <MethodBlock label="Worked example" value={method.workedExample} />
                        <MethodBlock label="Use when" value={method.useWhen} tone="use" />
                        <MethodBlock label="Trap / limitation" value={method.trap} tone="warning" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {deck.length === 0 && (
          <div className="py-12 text-center font-medium text-[#86868b]">No shortcuts available in this deck.</div>
        )}
      </div>
    </div>
  );
}
