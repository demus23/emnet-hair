export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
};

export const guides: Guide[] = [
  {
    slug: "how-many-bundles",
    title: "How many bundles do I need?",
    excerpt:
      "Understand how many bundles are needed for each hairstyle and length.",
    content: [
      "The number of bundles you need depends on the length and style you're going for. As a general rule, shorter styles (10–14 inches) typically need 2–3 bundles for a full, natural look, while longer styles (18 inches and up) often require 3–4 bundles to maintain volume from root to tip.",
      "If you're installing a sew-in or a wig, factor in the density you want — higher density (130%–180%) will need more hair than a natural 100% density look.",
      "When in doubt, it's always better to order one extra bundle than to run short mid-install. Our team can help you calculate the right amount for your specific style — just reach out via WhatsApp before you order.",
    ],
  },
  {
    slug: "beginner-hair-guide",
    title: "Beginner hair guide",
    excerpt:
      "New to human hair? Learn textures, lengths, density, and maintenance.",
    content: [
      "Welcome to the world of luxury human hair. Whether you're trying wigs, bundles, or clip-ins for the first time, understanding a few basics will make all the difference.",
      "Texture refers to the natural pattern of the hair — straight, wavy, curly, or kinky-curly. Choose a texture that blends seamlessly with your natural hair if you're doing a sew-in, or pick freely if you're wearing a full wig.",
      "Density describes how full the hair looks. 100% is natural, while 150%–180% gives a fuller, more voluminous look popular in editorial styling.",
      "Maintenance is simple with the right routine: gentle sulfate-free shampoo, regular deep conditioning, and air-drying or low-heat styling will keep your hair soft and long-lasting for years.",
    ],
  },
  {
    slug: "hair-care-tips",
    title: "Hair care tips",
    excerpt:
      "Keep your curls, waves, and wigs soft and long-lasting with proper care.",
    content: [
      "Proper care is what separates hair that lasts one season from hair that lasts for years. Start by washing with lukewarm water and a sulfate-free shampoo — hot water strips natural oils and shortens the lifespan of human hair.",
      "Detangle gently, always starting from the ends and working upward, using a wide-tooth comb or a soft bristle brush.",
      "Deep condition weekly, and use a silk or satin pillowcase to reduce friction while you sleep.",
      "For wigs and ponytails, store them on a stand or in a silk bag when not in use to maintain their shape and texture between wears.",
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}