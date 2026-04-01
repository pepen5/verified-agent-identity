import type { Metadata } from 'next';
import Script from 'next/script';
import { Lato, Playfair_Display } from 'next/font/google';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ProviderShell } from '@/components/ProviderShell';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  weight: ['400', '700', '900'],
});

const midtransSrc = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com/snap/snap.js'
  : 'https://app.sandbox.midtrans.com/snap/snap.js';

export const metadata: Metadata = {
  title: 'Rumah Roti',
  description: 'Country house bakery e-commerce with Midtrans and Stripe payments.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${lato.variable} font-body`}>
        <ProviderShell>
          <div className="min-h-screen bg-antique texture-linen text-brown">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ProviderShell>
        <Script src={midtransSrc} data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />
      </body>
    </html>
  );
}
