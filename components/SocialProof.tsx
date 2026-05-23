export default function SocialProof() {
  return (
    <section className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
            Loved by Customers
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#1f1512] md:text-5xl">
            Real Results. Real Confidence.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[#6c5a50]">
            Thousands of women trust Emnet Hair for luxury quality,
            softness, volume, and long-lasting beauty.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
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
            <div
              key={index}
              className="rounded-[35px] bg-white p-8 shadow-xl"
            >
              <div className="text-xl text-[#c79b3b]">★★★★★</div>

              <p className="mt-5 leading-8 text-[#5f5147]">
                {item.review}
              </p>

              <div className="mt-6">
                <p className="font-bold text-[#8b3a4a]">
                  {item.name}
                </p>

                <p className="text-sm text-[#8b7b70]">
                  Verified Customer
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}