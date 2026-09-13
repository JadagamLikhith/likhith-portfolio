import { ProjectData } from "@/types/projects";

export const devbridgeProject: ProjectData = {
  id: "devbridge",
  title: "DevBridge",
  subtitle: "Developer Collaboration, Sponsorship & Feedback Platform",
  categoryTag: "FLAGSHIP MOBILE APP",
  platform: "Android (Kotlin & Jetpack Compose)",
  route: "/work/devbridge",
  summary:
    "A dedicated mobile platform designed for developers to showcase active repositories, exchange structured peer code feedback, initiate collaboration requests, and connect directly with sponsors.",
  techStack: [
    "Kotlin",
    "Jetpack Compose",
    "Material Design 3",
    "Android Studio",
    "Kotlin Coroutines",
  ],
  uxFlows: [
    {
      tag: "01 / SHOWCASE",
      title: "Project Upload & Media Cards",
      description:
        "Structured repository submission flow with tag taxonomy, live markdown rendering, and multimedia preview cards.",
    },
    {
      tag: "02 / FEEDBACK",
      title: "Constructive Peer Review Loop",
      description:
        "Contextual code review threads, rating systems, and constructive peer critique mechanisms.",
    },
    {
      tag: "03 / COLLABORATION",
      title: "Direct Peer Collaboration",
      description:
        "Standardized collaboration invite workflows, role definitions, and contributor matching.",
    },
    {
      tag: "04 / SPONSORSHIP",
      title: "Sponsor Connectivity Pipelines",
      description:
        "Transparent project milestone broadcasting allowing sponsors to discover and back high-potential developer projects.",
    },
  ],
  designPhilosophy:
    "Built natively using Jetpack Compose adhering to Material Design 3 guidelines for fluid interactions, dark-mode ergonomics, and clear information hierarchy.",
  architecturalHighlights: [
    "Declarative UI built with Jetpack Compose & MD3 design tokens",
    "Unidirectional Data Flow (UDF) for predictable state management",
    "Asynchronous data processing with Kotlin Coroutines",
    "Custom dark-theme palette optimized for mobile developers",
  ],
};

export const eLibraryProject: ProjectData = {
  id: "e-library",
  title:
    "An Interactive and Engaging User-Friendly E-Library Platform with Navigation, Recommendations, and Feedback",
  subtitle: "Published Academic Research & Modular Platform Architecture",
  categoryTag: "PEER-REVIEWED PUBLICATION",
  platform: "Web Application (Flask & MySQL)",
  route: "/work/e-library",
  summary:
    "Architected and published an interactive e-library platform featuring role-based access control, modular micro-architecture, automated user notifications, smart navigation, and dynamic recommendation loops.",
  techStack: [
    "Python",
    "Flask",
    "MySQL",
    "Glassmorphism UI",
    "RBAC Engine",
    "REST APIs",
  ],
  publicationDetails: {
    journal:
      "International Journal of Research and Analytical Reviews (IJRAR)",
    date: "May 2025",
    volumeIssue: "Volume 12, Issue 2",
    paperId: "IJRAR25B3067",
    author: "J. Likhith",
  },
  architecturalHighlights: [
    "Role-Based Access Control (RBAC) supporting tiered permissions for students, faculty, and administrators",
    "Automated background notification engine for loan schedules and catalog updates",
    "Dynamic discovery heuristics for academic textbooks and research papers",
    "Responsive glassmorphic user interface designed for intuitive navigation",
  ],
};

export const allProjects: ProjectData[] = [devbridgeProject, eLibraryProject];
