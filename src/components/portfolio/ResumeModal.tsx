import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, Loader2, Minus, Plus, X } from 'lucide-react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { useToast } from '../../context/ToastContext';
import {
  EXPERIENCE_ROLES,
  PROFILE,
  RESUME_PDF_PATH,
  SKILL_GROUPS,
} from '../../data/portfolioData';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

type ResumeViewMode = 'pdf' | 'structured';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const { pushToast } = useToast();
  const [viewMode, setViewMode] = useState<ResumeViewMode>('pdf');
  const [zoom, setZoom] = useState(1.1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || viewMode !== 'pdf') return;

    let cancelled = false;
    const container = canvasContainerRef.current;
    if (!container) return;

    async function renderPdfPages() {
      setLoadingPdf(true);
      setPdfError(null);

      try {
        const loadingTask = getDocument({ url: RESUME_PDF_PATH });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        setPageCount(pdf.numPages);
        const targetContainer = canvasContainerRef.current;
        if (!targetContainer) return;
        targetContainer.innerHTML = '';

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          if (cancelled) return;

          const baseViewport = page.getViewport({ scale: 1 });
          const maxWidth = Math.min(targetContainer.clientWidth - 32, 820);
          const fitScale = maxWidth > 0 ? maxWidth / baseViewport.width : 1;
          const renderScale = fitScale * zoom;
          const viewport = page.getViewport({ scale: renderScale });

          const pageWrapper = document.createElement('div');
          pageWrapper.className =
            'overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800';

          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
          canvas.style.display = 'block';

          const context = canvas.getContext('2d');
          if (!context) continue;

          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          pageWrapper.appendChild(canvas);
          targetContainer.appendChild(pageWrapper);

          await page.render({
            canvas,
            canvasContext: context,
            viewport,
          }).promise;
        }
      } catch (err) {
        if (!cancelled) {
          setPdfError(
            err instanceof Error
              ? err.message
              : 'Unable to render PDF preview in this browser.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingPdf(false);
        }
      }
    }

    renderPdfPages();

    return () => {
      cancelled = true;
    };
  }, [open, viewMode, zoom]);

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      const response = await fetch(RESUME_PDF_PATH);
      if (!response.ok) throw new Error('Failed to fetch PDF');
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = 'Darshit_G_Patel_Resume.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);

      pushToast({
        title: 'Resume downloaded',
        description: 'Saved Darshit_G_Patel_Resume.pdf',
        variant: 'success',
      });
    } catch {
      const fallbackAnchor = document.createElement('a');
      fallbackAnchor.href = RESUME_PDF_PATH;
      fallbackAnchor.download = 'Darshit_G_Patel_Resume.pdf';
      fallbackAnchor.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="resume-backdrop"
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
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            className="flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-[#0F172A] dark:text-slate-100"
          >
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5 sm:px-6 dark:border-slate-800">
              <div className="min-w-0">
                <h2
                  id="resume-modal-title"
                  className="truncate font-display text-base font-semibold text-zinc-950 dark:text-zinc-50"
                >
                  {PROFILE.fullName} — Resume
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {PROFILE.role}
                  {pageCount > 0 ? ` · ${pageCount} pages` : ''}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Mode Toggle: Original PDF vs Structured Text */}
                <div
                  role="group"
                  aria-label="Resume view mode"
                  className="inline-flex items-center rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900"
                >
                  {(
                    [
                      { id: 'pdf', label: 'Original PDF' },
                      { id: 'structured', label: 'Text View' },
                    ] as const
                  ).map((tab) => {
                    const active = viewMode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setViewMode(tab.id)}
                        aria-pressed={active}
                        className={`min-h-8 cursor-pointer whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                          active
                            ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50'
                            : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Zoom Controls (PDF mode) */}
                {viewMode === 'pdf' && (
                  <div className="hidden items-center gap-1 rounded-lg border border-zinc-200 px-1 py-0.5 sm:flex dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() =>
                        setZoom((prev) => Math.max(0.75, Number((prev - 0.15).toFixed(2))))
                      }
                      aria-label="Zoom out"
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[42px] text-center font-mono text-[11px] tabular-nums text-zinc-700 dark:text-zinc-300">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setZoom((prev) => Math.min(1.6, Number((prev + 0.15).toFixed(2))))
                      }
                      aria-label="Zoom in"
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={downloading}
                  className="inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-sky-500 disabled:opacity-60 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                >
                  <Download className="h-3.5 w-3.5 shrink-0" />
                  <span>{downloading ? 'Saving...' : 'Download PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Viewer Viewport */}
            <div className="relative flex-1 overflow-y-auto bg-zinc-100/90 dark:bg-zinc-900">
              {viewMode === 'pdf' ? (
                <div className="flex min-h-full flex-col items-center px-4 py-6">
                  {loadingPdf && (
                    <div className="flex items-center gap-2.5 py-10 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
                      <span>Rendering PDF pages...</span>
                    </div>
                  )}

                  {pdfError ? (
                    <div className="my-auto max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950">
                      <p className="font-display text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                        PDF preview unavailable
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Switch to Text View to read the full resume inline or download the
                        original PDF directly.
                      </p>
                      <div className="mt-4 flex justify-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setViewMode('structured')}
                          className="min-h-9 cursor-pointer rounded-lg border border-zinc-300 bg-white px-3.5 text-xs font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        >
                          Open Text View
                        </button>
                        <button
                          type="button"
                          onClick={handleDownloadPdf}
                          className="min-h-9 cursor-pointer rounded-lg bg-blue-600 px-3.5 text-xs font-medium text-white hover:bg-blue-700"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      ref={canvasContainerRef}
                      className="flex w-full flex-col items-center gap-5"
                    />
                  )}
                </div>
              ) : (
                /* Clean Selectable Structured Document View */
                <div className="mx-auto my-6 max-w-3xl rounded-xl border border-zinc-200 bg-white p-8 text-zinc-900 shadow-xs sm:p-10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                  <div className="border-b border-zinc-200 pb-6 text-center dark:border-zinc-800">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {PROFILE.fullName}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {PROFILE.role}
                    </p>
                    <p className="mt-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {PROFILE.email} · {PROFILE.location}
                    </p>
                  </div>

                  <div className="mt-6 space-y-7 text-sm">
                    <section>
                      <h4 className="border-b border-zinc-200 pb-1.5 font-display text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:border-zinc-800 dark:text-zinc-400">
                        Professional Summary
                      </h4>
                      <p className="mt-2.5 leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {PROFILE.summary}
                      </p>
                    </section>

                    <section>
                      <h4 className="border-b border-zinc-200 pb-1.5 font-display text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:border-zinc-800 dark:text-zinc-400">
                        Technical Skills
                      </h4>
                      <div className="mt-3 space-y-2 text-xs leading-relaxed">
                        {SKILL_GROUPS.map((group) => (
                          <p key={group.id} className="text-zinc-700 dark:text-zinc-300">
                            <span className="font-semibold text-zinc-950 dark:text-zinc-100">
                              {group.title}:
                            </span>{' '}
                            {group.items.join(', ')}
                          </p>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h4 className="border-b border-zinc-200 pb-1.5 font-display text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:border-zinc-800 dark:text-zinc-400">
                        Professional Experience
                      </h4>
                      <div className="mt-4 space-y-6">
                        {EXPERIENCE_ROLES.map((role) => (
                          <div key={role.id} className="space-y-3">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <p className="font-display text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                {role.company} · {role.location}
                              </p>
                              <p className="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                                {role.role} · {role.period}
                              </p>
                            </div>
                            {role.projects.map((proj) => (
                              <div key={proj.name} className="space-y-1.5 pl-1">
                                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                                  {proj.name}{' '}
                                  <span className="font-normal text-zinc-500 dark:text-zinc-400">
                                    — {proj.tagline}
                                  </span>
                                </p>
                                <ul className="list-disc space-y-1 pl-5 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                                  {proj.bullets.map((b, i) => (
                                    <li key={i}>{b}</li>
                                  ))}
                                </ul>
                                <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                                  Environment: {proj.environment.join(', ')}
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="border-b border-zinc-200 pb-1.5 font-display text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:border-zinc-800 dark:text-zinc-400">
                          Education
                        </h4>
                        <p className="mt-2.5 text-xs font-semibold text-zinc-950 dark:text-zinc-100">
                          {PROFILE.education.degree}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                          {PROFILE.education.institution} · {PROFILE.education.period}
                        </p>
                        <p className="mt-0.5 font-mono text-xs tabular-nums text-zinc-700 dark:text-zinc-300">
                          CGPA: {PROFILE.education.cgpa}
                        </p>
                      </div>
                      <div>
                        <h4 className="border-b border-zinc-200 pb-1.5 font-display text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:border-zinc-800 dark:text-zinc-400">
                          Languages
                        </h4>
                        <p className="mt-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                          {PROFILE.languages.join(' · ')}
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
