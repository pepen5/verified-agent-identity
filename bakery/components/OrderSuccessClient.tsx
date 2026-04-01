'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/products';

type OrderData = {
  id: string;
  items: Array<{ id?: string; name: string; quantity: number; price: number }>;
  total: number;
};

export default function OrderSuccessClient({ orderId }: { orderId?: string }) {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    window.localStorage.removeItem('bakery-cart');
    const stored = window.localStorage.getItem('bakery-last-order');
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const resolvedOrderId = orderId || order?.id || `RR-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-brown/10 bg-white/70 p-8 text-center shadow-rustic sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sage">Order received</p>
        <h1 className="mt-4 text-5xl text-brown">Thank you for your order</h1>
        <p className="mt-5 text-lg leading-8 text-brown/70">
          Your bakery treats are being prepared with care. We&apos;ll send updates as your order moves from oven to doorstep.
        </p>
        <div className="mt-8 inline-flex rounded-full bg-cream px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brown">
          Order #{resolvedOrderId}
        </div>
        {order && (
          <div className="mx-auto mt-10 max-w-2xl rounded-[28px] bg-antique/80 p-6 text-left shadow-soft">
            <p className="font-display text-2xl text-brown">Order summary</p>
            <div className="mt-5 space-y-3 text-sm text-brown/80">
              {order.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatCurrency(item.quantity * item.price)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-brown/10 pt-4 font-display text-2xl text-brown">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        )}
        <Link href="/products" className="mt-10 inline-flex rounded-full bg-brown px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-cream transition hover:bg-sage">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
