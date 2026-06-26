"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function updateOrderStatus(orderId: string, status: string) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.order) {
        setOrders((prev) =>
          prev.map((order) => (order._id === orderId ? data.order : order))
        );
      }
    } catch (error) {
      console.error("Update status error:", error);
    }
  }

  async function deleteOrder(orderId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      }
    } catch (error) {
      console.error("Delete order error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbf6ef] px-6 py-12 text-[#1f1512] md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#8b3a4a] md:text-5xl">
              Admin Orders
            </h1>
            <p className="mt-2 text-[#6c5a50]">
              View and manage paid Stripe orders from Emnet Hair checkout.
            </p>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full border border-[#8b3a4a] px-6 py-3 text-sm font-semibold text-[#8b3a4a]"
          >
            Back to Store
          </Link>
        </div>

        {loading ? (
          <div className="rounded-[35px] bg-white p-10 text-center shadow-xl">
            <h2 className="text-2xl font-bold">Loading orders...</h2>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-[35px] bg-white p-10 text-center shadow-xl">
            <h2 className="text-2xl font-bold">No orders yet</h2>
            <p className="mt-3 text-[#6c5a50]">
              Orders will appear here after successful Stripe payment.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-[35px] bg-white p-6 shadow-xl md:p-8"
              >
                <div className="flex flex-col gap-5 border-b border-[#ead8c5] pb-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="break-all text-lg font-bold text-[#8b3a4a] md:text-2xl">
                      {order.stripeSessionId}
                    </h2>
                    <p className="mt-1 text-sm text-[#6c5a50]">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="rounded-full border border-[#8b3a4a] bg-white px-5 py-3 text-sm font-semibold capitalize text-[#8b3a4a]"
                    >
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="rounded-full bg-red-100 px-5 py-3 text-sm font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-bold">Customer</h3>

                    <p className="mt-3 text-[#6c5a50]">
                      {order.customerName || "Stripe Customer"}
                    </p>

                    <p className="text-[#6c5a50]">
                      {order.customerEmail || "No email saved"}
                    </p>

                    <p className="mt-4 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold capitalize text-green-700 w-fit">
                      {order.status}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">Items</h3>

                    <div className="mt-3 space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={`${item.productId}-${index}`}
                          className="flex justify-between gap-4 text-sm text-[#6c5a50]"
                        >
                          <span>
                            {item.name} × {item.quantity || 1}
                          </span>

                          <span>
                            AED {item.price * (item.quantity || 1)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex justify-between border-t border-[#ead8c5] pt-4 text-xl font-bold">
                      <span>Total</span>
                      <span className="text-[#8b3a4a]">
                        AED {order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}