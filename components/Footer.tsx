import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#1f1512] px-6 py-16 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[35px] bg-white/10 p-10 text-center">
          <h2 className="text-4xl font-bold">Join Emnet Hair</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Get exclusive offers, hair care tips, and early access to new collections.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-6 py-4 text-black outline-none"
            />
            <button className="rounded-full bg-[#c79b3b] px-8 py-4 font-bold text-white">
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-3xl font-bold text-[#c79b3b]">Emnet Hair</h3>
            <p className="mt-5 leading-8 text-white/60">
              Luxury authentic human hair, wigs, ponytails, extensions, and premium hair care.
            </p>
            <p className="mt-5 text-white/70">WhatsApp: +971 XX XXX XXXX</p>
            <p className="text-white/70">Email: hello@emnethair.com</p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider">Shop</h4>
            <div className="mt-5 space-y-3 text-white/60">
              <Link href="/shop" className="block">Human Hair</Link>
              <Link href="/shop" className="block">Wigs</Link>
              <Link href="/shop" className="block">Ponytails</Link>
              <Link href="/shop" className="block">Clip-ins</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider">Help</h4>
            <div className="mt-5 space-y-3 text-white/60">
              <Link href="/about" className="block">About</Link>
              <Link href="/contact" className="block">Contact</Link>
              <Link href="/shipping" className="block">Shipping</Link>
              <Link href="/returns" className="block">Returns</Link>
              <Link href="/privacy" className="block">Privacy Policy</Link>
              <Link href="/terms" className="block">Terms</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider">Follow Us</h4>
            <div className="mt-5 space-y-3 text-white/60">
              <p>Instagram: @emnethair</p>
              <p>TikTok: @emnethair</p>
              <p>Facebook: Emnet Hair</p>
              <p>WhatsApp Orders Available</p>
            </div>

            <p className="mt-8 text-sm text-[#c79b3b]">
              Visa · Mastercard · PayPal · Apple Pay
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          © 2026 Emnet Hair. All rights reserved.
        </div>
      </div>
    </footer>
  );
}