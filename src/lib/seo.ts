import { profileData } from "@/data/profile";
import { devbridgeProject, eLibraryProject } from "@/data/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://likhith-portfolio-sage.vercel.app";

/**
 * Generate Schema.org Person structured data
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profileData.name,
    givenName: "Likhith",
    familyName: "Jadagam",
    url: siteUrl,
    image: `${siteUrl}/images/likhith-portrait.jpg`,
    jobTitle: "Full Stack Developer & Product UI/UX Designer",
    description: profileData.bioParagraph,
    email: profileData.socialLinks.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vijayawada",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: profileData.educationSummary.institution,
    },
    sameAs: [
      profileData.socialLinks.github,
      profileData.socialLinks.linkedin,
    ],
    knowsAbout: [
      "Full Stack Web Development",
      "React.js",
      "Next.js",
      "Node.js",
      "Kotlin",
      "Android Jetpack Compose",
      "Material Design 3",
      "Python",
      "Flask",
      "MySQL",
      "RESTful API Architecture",
      "Product UI/UX Design",
      "Human-Centered Interface Design",
      "Responsive Web Design",
    ],
  };
}

/**
 * Generate Schema.org WebSite structured data
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${profileData.name} Portfolio`,
    description:
      "Official portfolio of Jadagam Likhith: Computer Science Engineer & Product Designer building resilient backend systems and refined Material Design 3 interfaces.",
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
    inLanguage: "en-US",
  };
}

/**
 * Generate Schema.org ProfilePage structured data for Homepage
 */
export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${profileData.name} — Full Stack Developer × Product UI/UX Designer`,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#person`,
    },
    mainEntity: generatePersonSchema(),
  };
}

/**
 * Generate Schema.org ScholarlyArticle structured data for E-Library publication
 */
export function generateScholarlyArticleSchema() {
  const details = eLibraryProject.publicationDetails!;
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${siteUrl}/work/e-library/#article`,
    headline: eLibraryProject.title,
    name: eLibraryProject.title,
    description: eLibraryProject.summary,
    url: `${siteUrl}/work/e-library`,
    author: {
      "@type": "Person",
      name: details.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: details.journal,
    },
    datePublished: "2025-05-01",
    issueNumber: "2",
    volumeNumber: "12",
    identifier: details.paperId,
    isPartOf: {
      "@type": "PublicationIssue",
      issueNumber: "2",
      isPartOf: {
        "@type": "PublicationVolume",
        volumeNumber: "12",
        isPartOf: {
          "@type": "Periodical",
          name: details.journal,
        },
      },
    },
    about: [
      "E-Library System Architecture",
      "Role-Based Access Control",
      "Recommendation Systems",
      "Flask Web Development",
      "MySQL Relational Modeling",
    ],
    inLanguage: "en-US",
  };
}

/**
 * Generate Schema.org SoftwareApplication structured data for DevBridge
 */
export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/work/devbridge/#software`,
    name: devbridgeProject.title,
    description: devbridgeProject.summary,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Android",
    url: `${siteUrl}/work/devbridge`,
    author: {
      "@id": `${siteUrl}/#person`,
    },
    featureList: (devbridgeProject.uxFlows || []).map(
      (flow) => `${flow.title}: ${flow.description}`
    ),
    softwareRequirements: devbridgeProject.techStack.join(", "),
  };
}

/**
 * Generate Schema.org BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}
