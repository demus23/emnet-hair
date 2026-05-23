"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, saveCart, type Product } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
const [cartLoaded, setCartLoaded] = useState(false);

useEffect(() => {
  const savedCart = getCart();
  setCart(savedCart);
  setCartLoaded(true);
}, []);

useEffect(() => {
  if (cartLoaded) {
    saveCart(cart);
  }
}, [cart, cartLoaded]);

  function increase(id: number) {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  }

  function decrease(id: number) {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0)
    );
  }

  function remove(id: number) {
    setCart(cart.filter((item) => item.id !== id));
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <main className="min-h-screen bg-[#fbf6ef] px-6 py-12 text-[#1f1512] md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#8b3a4a]">Your Cart</h1>
            <p className="mt-2 text-[#6c5a50]">
              Review your selected Emnet Hair products.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-[#8b3a4a] px-6 py-3 text-sm font-semibold text-[#8b3a4a]"
          >
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[35px] bg-white p-10 text-center shadow-xl">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-3 text-[#6c5a50]">
              Add hair bundles, extensions, or hair masks from the homepage.
            </p>

            <Link
              href="/#products"
              className="mt-8 inline-block rounded-full bg-[#1f1512] px-8 py-4 font-semibold text-white"
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="rounded-[35px] bg-white p-8 shadow-xl">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={`cart-${item.id}`}
                    className="flex flex-col gap-5 border-b border-[#ead8c5] pb-6 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />

                      <div>
                        <h2 className="text-xl font-semibold">
                             {item.name}
                         </h2>
                         <div className="mt-3 flex flex-wrap gap-2">

  {item.selectedLength && (
    <span className="rounded-full bg-[#f5efe7] px-4 py-2 text-xs font-semibold text-[#8b3a4a]">
      {item.selectedLength}
    </span>
  )}

  {item.selectedTexture && (
    <span className="rounded-full bg-[#f5efe7] px-4 py-2 text-xs font-semibold text-[#8b3a4a]">
      {item.selectedTexture}
    </span>
  )}

  {item.selectedColor && (
    <span className="rounded-full bg-[#f5efe7] px-4 py-2 text-xs font-semibold text-[#8b3a4a]">
      {item.selectedColor}
    </span>
  )}

</div>
                        <p className="mt-1 text-sm text-[#c9a45c]">
                          {item.category}
                        </p>
                        <p className="mt-1 text-[#8b3a4a]">
                          AED {item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrease(item.id)}
                        className="h-10 w-10 rounded-full border border-[#ead8c5]"
                      >
                        -
                      </button>

                      <span className="w-6 text-center">
                        {item.quantity || 1}
                      </span>

                      <button
                        onClick={() => increase(item.id)}
                        className="h-10 w-10 rounded-full border border-[#ead8c5]"
                      >
                        +
                      </button>

                      <button
                        onClick={() => remove(item.id)}
                        className="ml-2 rounded-full bg-[#8b3a4a]/10 px-4 py-2 text-sm text-[#8b3a4a]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-fit rounded-[35px] bg-[#1f1512] p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>AED {total}</span>
                </div>

                <div className="flex justify-between text-white/80">
                  <span>Shipping</span>
                  <span>Calculated later</span>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#c9a45c]">AED {total}</span>
                  </div>
                </div>
              </div>

             <Link
  href="/checkout"
  className="mt-8 block w-full rounded-full bg-[#8b3a4a] py-4 text-center font-semibold text-white"
>
  Proceed to Checkout
</Link>

              <p className="mt-4 text-center text-sm text-white/50">
                Stripe checkout will be connected later.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}