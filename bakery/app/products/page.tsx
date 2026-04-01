import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sage">Our bakery shelf</p>
        <h1 className="mt-3 text-5xl text-brown">Rustic bakes for gifting, tea time, and everyday comfort</h1>
        <p className="mt-5 text-lg leading-8 text-brown/70">
          Choose from our signature buttery nastar pastries and soft vanilla sponge cake, both baked to bring countryside warmth to your table.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
