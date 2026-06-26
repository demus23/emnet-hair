import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import SocialProof from "@/components/SocialProof";
import Promotions from "@/components/Promotions";
import Education from "@/components/Education";
import ProductCatalog from "@/components/ProductCatalog";
import Footer from "@/components/Footer";
import MotionSection from "@/components/MotionSection";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F3ED] text-[#1C1410]">
      <Navbar />

      <Hero />

      {/* ProductCatalog has its own internal card stagger */}
      <Suspense fallback={null}>
        <ProductCatalog />
      </Suspense>

      <MotionSection>
        <BrandStory />
      </MotionSection>

      {/* SocialProof has its own internal card stagger */}
      <SocialProof />

      <MotionSection>
        <Promotions />
      </MotionSection>

      {/* Education has its own internal card stagger */}
      <Education />

      <MotionSection delay={0.1}>
        <Footer />
      </MotionSection>
    </main>
  );
}