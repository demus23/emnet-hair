import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ee]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
          Contact
        </p>
        <h1 className="mt-4 text-5xl font-bold text-[#1f1512]">
          Need help choosing your hair?
        </h1>

        <div className="mt-10 rounded-[35px] bg-white p-8 shadow-xl">
          <p className="text-[#5f5147]">WhatsApp: +971 XX XXX XXXX</p>
          <p className="mt-3 text-[#5f5147]">Email: hello@emnethair.com</p>
          <p className="mt-3 text-[#5f5147]">Instagram: @emnethair</p>
          <p className="mt-6 text-[#5f5147]">
            Message us for bundle advice, custom color requests, wig orders, and
            delivery questions.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}