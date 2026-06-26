"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) router.push("/login");
    else alert("Signup failed");
  }

  return (
    <main className="min-h-screen bg-[#f7f1ed] px-6 py-20 text-slate-950">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl border border-neutral-200"
      >
        <h1 className="mb-2 text-3xl font-bold text-slate-950">
          Create Account
        </h1>

        <p className="mb-8 text-sm text-slate-600">
          Join Emnet Hair and manage your orders.
        </p>

        <input
          type="text"
          placeholder="Full name"
          className="mb-4 w-full rounded-xl border border-neutral-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email address"
          className="mb-4 w-full rounded-xl border border-neutral-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl border border-neutral-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black p-3 font-semibold text-white"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}