import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ee]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
          Privacy Policy
        </p>
        <h1 className="mt-4 text-5xl font-bold text-[#1f1512]">
          Your privacy matters
        </h1>

        <div className="mt-10 space-y-5 rounded-[35px] bg-white p-8 leading-8 text-[#5f5147] shadow-xl">
          <p>We collect customer information only to process orders, contact customers, and arrange delivery.</p>
          <p>Your personal details are not sold or shared for unrelated marketing purposes.</p>
          <p>Order details may include name, email, phone number, delivery address, and selected products.</p>
          <p>By using this website, you agree to our collection and use of information for order processing.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}