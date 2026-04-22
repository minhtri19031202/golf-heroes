import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Heart, BarChart3, Calendar } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, charities(name)')
    .eq('id', user?.id)
    .single()

  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user?.id)
    .order('score_date', { ascending: false })
    .limit(5)

  const { data: entries } = await supabase
    .from('draw_entries')
    .select('*')
    .eq('user_id', user?.id)
    .limit(5)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{profile?.subscription_status}</div>
            <p className="text-xs text-muted-foreground">
              {profile?.subscription_plan || 'No plan'} 
              {profile?.subscription_end_date && ` • Ends ${new Date(profile.subscription_end_date).toLocaleDateString()}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scores Entered</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scores?.length || 0}/5</div>
            <p className="text-xs text-muted-foreground">Latest 5 scores kept</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Charity</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.charities?.name || 'Not selected'}</div>
            <p className="text-xs text-muted-foreground">{profile?.charity_percentage || 10}% contribution</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draw Entries</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Total participations</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scores</CardTitle>
        </CardHeader>
        <CardContent>
          {scores && scores.length > 0 ? (
            <div className="space-y-2">
              {scores.map((score, idx) => (
                <div key={score.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium">Score: {score.score}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(score.score_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No scores entered yet. Go to My Scores to add.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}