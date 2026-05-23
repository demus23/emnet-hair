import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f4ee] px-6 pb-24 pt-10 md:px-12">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-[#c79b3b]/20 blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-120px] h-[350px] w-[350px] rounded-full bg-[#8b3a4a]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        
        {/* LEFT */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#c79b3b]">
            Luxury Human Hair
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-[#1f1512] md:text-7xl">
            Authentic Hair
            <span className="block text-[#8b3a4a]">
              Designed For Confidence
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-[#5f5147]">
            Premium virgin human hair, luxury wigs, custom ponytails,
            clip-ins, and textured curls crafted for women who love
            elegance, softness, and timeless beauty.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
  href="/shop"
  className="rounded-full bg-gradient-to-r from-[#b98524] to-[#d6af55] px-10 py-5 text-center font-bold text-white shadow-xl transition hover:scale-[1.02]"
>
  Shop Collection
</Link>

<Link
  href="/shop"
  className="rounded-full border border-[#d8cabb] bg-white px-10 py-5 text-center font-bold text-[#1f1512] transition hover:border-[#c79b3b]"
>
  Explore Wigs
</Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-3xl font-bold text-[#1f1512]">
                10K+
              </h3>

              <p className="mt-2 text-sm text-[#8b7b70]">
                Happy Customers
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#1f1512]">
                100%
              </h3>

              <p className="mt-2 text-sm text-[#8b7b70]">
                Virgin Human Hair
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#1f1512]">
                18M
              </h3>

              <p className="mt-2 text-sm text-[#8b7b70]">
                Long Lasting Quality
              </p>
            </div>
          </div>

          {/* Trust */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Ethically Sourced",
              "Luxury Quality",
              "Custom Colors",
              "Worldwide Shipping",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-[#e7ddd1] bg-white px-5 py-3 text-sm font-semibold text-[#5f5147]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="overflow-hidden rounded-[45px] bg-white shadow-2xl">
            <img
              src="/hero-hair.jpg"
              alt="Emnet Hair"
              className="h-[780px] w-full object-cover"
            />
          </div>

          {/* Floating card */}
          <div className="absolute bottom-8 left-8 rounded-[30px] bg-white/90 p-6 shadow-xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-[#c79b3b]">
              Bestseller
            </p>

            <h3 className="mt-2 text-2xl font-bold text-[#1f1512]">
              Deep Curly Collection
            </h3>

            <p className="mt-2 text-[#5f5147]">
              Soft · Full · Natural
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}