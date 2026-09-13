import { SkillDomain } from "@/types/skills";

export const skillsData: SkillDomain[] = [
  {
    id: "languages",
    title: "Core Programming",
    description:
      "Algorithmic fundamentals, memory management, and structured software development.",
    skills: ["C", "Java", "Python", "JavaScript"],
  },
  {
    id: "fullstack",
    title: "Full Stack & Databases",
    description:
      "Modern client-side engineering, RESTful backend APIs, and structured relational & document persistence.",
    skills: [
      "React.js",
      "HTML5",
      "CSS3",
      "Node.js",
      "Express.js",
      "Flask",
      "MySQL",
      "MongoDB",
      "Supabase",
      "Responsive Design",
    ],
  },
  {
    id: "uiux",
    title: "Product & UI/UX Design",
    description:
      "Human-centered product design, design system token architecture, and responsive ergonomics.",
    skills: [
      "Product UI/UX Design",
      "Mobile Interface Design",
      "Material Design 3",
      "User Flow Architecture",
      "Wireframing & Prototyping",
      "Design Systems",
      "Glassmorphism UI",
    ],
  },
  {
    id: "tools-analytics",
    title: "Tools, Cloud & Analytics",
    description:
      "Deployment pipelines, version control, mobile SDKs, and data analysis methodologies.",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
      "Vercel",
      "Android Studio",
      "Tableau",
      "Excel Pivot Tables",
      "Data Classification",
      "KPI Tracking",
    ],
  },
];
