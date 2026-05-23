"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWishlist, saveWishlist } from "@/lib/wishlist";
import { getCart, saveCart, type Product } from "@/lib/cart";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  function removeFromWishlist(id: number) {
    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);
    saveWishlist(updated);
  }

  function addToCart(product: Product) {
    const cart = getCart();

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );

      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbf6ef] px-6 py-12 text-[#1f1512] md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#8b3a4a]">
              Wishlist
            </h1>

            <p className="mt-2 text-[#6c5a50]">
              Your saved favorite products.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-[#8b3a4a] px-6 py-3 text-sm font-semibold text-[#8b3a4a]"
          >
            Continue Shopping
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-[35px] bg-white p-10 text-center shadow-xl">
            <h2 className="text-2xl font-bold">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-[#6c5a50]">
              Save your favorite Emnet Hair products.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-[35px] bg-white shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-80 w-full object-cover"
                />

                <div className="p-6">
                  <p className="text-sm font-semibold text-[#c9a45c]">
                    {product.category}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {product.name}
                  </h2>

                  <p className="mt-3 text-xl font-semibold text-[#8b3a4a]">
                    AED {product.price}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 rounded-full bg-[#1f1512] py-3 font-semibold text-white"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="rounded-full border border-[#8b3a4a] px-5 text-[#8b3a4a]"
                    >
                      Remove
                    </button>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 block text-center text-sm font-semibold text-[#8b3a4a]"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}