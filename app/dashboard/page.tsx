import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function CustomerDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as any;

  return (
    <main className="min-h-screen bg-[#f7f1ed] px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-black p-8 text-white shadow-xl">
          <p className="text-sm text-white/70">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold">
            {user.name || "Customer Dashboard"}
          </h1>
          <p className="mt-2 text-white/70">{user.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm border">
            <p className="text-sm text-slate-500">Orders</p>
            <h2 className="mt-2 text-3xl font-bold">0</h2>
            <p className="mt-2 text-sm text-slate-500">
              Your orders will appear here.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border">
            <p className="text-sm text-slate-500">Wishlist</p>
            <h2 className="mt-2 text-3xl font-bold">0</h2>
            <p className="mt-2 text-sm text-slate-500">
              Saved hair products and extensions.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border">
            <p className="text-sm text-slate-500">Reviews</p>
            <h2 className="mt-2 text-3xl font-bold">0</h2>
            <p className="mt-2 text-sm text-slate-500">
              Your product reviews.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <p className="mt-4 text-sm text-slate-500">
              No orders yet. After Stripe checkout, your paid orders will show here.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-bold">Account Details</h2>

            <div className="mt-4 space-y-3 text-sm">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {user.name || "Not set"}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span>{" "}
                {user.role || "customer"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}