'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { SHIPPING_FEE, formatCurrency } from '@/lib/products';

type PaymentMethod = 'midtrans' | 'stripe';

type FormState = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  postalCode: '',
};

export default function CheckoutForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('midtrans');
  const [form, setForm] = useState<FormState>({ ...initialState, name: user?.name || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const total = useMemo(() => totalPrice + SHIPPING_FEE, [totalPrice]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) {
      setMessage('Your basket is empty. Add a few bakery treats before checkout.');
      return;
    }

    const orderId = `RR-${Date.now()}`;
    const orderPayload = {
      id: orderId,
      items,
      customer: form,
      subtotal: totalPrice,
      shipping: SHIPPING_FEE,
      total,
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem('bakery-last-order', JSON.stringify(orderPayload));
    setLoading(true);
    setMessage(null);

    try {
      if (paymentMethod === 'midtrans') {
        const response = await fetch('/api/payment/midtrans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            amount: total,
            customerDetails: {
              name: form.name,
              email: form.email,
              phone: form.phone,
            },
            items: [
              ...items.map((item) => ({ slug: item.slug, name: item.name, price: item.price, quantity: item.quantity })),
              { slug: 'shipping', name: 'Flat Shipping', price: SHIPPING_FEE, quantity: 1 },
            ],
          }),
        });
        const data = await response.json();
        if (!response.ok || !data.token) {
          throw new Error(data.error || 'Unable to start Midtrans payment.');
        }
        if (!window.snap) {
          throw new Error('Midtrans Snap script is not available.');
        }
        window.snap.pay(data.token, {
          onSuccess: () => {
            clearCart();
            router.push(`/order-success?id=${orderId}`);
          },
          onPending: () => setMessage('Payment is pending. Please complete it from your Midtrans window.'),
          onError: () => setMessage('Midtrans payment failed. Please try again.'),
          onClose: () => setMessage('Midtrans popup closed before payment completed.'),
        });
        return;
      }

      const response = await fetch('/api/payment/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            ...items.map((item) => ({ name: item.name, price: item.price, quantity: item.quantity })),
            { name: 'Flat Shipping', price: SHIPPING_FEE, quantity: 1 },
          ],
          customerEmail: form.email,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Unable to create Stripe Checkout session.');
      }
      window.location.href = data.url;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Checkout failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8 rounded-[32px] border border-brown/10 bg-white/70 p-6 shadow-rustic sm:p-8">
        <div>
          <p className="font-display text-3xl text-brown">Shipping details</p>
          <p className="mt-2 text-sm leading-7 text-brown/70">Tell us where to send your fresh bakes and how to reach you on delivery day.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ['name', 'Full name', 'text'],
            ['email', 'Email', 'email'],
            ['phone', 'Phone', 'tel'],
            ['city', 'City', 'text'],
            ['street', 'Street address', 'text'],
            ['postalCode', 'Postal code', 'text'],
          ].map(([key, label, type]) => (
            <label key={key} className={`flex flex-col gap-2 text-sm font-semibold text-brown ${key === 'street' ? 'sm:col-span-2' : ''}`}>
              {label}
              <input
                required
                type={type}
                value={form[key as keyof FormState]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                className="rounded-[18px] border border-brown/10 bg-antique px-4 py-3 text-sm font-normal text-brown outline-none transition focus:border-sage"
              />
            </label>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-display text-3xl text-brown">Payment method</p>
            <p className="mt-2 text-sm leading-7 text-brown/70">Choose local Indonesian payment methods with Midtrans or international cards with Stripe.</p>
          </div>
          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
        </div>
        {message && <p className="rounded-[18px] bg-rose/15 px-4 py-3 text-sm text-brown">{message}</p>}
      </div>
      <aside className="h-fit rounded-[32px] border border-brown/10 bg-cream/80 p-6 shadow-soft sm:p-8">
        <p className="font-display text-3xl text-brown">Order summary</p>
        <div className="mt-6 space-y-4 border-b border-brown/10 pb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 text-sm text-brown/80">
              <div>
                <p className="font-semibold text-brown">{item.name}</p>
                <p>{item.quantity} × {formatCurrency(item.price)}</p>
              </div>
              <p>{formatCurrency(item.quantity * item.price)}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-sm text-brown/80">
          <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatCurrency(totalPrice)}</span></div>
          <div className="flex items-center justify-between"><span>Shipping</span><span>{formatCurrency(SHIPPING_FEE)}</span></div>
          <div className="flex items-center justify-between font-display text-2xl text-brown"><span>Total</span><span>{formatCurrency(total)}</span></div>
        </div>
        <button
          type="submit"
          disabled={loading || !items.length}
          className="mt-8 w-full rounded-full bg-brown px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-sage disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Preparing payment...' : 'Place Order'}
        </button>
      </aside>
    </form>
  );
}
