import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Layers,
} from 'lucide-react';
import {
  CASE_STUDIES,
  EXPERIENCE_ROLES,
  PROFILE,
  SKILL_CATEGORIES,
  SKILL_GROUPS,
  type CaseStudy,
  type SkillCategoryId,
} from '../../data/portfolioData';
import { CompanyLogo } from './CompanyLogo';

interface PersonalContentProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ProjectThumb({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-900 p-3 text-slate-300 dark:border-slate-700/70">
        <Layers className="h-4 w-4 text-sky-400" />
        <span className="text-center font-display text-[11px]">{title}</span>
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200/80 bg-slate-900 dark:border-slate-700/60">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
    </div>
  );
}

export function PersonalContent({
  onSelectCaseStudy,
}: PersonalContentProps) {
  const [expandedRoles, setExpandedRoles] = useState<string[]>(['promethean']);
  const [skillFilter, setSkillFilter] = useState<SkillCategoryId>('all');

  const toggleRole = (roleId: string) => {
    setExpandedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const filteredSkills = useMemo(() => {
    if (skillFilter === 'all') return SKILL_GROUPS;
    return SKILL_GROUPS.filter((g) => g.category === skillFilter);
  }, [skillFilter]);

  return (
    <main className="pt-12 pb-20 lg:w-[56%] lg:py-20">
      {/* 1. ABOUT — Warm, Human First-Person Story */}
      <motion.section
        id="about"
        aria-label="About me"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
        className="mb-20 scroll-mt-20 lg:mb-28"
      >
        <div className="sticky top-0 z-20 -mx-6 mb-5 bg-[#FAFAFA]/85 px-6 py-4 backdrop-blur-md lg:sr-only dark:bg-[#0B1120]/85">
          <h2 className="font-display text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-slate-200">
            About
          </h2>
        </div>

        <div className="space-y-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            I&apos;m a backend software engineer with{' '}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              3.5 years of hands-on experience
            </span>{' '}
            designing reliable, clean, and high-throughput systems with{' '}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              Java, Spring Boot, SQL, and Microservices
            </span>
            . I enjoy working close to the core of an application—modernizing
            runtimes, untangling database bottlenecks, and turning complex
            business workflows into maintainable services.
          </p>

          <p>
            Currently, I&apos;m a Java Developer at{' '}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              PrometheanTechAI
            </span>{' '}
            in Ahmedabad, where I own the Contact Management microservice on an
            enterprise Campaign Management Platform. Recently, I migrated our
            services from Java 8 to{' '}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              Java 21 &amp; Spring Boot 3
            </span>{' '}
            (unlocking virtual threads and a{' '}
            <span className="font-mono text-[13px] font-medium tabular-nums text-slate-900 dark:text-sky-300">
              15%
            </span>{' '}
            runtime performance lift), built an AI-assisted testing suite
            reaching{' '}
            <span className="font-mono text-[13px] font-medium tabular-nums text-slate-900 dark:text-sky-300">
              ~90%
            </span>{' '}
            coverage across 5 services, and engineered bytecode instrumentation
            for the{' '}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              Hypertest Java SDK
            </span>{' '}
            using ByteBuddy and OpenTelemetry.
          </p>

          <p>
            Previously, I built clinical EHR &amp; FHIR interoperability APIs at{' '}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              OmniISM Technologies
            </span>{' '}
            and multi-tenant agricultural ERP modules at{' '}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              Qdev Technolab
            </span>
            . I graduated with a B.E. in Computer Engineering from GTU with a{' '}
            <span className="font-mono text-[13px] font-medium tabular-nums text-slate-900 dark:text-slate-200">
              9.13 CGPA
            </span>
            .
          </p>
        </div>
      </motion.section>

      {/* 2. EXPERIENCE — Minimalist Vertical Timeline with Company Logos */}
      <section
        id="experience"
        aria-label="Work experience"
        className="mb-20 scroll-mt-20 lg:mb-28"
      >
        <div className="sticky top-0 z-20 -mx-6 mb-6 border-b border-slate-200/80 bg-[#FAFAFA]/90 px-6 py-4 backdrop-blur-md lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-3.5 dark:border-slate-800/80 dark:bg-[#0B1120]/90 dark:lg:bg-transparent">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
            Experience
          </h2>
        </div>

        <ol className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
          {EXPERIENCE_ROLES.map((role, roleIdx) => {
            const isExpanded = expandedRoles.includes(role.id);

            return (
              <li
                key={role.id}
                className={roleIdx === 0 ? 'pb-8' : 'py-8'}
              >
                {/* Company Header Row */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                    <CompanyLogo companyId={role.id} />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                    {role.company}
                  </h3>
                </div>

                {/* Role & Vertical Timeline Rail */}
                <div className="mt-4 flex gap-3.5">
                  {/* Left Rail: </> Medallion + Continuous Hairline */}
                  <div className="flex w-7 shrink-0 flex-col items-center">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-slate-100 text-slate-500 dark:border-slate-700/80 dark:bg-slate-800/90 dark:text-slate-400">
                      <Code2 className="h-3.5 w-3.5" />
                    </div>
                    <div
                      aria-hidden="true"
                      className="mt-1.5 w-px flex-1 bg-slate-200 dark:bg-slate-800"
                    />
                  </div>

                  {/* Right Role Content */}
                  <div className="min-w-0 flex-1 pb-1">
                    <button
                      type="button"
                      onClick={() => toggleRole(role.id)}
                      aria-expanded={isExpanded}
                      className="group flex w-full cursor-pointer items-start justify-between gap-4 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
                    >
                      <div className="min-w-0">
                        <p className="font-display text-base font-semibold leading-snug text-slate-950 transition-colors group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-sky-300">
                          {role.role}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>{role.employmentType}</span>
                          <span
                            aria-hidden="true"
                            className="text-slate-300 dark:text-slate-700"
                          >
                            |
                          </span>
                          <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                            {role.numericPeriod}
                          </span>
                        </p>
                      </div>

                      <ChevronDown
                        className={`mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                          className="mt-4 space-y-6"
                        >
                          {role.projects.map((project) => (
                            <div key={project.name} className="space-y-2.5">
                              <div>
                                <p className="font-display text-sm font-semibold text-slate-800 dark:text-slate-200">
                                  {project.name}
                                </p>
                                <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                  {project.tagline}
                                </p>
                              </div>

                              <ul className="space-y-2">
                                {project.bullets.map((bullet, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-3 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
                                    />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>

                              <p className="pt-1 font-mono text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                                {project.environment.join(' · ')}
                              </p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 3. PROJECTS — Personal Engineering Showcase with Thumbnails & Case Study Drawer */}
      <section
        id="projects"
        aria-label="Selected projects"
        className="mb-20 scroll-mt-20 lg:mb-28"
      >
        <div className="sticky top-0 z-20 -mx-6 mb-6 border-b border-slate-200/80 bg-[#FAFAFA]/90 px-6 py-4 backdrop-blur-md lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-3.5 dark:border-slate-800/80 dark:bg-[#0B1120]/90 dark:lg:bg-transparent">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
            Selected Projects
          </h2>
        </div>

        <ul className="group/list space-y-6">
          {CASE_STUDIES.map((study) => (
            <li
              key={study.id}
              className="transition-opacity duration-200 lg:group-hover/list:opacity-50 lg:hover:!opacity-100"
            >
              <article
                role="button"
                tabIndex={0}
                onClick={() => onSelectCaseStudy(study)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectCaseStudy(study);
                  }
                }}
                className="group relative -mx-5 grid cursor-pointer grid-cols-1 gap-4 rounded-xl border border-transparent p-5 transition-all duration-200 hover:border-slate-200/90 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-sky-500 sm:grid-cols-8 sm:gap-6 dark:hover:border-slate-800 dark:hover:bg-slate-800/35"
              >
                {/* Left Thumbnail */}
                <div className="sm:col-span-3 sm:pt-1">
                  <ProjectThumb
                    src={study.image}
                    alt={study.imageAlt}
                    title={study.title}
                  />
                </div>

                {/* Right Project Narrative */}
                <div className="sm:col-span-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-sky-300">
                      {study.title}
                    </h3>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-600 dark:text-slate-500 dark:group-hover:text-sky-300" />
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {study.company} · {study.period}
                  </p>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {study.summary}
                  </p>

                  <p className="mt-3 font-mono text-xs tabular-nums text-slate-800 dark:text-sky-300/90">
                    {study.headlineMetric}
                  </p>

                  <p className="mt-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {study.stack.slice(0, 6).join(' · ')}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. SKILLS & EDUCATION */}
      <section
        id="skills"
        aria-label="Skills and education"
        className="mb-8 scroll-mt-20 lg:mb-0"
      >
        <div className="sticky top-0 z-20 -mx-6 mb-6 border-b border-slate-200/80 bg-[#FAFAFA]/90 px-6 py-4 backdrop-blur-md lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-3.5 dark:border-slate-800/80 dark:bg-[#0B1120]/90 dark:lg:bg-transparent">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
            Skills &amp; Education
          </h2>
        </div>

        {/* Clean Segmented Filter */}
        <div
          role="group"
          aria-label="Filter skills"
          className="mb-6 flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 p-1 dark:bg-slate-900/80"
        >
          {SKILL_CATEGORIES.map((category) => {
            const active = skillFilter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSkillFilter(category.id)}
                aria-pressed={active}
                className={`relative min-h-8 cursor-pointer whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-sky-500 ${
                  active
                    ? 'text-slate-950 dark:text-slate-100'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="personal-skill-tab"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-md bg-white shadow-xs dark:bg-slate-800"
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="divide-y divide-slate-200/80 border-y border-slate-200/80 dark:divide-slate-800/80 dark:border-slate-800/80">
          {filteredSkills.map((group) => (
            <div
              key={group.id}
              className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <h3 className="font-display text-sm font-semibold text-slate-900 sm:col-span-4 dark:text-slate-100">
                {group.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 sm:col-span-8 dark:text-slate-400">
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>

        {/* Education & Languages */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tabular-nums text-slate-500 uppercase dark:text-slate-400">
              Education · {PROFILE.education.period}
            </p>
            <p className="mt-1.5 font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
              {PROFILE.education.degree}
            </p>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              {PROFILE.education.institution}
            </p>
            <p className="mt-1 font-mono text-xs tabular-nums text-slate-700 dark:text-sky-300">
              CGPA {PROFILE.education.cgpa}
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] text-slate-500 uppercase dark:text-slate-400">
              Languages
            </p>
            <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
              {PROFILE.languages.join(' · ')}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {PROFILE.location}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
