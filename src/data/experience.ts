import {
  InternshipExperience,
  EducationMilestone,
  Certification,
} from "@/types/experience";

export const internshipExperience: InternshipExperience = {
  role: "Product UI/UX Designer",
  company: "Blackbucks Education Pvt. Ltd.",
  duration: "12 Weeks Intensive",
  timeline: "May 2026 — July 2026",
  description:
    "12-week structured short-term internship involving intensive training, practical design assignments, and project-based product UI/UX iterations.",
  keyLearnings: [
    "Conducted user research and translated requirements into interactive mobile wireframes and mockups",
    "Applied Material Design 3 guidelines to design intuitive, accessible component libraries",
    "Refined user navigation flows and structured information hierarchy for modern interfaces",
  ],
};

export const educationMilestone: EducationMilestone = {
  degree: "B.Tech in Computer Science and Engineering",
  institution: "Lingayas Institute of Management and Technology",
  location: "Vijayawada, Andhra Pradesh",
  timeline: "Expected Graduation: 2027",
  cgpa: "8.0 / 10.0",
  focusAreas: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Software Engineering & Architecture",
    "Object-Oriented Programming",
    "Web & Mobile Technologies",
  ],
};

export const certificationsData: Certification[] = [
  {
    title: "Introduction to Generative AI",
    issuingBody: "FutureSkills Prime / NASSCOM IT-ITeS SSC",
    categoryOrScore: "Gold Category — 91% Score",
  },
  {
    title: "Exploratory Data Analysis",
    issuingBody: "FutureSkills Prime / NASSCOM IT-ITeS SSC",
    categoryOrScore: "Bronze Category",
  },
  {
    title: "Data Structure using C Programming",
    issuingBody: "SWAYAM Online Course Certification",
    categoryOrScore: "Completed & Certified",
  },
];
