import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#1C1410] px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="border border-white/10 p-12 text-center">
          <h2 className="font-serif text-4xl">Join Emnet Hair</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-white/60">
            Get exclusive offers, hair care tips, and early access to
            new collections.
          </p>

          <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-white/15 bg-transparent px-6 py-4 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-[#A8895F]"
            />
            <button className="border border-[#A8895F] bg-[#A8895F] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-[#1C1410] transition hover:bg-transparent hover:text-[#A8895F]">
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="font-serif text-2xl text-[#A8895F]">
              Emnet Hair
            </h3>
            <p className="mt-5 text-[15px] leading-7 text-white/50">
              Luxury authentic human hair, wigs, ponytails, extensions,
              and premium hair care.
            </p>
            <p className="mt-5 text-[14px] text-white/60">
              WhatsApp:{" "}
              <a
                href="https://wa.me/971588211978"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                +971 58 821 1978
              </a>
            </p>
            <p className="text-[14px] text-white/60">
              Email:{" "}
              <a
                href="mailto:emnetshair@gmail.com"
                className="transition hover:text-white"
              >
                emnetshair@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/80">
              Shop
            </h4>
            <div className="mt-5 space-y-3 text-[14px] text-white/50">
              <Link href="/shop" className="block transition hover:text-white">
                Human Hair
              </Link>
              <Link href="/shop" className="block transition hover:text-white">
                Wigs
              </Link>
              <Link href="/shop" className="block transition hover:text-white">
                Ponytails
              </Link>
              <Link href="/shop" className="block transition hover:text-white">
                Clip-ins
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/80">
              Help
            </h4>
            <div className="mt-5 space-y-3 text-[14px] text-white/50">
              <Link href="/about" className="block transition hover:text-white">
                About
              </Link>
              <Link href="/contact" className="block transition hover:text-white">
                Contact
              </Link>
              <Link href="/shipping" className="block transition hover:text-white">
                Shipping
              </Link>
              <Link href="/returns" className="block transition hover:text-white">
                Returns
              </Link>
              <Link href="/privacy" className="block transition hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block transition hover:text-white">
                Terms
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/80">
              Follow Us
            </h4>
            <div className="mt-5 space-y-3 text-[14px] text-white/50">
              <a
                href="https://www.instagram.com/emnet_human_hair?igsh=MW1wZzkyemdtZzF2eQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@emnethair?_r=1&_t=ZS-97Wimjr0Xiv"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                TikTok
              </a>
              <p>Facebook: Emnet Hair</p>
              <a
                href="https://wa.me/971588211978"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                WhatsApp Orders
              </a>
            </div>

            <p className="mt-9 text-[12px] uppercase tracking-[0.15em] text-[#A8895F]">
              Visa · Mastercard · PayPal · Apple Pay
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-7 text-center text-[12px] text-white/35">
          © 2026 Emnet Hair. All rights reserved.
        </div>
      </div>
    </footer>
  );
}