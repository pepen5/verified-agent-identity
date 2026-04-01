import { NextRequest, NextResponse } from 'next/server';
import { SHIPPING_FEE, products } from '@/lib/products';

export async function POST(req: NextRequest) {
  try {
    const { orderId, customerDetails, items } = await req.json();

    if (!process.env.MIDTRANS_SERVER_KEY) {
      return NextResponse.json({ error: 'MIDTRANS_SERVER_KEY is not configured.' }, { status: 500 });
    }

    const itemDetails: Array<{ id: string; price: number; quantity: number; name: string }> = items.map((item: { slug: string; quantity: number }) => {
      const product = products.find((entry) => entry.slug === item.slug);
      if (!product) {
        throw new Error(`Unknown product: ${item.slug}`);
      }

      return {
        id: product.slug,
        price: product.price,
        quantity: item.quantity,
        name: product.name,
      };
    });

    const grossAmount = itemDetails.reduce((sum: number, item) => sum + item.price * item.quantity, 0) + SHIPPING_FEE;

    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
    const baseUrl = isProduction
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    const authString = Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64');

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
      },
      item_details: [
        ...itemDetails,
        {
          id: 'shipping',
          price: SHIPPING_FEE,
          quantity: 1,
          name: 'Flat Shipping',
        },
      ],
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error_messages?.join(', ') || 'Midtrans request failed.', details: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unexpected Midtrans error.' }, { status: 500 });
  }
}
