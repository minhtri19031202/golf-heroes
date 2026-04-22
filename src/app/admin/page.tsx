import { createClient } from '@/lib/supabase/server'
import { SaasCard } from '@/components/system/saas-card'
import {
  Users,
  Trophy,
  Heart,
  DollarSign,
} from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: activeSubs } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active')

  const { data: latestDraw } = await supabase
    .from('draws')
    .select('total_pool')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const { data: charities } = await supabase
    .from('charities')
    .select('total_received')

  const totalCharity =
    charities?.reduce(
      (sum, c) => sum + Number(c.total_received),
      0
    ) || 0

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of your platform performance
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <SaasCard
          title="Total Users"
          value={totalUsers || 0}
          icon={Users}
        />

        <SaasCard
          title="Active Subscriptions"
          value={activeSubs || 0}
          icon={DollarSign}
        />

        <SaasCard
          title="Latest Pool"
          value={`$${latestDraw?.total_pool || 0}`}
          icon={Trophy}
        />

        <SaasCard
          title="Charity Total"
          value={`$${totalCharity}`}
          icon={Heart}
        />

      </div>

      {/* OPTIONAL FUTURE SECTION */}
      <div className="rounded-2xl border bg-white/50 dark:bg-zinc-900/30 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold mb-2">
          Quick Insights
        </h2>
        <p className="text-sm text-muted-foreground">
          Your dashboard is now running on SaaS UI system (2026 design).
        </p>
      </div>

    </div>
  )
}