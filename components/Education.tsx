"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { guides } from "@/data/education";

export default function Education() {
  return (
    <section className="bg-white px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
            Hair Education
          </p>

          <h2 className="mt-5 font-serif text-4xl text-[#1C1410] md:text-5xl">
            Learn before you buy
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-[#E3D9C9] bg-[#E3D9C9] md:grid-cols-3">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.slug}
              className="bg-white p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="font-serif text-2xl text-[#1C1410]">
                {guide.title}
              </h3>

              <p className="mt-5 text-[15px] leading-7 text-[#5E5248]">
                {guide.excerpt}
              </p>

              <Link
                href={`/learn/${guide.slug}`}
                className="mt-8 inline-block text-[13px] font-medium uppercase tracking-[0.15em] text-[#A8895F] underline decoration-1 underline-offset-4 transition hover:text-[#5C2A2E]"
              >
                Read more
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}