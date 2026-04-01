'use client';

import Link from 'next/link';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { SHIPPING_FEE, formatCurrency } from '@/lib/products';

export default function CartPage() {
  const { items, totalPrice } = useCart();
  const total = totalPrice + (items.length ? SHIPPING_FEE : 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sage">Your basket</p>
        <h1 className="mt-3 text-5xl text-brown">Packed with countryside comfort</h1>
      </div>
      {!items.length ? (
        <div className="mt-10 rounded-[32px] border border-dashed border-brown/20 bg-white/60 p-10 text-center shadow-soft">
          <p className="font-display text-3xl text-brown">Your cart is empty</p>
          <p className="mt-3 text-sm leading-7 text-brown/70">Pick a few fresh bakes and we&apos;ll get them ready for checkout.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-brown px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-cream">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <aside className="h-fit rounded-[32px] border border-brown/10 bg-cream/80 p-8 shadow-rustic">
            <p className="font-display text-3xl text-brown">Order summary</p>
            <div className="mt-6 space-y-3 text-sm text-brown/80">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatCurrency(totalPrice)}</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>{formatCurrency(SHIPPING_FEE)}</span></div>
              <div className="flex items-center justify-between font-display text-2xl text-brown"><span>Total</span><span>{formatCurrency(total)}</span></div>
            </div>
            <Link href="/checkout" className="mt-8 inline-flex w-full justify-center rounded-full bg-brown px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-cream transition hover:bg-sage">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
