import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ee]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
          Returns & Exchanges
        </p>
        <h1 className="mt-4 text-5xl font-bold text-[#1f1512]">
          Return policy
        </h1>

        <div className="mt-10 space-y-5 rounded-[35px] bg-white p-8 leading-8 text-[#5f5147] shadow-xl">
          <p>For hygiene reasons, used hair products cannot be returned.</p>
          <p>Returns or exchanges may be accepted only if the item is unused, unopened, and in original condition.</p>
          <p>Custom color, customized wigs, and special orders may not be refundable once confirmed.</p>
          <p>Please contact us within 24 hours of receiving your order if there is an issue.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}