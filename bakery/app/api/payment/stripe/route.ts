import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/lib/products';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2026-03-25.dahlia',
    })
  : null;

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY is not configured.' }, { status: 500 });
    }

    const { items, customerEmail } = await req.json();
    const origin = req.headers.get('origin') || 'http://localhost:3001';

    const lineItems = items.map((item: { slug: string; quantity: number }) => {
      const product = products.find((entry) => entry.slug === item.slug);
      if (!product) {
        throw new Error(`Unknown product: ${item.slug}`);
      }

      return {
        price_data: {
          currency: 'idr',
          product_data: { name: product.name },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unexpected Stripe error.' }, { status: 500 });
  }
}
