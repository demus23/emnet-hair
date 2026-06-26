"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-[#F7F3ED] px-6 pb-24 pt-16 md:px-12 md:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
            Luxury Human Hair — Dubai
          </p>

          <h1 className="mt-7 font-serif text-[3.25rem] leading-[1.05] tracking-tight text-[#1C1410] md:text-[4.5rem]">
            Hair, restored
            <br />
            to its truest
            <br />
            <span className="italic text-[#5C2A2E]">self.</span>
          </h1>

          <p className="mt-7 max-w-md text-[17px] leading-8 text-[#5E5248]">
            Ethically sourced virgin human hair, selected by hand and
            finished with quiet precision — for women who notice the
            difference.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              href="/shop"
              className="border border-[#1C1410] bg-[#1C1410] px-9 py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-[#F7F3ED] transition hover:bg-transparent hover:text-[#1C1410]"
            >
              Shop the collection
            </Link>

            <Link
              href="/shop"
              className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#1C1410] underline decoration-[#A8895F] decoration-1 underline-offset-8"
            >
              Explore wigs
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        >
          <div className="aspect-[4/5] w-full overflow-hidden bg-[#E3D9C9]">
            <img
              src="/hero-hair.jpg"
              alt="Emnet Hair"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden border border-[#E3D9C9] bg-[#F7F3ED] px-7 py-5 md:block">
            <p className="font-serif text-2xl text-[#1C1410]">100%</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#5E5248]">
              Virgin human hair
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}