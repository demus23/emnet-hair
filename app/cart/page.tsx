"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCart, saveCart, type Product } from "@/lib/cart";

type Shipping = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes: string;
};

export default function CartPage() {
  const { data: session } = useSession();

  const [cart, setCart] = useState<Product[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const [shipping, setShipping] = useState<Shipping>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Dubai",
    country: "UAE",
    notes: "",
  });

  useEffect(() => {
    const savedCart = getCart();
    setCart(savedCart);
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      setShipping((prev) => ({
        ...prev,
        email: session.user?.email || "",
      }));
    }
  }, [session]);

  useEffect(() => {
    if (cartLoaded) saveCart(cart);
  }, [cart, cartLoaded]);

  function increase(id: number) {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  }

  function decrease(id: number) {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
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

  async function handleCheckout() {
    if (!shipping.fullName || !shipping.email || !shipping.phone || !shipping.address) {
      alert("Please fill your name, email, phone, and delivery address.");
      return;
    }

    try {
      setLoadingCheckout(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          shipping,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed");
      }
    } catch (error) {
      alert("Checkout failed");
    } finally {
      setLoadingCheckout(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5EFE7] px-6 py-12 text-[#2C2018] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#2C2018]">Your Cart</h1>
            <p className="mt-2 text-[#7A6550]">
              Review your selected Emnet Hair products.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-[#C9A978] px-6 py-3 text-sm font-semibold text-[#2C2018]"
          >
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[35px] bg-white p-10 text-center shadow-xl">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-3 text-[#7A6550]">
              Add hair bundles, extensions, or hair masks from the homepage.
            </p>

            <Link
              href="/#products"
              className="mt-8 inline-block rounded-full bg-[#2C2018] px-8 py-4 font-semibold text-white"
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-8">
              <div className="rounded-[35px] bg-white p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold">Delivery Details</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={shipping.fullName}
                    onChange={(e) =>
                      setShipping({ ...shipping, fullName: e.target.value })
                    }
                    placeholder="Full name"
                    className="rounded-2xl border border-[#E8D9C6] px-4 py-3 outline-none"
                  />

                  <input
                    value={shipping.email}
                    onChange={(e) =>
                      setShipping({ ...shipping, email: e.target.value })
                    }
                    placeholder="Email"
                    type="email"
                    className="rounded-2xl border border-[#E8D9C6] px-4 py-3 outline-none"
                  />

                  <input
                    value={shipping.phone}
                    onChange={(e) =>
                      setShipping({ ...shipping, phone: e.target.value })
                    }
                    placeholder="Phone / WhatsApp"
                    className="rounded-2xl border border-[#E8D9C6] px-4 py-3 outline-none"
                  />

                  <input
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping({ ...shipping, city: e.target.value })
                    }
                    placeholder="City"
                    className="rounded-2xl border border-[#E8D9C6] px-4 py-3 outline-none"
                  />

                  <input
                    value={shipping.country}
                    onChange={(e) =>
                      setShipping({ ...shipping, country: e.target.value })
                    }
                    placeholder="Country"
                    className="rounded-2xl border border-[#E8D9C6] px-4 py-3 outline-none"
                  />

                  <input
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                    placeholder="Delivery address"
                    className="rounded-2xl border border-[#E8D9C6] px-4 py-3 outline-none"
                  />

                  <textarea
                    value={shipping.notes}
                    onChange={(e) =>
                      setShipping({ ...shipping, notes: e.target.value })
                    }
                    placeholder="Delivery notes optional"
                    className="min-h-[100px] rounded-2xl border border-[#E8D9C6] px-4 py-3 outline-none md:col-span-2"
                  />
                </div>
              </div>

              <div className="rounded-[35px] bg-white p-8 shadow-xl">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={`cart-${item.id}`}
                      className="flex flex-col gap-5 border-b border-[#E8D9C6] pb-6 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />

                        <div>
                          <h2 className="text-xl font-semibold">{item.name}</h2>

                          <p className="mt-1 text-sm text-[#C9A978]">
                            {item.category}
                          </p>

                          <p className="mt-1 text-[#2C2018]">
                            AED {item.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrease(item.id)}
                          className="h-10 w-10 rounded-full border border-[#E8D9C6]"
                        >
                          -
                        </button>

                        <span className="w-6 text-center">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() => increase(item.id)}
                          className="h-10 w-10 rounded-full border border-[#E8D9C6]"
                        >
                          +
                        </button>

                        <button
                          onClick={() => remove(item.id)}
                          className="ml-2 rounded-full bg-[#EDE3D6] px-4 py-2 text-sm text-[#2C2018]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-fit rounded-[35px] bg-[#2C2018] p-8 text-white shadow-xl">
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
                    <span className="text-[#C9A978]">AED {total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loadingCheckout}
                className="mt-8 block w-full rounded-full bg-[#C9A978] py-4 text-center font-semibold text-[#2C2018] disabled:opacity-60"
              >
                {loadingCheckout ? "Opening Stripe..." : "Pay Securely"}
              </button>

              <p className="mt-4 text-center text-sm text-white/50">
                Secure payment powered by Stripe.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}