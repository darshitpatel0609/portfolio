import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Layers, X } from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '../../data/portfolioData';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onSelectStudy: (study: CaseStudy) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CaseStudyModal({
  study,
  onClose,
  onSelectStudy,
}: CaseStudyModalProps) {
  const [imageError, setImageError] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  useEffect(() => {
    setImageError(false);
    setActiveStageIdx(0);
  }, [study?.id]);

  const currentIndex = study
    ? CASE_STUDIES.findIndex((item) => item.id === study.id)
    : -1;
  const prevStudy =
    currentIndex >= 0
      ? CASE_STUDIES[(currentIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length]
      : null;
  const nextStudy =
    currentIndex >= 0
      ? CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length]
      : null;

  useEffect(() => {
    if (!study) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && nextStudy) {
        onSelectStudy(nextStudy);
      } else if (event.key === 'ArrowLeft' && prevStudy) {
        onSelectStudy(prevStudy);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [study, onClose, nextStudy, prevStudy, onSelectStudy]);

  return (
    <AnimatePresence>
      {study && (
        <motion.div
          key="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-xs sm:p-6"
        >
          <motion.article
            key={study.id}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            className="relative my-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-[#0F172A] dark:text-slate-100"
          >
            {/* Sticky Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-[#0F172A]/95">
              <div className="flex min-w-0 items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-mono tabular-nums">
                  Case Study {study.index} / {String(CASE_STUDIES.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{study.company}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Hero Media Frame */}
            <div className="relative h-[260px] w-full overflow-hidden bg-zinc-900 sm:h-[320px]">
              {!imageError ? (
                <img
                  src={study.image}
                  alt={study.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 to-blue-950 text-zinc-300">
                  <Layers className="h-7 w-7 text-blue-400" />
                  <span className="font-display text-sm">{study.title}</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pt-16 pb-6 sm:px-8">
                <p className="text-xs text-zinc-300">
                  {study.domain} · {study.period}
                </p>
                <h2
                  id="case-study-title"
                  className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  {study.title}
                </h2>
              </div>
            </div>

            {/* Editorial Content Body */}
            <div className="space-y-10 p-6 sm:p-8">
              {/* Overview & Outcome */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="space-y-3 md:col-span-7">
                  <h3 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                    Context &amp; Engineering Scope
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {study.summary}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {study.challenge}
                  </p>
                </div>

                <div className="space-y-4 border-t border-zinc-200 pt-6 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-8 dark:border-zinc-800">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Key Result
                    </p>
                    <p className="mt-1 font-mono text-sm font-medium tabular-nums text-zinc-950 dark:text-zinc-50">
                      {study.headlineMetric}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Technical Environment
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {study.stack.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive System Architecture Pipeline */}
              <div className="space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    System Architecture Flow
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Select any stage to inspect its layer role
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {study.architectureStages.map((stage, idx) => {
                    const isFocused = activeStageIdx === idx;
                    return (
                      <button
                        key={stage.step}
                        type="button"
                        onClick={() => setActiveStageIdx(idx)}
                        aria-pressed={isFocused}
                        className={`relative cursor-pointer rounded-xl border p-5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-sky-500 ${
                          isFocused
                            ? 'border-sky-500/60 bg-sky-50/50 dark:border-sky-400/50 dark:bg-sky-950/30'
                            : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700'
                        }`}
                      >
                        <p
                          className={`font-mono text-xs tabular-nums ${
                            isFocused
                              ? 'text-sky-600 dark:text-sky-400'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          Stage {stage.step}
                        </p>
                        <h4 className="mt-2 font-display text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                          {stage.title}
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {stage.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Concrete Contributions */}
              <div className="space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Key Engineering Contributions
                </h3>
                <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {study.highlights.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-baseline gap-4 py-3.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Previous / Next Case Study Navigation */}
              {prevStudy && nextStudy && (
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => onSelectStudy(prevStudy)}
                    className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate max-w-[200px]">
                      {prevStudy.index}. {prevStudy.title}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectStudy(nextStudy)}
                    className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-100 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-blue-400"
                  >
                    <span className="truncate max-w-[200px]">
                      {nextStudy.index}. {nextStudy.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </button>
                </div>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
