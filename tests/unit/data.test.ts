import { describe, it, expect } from "vitest";
import { profileData } from "@/data/profile";
import { devbridgeProject, eLibraryProject, allProjects } from "@/data/projects";
import { skillsData } from "@/data/skills";
import {
  internshipExperience,
  educationMilestone,
  certificationsData,
} from "@/data/experience";

describe("Authoritative Portfolio Data Integrity", () => {
  it("validates profile data structure and factual claims", () => {
    expect(profileData.name).toBe("Jadagam Likhith");
    expect(profileData.primaryPositioning).toBe(
      "Full Stack Developer × Product UI/UX Designer"
    );
    expect(profileData.location).toContain("Vijayawada");
    expect(profileData.educationSummary.cgpa).toContain("8.0");
    expect(profileData.socialLinks.email).toBe("likhithjadagam7@gmail.com");
    expect(profileData.socialLinks.github).toBe(
      "https://github.com/ZenMaestro"
    );
  });

  it("validates DevBridge project data", () => {
    expect(devbridgeProject.id).toBe("devbridge");
    expect(devbridgeProject.techStack).toContain("Kotlin");
    expect(devbridgeProject.techStack).toContain("Jetpack Compose");
    expect(devbridgeProject.techStack).toContain("Material Design 3");
    expect(devbridgeProject.uxFlows).toBeDefined();
    expect(devbridgeProject.uxFlows?.length).toBe(4);
  });

  it("validates E-Library academic publication data", () => {
    expect(eLibraryProject.id).toBe("e-library");
    expect(eLibraryProject.publicationDetails?.journal).toContain("IJRAR");
    expect(eLibraryProject.publicationDetails?.paperId).toBe("IJRAR25B3067");
    expect(eLibraryProject.techStack).toContain("Flask");
    expect(eLibraryProject.techStack).toContain("MySQL");
  });

  it("validates all 4 technical skill domains", () => {
    expect(skillsData.length).toBe(4);
    const domainIds = skillsData.map((d) => d.id);
    expect(domainIds).toEqual([
      "languages",
      "fullstack",
      "uiux",
      "tools-analytics",
    ]);

    // Check specific verified skills
    const allSkills = skillsData.flatMap((d) => d.skills);
    expect(allSkills).toContain("React.js");
    expect(allSkills).toContain("Material Design 3");
    expect(allSkills).toContain("Docker");
    expect(allSkills).toContain("Python");
  });

  it("validates experience, education, and certifications", () => {
    expect(internshipExperience.company).toContain("Blackbucks Education");
    expect(internshipExperience.role).toBe("Product UI/UX Designer");
    expect(educationMilestone.institution).toContain("Lingayas");
    expect(certificationsData.length).toBe(3);

    const certTitles = certificationsData.map((c) => c.title);
    expect(certTitles).toContain("Introduction to Generative AI");
    expect(certTitles).toContain("Exploratory Data Analysis");
    expect(certTitles).toContain("Data Structure using C Programming");
  });
});
