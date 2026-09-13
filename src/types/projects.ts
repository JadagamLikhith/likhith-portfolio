export interface UXFlow {
  title: string;
  description: string;
  tag: string;
}

export interface ProjectData {
  id: "devbridge" | "e-library";
  title: string;
  subtitle: string;
  categoryTag: string;
  platform: string;
  route: string;
  summary: string;
  techStack: string[];
  uxFlows?: UXFlow[];
  designPhilosophy?: string;
  publicationDetails?: {
    journal: string;
    date: string;
    volumeIssue: string;
    paperId: string;
    author: string;
  };
  architecturalHighlights?: string[];
}
