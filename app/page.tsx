import { ContactSection } from "@/components/contact-section";
import { Differentials } from "@/components/differentials";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { TrabalhosRealizados } from "@/components/trabalhos-realizados";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <TrabalhosRealizados />
      <Differentials />
      <ContactSection />
      <Footer />
    </main>
  );
}
