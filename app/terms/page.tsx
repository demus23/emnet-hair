import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ee]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
          Terms & Conditions
        </p>
        <h1 className="mt-4 text-5xl font-bold text-[#1f1512]">
          Website terms
        </h1>

        <div className="mt-10 space-y-5 rounded-[35px] bg-white p-8 leading-8 text-[#5f5147] shadow-xl">
          <p>Product photos are shown for presentation. Natural hair may vary slightly in texture, tone, and finish.</p>
          <p>Prices, availability, and offers may change without notice.</p>
          <p>Custom orders must be confirmed before production or preparation begins.</p>
          <p>By placing an order, you agree to provide accurate contact and delivery information.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}