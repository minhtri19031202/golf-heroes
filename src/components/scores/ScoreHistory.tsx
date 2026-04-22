import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function ScoreHistory() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('score_date', { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score History (Last 5)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {scores?.map((score, idx) => (
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
          {(!scores || scores.length === 0) && (
            <p className="text-muted-foreground text-center py-4">No scores entered yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}