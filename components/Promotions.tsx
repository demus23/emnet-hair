export default function Promotions() {
  return (
    <section className="px-6 py-10 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        <div className="rounded-[35px] bg-[#1f1512] p-10 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-[#c79b3b]">
            Limited Offer
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Bundle & Save
          </h2>

          <p className="mt-5 leading-8 text-white/70">
            Buy multiple bundles and save more on your full luxury
            hairstyle.
          </p>

          <button className="mt-7 rounded-full bg-[#c79b3b] px-6 py-3 font-bold">
            Shop Bundles
          </button>
        </div>

        <div className="rounded-[35px] bg-[#8b3a4a] p-10 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-[#f7d59c]">
            Seasonal Sale
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Holiday Glow
          </h2>

          <p className="mt-5 leading-8 text-white/80">
            Exclusive offers for weddings, holidays, birthdays, and
            beauty events.
          </p>

          <button className="mt-7 rounded-full bg-white px-6 py-3 font-bold text-[#8b3a4a]">
            Explore Deals
          </button>
        </div>

        <div className="rounded-[35px] bg-white p-10 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-[#c79b3b]">
            Coming Soon
          </p>

          <h2 className="mt-4 text-3xl font-bold text-[#1f1512]">
            Loyalty Rewards
          </h2>

          <p className="mt-5 leading-8 text-[#5f5147]">
            Earn points every time you shop and unlock exclusive
            Emnet Hair rewards.
          </p>

          <button className="mt-7 rounded-full border border-[#e7ddd1] px-6 py-3 font-bold">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}