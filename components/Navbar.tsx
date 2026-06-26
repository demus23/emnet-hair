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
    <header className="sticky top-0 z-50 border-b border-[#E3D9C9] bg-[#F7F3ED]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-12">
        <Link href="/" className="shrink-0">
          <h1 className="font-serif text-2xl text-[#1C1410]">
            Emnet Hair
          </h1>

          <span className="block text-[10px] tracking-[0.3em] text-[#A8895F]">
            LUXURY HUMAN HAIR
          </span>
        </Link>

        <div className="relative hidden flex-1 lg:block">
          <input
            type="text"
            placeholder="Search luxury hair..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#E3D9C9] bg-white px-6 py-4 text-[15px] text-[#1C1410] placeholder:text-[#9C8E7C] outline-none focus:border-[#A8895F]"
          />

          {search && (
            <div className="absolute left-0 right-0 top-[62px] border border-[#E3D9C9] bg-white p-4 shadow-sm">
              {filteredProducts.length === 0 ? (
                <p className="text-sm text-[#5E5248]">
                  No products found
                </p>
              ) : (
                <div className="divide-y divide-[#E3D9C9]">
                  {filteredProducts.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="flex items-center gap-4 py-3 transition hover:bg-[#F7F3ED]"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-cover"
                      />

                      <div>
                        <p className="text-[15px] font-medium text-[#1C1410]">
                          {product.name}
                        </p>

                        <p className="text-sm text-[#A8895F]">
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

        <div className="hidden items-center gap-8 text-[13px] font-medium uppercase tracking-[0.15em] xl:flex">
          <Link
            href="/"
            className="text-[#5E5248] transition hover:text-[#1C1410]"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-[#5E5248] transition hover:text-[#1C1410]"
          >
            Shop
          </Link>

          <select className="border border-[#E3D9C9] bg-white px-4 py-2 text-[13px] uppercase tracking-[0.1em] text-[#1C1410] outline-none">
            <option>Categories</option>
            <option>Human Hair</option>
            <option>Wigs</option>
            <option>Ponytails</option>
            <option>Extensions</option>
          </select>

          <Link
            href="/wishlist"
            className="text-[#5E5248] transition hover:text-[#1C1410]"
          >
            Wishlist ({wishlistCount})
          </Link>

          <Link
            href="/cart"
            className="text-[#5E5248] transition hover:text-[#1C1410]"
          >
            Cart ({cartCount})
          </Link>

          <Link
            href="/admin"
            className="border border-[#1C1410] px-5 py-3 text-[#1C1410] transition hover:bg-[#1C1410] hover:text-white"
          >
            Admin
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="border border-[#A8895F] px-5 py-2 text-[13px] font-medium uppercase tracking-[0.1em] text-[#1C1410] xl:hidden"
        >
          Menu
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#E3D9C9] bg-[#F7F3ED] px-6 py-6 xl:hidden">
          <div className="flex flex-col gap-5 text-[13px] font-medium uppercase tracking-[0.15em] text-[#1C1410]">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link href="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>

            <Link href="/wishlist" onClick={() => setMenuOpen(false)}>
              Wishlist ({wishlistCount})
            </Link>

            <Link href="/cart" onClick={() => setMenuOpen(false)}>
              Cart ({cartCount})
            </Link>

            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}