"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoyaltyPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to actual mailing list / API endpoint
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#F7F3ED] text-[#1C1410]">
      <Navbar />

      <section className="px-6 py-28 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
            Coming Soon
          </p>

          <h1 className="mt-6 font-serif text-5xl leading-tight text-[#1C1410] md:text-6xl">
            Emnet Hair <span className="italic text-[#5C2A2E]">Rewards</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-8 text-[#5E5248]">
            We're building a loyalty program that rewards you every time
            you shop — exclusive discounts, early access to new
            collections, and birthday surprises. Be the first to know
            when it launches.
          </p>

          <div className="mt-12 border border-[#E3D9C9] bg-white p-10">
            {submitted ? (
              <p className="font-serif text-xl text-[#5C2A2E]">
                Thank you — we'll let you know the moment it's live.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border border-[#E3D9C9] bg-white px-6 py-4 text-[15px] text-[#1C1410] outline-none placeholder:text-[#9C8E7C] focus:border-[#A8895F]"
                />
                <button
                  type="submit"
                  className="border border-[#1C1410] bg-[#1C1410] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-transparent hover:text-[#1C1410]"
                >
                  Notify me
                </button>
              </form>
            )}
          </div>

          <Link
            href="/shop"
            className="mt-10 inline-block text-[13px] font-medium uppercase tracking-[0.2em] text-[#1C1410] underline decoration-[#A8895F] decoration-1 underline-offset-8"
          >
            Continue shopping
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}