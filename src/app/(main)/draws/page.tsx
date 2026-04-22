import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Calendar } from 'lucide-react'

export default async function DrawsPage() {
  const supabase = await createClient() // ✅ FIX QUAN TRỌNG

  const { data: { user } } = await supabase.auth.getUser()

  const { data: draws } = await supabase
    .from('draws')
    .select('*')
    .eq('is_published', true)
    .order('draw_month', { ascending: false })

  const { data: entries } = await supabase
    .from('draw_entries')
    .select('*, draws(draw_month, winning_numbers)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Monthly Draws</h1>

      <Card className="bg-primary/5 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Next Draw
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Draws are held monthly. Make sure you have entered your scores to participate!
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Past Results</h2>

        {draws?.length ? draws.map((draw: any) => (
          <Card key={draw.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  {draw.draw_month}
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  Pool: ${draw.total_pool}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex gap-2">
                {draw.winning_numbers?.map((n: number, i: number) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )) : (
          <p className="text-muted-foreground">No draws published yet.</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Entries</h2>

        {entries?.length ? entries.map((entry: any) => (
          <Card key={entry.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">
                  {entry.draws?.draw_month || 'Unknown'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your numbers: {entry.user_numbers?.join(', ')}
                </p>
              </div>

              <div className="text-right">
                {entry.matched_count !== null ? (
                  <>
                    <p className="font-bold text-primary">
                      {entry.matched_count} matches
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${entry.prize_amount}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Pending</p>
                )}
              </div>
            </CardContent>
          </Card>
        )) : (
          <p className="text-muted-foreground">No entries yet.</p>
        )}
      </div>
    </div>
  )
}