export default function Education() {
  return (
    <section className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
            Hair Education
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Learn Before You Buy
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "How many bundles do I need?",
              text:
                "Understand how many bundles are needed for each hairstyle and length.",
            },
            {
              title: "Beginner Hair Guide",
              text:
                "New to human hair? Learn textures, lengths, density, and maintenance.",
            },
            {
              title: "Hair Care Tips",
              text:
                "Keep your curls, waves, and wigs soft and long-lasting with proper care.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[35px] bg-white p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-[#8b3a4a]">
                {item.title}
              </h3>

              <p className="mt-5 leading-8 text-[#5f5147]">
                {item.text}
              </p>

              <button className="mt-7 font-bold text-[#c79b3b]">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}