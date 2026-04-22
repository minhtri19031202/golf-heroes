import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  BarChart3,
  Heart,
  Trophy,
  LogOut,
} from 'lucide-react'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/scores', label: 'My Scores', icon: BarChart3 },
    { href: '/charities', label: 'Charities', icon: Heart },
    { href: '/draws', label: 'Draws', icon: Trophy },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-72 fixed h-screen border-r bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl">

        <div className="flex flex-col w-full">

          {/* BRAND */}
          <div className="p-6 border-b">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <Heart className="h-5 w-5 text-rose-500" />
              Golf Heroes
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              SaaS Dashboard
            </p>
          </div>

          {/* NAV */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t">
            <form action="/api/auth/signout" method="post">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                type="submit"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 md:ml-72">

        {/* TOPBAR */}
        <header className="sticky top-0 z-10 border-b bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl">
          <div className="h-16 px-6 flex items-center justify-between">

            <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Welcome, {profile?.full_name || 'Player'}
            </h2>

            <div className="flex items-center gap-3">

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  profile?.subscription_status === 'active'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}
              >
                {profile?.subscription_status === 'active'
                  ? 'Active'
                  : 'Inactive'}
              </span>

            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}