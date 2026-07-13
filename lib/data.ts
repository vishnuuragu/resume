// ─── Single source of truth for all portfolio content ───────────────────────
// Edit this file to update the site. Social URLs marked TODO need your handles.

export const profile = {
  name: "Vishnu R",
  initials: "VR",
  title: "Full Stack Developer • AI Engineer • Backend Developer",
  subtitle:
    "Building intelligent software, AI agents, scalable backend systems, and cloud infrastructure.",
  location: "Tamil Nadu, India",
  email: "vishnuuragu@gmail.com",
  phone: "+91 8220003407",
  availability: "Open to Software Engineering & AI Engineering Opportunities",
  // drop your PDF into /public/resume.pdf
  resumeUrl: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`,
  github: "https://github.com/vishnuuragu",
  linkedin: "https://www.linkedin.com/in/vishnuuragu", // TODO: confirm handle
  // Free access key from https://web3forms.com (enter your email, key arrives
  // instantly). Safe to commit — it's designed for client-side forms.
  // Leave empty to fall back to opening the visitor's email client.
  web3formsKey: "de7f8ca1-48ee-4b2e-ba01-250e30d622e2",
};

export const typingRoles = [
  "AI Engineer",
  "Full Stack Developer",
  "Backend Developer",
  "Open Source Enthusiast",
  "Linux Power User",
];

export const about = {
  paragraphs: [
    "I'm a Full Stack Developer and AI Engineer passionate about building intelligent software that solves real-world problems.",
    "My expertise spans backend engineering, AI agents, LLM integrations, cloud infrastructure, and scalable web applications. I enjoy designing systems from the ground up — whether it's developing REST APIs, deploying Linux servers, building autonomous AI agents, or integrating modern language models into production-ready applications.",
    "Beyond traditional software engineering, I actively explore Generative AI, multi-agent systems, Retrieval-Augmented Generation (RAG), computer vision, and self-hosted infrastructure.",
    "I believe great software combines clean architecture, performance, and excellent user experience.",
  ],
};

export const stats = [
  { value: 1, suffix: "+", label: "Years Professional Experience" },
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 20, suffix: "+", label: "Technologies Used" },
  { value: 1000, suffix: "+", label: "Hours Building AI Systems" },
];

export const skills: { category: string; icon: string; items: string[] }[] = [
  {
    category: "Languages",
    icon: "code",
    items: ["Python", "C++", "Java", "JavaScript", "SQL"],
  },
  {
    category: "Frontend",
    icon: "layout",
    items: ["HTML", "CSS", "React", "Vite", "Bootstrap"],
  },
  {
    category: "Backend",
    icon: "server",
    items: ["Node.js", "Express.js", "REST APIs", "Authentication", "JWT"],
  },
  {
    category: "AI & LLM",
    icon: "brain",
    items: [
      "OpenAI API",
      "Gemini API",
      "OpenRouter",
      "LangChain",
      "FAISS",
      "RAG",
      "Knowledge Graphs",
      "Prompt Engineering",
      "AI Agents",
      "LLMs",
    ],
  },
  {
    category: "Databases",
    icon: "database",
    items: ["MongoDB", "MySQL", "Microsoft SQL Server", "Neo4j"],
  },
  {
    category: "Cloud & DevOps",
    icon: "cloud",
    items: [
      "Linux",
      "Docker",
      "Git",
      "Cloudflare Tunnel",
      "Tailscale",
      "Apache",
      "Tomcat",
      "IIS",
      "Systemd",
    ],
  },
  {
    category: "Embedded",
    icon: "cpu",
    items: ["Arduino", "NodeMCU", "Raspberry Pi"],
  },
];

export const experience = [
  {
    role: "Software Developer",
    company: "Sanrove",
    period: "2024 – 2025",
    summary:
      "Full Stack Developer building scalable web applications and backend systems.",
    points: [
      "Designed and developed REST APIs using Node.js and Express.",
      "Built scalable backend services with emphasis on performance and maintainability.",
      "Optimized MongoDB and MySQL databases for production workloads.",
      "Managed Linux-based deployments and production environments.",
      "Collaborated with cross-functional teams to deliver production-ready features.",
      "Diagnosed production issues and improved system reliability.",
      "Participated in software architecture discussions and backend design.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  category: "AI / ML" | "Backend" | "Infrastructure";
  icon: string;
  gradient: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "AI Agent Platform",
    description:
      "Modular AI Agent platform capable of autonomous task execution using multiple Large Language Models.",
    features: [
      "Integrated OpenRouter, Gemini and multiple LLM providers",
      "Gateway architecture for model routing",
      "CLI workflow for agent orchestration",
      "Linux deployment using Systemd",
      "Extensible plugin architecture",
    ],
    technologies: ["Python", "OpenAI", "Gemini", "OpenRouter", "Linux", "REST API"],
    category: "AI / ML",
    icon: "bot",
    gradient: "from-blue-500/25 via-violet-500/15 to-transparent",
  },
  {
    title: "University AI Assistant",
    description:
      "AI-powered university assistant combining Knowledge Graphs and Large Language Models to answer academic queries.",
    features: [
      "Knowledge Graph based retrieval",
      "Semantic search & RAG pipeline",
      "Course and faculty information",
      "Admission assistance",
      "Campus navigation",
    ],
    technologies: ["Python", "Neo4j", "LangChain", "OpenAI", "FAISS"],
    category: "AI / ML",
    icon: "graduation",
    gradient: "from-violet-500/25 via-fuchsia-500/15 to-transparent",
  },
  {
    title: "Animal Behaviour Recognition",
    description:
      "Research-oriented AI system for detecting animals, estimating pose, and recognizing behaviour using deep learning.",
    features: [
      "Object detection",
      "Pose estimation",
      "Behaviour classification",
      "Dataset integration",
      "Training pipeline",
    ],
    technologies: ["Python", "PyTorch", "OpenCV", "YOLO", "Deep Learning"],
    category: "AI / ML",
    icon: "scan",
    gradient: "from-cyan-500/25 via-emerald-500/15 to-transparent",
  },
  {
    title: "Self Hosted Developer Infrastructure",
    description:
      "Secure self-hosted infrastructure for development, remote access and application deployment.",
    features: [
      "Cloudflare Tunnel + Tailscale mesh VPN",
      "Private networking & remote service access",
      "Custom domain routing",
      "Secure API hosting",
      "Service monitoring",
    ],
    technologies: ["Linux", "Tailscale", "Cloudflare Tunnel", "Docker", "Nginx"],
    category: "Infrastructure",
    icon: "network",
    gradient: "from-sky-500/25 via-blue-500/15 to-transparent",
  },
  {
    title: "AI Product Intelligence Engine",
    description:
      "Automated product information extraction platform using web scraping and LLMs.",
    features: [
      "Search automation",
      "Website scraping",
      "AI summarization",
      "Structured JSON extraction",
      "Multi-source aggregation",
    ],
    technologies: ["Python", "Selenium", "BeautifulSoup", "OpenAI", "JSON"],
    category: "Backend",
    icon: "radar",
    gradient: "from-indigo-500/25 via-cyan-500/15 to-transparent",
  },
];

export const techStack: { name: string; icon: string; description: string }[] = [
  { name: "Python", icon: "code", description: "Primary language for AI systems, automation and backends" },
  { name: "JavaScript", icon: "braces", description: "Full stack web development across the entire stack" },
  { name: "Node.js", icon: "server", description: "Scalable backend services and REST APIs" },
  { name: "React", icon: "atom", description: "Modern component-driven user interfaces" },
  { name: "Express", icon: "route", description: "Minimal, fast API layer for Node.js" },
  { name: "MongoDB", icon: "leaf", description: "Document database optimized for production workloads" },
  { name: "MySQL", icon: "database", description: "Relational data modelling and query optimization" },
  { name: "Neo4j", icon: "waypoints", description: "Graph database powering knowledge-graph retrieval" },
  { name: "OpenAI", icon: "sparkles", description: "LLM integrations for agents and RAG pipelines" },
  { name: "Gemini", icon: "gem", description: "Multimodal LLM workflows and routing" },
  { name: "LangChain", icon: "link", description: "Orchestration for LLM chains, tools and agents" },
  { name: "Docker", icon: "container", description: "Containerized deployment of services" },
  { name: "Linux", icon: "terminal", description: "Daily driver — servers, systemd, self-hosting" },
  { name: "Git", icon: "git-branch", description: "Version control and collaborative workflows" },
  { name: "Cloudflare", icon: "shield", description: "Tunnels, DNS and secure edge routing" },
  { name: "Tailscale", icon: "lock", description: "Zero-config mesh VPN for private infrastructure" },
];

export const timeline = [
  {
    year: "2019 – 2020",
    title: "CBSE Higher Secondary",
    place: "Maharishi International Residential School",
    type: "education" as const,
    description: "Completed higher secondary education with a focus on computer science and mathematics.",
  },
  {
    year: "2020 – 2024",
    title: "B.Tech Computer Science & Engineering",
    place: "Amrita Vishwa Vidyapeetham",
    type: "education" as const,
    description: "Built a foundation in systems, algorithms and AI — capped with a Knowledge Graph + LLM university assistant.",
  },
  {
    year: "2024 – 2025",
    title: "Software Developer",
    place: "Sanrove",
    type: "work" as const,
    description: "Full stack development of scalable web applications, REST APIs and Linux-based production systems.",
  },
  {
    year: "2025 – Now",
    title: "AI Engineering Deep Dive",
    place: "Independent",
    type: "learning" as const,
    description: "Building autonomous agents, multi-agent systems, RAG pipelines and self-hosted cloud infrastructure.",
  },
];

export const exploring = [
  "AI Agents",
  "Multi-Agent Systems",
  "Generative AI",
  "RAG",
  "Computer Vision",
  "MCP",
  "Cloud Deployment",
  "Docker",
  "Kubernetes",
  "Distributed Systems",
];

export const marqueeTech = [
  "Python", "JavaScript", "Node.js", "React", "MongoDB", "MySQL", "Docker",
  "Linux", "OpenAI", "Gemini", "LangChain", "Neo4j", "FAISS", "RAG",
  "Cloudflare", "Tailscale", "PyTorch", "YOLO", "Express", "Git",
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];
