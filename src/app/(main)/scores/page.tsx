import { ScoreEntry } from '@/components/scores/ScoreEntry'
import { ScoreHistory } from '@/components/scores/ScoreHistory'

export default function ScoresPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">My Scores</h1>
      <p className="text-muted-foreground">
        Enter your Stableford scores. Only your latest 5 scores are kept — new scores automatically replace the oldest.
      </p>
      <ScoreEntry />
      <ScoreHistory />
    </div>
  )
}