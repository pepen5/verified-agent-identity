'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setMessage(result.message || 'Unable to log in.');
      return;
    }
    router.push('/account/dashboard');
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-brown/10 bg-white/70 p-8 shadow-rustic sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sage">Customer account</p>
        <h1 className="mt-3 text-5xl text-brown">Welcome back</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="flex flex-col gap-2 text-sm font-semibold text-brown">
            Email
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-[18px] border border-brown/10 bg-antique px-4 py-3" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-brown">
            Password
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-[18px] border border-brown/10 bg-antique px-4 py-3" />
          </label>
          {message && <p className="rounded-[18px] bg-rose/15 px-4 py-3 text-sm text-brown">{message}</p>}
          <button type="submit" className="w-full rounded-full bg-brown px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-cream">
            Log In
          </button>
        </form>
        <p className="mt-6 text-sm text-brown/70">
          New here? <Link href="/account/register" className="font-bold text-sage">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
