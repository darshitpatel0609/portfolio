import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Briefcase,
  Check,
  Code2,
  Copy,
  GraduationCap,
  Mail,
  MapPin,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
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

const HERO_LIST_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.14,
    },
  },
};

const HERO_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
};

export function PersonalSidebar({ activeSection }: PersonalSidebarProps) {
  const { pushToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      pushToast({
        title: 'Email copied',
        description: PROFILE.email,
        variant: 'success',
      });
      window.setTimeout(() => setCopiedEmail(false), 1600);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-20">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
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
        <motion.nav
          aria-label="In-page jump links"
          variants={HERO_LIST_VARIANTS}
          initial="hidden"
          animate="visible"
          className="mt-10 hidden lg:block"
        >
          <ul className="w-max space-y-1">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <motion.li key={section.id} variants={HERO_ITEM_VARIANTS}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className="group flex items-center py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={{ width: isActive ? 64 : 32 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className={`mr-4 h-px transition-colors duration-200 ${
                        isActive
                          ? 'bg-slate-900 dark:bg-sky-400'
                          : 'bg-slate-400 group-hover:bg-slate-800 dark:bg-slate-600 dark:group-hover:bg-slate-200'
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold tracking-wider transition-all duration-150 ${
                        isActive
                          ? 'translate-x-0.5 text-slate-950 dark:text-slate-100'
                          : 'text-slate-500 group-hover:translate-x-0.5 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-slate-200'
                      }`}
                    >
                      {section.label}
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>
      </div>

      {/* Bottom Profile Metadata List */}
      <motion.div
        variants={HERO_LIST_VARIANTS}
        initial="hidden"
        animate="visible"
        className="mt-8 border-t border-slate-200/80 pt-6 lg:mt-8 dark:border-slate-800/80"
      >
        <ul className="min-w-0 space-y-2.5 font-mono text-[13px] text-slate-700 dark:text-slate-300">
          <motion.li variants={HERO_ITEM_VARIANTS} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <Code2 className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">
              Java Developer @
              <span className="font-semibold text-slate-950 dark:text-slate-100">
                PrometheanTechAI Pvt. Ltd.
              </span>
            </span>
          </motion.li>

          <motion.li variants={HERO_ITEM_VARIANTS} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <Briefcase className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">
              3.5+ Years ·{' '}
              <span className="font-semibold text-slate-950 dark:text-slate-100">
                Java 21 &amp; Spring Boot
              </span>
            </span>
          </motion.li>

          <motion.li variants={HERO_ITEM_VARIANTS} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">{PROFILE.location}</span>
          </motion.li>

          <motion.li variants={HERO_ITEM_VARIANTS} className="group/mail flex items-center gap-3">
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
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              title="Copy email address"
              className="inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-400 opacity-70 transition-all duration-150 hover:bg-slate-200/70 hover:text-slate-800 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-sky-500 group-hover/mail:opacity-100 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copiedEmail ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.li>

          <motion.li variants={HERO_ITEM_VARIANTS} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
              <GraduationCap className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">
              B.E. Computer Engineering ·{' '}
              <span className="font-semibold text-slate-950 dark:text-slate-100">
                GTU
              </span>
            </span>
          </motion.li>
        </ul>
      </motion.div>
    </header>
  );
}
