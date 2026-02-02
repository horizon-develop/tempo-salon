import {
  Navbar,
  Hero,
  AboutSection,
  ResultsSection,
  PricingSection,
  StylistsSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      <Navbar />
      <Hero />
      <AboutSection />
      <ResultsSection />
      <PricingSection />
      <StylistsSection />
      <Footer />
    </div>
  );
}
