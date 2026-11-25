export const RESUME_PDF_PATH = '/assets/aistudio/Darshit_Patel_Resume_a9e646df.pdf';

export const PROFILE = {
  fullName: 'Darshit Patel',
  shortName: 'Darshit Patel',
  role: 'Backend Software Engineer',
  location: 'Ahmedabad, Gujarat, India',
  email: 'darshitpateltest@gmail.com',
  experienceYears: '3.5+ Years',
  summary:
    'Software Engineer with 3.5 years of experience designing and building scalable, fault-tolerant backend systems using Java, Spring Boot, SQL, and Microservices. Focused on distributed systems, asynchronous processing, database optimization, security integration, and clean architecture.',
  languages: ['English', 'Gujarati', 'Hindi'],
  education: {
    degree: 'Bachelor of Engineering — Computer Engineering',
    institution: 'Hasmukh Goswami College of Engineering, GTU',
    period: '2018 – 2022',
    cgpa: '9.13',
  },
} as const;

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_backend_architecture_1795578224184.jpg',
  alt: 'Architectural engineering studio featuring dark anodized aluminum monolithic server racks and crisp daylight geometry',
} as const;

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export const PROOF_METRICS: ProofMetric[] = [
  {
    value: '3.5+ yrs',
    label: 'Backend Engineering',
    context: 'Enterprise Java, Spring Boot & Microservices',
  },
  {
    value: '+15%',
    label: 'Runtime Performance',
    context: 'Java 8 → 21 & Spring Boot 3 virtual-thread upgrade',
  },
  {
    value: '~90%',
    label: 'Automated Coverage',
    context: 'AI-assisted JUnit 5 & Mockito suite across 5 services',
  },
  {
    value: '9.13',
    label: 'B.E. Engineering CGPA',
    context: 'Computer Engineering, GTU (2018 – 2022)',
  },
];

export const MARQUEE_ITEMS: string[] = [
  'Java 21 & Virtual Threads',
  'Spring Boot 3.x',
  'Distributed Microservices',
  'RabbitMQ Event Workflows',
  'OpenTelemetry & Jaeger',
  'ByteBuddy Instrumentation',
  'Azure Blob Streaming',
  'PostgreSQL · MySQL · MSSQL',
  'Docker & Kubernetes',
  'Centralized JWT Security',
];

export interface ArchitectureStage {
  step: string;
  title: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  company: string;
  period: string;
  domain: string;
  featured?: boolean;
  image: string;
  imageAlt: string;
  headlineMetric: string;
  summary: string;
  challenge: string;
  architectureStages: ArchitectureStage[];
  highlights: string[];
  stack: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'campaign-platform',
    index: '01',
    title: 'Campaign Management Platform',
    company: 'PrometheanTechAI Pvt. Ltd.',
    period: 'July 2024 – Present',
    domain: 'Enterprise Distributed Systems',
    featured: true,
    image: '/src/assets/images/campaign_platform_visual_1795580917149.jpg',
    imageAlt:
      'Isometric visualization of multi-service campaign orchestration, contact networks, RabbitMQ message queues, and cloud storage nodes',
    headlineMetric: '+15% runtime throughput · ~90% test coverage across 5 services',
    summary:
      'Multi-service enterprise platform orchestrating campaign creation, contact management, document collaboration, live monitoring, and scheduled asynchronous processing.',
    challenge:
      'Modernize legacy Java 8 / Spring Boot 2.x services without interrupting critical campaign releases, unify access control across four independent services, and streamline large attachment storage and cross-service workflows.',
    architectureStages: [
      {
        step: '01',
        title: 'Runtime & API Core',
        detail:
          'Upgraded to Java 21 virtual threads and Spring Boot 3.x with Spring RestClient replacing legacy communication layers.',
      },
      {
        step: '02',
        title: 'Centralized Security',
        detail:
          'Integrated a unified authorization library across 4 services to guarantee consistent JWT and role-based access enforcement.',
      },
      {
        step: '03',
        title: 'Async & Storage Mesh',
        detail:
          'Connected Contact Management, GX Collaboration, Monitoring, and Scheduler via RabbitMQ alongside streaming Azure Blob Storage I/O.',
      },
    ],
    highlights: [
      'Owned end-to-end development and production support for the Contact Management service.',
      'Migrated backend services from Java 8 to Java 21 and Spring Boot 2.x to 3.x, unlocking virtual-thread concurrency and a 15% runtime performance gain.',
      'Built an AI-assisted unit testing framework reaching ~90% coverage across 5 services with JUnit 5 and Mockito.',
      'Led centralized authorization library integration across 4 services and implemented EMS organizational hierarchy retrieval.',
      'Engineered streaming-based Azure Blob Storage uploads/downloads, email reply processing, and SQL query optimizations.',
    ],
    stack: [
      'Java 21',
      'Spring Boot 3.x',
      'Spring Data JPA',
      'Hibernate',
      'MySQL',
      'RabbitMQ',
      'Azure Blob Storage',
      'Docker',
      'Kubernetes',
      'JUnit 5',
      'Mockito',
    ],
  },
  {
    id: 'hypertest-sdk',
    index: '02',
    title: 'Hypertest Java SDK',
    company: 'PrometheanTechAI Pvt. Ltd.',
    period: '2024 – Present',
    domain: 'Developer Tooling & Observability',
    image: '/src/assets/images/hypertest_sdk_visual_1795580918981.jpg',
    imageAlt:
      'Isometric visualization of bytecode traffic interception capturing HTTP, queue, and gRPC streams into record and replay telemetry trace spans',
    headlineMetric: 'Zero-code RECORD / REPLAY for HTTP, QUEUE & gRPC',
    summary:
      'Automated backend testing SDK leveraging runtime bytecode instrumentation to capture live traffic, mock external dependencies, and replay deterministic service tests.',
    challenge:
      'Intercept diverse Java networking libraries with minimal runtime overhead while accurately serializing complex objects, exporting distributed traces, and serving deterministic mocks during replay.',
    architectureStages: [
      {
        step: '01',
        title: 'ByteBuddy Interception',
        detail:
          'Instrumented HTTP, QUEUE, and gRPC libraries at runtime to capture request inputs, responses, and exception states.',
      },
      {
        step: '02',
        title: 'Record & Replay Store',
        detail:
          'Built in-memory storage, custom replay fetch APIs, and bi-directional JSON Schema ↔ Java Object generators.',
      },
      {
        step: '03',
        title: 'OpenTelemetry Export',
        detail:
          'Configured OpenTelemetry instrumentation pipelines exporting traces to Jaeger and the Hypertest dashboard.',
      },
    ],
    highlights: [
      'Instrumented Java libraries using ByteBuddy to generate deterministic mock data for HTTP, QUEUE, and gRPC protocols.',
      'Engineered RECORD and REPLAY execution modes capturing library inputs, outputs, and failure traces.',
      'Configured OpenTelemetry exporters streaming live spans to Jaeger and the Hypertest analytics dashboard.',
      'Implemented JSON Schema generation from runtime objects and dynamic object instantiation from JSON Schema.',
      'Optimized interception hooks and mocking pipelines to lower instrumentation overhead.',
    ],
    stack: [
      'Java',
      'ByteBuddy',
      'OpenTelemetry',
      'Jaeger',
      'Spring Boot',
      'JSON Schema',
      'gRPC',
    ],
  },
  {
    id: 'omnione-healthcare',
    index: '03',
    title: 'OmniOne EHR & OmniFHIR Suite',
    company: 'OmniISM Technologies Pvt. Ltd.',
    period: 'March 2023 – January 2024',
    domain: 'Healthcare Interoperability',
    image: '/src/assets/images/omnione_ehr_visual_1795580918228.jpg',
    imageAlt:
      'Isometric healthcare technology visualization showing EHR clinical records, patient appointment portal cards, FHIR interoperability bridges, and dual clinical databases',
    headlineMetric: 'MSSQL deadlock resolution · FHIR clinical interoperability',
    summary:
      'Three interconnected healthcare systems—OmniOne EHR, a patient-facing portal, and OmniFHIR—powering clinical records, appointments, billing, and standards-compliant data exchange.',
    challenge:
      'Maintain high availability across mission-critical clinical APIs while resolving production MSSQL memory bottlenecks, deadlocks, and multi-system registration integrations.',
    architectureStages: [
      {
        step: '01',
        title: 'Clinical Core APIs',
        detail:
          'Supported patient and clinical endpoints in Spring Boot with structured root-cause production diagnostics.',
      },
      {
        step: '02',
        title: 'Database Tuning',
        detail:
          'Eliminated MSSQL memory contention and transaction deadlocks under concurrent clinical workloads.',
      },
      {
        step: '03',
        title: 'Patient & FHIR Layer',
        detail:
          'Backed appointments, payments, insurance, reports, and FHIR user-registration interoperability workflows.',
      },
    ],
    highlights: [
      'Supported patient and clinical APIs in OmniOne EHR using Spring Boot and resolved live production incidents via root-cause analysis.',
      'Performed MSSQL performance tuning to resolve memory pressure and transactional deadlocks.',
      'Translated clinical and billing requirements into technical specifications for the Patient Portal microservices (PostgreSQL, Angular 9).',
      'Debugged OmniFHIR interoperability workflows and improved user-registration integration performance.',
    ],
    stack: [
      'Java 8',
      'Spring Boot',
      'Microservices',
      'MSSQL',
      'PostgreSQL',
      'Angular 9',
      'FHIR',
    ],
  },
  {
    id: 'farmony-enterprise',
    index: '04',
    title: 'Farmony Enterprise & Super Admin',
    company: 'Qdev Technolab Pvt. Ltd.',
    period: 'August 2022 – January 2023',
    domain: 'Enterprise Operations ERP',
    image: '/src/assets/images/farmony_erp_visual_1795580919592.jpg',
    imageAlt:
      'Isometric architectural diorama of terraced agricultural fields, greenhouses, import/export cargo logistics, and a floating Super Admin policy control grid',
    headlineMetric: 'Multi-module ERP + policy-based Super Admin control plane',
    summary:
      'Comprehensive agricultural operations platform managing imports/exports, online sales, equipment inventory, staff payroll, work history, and centralized policy governance.',
    challenge:
      'Deliver consistent configuration governance across multiple tenant admin interfaces while keeping complex operational queries responsive across MySQL and PostgreSQL.',
    architectureStages: [
      {
        step: '01',
        title: 'Operational Modules',
        detail:
          'Built and maintained payroll, equipment tracking, import/export, and sales workflows in Java 11 and Spring MVC.',
      },
      {
        step: '02',
        title: 'Persistence Layer',
        detail:
          'Structured MyBatis SQL mappers across MySQL and PostgreSQL databases with ongoing query tuning.',
      },
      {
        step: '03',
        title: 'Super Admin Governance',
        detail:
          'Engineered policy-based settings controlling behavior and integration consistency across child admin consoles.',
      },
    ],
    highlights: [
      'Designed and maintained client-driven ERP modules spanning imports/exports, online sales, equipment, payroll, and work history.',
      'Developed policy-based configuration controls inside the Farmony Super Admin interface.',
      'Ensured cross-module integration consistency and resolved defects through methodical source-code analysis and code reviews.',
    ],
    stack: [
      'Java 11',
      'Spring MVC',
      'ZK EE',
      'MyBatis',
      'MySQL',
      'PostgreSQL',
    ],
  },
];

export interface ExperienceProject {
  name: string;
  tagline: string;
  bullets: string[];
  environment: string[];
}

export interface ExperienceRole {
  id: string;
  company: string;
  shortName: string;
  role: string;
  employmentType: string;
  period: string;
  numericPeriod: string;
  location: string;
  projects: ExperienceProject[];
}

export const EXPERIENCE_ROLES: ExperienceRole[] = [
  {
    id: 'promethean',
    company: 'PrometheanTechAI Pvt. Ltd.',
    shortName: 'PrometheanTechAI',
    role: 'Java Developer',
    employmentType: 'Full-time',
    period: 'July 2024 – Present',
    numericPeriod: '07.2024 – ∞',
    location: 'Ahmedabad, India',
    projects: [
      {
        name: 'Campaign Management Platform',
        tagline:
          'Enterprise platform for campaign creation, contact management, document collaboration, monitoring, and scheduled processing.',
        bullets: [
          'Owned end-to-end development and support of the Contact Management service within a multi-service enterprise platform.',
          'Migrated backend services from Java 8 to Java 21 and Spring Boot 2.x to 3.x, enabling virtual-thread support and improving runtime performance by 15%.',
          'Implemented an AI-assisted unit testing framework achieving ~90% test coverage across 5 services using JUnit 5 and Mockito.',
          'Headed integration of a centralized authorization/security library across 4 services to enforce consistent access-control checks.',
          'Integrated Contact Management, GX Collaboration, Monitoring, and Scheduler services with asynchronous RabbitMQ workflows.',
          'Implemented Azure Blob Storage streaming uploads/downloads, EMS organizational hierarchy integrations, and Spring RestClient migration.',
          'Optimized application performance by eliminating redundant database queries and improving SQL execution plans.',
        ],
        environment: [
          'Java 21',
          'Spring Boot 3.x',
          'Spring Data JPA',
          'Hibernate',
          'MySQL',
          'RabbitMQ',
          'Azure Blob Storage',
          'Docker',
          'Kubernetes',
          'JUnit 5',
          'Mockito',
        ],
      },
      {
        name: 'Hypertest SDK',
        tagline:
          'SDK for automated HTTP, QUEUE, and gRPC service testing with bytecode instrumentation.',
        bullets: [
          'Instrumented Java libraries with ByteBuddy and built mock generation pipelines for HTTP, QUEUE, and gRPC testing.',
          'Implemented RECORD and REPLAY modes capturing and replaying inputs, outputs, and error states.',
          'Configured OpenTelemetry pipelines exporting traces to Jaeger and the Hypertest dashboard.',
          'Created in-memory storage, custom REPLAY fetch APIs, and bi-directional JSON Schema ↔ Object generation.',
        ],
        environment: [
          'Java',
          'ByteBuddy',
          'OpenTelemetry',
          'Jaeger',
          'Spring Boot',
        ],
      },
    ],
  },
  {
    id: 'omniism',
    company: 'OmniISM Technologies Pvt. Ltd.',
    shortName: 'OmniISM Technologies',
    role: 'Jr. Java Developer',
    employmentType: 'Full-time',
    period: 'March 2023 – January 2024',
    numericPeriod: '03.2023 – 01.2024',
    location: 'Ahmedabad, India',
    projects: [
      {
        name: 'OmniOne (EHR System)',
        tagline: 'Electronic Health Records system for patient and clinical data.',
        bullets: [
          'Participated in requirement analysis and supported patient and clinical APIs using Spring Boot.',
          'Resolved production issues through structured debugging and root-cause analysis.',
          'Performed MSSQL performance tuning by resolving memory pressure and deadlock issues.',
        ],
        environment: ['Java 8', 'Spring Boot', 'Angular 9', 'MSSQL'],
      },
      {
        name: 'Patient Portal',
        tagline:
          'Patient portal supporting appointments, payments, insurance, and medical reports.',
        bullets: [
          'Translated business requirements into technical specifications and maintained documentation.',
          'Collaborated across development, project management, business, and QA teams for defect resolution and code reviews.',
        ],
        environment: [
          'Java 8',
          'Spring Boot',
          'Microservices',
          'PostgreSQL',
          'Angular 9',
        ],
      },
      {
        name: 'OmniFHIR',
        tagline: 'FHIR-based healthcare interoperability solution.',
        bullets: [
          'Analyzed source code, debugged interoperability issues, and proposed architectural fixes.',
          'Supported user-registration integration workflows and runtime performance improvements.',
        ],
        environment: ['Java 8', 'Angular 9', 'MSSQL'],
      },
    ],
  },
  {
    id: 'qdev',
    company: 'Qdev Technolab Pvt. Ltd.',
    shortName: 'Qdev Technolab',
    role: 'Jr. Java Developer',
    employmentType: 'Full-time',
    period: 'August 2022 – January 2023',
    numericPeriod: '08.2022 – 01.2023',
    location: 'Ahmedabad, India',
    projects: [
      {
        name: 'Farmony — Admin Interface',
        tagline:
          'Enterprise ERP supporting farm operations, imports/exports, online sales, equipment, staff payroll, and work history.',
        bullets: [
          'Designed and maintained software modules tailored to client operational workflows.',
          'Tested releases, optimized application performance, and actively participated in peer code reviews.',
        ],
        environment: [
          'Java 11',
          'ZK EE',
          'Spring MVC',
          'MySQL',
          'MyBatis',
          'PostgreSQL',
        ],
      },
      {
        name: 'Farmony — Super Admin Interface',
        tagline:
          'Policy-based configuration and multi-admin management interface.',
        bullets: [
          'Developed and tested configuration and policy-based governance settings.',
          'Ensured cross-interface integration consistency and resolved defects through source-code analysis.',
        ],
        environment: ['Java 11', 'ZK EE', 'Spring MVC', 'MySQL', 'MyBatis'],
      },
    ],
  },
];

export type SkillCategoryId =
  | 'all'
  | 'backend'
  | 'architecture'
  | 'data'
  | 'quality';

export interface SkillGroup {
  id: string;
  category: Exclude<SkillCategoryId, 'all'>;
  title: string;
  summary: string;
  items: string[];
}

export const SKILL_CATEGORIES: { id: SkillCategoryId; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'backend', label: 'Languages & Backend' },
  { id: 'architecture', label: 'Architecture & Messaging' },
  { id: 'data', label: 'Databases & Cloud' },
  { id: 'quality', label: 'Security & Testing' },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    category: 'backend',
    title: 'Languages',
    summary: 'Modern LTS JVM runtimes paired with strong relational SQL fluency.',
    items: ['Java 21', 'Java 17', 'Java 8', 'SQL', 'JavaScript'],
  },
  {
    id: 'frameworks',
    category: 'backend',
    title: 'Backend & Frameworks',
    summary: 'Production Spring ecosystem for resilient APIs and microservice suites.',
    items: [
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'Spring Data JPA',
      'Hibernate',
      'JPA',
      'REST APIs',
      'Spring RestClient',
      'Microservices',
    ],
  },
  {
    id: 'architecture',
    category: 'architecture',
    title: 'System Architecture',
    summary: 'Fault-tolerant service decomposition, schema modeling, and async orchestration.',
    items: [
      'Distributed Systems',
      'Event-Driven Architecture',
      'Asynchronous Processing',
      'System Design',
      'Database Design & Modeling',
    ],
  },
  {
    id: 'messaging',
    category: 'architecture',
    title: 'Messaging & Cloud Storage',
    summary: 'Reliable brokered queues and streaming object storage pipelines.',
    items: ['RabbitMQ', 'Azure Blob Storage'],
  },
  {
    id: 'databases',
    category: 'data',
    title: 'Databases',
    summary: 'Query optimization, indexing, deadlock resolution, and schema migrations.',
    items: ['MySQL', 'PostgreSQL', 'MSSQL'],
  },
  {
    id: 'devops',
    category: 'data',
    title: 'DevOps, Cloud & Tooling',
    summary: 'Containerized deployments, CI/CD pipelines, and daily engineering workflow tools.',
    items: [
      'Docker',
      'Kubernetes',
      'Jenkins',
      'Azure Pipelines',
      'Git',
      'Maven',
      'IntelliJ IDEA',
      'Postman',
      'MySQL Workbench',
    ],
  },
  {
    id: 'security',
    category: 'quality',
    title: 'Security & Observability',
    summary: 'Centralized access control, JWT authentication, and distributed tracing.',
    items: [
      'JWT',
      'Centralized Authorization',
      'Authentication & Authorization',
      'ByteBuddy',
      'OpenTelemetry',
      'Jaeger',
    ],
  },
  {
    id: 'testing',
    category: 'quality',
    title: 'Testing & Engineering Practices',
    summary: 'High-coverage automated test suites and disciplined Agile delivery.',
    items: [
      'JUnit 5',
      'Mockito',
      'Unit Testing',
      'Integration Testing',
      'Agile/Scrum',
      'Code Reviews',
      'CI/CD',
      'Root Cause Analysis',
      'Performance Optimization',
    ],
  },
];
