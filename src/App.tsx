/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { CaseStudyModal } from './components/portfolio/CaseStudyModal';
import { PersonalContent } from './components/portfolio/PersonalContent';
import {
  PersonalSidebar,
  type PortfolioSectionId,
} from './components/portfolio/PersonalSidebar';
import { SpotlightCanvas } from './components/portfolio/SpotlightCanvas';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import type { CaseStudy } from './data/portfolioData';

const SECTION_IDS: PortfolioSectionId[] = [
  'about',
  'experience',
  'projects',
  'skills',
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function PortfolioApp() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<PortfolioSectionId>('about');
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as PortfolioSectionId);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-slate-800 dark:bg-[#0B1120] dark:text-slate-300">
      <SpotlightCanvas />

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        }
        title={
          resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        }
        className="fixed top-4 right-5 z-40 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200/90 bg-white/95 text-slate-900 shadow-2xs backdrop-blur-sm transition-colors duration-150 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 lg:top-6 lg:right-6 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800"
      >
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === 'dark' ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
              className="flex items-center justify-center"
            >
              <Sun className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
              transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
              className="flex items-center justify-center"
            >
              <Moon className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <div className="relative z-20 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:flex lg:justify-between lg:gap-12 lg:px-16 lg:py-0">
        <PersonalSidebar activeSection={activeSection} />

        <PersonalContent onSelectCaseStudy={setActiveCaseStudy} />
      </div>

      <CaseStudyModal
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onSelectStudy={setActiveCaseStudy}
      />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <PortfolioApp />
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
