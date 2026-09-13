import { describe, it, expect } from "vitest";
import {
  generatePersonSchema,
  generateWebsiteSchema,
  generateProfilePageSchema,
  generateScholarlyArticleSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import manifest from "@/app/manifest";

describe("SEO & Structured Data (JSON-LD) Generators", () => {
  it("generates valid Person schema with authentic data", () => {
    const person = generatePersonSchema();
    expect(person["@context"]).toBe("https://schema.org");
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Jadagam Likhith");
    expect(person.email).toBe("likhithjadagam7@gmail.com");
    expect(person.address.addressLocality).toBe("Vijayawada");
    expect(person.alumniOf.name).toContain("Lingayas");
    expect(person.sameAs).toContain("https://github.com/ZenMaestro");
    expect(person.knowsAbout).toContain("Kotlin");
    expect(person.knowsAbout).toContain("React.js");
  });

  it("generates valid WebSite schema", () => {
    const website = generateWebsiteSchema();
    expect(website["@context"]).toBe("https://schema.org");
    expect(website["@type"]).toBe("WebSite");
    expect(website.name).toContain("Jadagam Likhith Portfolio");
    expect(website.inLanguage).toBe("en-US");
  });

  it("generates valid ProfilePage schema", () => {
    const profilePage = generateProfilePageSchema();
    expect(profilePage["@context"]).toBe("https://schema.org");
    expect(profilePage["@type"]).toBe("ProfilePage");
    expect(profilePage.mainEntity["@type"]).toBe("Person");
  });

  it("generates valid ScholarlyArticle schema for IJRAR paper", () => {
    const article = generateScholarlyArticleSchema();
    expect(article["@context"]).toBe("https://schema.org");
    expect(article["@type"]).toBe("ScholarlyArticle");
    expect(article.identifier).toBe("IJRAR25B3067");
    expect(article.author.name).toBe("J. Likhith");
    expect(article.publisher.name).toContain("IJRAR");
    expect(article.volumeNumber).toBe("12");
    expect(article.issueNumber).toBe("2");
  });

  it("generates valid SoftwareApplication schema for DevBridge", () => {
    const software = generateSoftwareApplicationSchema();
    expect(software["@context"]).toBe("https://schema.org");
    expect(software["@type"]).toBe("SoftwareApplication");
    expect(software.name).toBe("DevBridge");
    expect(software.applicationCategory).toBe("DeveloperApplication");
    expect(software.operatingSystem).toBe("Android");
    expect(software.softwareRequirements).toContain("Kotlin");
  });

  it("generates valid BreadcrumbList schema", () => {
    const breadcrumbs = generateBreadcrumbSchema([
      { name: "Overview", url: "/" },
      { name: "DevBridge Case Study", url: "/work/devbridge" },
    ]);
    expect(breadcrumbs["@context"]).toBe("https://schema.org");
    expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbs.itemListElement).toHaveLength(2);
    expect(breadcrumbs.itemListElement[0].position).toBe(1);
    expect(breadcrumbs.itemListElement[0].name).toBe("Overview");
    expect(breadcrumbs.itemListElement[1].position).toBe(2);
    expect(breadcrumbs.itemListElement[1].name).toBe("DevBridge Case Study");
  });

  it("provides valid robots.txt configuration", () => {
    const robotsConfig = robots();
    expect(robotsConfig.sitemap).toContain("sitemap.xml");
    expect(Array.isArray(robotsConfig.rules)).toBe(true);
  });

  it("provides valid sitemap.xml with all routes", () => {
    const sitemapEntries = sitemap();
    expect(sitemapEntries).toHaveLength(3);
    const urls = sitemapEntries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/"))).toBe(true);
    expect(urls.some((u) => u.includes("/work/devbridge"))).toBe(true);
    expect(urls.some((u) => u.includes("/work/e-library"))).toBe(true);
  });

  it("provides valid web app manifest", () => {
    const manifestConfig = manifest();
    expect(manifestConfig.name).toContain("Jadagam Likhith");
    expect(manifestConfig.display).toBe("standalone");
    expect(manifestConfig.background_color).toBe("#06070B");
  });
});
