export default function BrandStory() {
  return (
    <section className="bg-[#fffaf3] px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
            Our Story
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#1f1512] md:text-5xl">
            Who is Emnet Hair?
          </h2>

          <p className="mt-6 leading-8 text-[#6c5a50]">
            Emnet Hair is a premium human hair brand created for women
            who want authentic quality, luxury beauty, and confidence in
            every hairstyle.
          </p>

          <p className="mt-5 leading-8 text-[#6c5a50]">
            We focus on carefully selected virgin human hair, premium
            textures, custom colors, wigs, ponytails, and extensions
            designed to feel soft, natural, and long-lasting.
          </p>
        </div>

        <div className="rounded-[35px] bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-[#8b3a4a]">
            The Emnet Difference
          </h3>

          <div className="mt-6 space-y-5 text-[#5f5147]">
            <p>✓ 100% authentic virgin human hair</p>

            <p>
              ✓ Full from top to bottom with true-to-length quality
            </p>

            <p>✓ Minimal shedding and no tangling</p>

            <p>✓ Custom colors and personalized styling</p>

            <p>✓ Ethically sourced premium hair selection</p>

            <p>✓ Luxury textures for every woman</p>
          </div>
        </div>
      </div>
    </section>
  );
}