import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Review from "@/models/Review";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session?.user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  await connectDB();

  const orders = await Order.find();
  const products = await Product.find();
  const pendingReviews = await Review.countDocuments({ approved: false });

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const customers = new Set(
    orders.map((order) => order.customerEmail).filter(Boolean)
  );

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= 5
  ).length;

  const outOfStock = products.filter((product) => product.stock <= 0).length;

  const stats = [
    ["Revenue", `AED ${totalRevenue}`],
    ["Orders", orders.length],
    ["Customers", customers.size],
    ["Products", products.length],
    ["Pending Reviews", pendingReviews],
    ["Low Stock", lowStock],
    ["Out of Stock", outOfStock],
  ];

  return (
    <main className="min-h-screen bg-[#f7f1ed] px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-black p-8 text-white shadow-xl">
          <p className="text-sm text-white/70">Emnet Hair Admin</p>
          <h1 className="mt-2 text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-white/70">{user.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {stats.map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <h2 className="mt-2 text-2xl font-bold text-[#8b3a4a]">
                {value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Link
            href="/admin/products"
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">Manage</p>
            <h2 className="mt-2 text-2xl font-bold">Products</h2>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">Manage</p>
            <h2 className="mt-2 text-2xl font-bold">Orders</h2>
          </Link>

          <Link
            href="/admin/reviews"
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">Approve</p>
            <h2 className="mt-2 text-2xl font-bold">Reviews</h2>
          </Link>

          <Link
            href="/admin/customers"
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">View</p>
            <h2 className="mt-2 text-2xl font-bold">Customers</h2>
          </Link>
        </div>
      </section>
    </main>
  );
}