import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ModelLedger } from "@/components/models";
import { Usage } from "@/components/code";
import { Pricing } from "@/components/stats";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ModelLedger />
        <Usage />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
