// src/app/subscribe/page.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

// Khởi tạo Stripe Promise
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscribePage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleSubscribe = async (priceId: string, planName: string) => {
    setLoading(planName);
    try {
      // 1. Gọi API Backend để tạo Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      const sessionId = data.sessionId;

      // 2. Lấy instance của Stripe
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe.js has not loaded yet.');
      }


      await (stripe as any).redirectToCheckout({
        sessionId: sessionId,
      });
      
    } catch (error) {
      console.error('Subscription Error:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại hoặc liên hệ hỗ trợ.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-lg text-gray-600">Join the community, track your scores, and support charity.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* GÓI MONTHLY */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:border-indigo-500 transition-all duration-300 flex flex-col">
          <h3 className="text-2xl font-semibold text-gray-800">Monthly Plan</h3>
          <div className="my-6">
            <span className="text-4xl font-bold text-gray-900">$29</span>
            <span className="text-gray-500">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Unlimited Score Entries
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Monthly Draw Participation
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              10% Charity Contribution
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe('price_1Qxyz...YOUR_MONTHLY_PRICE_ID', 'Monthly')}
            disabled={loading === 'Monthly'}
            className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loading === 'Monthly' ? 'Processing...' : 'Get Started'}
          </button>
        </div>

        {/* GÓI YEARLY */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-600 relative flex flex-col transform scale-105 z-10">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">BEST VALUE</div>
          <h3 className="text-2xl font-semibold text-gray-800">Yearly Plan</h3>
          <div className="my-6">
            <span className="text-4xl font-bold text-gray-900">$290</span>
            <span className="text-gray-500">/year</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              All Monthly Features
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Save ~17% (2 Months Free)
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Priority Support
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe('price_1Qabc...YOUR_YEARLY_PRICE_ID', 'Yearly')}
            disabled={loading === 'Yearly'}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading === 'Yearly' ? 'Processing...' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}