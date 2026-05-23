import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ee]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
          Shipping
        </p>
        <h1 className="mt-4 text-5xl font-bold text-[#1f1512]">
          Delivery information
        </h1>

        <div className="mt-10 space-y-5 rounded-[35px] bg-white p-8 leading-8 text-[#5f5147] shadow-xl">
          <p>We deliver within the UAE and can arrange international shipping.</p>
          <p>Delivery timing depends on product availability and customization.</p>
          <p>Custom wigs, colors, and special textures may require extra preparation time.</p>
          <p>After placing your order, our team will contact you to confirm payment and delivery.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}