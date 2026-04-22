# Golf Heroes

A subscription-driven web application combining golf performance tracking, charity fundraising, and monthly draw-based rewards. Built for the Digital Heroes Full-Stack Developer selection process.

**Live Demo:** [https://golf-heroes-orcin.vercel.app](https://golf-heroes-orcin.vercel.app)

---

## Features

### User Panel
- **Authentication** — Email/password signup & login with Supabase Auth
- **Dashboard** — Subscription status, scores summary, charity selection, draw entries
- **Score Entry** — Enter Stableford scores (1-45), automatic rolling 5-score retention
- **Charity Support** — Select charity with adjustable contribution percentage (min 10%)
- **Draw Participation** — View past results and personal entries

### Admin Panel
- **Dashboard Analytics** — Total users, active subscriptions, prize pools, charity totals
- **Draw Management** — Create and simulate monthly draws (Random / Algorithmic)
- **User Management** — View and manage all user profiles
- **Charity Management** — Add, edit, and feature charities
- **Winner Verification** — Review and approve winner proof submissions

### Core Systems
- **Subscription Engine** — Stripe integration for monthly/yearly plans
- **Draw Engine** — Lottery-style number matching with jackpot rollover
- **Prize Distribution** — Auto-calculated tiers (40% / 35% / 25%) split among winners
- **Row Level Security** — PostgreSQL RLS policies protect all user data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS |
| UI Components | shadcn/ui (Radix + Nova preset) |
| Backend | Next.js Server Actions + API Routes |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth with JWT sessions |
| Storage | Supabase Storage (public bucket for winner proofs) |
| Payments | Stripe (Checkout + Webhooks) |
| Deploy | Vercel |

---

## Database Schema

### Tables
- `profiles` — User profiles extending Supabase Auth
- `scores` — Rolling 5 golf scores per user (1-45 Stableford)
- `charities` — Charity directory with featured spotlight
- `draws` — Monthly draws with winning numbers and prize pools
- `draw_entries` — User participation with matched counts and prizes
- `winner_verifications` — Proof upload and admin approval workflow

### Key Features
- **Rolling 5 Trigger** — Auto-deletes oldest score on 6th insert
- **RLS Policies** — Users only access their own data; admins bypass for management
- **Safe Admin Check** — `is_admin()` function prevents recursion in policies

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://mmmkbqxqiiybhrxuddva.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=https://golf-heroes-orcin.vercel.app

Getting Started
Prerequisites
Node.js 18+
npm or yarn
Installation
# Clone repository
git clone https://github.com/minhtri19031202/golf-heroes.git
cd golf-heroes

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase and Stripe keys

# Run development server
npm run dev
Open http://localhost:3000
Deployment
Vercel (Recommended)
Push to GitHub
Import repo on vercel.com
Add environment variables in project settings
Deploy automatically on every push to main
Supabase Configuration
Site URL: https://golf-heroes-orcin.vercel.app
Redirect URLs: https://golf-heroes-orcin.vercel.app/**
Email Confirmation: Disabled for demo (enable in production)

Testing Checklist
| Feature                          | Status |
| -------------------------------- | ------ |
| User signup & login              | ✅      |
| Score entry (rolling 5)          | ✅      |
| Charity selection & contribution | ✅      |
| Draw simulation & publish        | ✅      |
| Admin dashboard & controls       | ✅      |
| Responsive design                | ✅      |

Project Structure
golf-heroes/
├── app/
│   ├── (auth)/          # Login & Register
│   ├── (main)/          # Dashboard, Scores, Charities, Draws
│   ├── admin/           # Admin panel (protected)
│   └── api/             # API routes (Stripe webhooks, draw engine)
├── components/          # Reusable UI components
├── lib/                 # Supabase clients, utilities
├── types/               # TypeScript interfaces
└── middleware.ts        # Route protection & subscription guards

Contact
Developer: minhtri19031202
Email: minhtri19033003@gmail.com