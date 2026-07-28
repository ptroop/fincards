import { useState } from 'react';

export default function LearnMore({ explanation, alwaysOpen = false, label = 'Learn more' }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!explanation) return null;

  if (alwaysOpen) {
    return (
      <section className="w-full pt-4" aria-label={label}>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
          {label}
        </div>
        <div className="rounded-xl border border-white/15 bg-white/10 p-4 text-[13px] font-medium leading-relaxed text-white md:text-[14px]">
          {explanation}
        </div>
      </section>
    );
  }

  return (
    <div className="w-full pt-4 mt-auto">
      <button 
        onClick={(e) => {
          e.stopPropagation(); // prevent flip
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 text-[13px] font-medium text-white/80 hover:text-white transition-colors focus:outline-none"
      >
        <span>{label}</span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden">
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm text-white text-[13px] md:text-[14px] font-medium shadow-sm border border-transparent">
            <p className="leading-relaxed">{explanation}</p>

          </div>
        </div>
      </div>
    </div>
  );
}
