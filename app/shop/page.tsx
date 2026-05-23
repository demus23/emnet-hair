import Navbar from "@/components/Navbar";
import ProductCatalog from "@/components/ProductCatalog";
import Footer from "@/components/Footer";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ee]">
      <Navbar />

      <section className="px-6 py-20 text-center md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
          Emnet Hair Shop
        </p>

        <h1 className="mt-4 text-5xl font-bold text-[#1f1512] md:text-7xl">
          Find Your Perfect Hair
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6c5a50]">
          Browse authentic human hair, wigs, ponytails, and extensions by
          texture, length, price, and style.
        </p>
      </section>

      <ProductCatalog />

      <Footer />
    </main>
  );
}