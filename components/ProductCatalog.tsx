"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ProductCatalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Product load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Pre-select a category if the page was linked with ?category=...
  useEffect(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) {
      setActiveCategory(fromUrl);
    }
  }, [searchParams]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    products.forEach((product) => {
      if (product.category) unique.add(product.category);
    });
    return ["All", ...Array.from(unique)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter(
      (product) =>
        (product.category || "").toLowerCase() ===
        activeCategory.toLowerCase()
    );
  }, [products, activeCategory]);

  return (
    <section className="bg-[#F7F3ED] px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
            Our Collection
          </p>

          <h2 className="mt-5 font-serif text-4xl text-[#1C1410] md:text-5xl">
            Premium human hair
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-8 text-[#5E5248]">
            Discover luxury human hair, wigs, ponytails, clip-ins and
            textured curls.
          </p>
        </div>

        {!loading && products.length > 0 && (
          <div className="mb-14 flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`border px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.15em] transition ${
                    isActive
                      ? "border-[#1C1410] bg-[#1C1410] text-white"
                      : "border-[#E3D9C9] bg-white text-[#5E5248] hover:border-[#A8895F] hover:text-[#1C1410]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {loading && (
          <p className="text-center text-[#5E5248]">Loading products...</p>
        )}

        {!loading && products.length === 0 && (
          <div className="border border-[#E3D9C9] bg-white p-12 text-center">
            <h3 className="font-serif text-2xl text-[#1C1410]">
              No products yet
            </h3>
            <p className="mt-2 text-[15px] text-[#5E5248]">
              Add products from the admin dashboard.
            </p>
          </div>
        )}

        {!loading && products.length > 0 && filteredProducts.length === 0 && (
          <div className="border border-[#E3D9C9] bg-white p-12 text-center">
            <h3 className="font-serif text-2xl text-[#1C1410]">
              No products in this category yet
            </h3>
            <p className="mt-2 text-[15px] text-[#5E5248]">
              Try another category or check back soon.
            </p>
          </div>
        )}

        <div className="grid gap-px overflow-hidden border border-[#E3D9C9] bg-[#E3D9C9] sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group bg-white transition hover:bg-[#FBF8F3]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index, 7) * 0.08,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="overflow-hidden bg-[#E3D9C9]">
                  <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A8895F]">
                    {product.category || "Luxury Hair"}
                  </p>

                  <h3 className="mt-3 font-serif text-xl text-[#1C1410]">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[#5E5248]">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#E3D9C9] pt-5">
                    <p className="font-serif text-lg text-[#1C1410]">
                      AED {product.price}
                    </p>

                    <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#A8895F]">
                      View →
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}