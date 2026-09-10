import type { ComponentType, SVGProps } from "react";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const GemIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M18 10h28l10 14L32 56 8 24z" {...S} />
    <path d="M18 10l6 14 8-14 8 14 6-14M8 24h48M24 24l8 32 8-32" {...S} />
  </svg>
);

export const PrinterIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M20 12h24v10H20z" {...S} />
    <path d="M14 26h36v16H14z" {...S} />
    <path d="M20 42v10h24V42" {...S} />
    <path d="M44 34h.01" {...S} />
  </svg>
);

export const EyeIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M8 32c8-12 15-18 24-18s16 6 24 18c-8 12-15 18-24 18S16 44 8 32z" {...S} />
    <circle cx="32" cy="32" r="8" {...S} />
    <path d="M32 32h.01" {...S} />
    <path d="M6 12h10M6 12v8M58 12H48M58 12v8M6 52h10M6 52v-8M58 52H48M58 52v-8" {...S} />
  </svg>
);

export const BoltIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M30 6L14 34h13l-6 24 23-30H31l6-22z" {...S} />
  </svg>
);

const PropertyIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true"><path d="m8 28 24-18 24 18M14 25v29h36V25M26 54V36h12v18M27 24h10" {...S} /></svg>
);

const AnalysisIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 10v44h42M22 42V30M32 42V20M42 42V12" {...S} /><circle cx="47" cy="44" r="9" {...S} /><path d="m53 51 6 7" {...S} /></svg>
);

export type Project = {
  id: string;
  name: string;
  type: string;
  description: string;
  overview: string;
  highlights: string[];
  focus: string;
  tone: "signal" | "gold" | "electric" | "print" | "property" | "data";
  tags: string[];
  repo: string | null;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// Add new projects here; they appear on /projects automatically.
// Only the IDs in featuredProjectIds appear on the homepage, in that order.
// Keep repo null until a public GitHub URL is available.
export const projects: Project[] = [
  {
    id: "balaji-jewellers",
    name: "Balaji Jewellers",
    type: "eCommerce / Full stack",
    description:
      "A luxury jewellery eCommerce app with personalized shopping, cart, checkout, and an admin dashboard.",
    overview: "Balaji Jewellers brings the jewellery shopping journey into a full-stack web application. The customer experience covers personalized shopping, a cart, and checkout, with an admin dashboard for the store side of the platform.",
    highlights: ["Personalized jewellery shopping experience", "Cart and checkout flow", "Dedicated admin dashboard"],
    focus: "Digital commerce",
    tone: "gold",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "MySQL"],
    repo: "https://github.com/Bharadwaj-2024/balaji-jewelers",
    Icon: GemIcon,
  },
  {
    id: "flashprint",
    name: "FlashPrint",
    type: "Product / Platform",
    description:
      "A campus printing platform with uploads, live order tracking, role-based access, and an administrative dashboard.",
    overview: "FlashPrint connects document uploads with a campus printing workflow. Live order tracking keeps progress visible, while role-based access and an administrative dashboard support the people managing the orders.",
    highlights: ["Document uploads for campus print orders", "Live order tracking", "Role-based access and administration"],
    focus: "Campus workflow",
    tone: "print",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    repo: "https://github.com/Bharadwaj-2024/FlashPrint1",
    Icon: PrinterIcon,
  },
  {
    id: "deepfake-detection",
    name: "Deepfake Detection",
    type: "AI / Full stack",
    description:
      "AI video analysis using a ResNeXt CNN and LSTM pipeline, delivered through a full-stack MERN application.",
    overview: "Deepfake Detection combines a ResNeXt CNN with an LSTM pipeline for AI video analysis. A full-stack MERN application brings that analysis into a web experience, connecting applied machine learning with product development.",
    highlights: ["ResNeXt CNN and LSTM video-analysis pipeline", "Full-stack MERN application", "Python machine-learning workflow with Docker tooling"],
    focus: "Video intelligence",
    tone: "signal",
    tags: ["Python", "React", "Node.js", "Docker"],
    repo: "https://github.com/Bharadwaj-2024/deepfake-detection-ai-",
    Icon: EyeIcon,
  },
  {
    id: "mockmaster-ai",
    name: "MockMaster AI",
    type: "Developer tooling",
    description:
      "An AI-powered REST API and realistic mock-data generator that earned third place at the OVERCLKOCCK Hackathon.",
    overview: "MockMaster AI is a developer tool for generating REST APIs and realistic mock data with AI. Built with JavaScript, the project explores how AI can support development workflows and earned third place at the OVERCLKOCCK Hackathon.",
    highlights: ["AI-powered REST API generation", "Realistic mock-data generation", "Third place at the OVERCLKOCCK Hackathon"],
    focus: "Developer tooling",
    tone: "electric",
    tags: ["JavaScript", "REST API", "AI"],
    repo: null,
    Icon: BoltIcon,
  },
  {
    id: "revalto",
    name: "Revalto",
    type: "Real estate / Full stack",
    description: "A real estate platform for discovering and managing properties, posting reviews, uploading documents, and recording bookings or purchases.",
    overview: "Revalto brings property discovery and management into a full-stack Express application. Users can sign up, manage a profile, create and edit listings, and leave reviews with author and ownership checks. Booking and purchase flows sit alongside document uploads, with flash messages and sessions guiding the experience.",
    highlights: ["Signup, login, and profiles with Passport.js local authentication", "Property listing CRUD and reviews with ownership checks", "Booking and purchase records", "Document uploads using Cloudinary and Multer", "Joi validation, session-based UX, and flash messages", "Geocoding migration for listings with missing coordinates"],
    focus: "Property discovery",
    tone: "property",
    tags: ["Node.js", "Express", "MongoDB", "Mongoose", "EJS", "ejs-mate", "Passport.js", "Cloudinary", "Multer", "Joi"],
    repo: "https://github.com/Bharadwaj-2024/Revalto",
    Icon: PropertyIcon,
  },
  {
    id: "aadhaar-forensic-analysis",
    name: "Aadhaar Demographic Forensic Analysis",
    type: "Data analysis / Hackathon 2026",
    description: "A forensic audit of Aadhaar demographic update data, combining data cleaning, anomaly detection, and an interactive policy dashboard.",
    overview: "This project audits demographic update data from March to December 2025. The analysis removes duplicate rows and standardizes state names before comparing operational metrics and highlighting unusual update patterns for further investigation. Python analysis and evidence charts feed an interactive dashboard and a policy action plan; anomaly flags are indicators for review, not proof of fraud.",
    highlights: ["Removed 473,601 duplicate rows in the project's data-cleaning analysis", "Compared raw-data results with recalculated metrics", "Examined update volumes, center efficiency, and child update compliance", "Flagged unusually high update volumes for further review", "Generated an interactive Chart.js dashboard and Matplotlib evidence charts", "Produced a policy action plan with five governance proposals"],
    focus: "Forensic data audit",
    tone: "data",
    tags: ["Python", "Pandas", "Matplotlib", "JavaScript", "Chart.js"],
    repo: "https://github.com/Bharadwaj-2024/UIDAI_data_hackathon",
    Icon: AnalysisIcon,
  },
];

export const featuredProjectIds = ["deepfake-detection", "balaji-jewellers", "mockmaster-ai"];
export const featuredProjects = featuredProjectIds.map((id) => {
  const project = projects.find((project) => project.id === id);
  if (!project) throw new Error(`Featured project "${id}" was not found.`);
  return project;
});
export const otherProjects = projects.filter((project) => !featuredProjectIds.includes(project.id));
