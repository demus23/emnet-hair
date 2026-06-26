export default function BrandStory() {
  return (
    <section className="bg-white px-6 py-28 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
            Our Story
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#1C1410] md:text-5xl">
            Who is Emnet Hair?
          </h2>

          <p className="mt-7 max-w-md text-[17px] leading-8 text-[#5E5248]">
            Emnet Hair is a premium human hair brand created for women
            who want authentic quality, luxury beauty, and confidence in
            every hairstyle.
          </p>

          <p className="mt-5 max-w-md text-[17px] leading-8 text-[#5E5248]">
            We focus on carefully selected virgin human hair, premium
            textures, custom colors, wigs, ponytails, and extensions
            designed to feel soft, natural, and long-lasting.
          </p>
        </div>

        <div className="border border-[#E3D9C9] p-10">
          <h3 className="font-serif text-2xl text-[#5C2A2E]">
            The Emnet Difference
          </h3>

          <div className="mt-8 space-y-5">
            {[
              "100% authentic virgin human hair",
              "Full from top to bottom with true-to-length quality",
              "Minimal shedding and no tangling",
              "Custom colors and personalized styling",
              "Ethically sourced premium hair selection",
              "Luxury textures for every woman",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-[3px] w-[3px] shrink-0 bg-[#A8895F]" />
                <p className="text-[15px] leading-7 text-[#5E5248]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}