export const site = {
  name: "Hooked on AI",
  tagline: "Practical AI you can actually use.",
  handle: "@hooked-on-ai",
  contactEmail: "hello@hooked-on-ai.com",
} as const;

export const course = {
  name: "Codename: Agentic",
  tagline: "Your training to build, run, and ship fleets of AI agents.",
} as const;

export const navLinks = [
  { label: "Who it's for", href: "#who-its-for" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  eyebrow: "CODENAME: AGENTIC · WAITLIST OPEN",
  titleStart: "Whatever you build with,",
  titleLead: "learn to ship",
  kineticWords: [
    "real AI products",
    "RAG pipelines",
    "agent systems",
    "production AI",
  ],
  subtitle:
    "Whether you're a seasoned engineer or you build by prompting, this course takes you from AI experiments to systems that survive real users, real data, and real constraints. No gatekeeping — just the path from idea to shipped.",
  trustLine: "No clearance required — vibe coders and seasoned engineers welcome",
  primaryCta: "Get early access",
  secondaryCta: "Explore the curriculum",
} as const;

export const audienceIntro = {
  heading: "Built for the way",
  accentWord: "you",
  headingEnd: "build",
  description:
    "Two covers, one mission: ship AI that actually works. Pick the one that sounds like you.",
} as const;

export const audiences = [
  {
    id: "vibe",
    label: "I vibe code",
    persona: "The builder",
    headline: "You ship with AI, now go deeper",
    summary:
      "You've built real things with tools like Cursor, v0, and Claude. You don't need permission to call yourself a builder — you need to understand what's under the hood so you stop hitting walls.",
    points: [
      "Understand what your AI tools are actually doing, so you can debug instead of guess",
      "Turn a slick prototype into something that handles real users and real data",
      "Learn the concepts behind the magic: context, retrieval, agents, and evals",
      "Build confidence to take on projects you'd normally avoid",
    ],
    outcome: "From prompting your way to a demo → shipping a product you understand.",
  },
  {
    id: "dev",
    label: "I'm a developer",
    persona: "The engineer",
    headline: "Add AI engineering to your toolkit",
    summary:
      "You already ship software. Now layer on the architecture, patterns, and judgment to build AI systems that hold up in production — and make yourself the person your team turns to.",
    points: [
      "Production patterns for RAG, agents, background workers, and deployment",
      "Type-safe, testable architectures instead of notebook spaghetti",
      "Eval and monitoring pipelines that prove your AI is improving",
      "The judgment to scope, evaluate tools, and lead AI projects",
    ],
    outcome: "From experienced developer → the AI engineer your team relies on.",
  },
] as const;

export const techStack = [
  "Python",
  "FastAPI",
  "Docker",
  "PostgreSQL",
  "Redis",
  "Vector DBs",
  "LangGraph",
  "RAG",
  "Evals",
  "Langfuse",
  "CI/CD",
  "Agents",
] as const;

export const proofStats = [
  { value: 7, suffix: "", label: "Structured modules" },
  { value: 40, suffix: "+", label: "Hours of hands-on labs" },
  { value: 1, suffix: "", label: "Deployable capstone project" },
  { value: 100, suffix: "%", label: "Self-paced, lifetime access" },
] as const;

export const transformation = {
  heading: "The shift you'll make",
  accentWord: "shift",
  before: {
    label: "Status: Compromised",
    items: [
      "Copy-pasting prompts and hoping they hold up",
      "Demos that break the moment real data shows up",
      "No repeatable workflow — every project starts from zero",
      "Guessing whether your AI is actually getting better",
    ],
  },
  after: {
    label: "Status: Operational",
    items: [
      "Repeatable agent workflows that encode your standards",
      "Systems that handle real users, scale, and edge cases",
      "A production architecture you can reuse on every project",
      "Eval pipelines that prove your AI is improving",
    ],
  },
} as const;

export const problemSolution = {
  problem: {
    heading: "The situation",
    intro: "AI moves fast. Most learning leaves you stuck between two extremes.",
    items: [
      "Tutorials that show one tool but never how the whole system fits together",
      "Vibe-coded demos that fall apart the moment real users or real data show up",
      "Gatekept courses that assume a CS degree and skip the why behind the how",
    ],
  },
  solution: {
    heading: "Your assignment",
    intro: "One clear path from AI-curious to shipping production systems.",
    items: [
      "Concepts explained from the ground up, then applied in hands-on builds",
      "Production patterns — RAG, agents, evals, deployment — that actually scale",
      "The judgment to design, debug, and lead AI projects with confidence",
    ],
  },
} as const;

export const instructor = {
  name: "Ryan Tuttle",
  role: "Your handler · Hooked on AI",
  bio: "I teach practical AI on YouTube — no hype, no gatekeeping. Whether you're a senior engineer or someone who just started building by prompting, my goal is the same: get you from curious to capable. This course is built from the real patterns I use to ship systems, explained so anyone willing to build can follow.",
  stats: [
    { value: "Practical", label: "First approach" },
    { value: "YouTube", label: "@hooked-on-ai" },
    { value: "Hands-on", label: "Labs & projects" },
  ],
} as const;

export const curriculumIntro = {
  heading: "Your roadmap to",
  accentWord: "production-ready",
  headingEnd: "AI systems",
  description:
    "A self-paced curriculum that walks from foundations to deployment. By the end, you'll understand how the pieces connect: APIs, RAG, agents, background workers, evals, monitoring, and the engineering judgment to ship reliably.",
} as const;

export const curriculumWeeks = [
  {
    week: 1,
    codename: "Recruitment",
    title: "Foundations of AI Engineering",
    description:
      "Python for AI engineering, modern LLM systems, advanced prompting, and a production-grade dev environment. Core tools behind platforms built for scale and performance.",
    lessons: 12,
    duration: "5 hr 30 min",
  },
  {
    week: 2,
    codename: "Tradecraft",
    title: "AI System Design",
    description:
      "Structure AI projects for reliability. Type-safe workflows with Pydantic, context engineering, and modular architectures that make debugging, testing, and scaling possible.",
    lessons: 12,
    duration: "8 hr",
  },
  {
    week: 3,
    codename: "Q Branch",
    title: "Architectures & APIs",
    description:
      "FastAPI, Docker, Redis, PostgreSQL, and background workers. How these components fit together to support real-world LLM applications with reliability and speed.",
    lessons: 11,
    duration: "7 hr",
  },
  {
    week: 4,
    codename: "Intel",
    title: "Retrieval Augmented Generation",
    description:
      "Complete RAG pipelines from scratch. Turn unstructured data into vectors, connect LLMs to external knowledge, and optimize retrieval with hybrid search.",
    lessons: 12,
    duration: "6 hr 30 min",
  },
  {
    week: 5,
    codename: "The Network",
    title: "Multi-Agent Systems",
    description:
      "Build the system that builds the system. Move beyond single prompts to fleets of specialized agents coordinated by an orchestrator. Combine deterministic code with non-deterministic agents into repeatable AI developer workflows (ADWs), add real-time observability, and design pipelines that ship work autonomously while you stay out of the loop.",
    lessons: 9,
    duration: "6 hr 30 min",
  },
  {
    week: 6,
    codename: "Counterintelligence",
    title: "Monitoring & Evaluations",
    description:
      "Track LLM traces, debug performance at every step, add guardrails for safe outputs, and build eval pipelines for continuous improvement.",
    lessons: 10,
    duration: "7 hr",
  },
  {
    week: 7,
    codename: "License to Ship",
    title: "Deploying AI Applications",
    description:
      "Deploy with FastAPI and Docker, manage SSL, build CI/CD pipelines, implement error tracking, and follow security principles for production.",
    lessons: 8,
    duration: "5 hr",
  },
] as const;

export const features = [
  {
    tag: "AGENTIC",
    title: "Beyond prompt-and-pray",
    description:
      "Move from one-off prompts to repeatable agent workflows. Encode your engineering standards so agents ship work you would actually merge.",
  },
  {
    tag: "RAG",
    title: "Ground answers in real data",
    description:
      "Build retrieval pipelines that connect LLMs to your documents, databases, and APIs — with hybrid search and tuning that holds up in production.",
  },
  {
    tag: "EVALS",
    title: "Measure what matters",
    description:
      "Stop guessing if your AI is improving. Build evaluation pipelines that track quality, catch regressions, and guide iteration.",
  },
  {
    tag: "DEPLOY",
    title: "Ship to production",
    description:
      "Docker, APIs, background workers, monitoring, and CI/CD. The full path from local prototype to something running for real users.",
  },
  {
    tag: "SYSTEMS",
    title: "See the full picture",
    description:
      "Connect prompts, APIs, RAG, evals, and deployment into one coherent architecture — the view most tutorials never give you.",
  },
  {
    tag: "JUDGMENT",
    title: "Lead AI projects with confidence",
    description:
      "Learn the why behind architectural decisions so you can scope work, evaluate tools, and make tradeoffs that hold up under business constraints.",
  },
] as const;

export const howItWorks = [
  {
    step: 1,
    title: "Get recruited",
    description:
      "Join the waitlist for early access, curriculum previews, and launch pricing before the doors open.",
  },
  {
    step: 2,
    title: "Complete your training",
    description:
      "Work through the modules in order, or jump to the systems you need most. Self-paced, lifetime access.",
  },
  {
    step: 3,
    title: "Go operational",
    description:
      "Apply the patterns from the course to build and deploy a production-ready AI system of your own.",
  },
] as const;

export const finalCta = {
  eyebrow: "CLEARANCE: EARLY ACCESS",
  heading: "Accept your mission",
  accentWord: "mission",
  subtitle:
    "Waitlist members get early access, the lowest price this course will ever be, and a direct line to shape the curriculum. No spam — mission updates only.",
} as const;

export const faqItems = [
  {
    question: "Who is this course for?",
    answer:
      "Anyone serious about building with AI — whether you're a professional developer adding AI engineering to your toolkit, or a vibe coder who ships with tools like Cursor and Claude and wants to understand what's really happening under the hood. We start from the concepts and build up, so you don't need a CS degree — just curiosity and a willingness to build.",
  },
  {
    question: "I mostly vibe code. Will I be lost?",
    answer:
      "No. The course is designed to meet you where you are. We explain the why behind every concept before applying it, so if you've been building by prompting, this is exactly how you go deeper and stop hitting walls. Basic comfort navigating code and running commands is all you need to start.",
  },
  {
    question: "When does the course launch?",
    answer:
      "The course is in development. Join the waitlist to get notified when enrollment opens, plus early-bird pricing and curriculum previews.",
  },
  {
    question: "What will I build?",
    answer:
      "You'll work through hands-on labs across seven modules and cap it with a deployable AI project — covering RAG, agents, evals, production deployment, and multi-agent orchestration.",
  },
  {
    question: "How much time should I plan for?",
    answer:
      "The full curriculum is roughly 45 hours of content, self-paced. Most learners spread it across 6–8 weeks alongside a day job.",
  },
  {
    question: "What tools will we use?",
    answer:
      "Python, FastAPI, Docker, vector databases, Langfuse or similar for observability, and modern agentic coding tools. Exact stack may evolve as the course is finalized.",
  },
  {
    question: "Is there a community?",
    answer:
      "A private community for enrolled students is planned. Waitlist members will hear about it first when details are ready.",
  },
] as const;
