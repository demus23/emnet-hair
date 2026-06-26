import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuideBySlug } from "@/data/education";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F3ED] text-[#1C1410]">
      <Navbar />

      <article className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#A8895F] underline decoration-1 underline-offset-4"
          >
            ← Back to home
          </Link>

          <p className="mt-10 text-[13px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
            Hair Education
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-tight text-[#1C1410] md:text-5xl">
            {guide.title}
          </h1>

          <div className="mt-10 space-y-6 border-t border-[#E3D9C9] pt-10">
            {guide.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-[17px] leading-8 text-[#5E5248]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 border border-[#E3D9C9] bg-white p-8">
            <p className="font-serif text-xl text-[#5C2A2E]">
              Still have questions?
            </p>
            <p className="mt-3 text-[15px] leading-7 text-[#5E5248]">
              Message us on WhatsApp and our team will help you choose
              the right length, texture, and quantity for your style.
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}