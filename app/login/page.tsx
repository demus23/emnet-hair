"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) router.push("/");
    else alert("Invalid login");
  }

  return (
    <main className="min-h-screen bg-[#f7f1ed] px-6 py-20 text-slate-950">
      <form
        onSubmit={handleLogin}
        className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl border border-neutral-200"
      >
        <h1 className="mb-2 text-3xl font-bold text-slate-950">
          Login
        </h1>

        <p className="mb-8 text-sm text-slate-600">
          Access your Emnet Hair customer account.
        </p>

        <input
          type="email"
          placeholder="Email address"
          className="mb-4 w-full rounded-xl border border-neutral-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl border border-neutral-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-black p-3 font-semibold text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}