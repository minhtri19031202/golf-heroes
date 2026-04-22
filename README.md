# Golf Charity & Draw Platform

> **Digital Heroes Trainee Selection Project**  
> Built by **Ngô Đình Minh Trí** | Senior Full Stack Developer Candidate

## 🚀 Live Demo & Credentials

**🌐 Live URL:** [Insert Your Vercel Link Here]  
*(Note: Deployed on a fresh Vercel account & Supabase project as per PRD constraints)*

### 🔑 Test Credentials
To evaluate the full functionality, please use the following accounts:

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **User** | `user@test.com` | `Password123!` | Active subscription, 5 scores entered, charity selected. |
| **Admin** | `admin@test.com` | `Password123!` | Full access to User Mgmt, Draw Engine, and Winner Verification. |

*(Or provide your actual test accounts created in the app)*

---

## 📖 Project Overview

This platform is a subscription-driven web application that combines **golf performance tracking**, **charity fundraising**, and a **monthly draw-based reward engine**. 

Designed with an **"Emotion-First"** approach, it deliberately avoids traditional golf aesthetics, focusing instead on charitable impact and modern, motion-enhanced UI/UX.

### Key Features Implemented:
- ✅ **Subscription Engine:** Monthly/Yearly plans via Stripe with real-time status validation.
- ✅ **Score Management:** Rolling logic for the latest 5 Stableford scores (auto-replace oldest).
- ✅ **Draw Engine:** Monthly draw system with 5/4/3-number match logic and jackpot rollover.
- ✅ **Charity Integration:** Users select charities and allocate min. 10% of their subscription.
- ✅ **Admin Dashboard:** Comprehensive tools for user management, draw simulation, and winner verification.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 14+ (App Router), React, TypeScript
- **Styling:** Tailwind CSS, Framer Motion (for subtle, emotion-driven animations)
- **Backend & Database:** Supabase (Auth, PostgreSQL, Realtime, Storage)
- **Payments:** Stripe (Test Mode)
- **Deployment:** Vercel

---

## 🏗 Architecture & System Design

### 1. Database Schema (Supabase)
The database is designed for scalability and data integrity, featuring:
- `profiles`: Extends Auth users with role-based access.
- `subscriptions`: Tracks plan type, status, and renewal dates.
- `golf_scores`: Enforces unique constraint per date per user; limited to latest 5 via application logic.
- `draws` & `draw_entries`: Snapshot-based entry system to ensure fairness in historical draws.
- `winners`: Tracks verification status and payout states.

### 2. Security & Access Control
- **Row Level Security (RLS):** Enabled on all tables. Users can only access their own data; Admins have broader privileges via Service Role keys.
- **Middleware:** Protects `/dashboard` and `/admin` routes, redirecting unauthenticated users.

### 3. Draw Logic
- **Simulation Mode:** Admins can simulate draws without affecting live data.
- **Algorithm:** Supports random generation with weighted options (extensible for future algorithmic needs).
- **Prize Pool:** Auto-calculated based on active subscribers and pre-defined distribution tiers (40% Jackpot, 35% 4-Match, 25% 3-Match).

---

## 📦 Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo


Install dependencies:
npm install
# or yarn install

Environment Variables:
Create a .env.local file in the root directory and add the following:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

Run the development server:
npm run dev

UI/UX Highlights
Mobile-First: Fully responsive design optimized for all devices.
Motion-Enhanced: Subtle transitions using Framer Motion to guide user attention.
Clean Aesthetic: Avoids golf clichés; uses a modern, clean palette focused on clarity and emotion.
📝 Evaluation Checklist Compliance
User signup & login functional
Subscription flow (Monthly/Yearly) integrated with Stripe
Score entry with 5-score rolling logic
Draw system logic and simulation mode
Charity selection and contribution calculation
Winner verification flow (Admin)
Responsive design on mobile and desktop
Error handling and edge cases covered
👤 Author
Ngô Đình Minh Trí
Senior Frontend Engineer & Full Stack Developer