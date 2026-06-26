"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Order = {
  _id: string;
  customerEmail?: string;
  customerName?: string;
  totalAmount: number;
  currency: string;
  status: string;
  createdAt: string;
  stripeSessionId: string;
  items: {
    productId: string;
    name: string;
    image?: string;
    price: number;
    quantity: number;
  }[];
};

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [saving, setSaving] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setSaving(false);
      return;
    }

    async function saveOrder() {
      try {
        const res = await fetch("/api/orders/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (data.order) {
          setOrder(data.order);
        }
      } catch (error) {
        console.error("Save order error:", error);
      } finally {
        setSaving(false);
      }
    }

    saveOrder();
  }, [searchParams]);

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
            Your payment has been received successfully. We will contact you
            soon on WhatsApp or email to arrange delivery.
          </p>

          {saving && (
            <p className="mt-4 text-sm text-[#8b3a4a]">
              Saving your order details...
            </p>
          )}
        </div>

        {order && (
          <div className="mt-10 rounded-[30px] bg-[#fbf6ef] p-6">
            <div className="flex justify-between gap-4 border-b border-[#ead8c5] pb-4">
              <span className="font-semibold">Order ID</span>
              <span className="break-all text-right text-[#8b3a4a]">
                {order.stripeSessionId}
              </span>
            </div>

            <div className="mt-4 flex justify-between border-b border-[#ead8c5] pb-4">
              <span className="font-semibold">Status</span>
              <span className="capitalize">{order.status}</span>
            </div>

            <div className="mt-4 flex justify-between gap-4 border-b border-[#ead8c5] pb-4">
              <span className="font-semibold">Customer</span>
              <span className="text-right">
                {order.customerName || order.customerEmail || "Stripe Customer"}
              </span>
            </div>

            <div className="mt-4 space-y-3 border-b border-[#ead8c5] pb-4">
              <h2 className="font-semibold">Items</h2>

              {order.items.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex justify-between gap-4 text-sm text-[#6c5a50]"
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
              <span className="text-[#8b3a4a]">AED {order.totalAmount}</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-[#1f1512] px-8 py-4 text-center font-semibold text-white"
          >
            Back to Home
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-full border border-[#8b3a4a] px-8 py-4 text-center font-semibold text-[#8b3a4a]"
          >
            View Admin Orders
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fbf6ef] px-6 py-20 text-center">
          Loading order...
        </main>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}