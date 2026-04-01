'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatCurrency, type Product } from '@/lib/products';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/products" className="text-sm font-bold uppercase tracking-[0.24em] text-sage">
        ← Back to products
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div className={`relative min-h-[460px] overflow-hidden rounded-[36px] bg-gradient-to-br ${product.accent} shadow-rustic`}>
          <div className="absolute inset-0 bg-linen bg-[length:18px_18px] opacity-45" />
          <Image src={product.image} alt={product.name} fill className="object-cover p-10" />
        </div>
        <div className="rounded-[36px] border border-brown/10 bg-white/70 p-8 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose">Freshly baked signature</p>
          <h1 className="mt-4 text-5xl text-brown">{product.name}</h1>
          <p className="mt-6 text-lg leading-8 text-brown/75">{product.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-cream px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brown">
              {formatCurrency(product.price)} / {product.unitLabel}
            </span>
            <span className="rounded-full bg-sage/15 px-5 py-3 text-sm font-semibold text-sage">Farm kitchen favorite</span>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-brown/10 bg-antique p-1">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-11 w-11 rounded-full text-lg font-bold">
                -
              </button>
              <span className="min-w-12 text-center text-base font-bold">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)} className="h-11 w-11 rounded-full text-lg font-bold">
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => addItem(product, quantity)}
              className="rounded-full bg-brown px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-cream transition hover:bg-sage"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
