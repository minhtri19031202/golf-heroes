'use client'

import { useState } from 'react'
import { addScore } from '@/app/actions/scores'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function ScoreEntry() {
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      await addScore(formData)
      toast.success('Score saved successfully')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter New Score</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Score (1-45)</label>
              <Input 
                name="score" 
                type="number" 
                min={1} 
                max={45} 
                required 
                placeholder="36"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input 
                name="score_date" 
                type="date" 
                required 
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Saving...' : 'Save Score'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}