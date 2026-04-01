'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/lib/products';

type OrderRow = {
  id: string;
  total: number;
  createdAt: string;
  items: Array<{ name: string; quantity: number }>;
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [lastOrder, setLastOrder] = useState<OrderRow | null>(null);

  useEffect(() => {
    if (!user) {
      router.replace('/account/login');
      return;
    }
    const stored = window.localStorage.getItem('bakery-last-order');
    if (stored) {
      try {
        setLastOrder(JSON.parse(stored));
      } catch {}
    }
  }, [router, user]);

  const orders = useMemo<OrderRow[]>(() => {
    if (lastOrder) return [lastOrder];
    return [
      {
        id: 'RR-102938',
        total: 205000,
        createdAt: '2026-03-20T09:00:00.000Z',
        items: [{ name: 'Nastar Bread', quantity: 1 }, { name: 'Sponge Cake', quantity: 1 }],
      },
    ];
  }, [lastOrder]);

  if (!user) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-sage">Dashboard</p>
          <h1 className="mt-3 text-5xl text-brown">Good to see you, {user.name}</h1>
          <p className="mt-4 text-lg text-brown/70">Track your recent bakery orders and manage your mock customer account.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push('/');
          }}
          className="rounded-full border border-brown/15 bg-antique px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brown"
        >
          Log Out
        </button>
      </div>
      <div className="mt-10 overflow-hidden rounded-[32px] border border-brown/10 bg-white/70 shadow-rustic">
        <table className="min-w-full divide-y divide-brown/10 text-left">
          <thead className="bg-cream/70">
            <tr className="text-sm font-bold uppercase tracking-[0.2em] text-brown/70">
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brown/10 text-sm text-brown/80">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-5 font-semibold text-brown">#{order.id}</td>
                <td className="px-6 py-5">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td className="px-6 py-5">{order.items.map((item) => `${item.name} × ${item.quantity}`).join(', ')}</td>
                <td className="px-6 py-5">{formatCurrency(order.total)}</td>
                <td className="px-6 py-5"><span className="rounded-full bg-sage/15 px-3 py-1 font-semibold text-sage">Preparing</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
