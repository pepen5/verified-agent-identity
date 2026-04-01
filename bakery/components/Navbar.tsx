'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/#about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-brown/10 bg-antique/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl font-semibold text-brown">
          🍞 Rumah Roti
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition hover:text-sage ${pathname === link.href ? 'text-brown' : 'text-brown/70'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/cart" className="relative rounded-full border border-brown/15 bg-cream px-4 py-2 text-sm font-semibold text-brown">
            Cart
            {totalItems > 0 && (
              <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-rose px-2 py-0.5 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href={user ? '/account/dashboard' : '/account/login'} className="rounded-full border border-brown/15 bg-white/70 px-4 py-2 text-sm font-semibold text-brown">
            {user ? 'Account' : 'Sign In'}
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-full border border-brown/15 px-3 py-2 text-sm font-semibold text-brown md:hidden"
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="border-t border-brown/10 bg-antique px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm font-semibold text-brown/80">
                {link.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)} className="text-sm font-semibold text-brown/80">
              Cart ({totalItems})
            </Link>
            <Link
              href={user ? '/account/dashboard' : '/account/login'}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-brown/80"
            >
              {user ? 'Account' : 'Sign In'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
