export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'subscriber' | 'admin';
  subscription_status: 'active' | 'canceled' | 'past_due' | 'inactive';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_plan: string | null;
  subscription_end_date: string | null;
  charity_id: string | null;
  charity_percentage: number;
  created_at: string;
}

export interface Score {
  id: string;
  user_id: string;
  score: number;
  score_date: string;
  created_at: string;
}

export interface Charity {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  images: string[] | null;
  upcoming_events: any[] | null;
  is_featured: boolean;
  total_received: number;
  created_at: string;
}

export interface Draw {
  id: string;
  draw_month: string;
  draw_date: string | null;
  draw_type: 'random' | 'algorithmic';
  winning_numbers: number[];
  is_published: boolean;
  is_simulation: boolean;
  total_pool: number;
  match_5_pool: number;
  match_4_pool: number;
  match_3_pool: number;
  rollover_amount: number;
  created_at: string;
}

export interface DrawEntry {
  id: string;
  draw_id: string;
  user_id: string;
  user_numbers: number[];
  matched_count: number | null;
  match_type: '5_match' | '4_match' | '3_match' | null;
  prize_amount: number;
  created_at: string;
}