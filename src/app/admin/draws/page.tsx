'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function AdminDrawsPage() {
  const [month, setMonth] = useState('2026-04')
  const [type, setType] = useState<'random' | 'algorithmic'>('random')
  const [loading, setLoading] = useState(false)

  async function simulateDraw() {
    setLoading(true)
    try {
      const res = await fetch('/api/draw/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drawMonth: month, drawType: type, simulate: true })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      toast.success('Simulation complete!')
      window.location.reload()
    } catch (e: any) {
      toast.error(e.message)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Draw Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Create / Simulate Draw</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Month (YYYY-MM)</label>
              <Input value={month} onChange={(e) => setMonth(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <select 
                className="w-full h-10 rounded-md border border-input bg-background px-3"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="random">Random</option>
                <option value="algorithmic">Algorithmic</option>
              </select>
            </div>
          </div>
          <Button onClick={simulateDraw} disabled={loading} className="w-full">
            {loading ? 'Running...' : 'Run Simulation'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}