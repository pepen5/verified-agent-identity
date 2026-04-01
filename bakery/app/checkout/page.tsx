import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sage">Checkout</p>
        <h1 className="mt-3 text-5xl text-brown">Finish your order and choose how you&apos;d like to pay</h1>
        <p className="mt-5 text-lg leading-8 text-brown/70">
          Local wallets and bank transfers are available through Midtrans Snap, while Stripe handles international card checkout.
        </p>
      </div>
      <CheckoutForm />
    </section>
  );
}
