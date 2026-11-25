/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CaseStudyModal } from './components/portfolio/CaseStudyModal';
import { PersonalContent } from './components/portfolio/PersonalContent';
import {
  PersonalSidebar,
  type PortfolioSectionId,
} from './components/portfolio/PersonalSidebar';
import { SpotlightCanvas } from './components/portfolio/SpotlightCanvas';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import type { CaseStudy } from './data/portfolioData';

const SECTION_IDS: PortfolioSectionId[] = [
  'about',
  'experience',
  'projects',
  'skills',
];

function PortfolioApp() {
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
