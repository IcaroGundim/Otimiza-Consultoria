import { AcreExpertise } from "@/components/acre-expertise";
import { ContactSection } from "@/components/contact-section";
import { Differentials } from "@/components/differentials";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Differentials />
      <AcreExpertise />
      <ContactSection />
      <Footer />
    </main>
  );
}
