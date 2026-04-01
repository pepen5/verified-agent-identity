import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function HomePage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-brown/10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(196,147,122,0.45),transparent_35%),linear-gradient(120deg,rgba(139,94,60,0.9),rgba(122,140,110,0.6))]" />
        <Image
          src="/bakery-hero.svg"
          alt="Warm country house bakery interior"
          fill
          priority
          className="-z-30 object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(53,33,21,0.72),rgba(53,33,21,0.4),rgba(53,33,21,0.55))]" />
        <div className="mx-auto grid min-h-[72vh] max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl text-antique">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-cream/80">Country House Bakery</p>
            <h1 className="text-balance text-5xl leading-tight sm:text-6xl lg:text-7xl">
              Baked with love, straight from the countryside
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-cream/85">
              Rustic pastries, tender cakes, and comforting treats made in small batches with farm-fresh ingredients and old family recipes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="rounded-full bg-cream px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-brown transition hover:bg-white">
                Shop Now
              </Link>
              <Link href="#about" className="rounded-full border border-cream/40 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-cream transition hover:bg-white/10">
                Our Story
              </Link>
            </div>
          </div>
          <div className="rounded-[36px] border border-cream/20 bg-white/10 p-6 shadow-rustic backdrop-blur">
            <div className="rounded-[28px] bg-antique/90 p-8 text-brown shadow-soft">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-sage">Fresh from today&apos;s oven</p>
              <div className="mt-6 space-y-5">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-4 rounded-[22px] bg-cream/70 px-5 py-4">
                    <div>
                      <p className="font-display text-2xl">{product.name}</p>
                      <p className="text-sm text-brown/70">{product.shortDescription}</p>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-brown px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cream">
                      {product.unitLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-sage">Featured products</p>
            <h2 className="mt-3 text-4xl text-brown sm:text-5xl">Beloved treats from our family table</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-brown/70">
            Every bake is crafted to feel like it came from a cozy countryside kitchen, wrapped with care and ready to share.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="about" className="border-y border-brown/10 bg-cream/70 texture-wood">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div className="rounded-[32px] bg-white/70 p-8 shadow-rustic">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose">About us</p>
            <h2 className="mt-4 text-4xl text-brown">A warm kitchen, a wooden table, and recipes passed down with care</h2>
          </div>
          <div className="space-y-5 rounded-[32px] bg-antique/80 p-8 shadow-soft">
            <p className="text-lg leading-8 text-brown/80">
              Rumah Roti began as a small family kitchen in the hills, where every loaf cooled on old pine shelves and every pastry was packed by hand.
            </p>
            <p className="text-lg leading-8 text-brown/80">
              We still bake in small batches, using butter, fresh eggs, and slow-made fillings to bring you the same country-house comfort that shaped our first table.
            </p>
            <p className="font-display text-2xl text-sage">Come by for morning coffee, order for a gathering, or send a box of sweetness to someone you love.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
