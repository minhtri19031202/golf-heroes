import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Users, Trophy, Heart, Settings, BarChart3, LogOut } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') redirect('/')

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="w-64 border-r bg-background hidden md:block">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Settings className="h-6 w-6" />
            Admin Panel
          </Link>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" /> Users
            </Button>
          </Link>
          <Link href="/admin/draws">
            <Button variant="ghost" className="w-full justify-start">
              <Trophy className="mr-2 h-4 w-4" /> Draws
            </Button>
          </Link>
          <Link href="/admin/charities">
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" /> Charities
            </Button>
          </Link>
          <Link href="/admin/winners">
            <Button variant="ghost" className="w-full justify-start">
              <Trophy className="mr-2 h-4 w-4" /> Winners
            </Button>
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" /> Back to App
            </Button>
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}