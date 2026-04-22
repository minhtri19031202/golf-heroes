// src/app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Bỏ apiVersion để dùng mặc định
});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe?canceled=true`,
    });

    // Trả về full URL thay vì chỉ sessionId
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Error Details:', err);
    return NextResponse.json({ 
      error: err.message || 'Internal Server Error',
      type: err.type,
      code: err.code
    }, { status: 500 });
  }
}