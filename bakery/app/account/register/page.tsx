'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    const result = register({ name: form.name, email: form.email, password: form.password });
    if (!result.ok) {
      setMessage(result.message || 'Unable to register.');
      return;
    }
    router.push('/account/dashboard');
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-brown/10 bg-white/70 p-8 shadow-rustic sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose">Join the bakery family</p>
        <h1 className="mt-3 text-5xl text-brown">Create your account</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {[
            ['name', 'Full name', 'text'],
            ['email', 'Email', 'email'],
            ['password', 'Password', 'password'],
            ['confirmPassword', 'Confirm password', 'password'],
          ].map(([key, label, type]) => (
            <label key={key} className="flex flex-col gap-2 text-sm font-semibold text-brown">
              {label}
              <input
                required
                type={type}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((current) => ({ ...current, [key]: e.target.value }))}
                className="rounded-[18px] border border-brown/10 bg-antique px-4 py-3"
              />
            </label>
          ))}
          {message && <p className="rounded-[18px] bg-rose/15 px-4 py-3 text-sm text-brown">{message}</p>}
          <button type="submit" className="w-full rounded-full bg-brown px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-cream">
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-brown/70">
          Already have an account? <Link href="/account/login" className="font-bold text-sage">Log in</Link>
        </p>
      </div>
    </section>
  );
}
