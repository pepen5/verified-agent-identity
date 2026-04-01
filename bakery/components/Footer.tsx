import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-brown/10 bg-brown text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-3xl">Rumah Roti</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-cream/80">
            A family-run country house bakery serving warm pastries, buttery cookies, and soft celebration cakes from our rustic kitchen.
          </p>
        </div>
        <div>
          <p className="font-display text-xl">Visit</p>
          <p className="mt-3 text-sm text-cream/80">Jl. Kebun Mawar 17, Lembang, West Java</p>
          <p className="mt-2 text-sm text-cream/80">Mon - Sat · 07:00 - 18:00</p>
          <p className="mt-2 text-sm text-cream/80">Sun · 08:00 - 14:00</p>
        </div>
        <div>
          <p className="font-display text-xl">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-cream/80">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/#about">About Us</Link>
            <Link href="/account/login">Account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
