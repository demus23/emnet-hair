"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCart, type Product } from "@/lib/cart";

type CustomerForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  notes: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState<CustomerForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    country: "United Arab Emirates",
    notes: "",
  });

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  function updateForm(field: keyof CustomerForm, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function placeOrder() {
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty. Please add a product first.");
      return;
    }

    if (!form.fullName || !form.email || !form.phone || !form.address) {
      setError("Please fill full name, email, phone, and delivery address.");
      return;
    }

    const orderNumber = `EMNET-${Date.now()}`;

    const newOrder = {
      orderNumber,
      customer: form,
      items: cart,
      total,
      status: "Pending Payment",
      createdAt: new Date().toISOString(),
    };

    const savedOrders = localStorage.getItem("emnetOrders");
    const orders = savedOrders ? JSON.parse(savedOrders) : [];

    localStorage.setItem(
      "emnetOrders",
      JSON.stringify([newOrder, ...orders])
    );

    localStorage.setItem("lastEmnetOrder", JSON.stringify(newOrder));
    localStorage.removeItem("emnetCart");

    router.push("/order-success");
  }

  return (
    <main className="min-h-screen bg-[#fbf6ef] px-6 py-12 text-[#1f1512] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#8b3a4a]">Checkout</h1>
            <p className="mt-2 text-[#6c5a50]">
              Complete your Emnet Hair order.
            </p>
          </div>

          <Link
            href="/cart"
            className="rounded-full border border-[#8b3a4a] px-6 py-3 text-sm font-semibold text-[#8b3a4a]"
          >
            Back to Cart
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-100 px-5 py-4 text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[35px] bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold">Customer Details</h2>

            <div className="mt-6 grid gap-5">
              <input
                type="text"
                placeholder="Full name"
                value={form.fullName}
                onChange={(e) => updateForm("fullName", e.target.value)}
                className="rounded-2xl border border-[#ead8c5] px-5 py-4 outline-none"
              />

              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                className="rounded-2xl border border-[#ead8c5] px-5 py-4 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone / WhatsApp number"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                className="rounded-2xl border border-[#ead8c5] px-5 py-4 outline-none"
              />

              <textarea
                placeholder="Delivery address"
                rows={4}
                value={form.address}
                onChange={(e) => updateForm("address", e.target.value)}
                className="rounded-2xl border border-[#ead8c5] px-5 py-4 outline-none"
              />

              <select
                value={form.country}
                onChange={(e) => updateForm("country", e.target.value)}
                className="rounded-2xl border border-[#ead8c5] px-5 py-4 outline-none"
              >
                <option>United Arab Emirates</option>
                <option>Uganda</option>
                <option>Kenya</option>
                <option>Ethiopia</option>
                <option>Eritrea</option>
              </select>

              <textarea
                placeholder="Order notes, hair length, color, or special request"
                rows={3}
                value={form.notes}
                onChange={(e) => updateForm("notes", e.target.value)}
                className="rounded-2xl border border-[#ead8c5] px-5 py-4 outline-none"
              />
            </div>
          </div>

          <div className="h-fit rounded-[35px] bg-[#1f1512] p-8 text-white shadow-xl">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-white/60">No items in cart.</p>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex justify-between gap-4 text-sm text-white/80"
                  >
                    <span>
                      {item.name} × {item.quantity || 1}
                    </span>
                    <span>AED {item.price * (item.quantity || 1)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[#c9a45c]">AED {total}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="mt-8 w-full rounded-full bg-[#8b3a4a] py-4 font-semibold text-white"
            >
              Place Order
            </button>

            <p className="mt-4 text-center text-sm text-white/50">
              Payment system will be connected next.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}