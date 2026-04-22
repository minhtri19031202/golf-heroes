// src/app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Khởi tạo Stripe với Secret Key từ biến môi trường
// Lưu ý: Nếu vẫn báo lỗi version, hãy thử bỏ dòng apiVersion đi hoàn toàn, 
// Stripe sẽ tự động dùng version mặc định mới nhất của thư viện.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: '2026-03-25.dahlia', // Hoặc bỏ dòng này nếu muốn dùng default
});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // Tạo Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Price ID từ Stripe
          quantity: 1,
        },
      ],
      mode: 'subscription', // Chế độ đăng ký định kỳ
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe?canceled=true`,
      // Thêm metadata nếu cần theo dõi user nào đã thanh toán
      metadata: {
        // userId: 'user_id_cua_ban' // Có thể lấy từ session auth nếu cần
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}