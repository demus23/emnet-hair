import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ee]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
          About Emnet Hair
        </p>
        <h1 className="mt-4 text-5xl font-bold text-[#1f1512]">
          Authentic human hair made for confidence.
        </h1>
        <p className="mt-8 leading-8 text-[#5f5147]">
          Emnet Hair offers premium virgin human hair, wigs, ponytails, clip-ins,
          and customized textures for women who want natural beauty, softness,
          and long-lasting quality.
        </p>
        <p className="mt-5 leading-8 text-[#5f5147]">
          We focus on carefully selected hair, true-to-length quality, minimal
          shedding, and personalized styling options including custom colors and
          textures.
        </p>
      </section>
      <Footer />
    </main>
  );
}