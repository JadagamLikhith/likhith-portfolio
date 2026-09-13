export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  primaryPositioning: string;
  location: string;
  educationSummary: {
    degree: string;
    field: string;
    institution: string;
    expectedGraduation: string;
    cgpa: string;
  };
  bioParagraph: string;
  socialLinks: SocialLinks;
  resumeUrl: string;
  availabilityStatus: string;
}
