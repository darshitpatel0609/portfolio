import { motion } from 'motion/react';
import {
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
} from 'lucide-react';
import { PROFILE } from '../../data/portfolioData';

export type PortfolioSectionId =
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills';

interface PersonalSidebarProps {
  activeSection: PortfolioSectionId;
}

const SECTIONS: { id: PortfolioSectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PersonalSidebar({ activeSection }: PersonalSidebarProps) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-20">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <a
            href="#about"
            className="inline-block font-display text-4xl font-bold tracking-tight text-slate-900 transition-colors hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 sm:text-5xl dark:text-slate-100 dark:hover:text-sky-300"
          >
            {PROFILE.fullName}
          </a>

          <h2 className="mt-3 font-display text-lg font-medium tracking-tight text-slate-700 sm:text-xl dark:text-slate-200">
            {PROFILE.role}
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            I architect scalable, fault-tolerant Java &amp; Spring Boot backend
            systems, distributed microservices, and developer tooling.
          </p>
        </motion.div>

        {/* Growing-Line Section Navigation (Desktop) */}
        <nav
          aria-label="In-page jump links"
          className="mt-10 hidden lg:block"
        >
          <ul className="w-max space-y-1">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className="group flex items-center py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
                  >
                    <span
                      aria-hidden="true"
                      className={`mr-4 h-px transition-all duration-200 ${
                        isActive
                          ? 'w-16 bg-slate-900 dark:bg-sky-400'
                          : 'w-8 bg-slate-400 group-hover:w-14 group-hover:bg-slate-800 dark:bg-slate-600 dark:group-hover:bg-slate-200'
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold tracking-wider transition-colors duration-150 ${
                        isActive
                          ? 'text-slate-950 dark:text-slate-100'
                          : 'text-slate-500 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-slate-200'
                      }`}
                    >
                      {section.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Profile Metadata List */}
      <div className="mt-8 border-t border-slate-200/80 pt-6 lg:mt-8 dark:border-slate-800/80">
        <ul className="min-w-0 space-y-2.5 font-mono text-[13px] text-slate-700 dark:text-slate-300">
          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <Code2 className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">
              Java Developer @
              <span className="font-semibold text-slate-950 dark:text-slate-100">
                PrometheanTechAI Pvt. Ltd.
              </span>
            </span>
          </li>

          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <Briefcase className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">
              3.5+ Years ·{' '}
              <span className="font-semibold text-slate-950 dark:text-slate-100">
                Java 21 &amp; Spring Boot
              </span>
            </span>
          </li>

          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">{PROFILE.location}</span>
          </li>

          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <Mail className="h-3.5 w-3.5" />
            </span>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label={`Email ${PROFILE.email}`}
              className="truncate transition-colors hover:text-sky-600 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-sky-500 dark:hover:text-sky-300"
            >
              {PROFILE.email}
            </a>
          </li>

          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <GraduationCap className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">
              B.E. Computer Engineering ·{' '}
              <span className="font-semibold text-slate-950 dark:text-slate-100">
                GTU
              </span>
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}
