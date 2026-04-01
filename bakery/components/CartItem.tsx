'use client';

import Image from 'next/image';
import { formatCurrency } from '@/lib/products';
import { type CartItem as CartItemType, useCart } from '@/context/CartContext';

export default function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQty } = useCart();

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-brown/10 bg-white/70 p-4 shadow-soft sm:flex-row sm:items-center sm:p-5">
      <div className="relative h-28 w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-cream to-antique sm:w-32">
        <Image src={item.image} alt={item.name} fill className="object-cover p-4" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-2xl text-brown">{item.name}</p>
            <p className="text-sm text-brown/70">{formatCurrency(item.price)} each</p>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">{formatCurrency(item.price * item.quantity)}</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-brown/10 bg-cream/70 p-1">
            <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} className="h-9 w-9 rounded-full text-lg text-brown">
              -
            </button>
            <span className="min-w-10 text-center text-sm font-semibold text-brown">{item.quantity}</span>
            <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} className="h-9 w-9 rounded-full text-lg text-brown">
              +
            </button>
          </div>
          <button type="button" onClick={() => removeItem(item.id)} className="text-sm font-semibold text-rose">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
