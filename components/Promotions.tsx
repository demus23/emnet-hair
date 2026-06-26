import Link from "next/link";

export default function Promotions() {
  return (
    <section className="bg-[#F7F3ED] px-6 py-10 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        <div className="border border-[#1C1410] bg-[#1C1410] p-10 text-white">
          <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#A8895F]">
            Limited Offer
          </p>

          <h2 className="mt-5 font-serif text-3xl">Bundle &amp; save</h2>

          <p className="mt-5 text-[15px] leading-7 text-white/65">
            Buy multiple bundles and save more on your full luxury
            hairstyle.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block border border-[#A8895F] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.15em] text-[#A8895F] transition hover:bg-[#A8895F] hover:text-[#1C1410]"
          >
            Shop bundles
          </Link>
        </div>

        <div className="border border-[#5C2A2E] bg-[#5C2A2E] p-10 text-white">
          <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-white/70">
            Seasonal Sale
          </p>

          <h2 className="mt-5 font-serif text-3xl">Holiday glow</h2>

          <p className="mt-5 text-[15px] leading-7 text-white/75">
            Exclusive offers for weddings, holidays, birthdays, and
            beauty events.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block border border-white px-6 py-3 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-[#5C2A2E]"
          >
            Explore deals
          </Link>
        </div>

        <div className="border border-[#E3D9C9] bg-white p-10">
          <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#A8895F]">
            Coming Soon
          </p>

          <h2 className="mt-5 font-serif text-3xl text-[#1C1410]">
            Loyalty rewards
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-[#5E5248]">
            Earn points every time you shop and unlock exclusive
            Emnet Hair rewards.
          </p>

          <Link
            href="/loyalty"
            className="mt-8 inline-block border border-[#1C1410] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.15em] text-[#1C1410] transition hover:bg-[#1C1410] hover:text-white"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}