"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { getCart, saveCart, type Product as CartProduct } from "@/lib/cart";
import { notifyCartUpdated } from "@/lib/events";
import QuickView from "@/components/QuickView";

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTexture, setSelectedTexture] = useState("All");
  const [selectedLength, setSelectedLength] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);

  function addToCart(product: (typeof products)[number]) {
    const cart = getCart();
    const productItem = product as CartProduct;

    const existingItem = cart.find((item) => item.id === productItem.id);

    if (existingItem) {
      saveCart(
        cart.map((item) =>
          item.id === productItem.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      saveCart([...cart, { ...productItem, quantity: 1 }]);
    }

    notifyCartUpdated();
  }

  const filteredProducts = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) => selectedTexture === "All" || p.textures.includes(selectedTexture))
    .filter((p) => selectedLength === "All" || p.lengths.includes(selectedLength))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.id - b.id;
    });

  return (
    <section id="products" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
            Luxury Collection
          </p>
          <h2 className="mt-4 text-4xl font-bold text-[#1f1512] md:text-5xl">
            Shop Premium Human Hair
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[#6c5a50]">
            Discover wigs, ponytails, bundles, and textured human hair crafted for elegance.
          </p>
        </div>

        <div className="mb-12 rounded-[32px] border border-[#ead8c5] bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["category", selectedCategory, setSelectedCategory, ["All", "Human Hair", "Wigs", "Ponytail", "Extensions"]],
              ["texture", selectedTexture, setSelectedTexture, ["All", "Deep Curly", "Soft Curly", "Loose Curly", "Water Wavy", "Wavy", "Straight", "Curly"]],
              ["length", selectedLength, setSelectedLength, ["All", "10 inch", "12 inch", "14 inch", "16 inch", "18 inch", "20 inch", "22 inch", "24 inch", "26 inch", "28 inch", "30 inch"]],
            ].map(([label, value, setter, options]: any) => (
              <select
                key={label}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="rounded-full border border-[#d8cabb] bg-white px-5 py-4 text-[#1f1512] outline-none"
              >
                {options.map((option: string) => (
                  <option key={option} value={option}>
                    {option === "All" ? `All ${label}s` : option}
                  </option>
                ))}
              </select>
            ))}

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-[#d8cabb] bg-white px-5 py-4 text-[#1f1512] outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="mt-5 flex justify-between text-sm text-[#6c5a50]">
            <p>Showing <b>{filteredProducts.length}</b> products</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTexture("All");
                setSelectedLength("All");
                setSortBy("featured");
              }}
              className="font-bold text-[#8b3a4a]"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[35px] bg-white p-12 text-center shadow-xl">
            <h3 className="text-2xl font-bold text-[#8b3a4a]">No products found</h3>
            <p className="mt-3 text-[#6c5a50]">Try changing the filters.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group overflow-hidden rounded-[35px] bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden bg-[#f8f4ee]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#c79b3b]">
                    {product.category}
                  </p>

                  <h3 className="mt-3 min-h-[65px] text-2xl font-bold text-[#1f1512]">
                    {product.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-2xl font-bold text-[#8b3a4a]">AED {product.price}</p>
                    <span className="text-sm text-[#6c5a50]">★ {product.rating}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="mt-3 w-full rounded-full bg-[#1f1512] py-4 font-bold text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <QuickView
  product={quickViewProduct}
  open={!!quickViewProduct}
  onClose={() => setQuickViewProduct(null)}
  onAddToCart={addToCart}
/>
    </section>
  );
}