'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatCurrency, type Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="overflow-hidden rounded-[28px] border border-brown/10 bg-white/70 shadow-rustic transition hover:-translate-y-1">
      <Link href={`/products/${product.slug}`}>
        <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${product.accent}`}>
          <div className="absolute inset-0 bg-linen bg-[length:16px_16px] opacity-40" />
          <Image src={product.image} alt={product.name} fill className="object-cover p-6" />
        </div>
      </Link>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="font-display text-2xl text-brown">{product.name}</p>
          <p className="text-sm leading-7 text-brown/70">{product.shortDescription}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">{formatCurrency(product.price)}</p>
          <button
            type="button"
            onClick={() => addItem(product, 1)}
            className="rounded-full bg-brown px-4 py-2 text-sm font-semibold text-cream transition hover:bg-sage"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
