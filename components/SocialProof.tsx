"use client";

import { motion } from "framer-motion";

export default function SocialProof() {
  return (
    <section className="bg-[#F7F3ED] px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
            Loved by Customers
          </p>

          <h2 className="mt-5 font-serif text-4xl text-[#1C1410] md:text-5xl">
            Real results. Real confidence.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-8 text-[#5E5248]">
            Thousands of women trust Emnet Hair for luxury quality,
            softness, volume, and long-lasting beauty.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-[#E3D9C9] bg-[#E3D9C9] md:grid-cols-3">
          {[
            {
              review:
                "The curls are beautiful and the hair feels extremely soft.",
              name: "Sarah M.",
            },
            {
              review:
                "Very full bundles with minimal shedding. Worth every dirham.",
              name: "Liya K.",
            },
            {
              review:
                "The custom color matched perfectly and looked very natural.",
              name: "Hana T.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="font-serif text-lg italic text-[#A8895F]">
                &ldquo;
              </p>

              <p className="mt-2 text-[15px] leading-7 text-[#5E5248]">
                {item.review}
              </p>

              <div className="mt-8 border-t border-[#E3D9C9] pt-5">
                <p className="font-serif text-lg text-[#1C1410]">
                  {item.name}
                </p>

                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#9C8E7C]">
                  Verified Customer
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}