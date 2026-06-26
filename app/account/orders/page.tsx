"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Order = {
  _id: string;
  customerEmail?: string;
  customerName?: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  stripeSessionId: string;
  shipping?: {
    fullName?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    notes?: string;
  };
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default function CustomerOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      if (!session?.user?.email) return;

      const res = await fetch(
        `/api/orders/customer?email=${session.user.email}`
      );
      const data = await res.json();

      setOrders(data.orders || []);
    }

    fetchOrders();
  }, [session]);

  if (status === "loading") {
    return <main className="p-10">Loading...</main>;
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#fbf6ef] p-10 text-center">
        <h1 className="text-3xl font-bold">Please login</h1>
        <Link href="/login" className="mt-6 inline-block underline">
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf6ef] px-6 py-12 text-[#1f1512]">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-[#8b3a4a]">My Orders</h1>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-[30px] bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">No orders yet</h2>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="rounded-[30px] bg-white p-6 shadow">
                <div className="flex justify-between gap-4 border-b pb-4">
                  <div>
                    <h2 className="break-all font-bold text-[#8b3a4a]">
                      {order.stripeSessionId}
                    </h2>
                    <p className="text-sm text-[#6c5a50]">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold capitalize text-green-700">
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>AED {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex justify-between border-t pt-4 text-xl font-bold">
                  <span>Total</span>
                  <span>AED {order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}