import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { DevBridgeShowcase } from "@/components/sections/DevBridgeShowcase";
import { ELibraryShowcase } from "@/components/sections/ELibraryShowcase";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateProfilePageSchema } from "@/lib/seo";

export default function Home() {
  const profilePageSchema = generateProfilePageSchema();

  return (
    <div className="min-h-screen bg-canvas text-content-primary flex flex-col justify-between selection:bg-brand-indigo/30 selection:text-white">
      <JsonLd data={profilePageSchema} />
      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Main 6-Section Content */}
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Flagship DevBridge App */}
        <DevBridgeShowcase />

        {/* Section 3: Published Research Monograph */}
        <ELibraryShowcase />

        {/* Section 4: Technical Capabilities Matrix */}
        <CapabilitiesSection />

        {/* Section 5: Experience, Education & Certifications */}
        <ExperienceSection />

        {/* Section 6: Direct Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
