// ---------------------------------------------------------------
// EDIT THIS FILE. Everything on the site, and everything the
// "Ask about my work" assistant knows, comes from here.
// Lines marked EDIT need your real details.
// ---------------------------------------------------------------

export const profile = {
  name: "Talha Masood",
  role: "Software engineer building products and applications, with a focus on AI and security",
  location: "Pakistan · open to remote work",
  intro:
    "I build products and applications end to end, from enterprise platforms to web apps. My work spans AI, security and business software, and the products I've worked on are used by organisations like Google, Walmart, Aramco and Samsung.",
  about: [
    "I enjoy taking a product from idea to production: understanding the problem, designing the data and the interface, and shipping something people rely on every day. Along the way I've built AI models into products, data platforms that collect information from around the world, and business applications with roles, approvals and reporting.",
    "EDIT: add a line about your education or years of experience, what you enjoy most, and the kind of team or role you want next.",
  ],
  email: "talhamasood792@gmail.com", // EDIT
  github: "https://github.com/TalhaMasood792",
  linkedin: "https://www.linkedin.com/in/muhammad-talha-masood-4a88221a4/", // EDIT
  resumeUrl: "assets/resume.pdf", // put your CV in /assets with this name
  availability: "Open to new roles",
  skills: {
    Languages: ["JavaScript", "TypeScript", "Python", "SQL"],
    Frontend: ["React", "Next.js", "HTML & CSS", "Accessible, responsive UI"],
    Backend: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Serverless"],
    "AI & data": ["Machine learning in products", "LLM APIs", "Anomaly detection", "Data pipelines"],
    "Product engineering": ["Role-based access control", "Audit trails", "Approval workflows", "Secure coding"],
    "Graphics & data": ["Three.js / WebGL", "D3.js", "Data visualisation"],
    Tools: ["Git & GitHub", "Docker", "Vercel", "Playwright", "CI/CD"],
  },
};

// Organisations where software you worked on is used.
// EDIT: keep only names you're allowed to mention publicly.
export const clients = ["Google", "Walmart", "Aramco", "Samsung"];

// Work history, newest first.
export const experience = [
  {
    company: "Trellix",
    role: "Software Engineer", // EDIT: your exact title
    period: "2024 – Present", // EDIT
    summary:
      "Building AI modules for Network Detection and Response (NDR), the product that watches enterprise network traffic for attacks. It protects customers including Walmart, Aramco, Google and Samsung.",
    points: [
      "Building AI modules that learn what normal network traffic looks like and flag anomalies that signal an attack",
      "EDIT: a measurable result, e.g. detection accuracy, fewer false alerts, or a release you shipped",
      "EDIT: how you worked, e.g. with threat researchers, data scientists or customer teams",
    ],
    stack: [], // EDIT: e.g. ["C++", "Python", "Go"]
  },
  {
    company: "PeerNest",
    role: "Engineer", // EDIT
    period: "2025", // EDIT
    summary: "All-in-one workspace for online tutors, live at peernest.ai.",
    points: ["EDIT: the parts of PeerNest you built"],
    stack: ["Next.js", "Node.js", "LLM APIs"],
  },
];

// category: "security" | "business" | "interactive" | "ai"
// status:   "live"  -> Live badge and "Visit site"
//           "local" -> demo video and code links instead
//           "confidential" -> work product; shows an illustrative mockup, no links
// EDIT: replace each liveUrl with your real Vercel link.
export const projects = [
  {
    id: "skyfeed",
    title: "SkyFeed",
    category: "security",
    company: "Trellix", // EDIT: company, if you can name it
    tagline: "Global threat intelligence platform",
    status: "confidential",
    image: "assets/skyfeed.jpg",
    stack: ["Threat intelligence", "Data pipelines", "EDIT: your tech"],
    description:
      "Gathers intelligence on new attacks from sources around the world, such as malicious IPs, domains, file hashes and active campaigns, and matches it against client assets so clients are protected before an attack reaches them.",
    highlights: [
      "Collects and de-duplicates indicators from hundreds of sources",
      "Scores each indicator by severity and confidence",
      "Pushes matches straight to client security controls",
    ],
    challenge: "",
  },
  {
    id: "cyber-vigilant",
    title: "Cyber Vigilant",
    category: "security",
    company: "", // EDIT
    tagline: "Automated phishing detection and network anomaly detector",
    status: "confidential",
    image: "assets/cyber-vigilant.jpg",
    stack: ["Email security", "Anomaly detection", "EDIT: your tech"],
    description:
      "Around 90% of cyberattacks start with a phishing email, so Cyber Vigilant stops them at the first step. It scores incoming email, quarantines phishing automatically, and watches network traffic for unusual behaviour that slips past.",
    highlights: [
      "Flags lookalike domains, urgent language and credential-stealing forms",
      "Quarantines high-risk email automatically, before it reaches inboxes",
      "Detects network anomalies such as unusual outbound data and beaconing",
    ],
    challenge: "",
  },
  {
    id: "ndr-ai",
    title: "NDR AI modules",
    category: "security",
    company: "Trellix",
    tagline: "AI that detects attacks in network traffic",
    status: "confidential",
    image: "assets/ndr-ai.jpg",
    stack: ["Machine learning", "Network traffic analysis", "EDIT: your tech"],
    description:
      "AI modules inside a Network Detection and Response platform. They learn what normal traffic looks like on each network and flag anomalies that signal an attack, for customers including Walmart, Aramco, Google and Samsung.",
    highlights: [
      "Learns a baseline of normal behaviour for each network",
      "Flags traffic that breaks the pattern, with a confidence score",
      "Gives analysts fewer, better alerts to investigate",
    ],
    challenge: "",
  },
  {
    id: "ledgerly",
    title: "Ledgerly",
    category: "business",
    featured: true,
    tagline: "Invoicing and accounts receivable",
    status: "live",
    liveUrl: "https://ledgerly-talha.vercel.app",
    repoUrl: "https://github.com/TalhaMasood792/ledgerly",
    demoVideo: "",
    image: "assets/ledgerly.jpg",
    stack: ["JavaScript", "ES modules", "SVG charts", "Playwright"],
    description:
      "A B2B invoicing system: invoices in four currencies, partial payments, an aging report and days-sales-outstanding on the dashboard.",
    highlights: [
      "Three roles enforced in the data layer, not just hidden buttons",
      "Money stored in whole cents with tax rounded per line, so totals are exact",
      "Every change written to an audit log; invoices print as clean PDFs",
    ],
    challenge:
      "Overdue is never stored. It's derived from the due date and remaining balance, so an invoice can't get stuck in the wrong state.",
  },
  {
    id: "relay",
    title: "Relay",
    category: "business",
    featured: true,
    tagline: "IT service desk with SLA tracking",
    status: "live",
    liveUrl: "https://relay-talha.vercel.app",
    repoUrl: "https://github.com/TalhaMasood792/relay",
    demoVideo: "",
    image: "assets/relay.jpg",
    stack: ["JavaScript", "Pure-function SLA engine", "Playwright"],
    description:
      "A helpdesk where every ticket has deadlines for first reply and resolution, with live countdowns, breach warnings and a team dashboard for managers.",
    highlights: [
      "SLA clock pauses while waiting on the customer and recalculates on priority change",
      "Auto-assigns new tickets to the least busy available agent",
      "Internal notes kept separate from customer replies; bulk actions for managers",
    ],
    challenge:
      "The SLA engine is a set of pure functions with unit tests. Testing caught a bug where resolved tickets kept their reply clock running.",
  },
  {
    id: "stockroom",
    title: "Stockroom",
    category: "business",
    featured: true,
    tagline: "Multi-warehouse inventory and purchasing",
    status: "live",
    liveUrl: "https://stockroom-talha.vercel.app",
    repoUrl: "https://github.com/TalhaMasood792/stockroom",
    demoVideo: "",
    image: "assets/stockroom.jpg",
    stack: ["JavaScript", "Event sourcing", "CSV parser", "SVG charts"],
    description:
      "Inventory across three warehouses with purchase orders, approval limits, transfers and reorder suggestions.",
    highlights: [
      "Stock calculated from an append-only movement history, never edited directly",
      "Managers approve up to $5,000; larger orders need an admin",
      "Spreadsheet import shows row-level errors before anything is applied",
    ],
    challenge:
      "Because stock is event-sourced, every number on screen traces back to the receipts, shipments and adjustments that produced it.",
  },
  {
    id: "peernest",
    title: "PeerNest",
    category: "ai",
    featured: false,
    tagline: "Workspace for online tutors",
    status: "live",
    liveUrl: "https://peernest.ai/",
    repoUrl: "",
    demoVideo: "",
    image: "",
    stack: ["Next.js", "Node.js", "LLM APIs", "Google Calendar API"],
    description:
      "Scheduling, video lessons and a shared whiteboard in one place, with AI-generated quizzes and notes from each recorded lesson.",
    highlights: [],
    challenge: "",
  },
  {
    id: "quakewatch",
    title: "Quakewatch",
    category: "interactive",
    featured: false,
    tagline: "Live earthquakes on a 3D globe",
    status: "live",
    liveUrl: "https://quakewatch-talha.vercel.app",
    repoUrl: "https://github.com/TalhaMasood792/quakewatch",
    demoVideo: "",
    image: "assets/quakewatch.jpg",
    stack: ["D3.js", "Canvas", "USGS live API"],
    description:
      "Real earthquakes from the US Geological Survey on a globe you can spin and zoom, refreshed every minute.",
    highlights: [],
    challenge: "",
  },
  {
    id: "flowboard",
    title: "Flowboard",
    category: "interactive",
    featured: false,
    tagline: "Keyboard-first task board",
    status: "live",
    liveUrl: "https://flowboard-talha.vercel.app",
    repoUrl: "https://github.com/TalhaMasood792/flowboard",
    demoVideo: "",
    image: "assets/flowboard.jpg",
    stack: ["JavaScript", "PWA", "Pointer events"],
    description:
      "Type tasks in plain English and it picks out dates, priority, tags and estimates. Drag and drop, command palette, works offline.",
    highlights: [],
    challenge: "",
  },
  {
    id: "comm-coach",
    title: "AI Communication Coach",
    category: "ai",
    featured: false,
    tagline: "Practise conversations, get feedback",
    status: "local", // change to "live" once deployed
    liveUrl: "",
    repoUrl: "https://github.com/TalhaMasood792/ai-communication-coach",
    demoVideo: "",
    image: "",
    stack: ["React", "Node.js", "LLM API"],
    description:
      "Answer interview or workplace scenarios and get scored on clarity, tone and confidence, with a stronger rewrite of your answer.",
    highlights: [],
    challenge: "",
  },
];

export const categories = {
  security: "Products at work",
  business: "Business systems",
  interactive: "Interactive & data",
  ai: "AI products",
};

// Knowledge base for the AI assistant (used by api/chat.js)
export function buildKnowledge() {
  const skills = Object.entries(profile.skills).map(([g, l]) => `${g}: ${l.join(", ")}`).join("\n");
  const jobs = experience
    .map((e) => `- ${e.role} at ${e.company} (${e.period}): ${e.summary} ${e.points.filter((p) => !p.startsWith("EDIT")).join(" ")}`)
    .join("\n");
  const list = projects
    .map(
      (p) =>
        `- ${p.title} [${categories[p.category]}] (${p.status === "live" ? "live at " + p.liveUrl : p.status === "confidential" ? "confidential work product" + (p.company ? " at " + p.company : "") : "code at " + p.repoUrl})\n` +
        `  ${p.tagline}. ${p.description}\n  Stack: ${p.stack.filter((x) => !x.startsWith("EDIT")).join(", ")}` +
        (p.highlights.length ? `\n  Highlights: ${p.highlights.join("; ")}` : "") +
        (p.challenge ? `\n  Technical note: ${p.challenge}` : "")
    )
    .join("\n");
  return `Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Availability: ${profile.availability}
Contact: ${profile.email} | GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}
About: ${profile.intro} ${profile.about.filter((p) => !p.startsWith("EDIT")).join(" ")}
Software they worked on is used at: ${clients.join(", ")}
Experience:
${jobs}
Skills:
${skills}
Projects:
${list}`;
}
