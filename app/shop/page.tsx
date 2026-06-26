import Navbar from "@/components/Navbar";
import ProductCatalog from "@/components/ProductCatalog";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#F7F3ED] text-[#1C1410]">
      <Navbar />

      <section className="px-6 pb-8 pt-16 text-center md:px-12">
        <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
          Emnet Hair Shop
        </p>

        <h1 className="mt-6 font-serif text-5xl leading-tight text-[#1C1410] md:text-6xl">
          Find your perfect hair
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-[#5E5248]">
          Browse authentic human hair, wigs, ponytails, and extensions by
          texture, length, price, and style.
        </p>
      </section>

      <Suspense fallback={null}>
        <ProductCatalog />
      </Suspense>

      <Footer />
    </main>
  );
}