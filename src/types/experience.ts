export interface InternshipExperience {
  role: string;
  company: string;
  duration: string;
  timeline: string;
  description: string;
  keyLearnings: string[];
}

export interface EducationMilestone {
  degree: string;
  institution: string;
  location: string;
  timeline: string;
  cgpa: string;
  focusAreas: string[];
}

export interface Certification {
  title: string;
  issuingBody: string;
  categoryOrScore: string;
  verificationId?: string;
}
