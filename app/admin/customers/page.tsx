import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Link from "next/link";

type CustomerSummary = {
  email: string;
  name: string;
  phone: string;
  city: string;
  country: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: Date;
};

export default async function AdminCustomersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session?.user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  await connectDB();

  const orders = await Order.find().sort({ createdAt: -1 });

  const customerMap = new Map<string, CustomerSummary>();

  for (const order of orders) {
    const email = order.customerEmail || order.userEmail;
    if (!email) continue;

    const existing = customerMap.get(email);

    if (!existing) {
      customerMap.set(email, {
        email,
        name: order.customerName || order.shipping?.fullName || "—",
        phone: order.shipping?.phone || "—",
        city: order.shipping?.city || "—",
        country: order.shipping?.country || "—",
        orderCount: 1,
        totalSpent: order.totalAmount || 0,
        lastOrderDate: order.createdAt,
      });
    } else {
      existing.orderCount += 1;
      existing.totalSpent += order.totalAmount || 0;
      // orders are sorted newest-first, so the first one seen per
      // email is already the most recent — only fill in name/shipping
      // if it was missing on that most-recent order
      if (existing.name === "—") {
        existing.name = order.customerName || order.shipping?.fullName || "—";
      }
      if (existing.phone === "—") {
        existing.phone = order.shipping?.phone || "—";
      }
      if (existing.city === "—") {
        existing.city = order.shipping?.city || "—";
      }
      if (existing.country === "—") {
        existing.country = order.shipping?.country || "—";
      }
    }
  }

  const customers = Array.from(customerMap.values()).sort(
    (a, b) => b.totalSpent - a.totalSpent
  );

  return (
    <main className="min-h-screen bg-[#f7f1ed] px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-black p-8 text-white shadow-xl">
          <div>
            <Link href="/admin" className="text-sm text-white/60 hover:text-white">
              ← Back to dashboard
            </Link>
            <h1 className="mt-2 text-3xl font-bold">Customers</h1>
            <p className="mt-2 text-white/70">
              {customers.length} unique customer
              {customers.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {customers.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">
              No customers yet
            </h2>
            <p className="mt-2 text-slate-500">
              Customers appear here automatically once orders come in.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="border-b bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                      Location
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                      Orders
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                      Total Spent
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                      Last Order
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.email}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          {customer.name}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">
                          {customer.email}
                        </p>
                        <p className="text-sm text-slate-500">
                          {customer.phone}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {customer.city !== "—" || customer.country !== "—"
                          ? `${customer.city}, ${customer.country}`
                          : "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                          {customer.orderCount}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-bold text-[#8b3a4a]">
                          AED {customer.totalSpent.toLocaleString()}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(customer.lastOrderDate).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}