"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    notes: string;
  };
  items: {
    id: number;
    name: string;
    price: number;
    quantity?: number;
  }[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("emnetOrders");
    setOrders(savedOrders ? JSON.parse(savedOrders) : []);
  }, []);
function updateOrderStatus(orderNumber: string, newStatus: string) {
  const updatedOrders = orders.map((order) =>
    order.orderNumber === orderNumber
      ? { ...order, status: newStatus }
      : order
  );

  setOrders(updatedOrders);
  localStorage.setItem("emnetOrders", JSON.stringify(updatedOrders));
}

function deleteOrder(orderNumber: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!confirmed) return;

  const updatedOrders = orders.filter(
    (order) => order.orderNumber !== orderNumber
  );

  setOrders(updatedOrders);
  localStorage.setItem("emnetOrders", JSON.stringify(updatedOrders));
}

  return (
    <main className="min-h-screen bg-[#fbf6ef] px-6 py-12 text-[#1f1512] md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#8b3a4a]">
              Admin Orders
            </h1>
            <p className="mt-2 text-[#6c5a50]">
              View customer orders from Emnet Hair checkout.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-[#8b3a4a] px-6 py-3 text-sm font-semibold text-[#8b3a4a]"
          >
            Back to Store
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[35px] bg-white p-10 text-center shadow-xl">
            <h2 className="text-2xl font-bold">No orders yet</h2>
            <p className="mt-3 text-[#6c5a50]">
              Orders will appear here after checkout.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="rounded-[35px] bg-white p-8 shadow-xl"
              >
                <div className="flex flex-col gap-4 border-b border-[#ead8c5] pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#8b3a4a]">
                      {order.orderNumber}
                    </h2>
                    <p className="mt-1 text-sm text-[#6c5a50]">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <select
  value={order.status}
  onChange={(e) =>
    updateOrderStatus(order.orderNumber, e.target.value)
  }
  className="rounded-full border border-[#8b3a4a] bg-white px-5 py-2 text-sm font-semibold text-[#8b3a4a]"
>
  <option>Pending Payment</option>
  <option>Paid</option>
  <option>Processing</option>
  <option>Shipped</option>
  <option>Delivered</option>
  <option>Cancelled</option>
</select>

<button
  onClick={() => deleteOrder(order.orderNumber)}
  className="rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-600"
>
  Delete
</button>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-bold">Customer</h3>
                    <p className="mt-2 text-[#6c5a50]">
                      {order.customer.fullName}
                    </p>
                    <p className="text-[#6c5a50]">{order.customer.email}</p>
                    <p className="text-[#6c5a50]">{order.customer.phone}</p>
                    <p className="text-[#6c5a50]">
                      {order.customer.address}, {order.customer.country}
                    </p>
                    {order.customer.notes && (
                      <p className="mt-2 text-sm text-[#8b3a4a]">
                        Notes: {order.customer.notes}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold">Items</h3>
                    <div className="mt-3 space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          className="flex justify-between text-sm text-[#6c5a50]"
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
                        AED {order.total}
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