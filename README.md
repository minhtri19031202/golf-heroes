Golf Heroes Platform - Play Better, Give Back
A modern, emotion-driven SaaS platform for golf enthusiasts to track scores, participate in monthly draws, and support charities through subscription-based contributions. Built with Next.js 14, Supabase, Stripe, and Tailwind CSS.
🔗 Live Demo: https://golf-heroes-rho.vercel.app
📂 Source Code: https://github.com/minhtri19031202/golf-heroes
🚀 Tech Stack
Frontend: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion
Backend & Database: Supabase (PostgreSQL, Auth, Row Level Security)
Payments: Stripe Checkout (Subscription Model)
Deployment: Vercel
Icons: Lucide React
✨ Key Features
1. User Dashboard & Score Logic
Rolling 5 Scores: Automatically keeps only the latest 5 golf scores per user, replacing older entries.
Charity Integration: Users select a charity upon registration; 10% of their subscription fee is contributed to the chosen cause.
Real-time Data: Fetches user profile, scores, and draw entries directly from Supabase.
2. Subscription & Payment System
Stripe Integration: Seamless checkout flow for Monthly ($29) and Yearly ($290) plans.
Hosted Checkout: Uses Stripe Hosted Pages for secure PCI-compliant payments.
Status Management: Tracks subscription status (active, inactive, canceled) to control access to premium features.
3. Admin Panel
User Management: View all registered users, their subscription status, and selected charities.
Draw Engine: Simulate monthly draws by randomly selecting winners from eligible entries.
Charity Overview: Monitor total contributions per charity.
4. UI/UX Design
Emotion-Driven Interface: Avoids traditional "cliché" golf aesthetics, focusing on clean, modern, and motivating visuals.
Responsive: Fully optimized for mobile, tablet, and desktop devices.
Micro-interactions: Smooth animations using Framer Motion for enhanced user experience.
🧪 Testing Instructions & Credentials
To fully test the application, please use the following accounts.
⚠️ Important Note on Subscription Status:
By default, new users or users who have just completed a payment in this demo environment will have a subscription status of inactive. The system protects the /dashboard route and will redirect inactive users back to /subscribe.
To view the full Dashboard experience, you must manually update the user's status to active in Supabase after completing the test payment. This simulates the real-time webhook update that would happen in production.
🔑 Test Accounts
User: luketri@gmail.com
Password: 123456789
(Note: If you create a new user or want to test the fresh subscription flow, please follow the "Manual Activation Step" below.)
Step-by-Step Test Flow for New Subscription
Register/Login as a New User:
Go to /register or /login. Create a new account or use a different email.
Initially, your subscription_status in Supabase will be inactive (or null).
If you try to access /dashboard, you will be redirected to /subscribe.
Subscribe & Pay:
On the /subscribe page, click "Get Started" on the Monthly or Yearly plan.
Complete payment using Stripe Test Card:
Card Number: 4242 4242 4242 4242
Expiry: 12/30
CVC: 123
After payment, Stripe will redirect you back to the app. You might still see the /subscribe page because your status is still inactive in the database.
Manual Activation Step (Crucial for Demo):
Open Supabase Dashboard > Table Editor > profiles.
Find your user's row (by email).
Change subscription_status from inactive to active.
Set subscription_plan to monthly or yearly.
Click Save.
Access Dashboard:
Go back to your browser and Refresh (F5) the page.
Now, when you navigate to /dashboard, the system will recognize your active status and allow you to enter.
You will see your scores, charity selection, and subscription details.
⚠️ Note on Subscription Sync
In a production environment, I would implement Stripe Webhooks to automatically listen for checkout.session.completed events and update the subscription_status in the Supabase profiles table in real-time.
For this demo, to ensure a smooth review experience without setting up a local webhook listener (e.g., via Stripe CLI), please follow this step after completing a test payment:
Go to the Supabase Dashboard > Table Editor > profiles.
Find the user's row (e.g., luketri@gmail.com).
Manually set subscription_status to active and subscription_plan to monthly or yearly.
Refresh the application. The user will now have full access to the Dashboard.
This approach demonstrates my understanding of event-driven architecture while keeping the demo setup simple and accessible.
🛠️ Local Development Setup
Clone the repository:
git clone https://github.com/minhtri19031202/golf-heroes.git
cd golf-heroes

Install dependencies:
npm install

Set up Environment Variables:
Create a .env.local file in the root directory and add the following keys (get these from your Supabase and Stripe dashboards):
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

Run the development server:
npm run dev

Open http://localhost:3000 in your browser.

Author
Ngô Đình Minh Trí
Full-Stack Developer | Next.js | Supabase | Stripe