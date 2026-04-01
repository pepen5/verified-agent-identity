'use client';

type PaymentMethod = 'midtrans' | 'stripe';

const methods = [
  {
    id: 'midtrans' as PaymentMethod,
    name: 'Midtrans Snap',
    detail: 'GoPay, OVO, bank transfer, QRIS, and other local Indonesian payment methods.',
    badge: 'Local payments',
  },
  {
    id: 'stripe' as PaymentMethod,
    name: 'Stripe Checkout',
    detail: 'Secure international card payments on Stripe\'s hosted checkout page.',
    badge: 'Cards',
  },
];

export default function PaymentMethodSelector({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}) {
  return (
    <div className="grid gap-4">
      {methods.map((method) => {
        const active = value === method.id;
        return (
          <label
            key={method.id}
            className={`flex cursor-pointer items-start gap-4 rounded-[24px] border p-5 transition ${
              active ? 'border-sage bg-sage/10 shadow-soft' : 'border-brown/10 bg-white/80'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={active}
              onChange={() => onChange(method.id)}
              className="mt-1 h-4 w-4 border-brown text-sage focus:ring-sage"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-2xl text-brown">{method.name}</p>
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brown">
                  {method.badge}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-brown/70">{method.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brown/70">
                {method.id === 'midtrans' ? (
                  <>
                    <span className="rounded-full bg-antique px-3 py-2">GoPay</span>
                    <span className="rounded-full bg-antique px-3 py-2">OVO</span>
                    <span className="rounded-full bg-antique px-3 py-2">QRIS</span>
                    <span className="rounded-full bg-antique px-3 py-2">Bank Transfer</span>
                  </>
                ) : (
                  <>
                    <span className="rounded-full bg-antique px-3 py-2">Visa</span>
                    <span className="rounded-full bg-antique px-3 py-2">Mastercard</span>
                    <span className="rounded-full bg-antique px-3 py-2">Amex</span>
                  </>
                )}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
