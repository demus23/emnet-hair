"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity?: number;
  }[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    notes: string;
  };
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastEmnetOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#fbf6ef] px-6 py-20 text-[#1f1512]">
      <div className="mx-auto max-w-3xl rounded-[40px] bg-white p-10 shadow-xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#c9a45c]">
            Order Received
          </p>

          <h1 className="mt-4 text-4xl font-bold text-[#8b3a4a]">
            Thank you for your order
          </h1>

          <p className="mt-5 text-[#6c5a50]">
            Your Emnet Hair order has been submitted. We will contact you soon
            on WhatsApp or email to confirm payment and delivery.
          </p>
        </div>

        {order && (
          <div className="mt-10 rounded-[30px] bg-[#fbf6ef] p-6">
            <div className="flex justify-between border-b border-[#ead8c5] pb-4">
              <span className="font-semibold">Order Number</span>
              <span className="text-[#8b3a4a]">{order.orderNumber}</span>
            </div>

            <div className="mt-4 flex justify-between border-b border-[#ead8c5] pb-4">
              <span className="font-semibold">Status</span>
              <span>{order.status}</span>
            </div>

            <div className="mt-4 flex justify-between border-b border-[#ead8c5] pb-4">
              <span className="font-semibold">Customer</span>
              <span>{order.customer.fullName}</span>
            </div>

            <div className="mt-4 space-y-3 border-b border-[#ead8c5] pb-4">
              <h2 className="font-semibold">Items</h2>

              {order.items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between text-sm text-[#6c5a50]"
                >
                  <span>
                    {item.name} × {item.quantity || 1}
                  </span>
                  <span>AED {item.price * (item.quantity || 1)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-[#8b3a4a]">AED {order.total}</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="rounded-full bg-[#1f1512] px-8 py-4 font-semibold text-white"
          >
            Back to Home
          </Link>
          <Link
  href="/admin/orders"
  className="ml-4 rounded-full border border-[#8b3a4a] px-8 py-4 font-semibold text-[#8b3a4a]"
>
  View Admin Orders
</Link>
        </div>
      </div>
    </main>
  );
}