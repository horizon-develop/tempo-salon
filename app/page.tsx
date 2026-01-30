import {
  Navbar,
  Hero,
  ServicesBar,
  PersonalStylist,
  QuoteBanner,
  NumberedServices,
  Contact,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)]">
      <Navbar />
      <Hero />
      <ServicesBar />
      <PersonalStylist />
      <QuoteBanner />
      <NumberedServices />
      <Contact />
      <Footer />
    </div>
  );
}
