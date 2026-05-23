"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, type Product } from "@/lib/cart";
import { getWishlist } from "@/lib/wishlist";
import { products } from "@/data/products";
import {
  CART_UPDATED_EVENT,
  WISHLIST_UPDATED_EVENT,
} from "@/lib/events";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  const [wishlistCount, setWishlistCount] = useState(0);

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

 useEffect(() => {
  function updateCounts() {
    const cart: Product[] = getCart();
    const wishlist: Product[] = getWishlist();

    setCartCount(
      cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
    );

    setWishlistCount(wishlist.length);
  }

  updateCounts();

  window.addEventListener(CART_UPDATED_EVENT, updateCounts);
  window.addEventListener(WISHLIST_UPDATED_EVENT, updateCounts);

  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, updateCounts);
    window.removeEventListener(WISHLIST_UPDATED_EVENT, updateCounts);
  };
}, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8c5] bg-[#fbf6ef]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-12">

        {/* LOGO */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-bold text-[#8b3a4a]"
        >
          Emnet Hair

          <span className="block text-xs tracking-[0.35em] text-[#c79b3b]">
            HUMAN HAIR
          </span>
        </Link>

        {/* SEARCH */}
        <div className="relative hidden flex-1 lg:block">

          <input
            type="text"
            placeholder="Search luxury hair..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           className="w-full rounded-full border border-[#d8cabb] bg-white px-6 py-4 text-[#1f1512] placeholder:text-[#9b8b80] outline-none shadow-sm"
          />

          {/* SEARCH RESULTS */}
          {search && (
            <div className="absolute left-0 right-0 top-[70px] rounded-3xl border border-[#ead8c5] bg-white p-4 shadow-2xl">

              {filteredProducts.length === 0 ? (
                <p className="text-sm text-[#8b7b70]">
                  No products found
                </p>
              ) : (
                <div className="space-y-3">

                  {filteredProducts.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        p-3
                        transition
                        hover:bg-[#f8f4ee]
                      "
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />

                      <div>
                        <p className="font-semibold text-[#1f1512]">
                          {product.name}
                        </p>

                        <p className="text-sm text-[#8b7b70]">
                          AED {product.price}
                        </p>
                      </div>
                    </Link>
                  ))}

                </div>
              )}
            </div>
          )}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-7 text-sm font-semibold xl:flex">

          <Link href="/">Home</Link>

          <Link href="/shop">Shop</Link>

          <select
            className="
              rounded-full
              border
              border-[#e7ddd1]
              bg-white
              px-4
              py-2
              text-sm
              outline-none
            "
          >
            <option>Categories</option>
            <option>Human Hair</option>
            <option>Wigs</option>
            <option>Ponytails</option>
            <option>Extensions</option>
          </select>

          <Link href="/wishlist">
            Wishlist ({wishlistCount})
          </Link>

          <Link href="/cart">
            Cart ({cartCount})
          </Link>

          <Link href="/admin/orders">
            Admin
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            rounded-full
            border
            border-[#8b3a4a]
            px-5
            py-2
            text-sm
            font-semibold
            text-[#8b3a4a]
            xl:hidden
          "
        >
          Menu
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-[#ead8c5] bg-white px-6 py-6 xl:hidden">

          <div className="flex flex-col gap-5 font-semibold text-[#1f1512]">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
            >
              Wishlist ({wishlistCount})
            </Link>

            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
            >
              Cart ({cartCount})
            </Link>

            <Link
  href="/admin/orders"
  onClick={() => setMenuOpen(false)}
>
  Admin
</Link>
          </div>
        </div>
      )}
    </header>
  );
}