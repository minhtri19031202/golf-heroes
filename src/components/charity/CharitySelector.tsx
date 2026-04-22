'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { toast } from 'sonner'

export function CharitySelector({ charities, currentCharityId, currentPercentage }: {
  charities: any[]
  currentCharityId: string | null
  currentPercentage: number
}) {
  const [selected, setSelected] = useState(currentCharityId)
  const [percentage, setPercentage] = useState(currentPercentage)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function saveCharityChoice() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase
      .from('profiles')
      .update({ charity_id: selected, charity_percentage: percentage })
      .eq('id', user?.id)

    if (error) toast.error('Failed to update')
    else toast.success('Charity preference saved')
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contribution Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Contribution: {percentage}% of subscription
            </label>
            <Slider
              value={[percentage]}
              onValueChange={(v) => setPercentage(v[0])}
              min={10}
              max={100}
              step={5}
            />
            <p className="text-xs text-muted-foreground mt-1">Minimum 10% required</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {charities.map((charity) => (
          <div
            key={charity.id}
            onClick={() => setSelected(charity.id)}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
              selected === charity.id ? 'border-primary bg-primary/5' : 'border-muted'
            }`}
          >
            <div className="flex items-start gap-3">
              {charity.logo_url && (
                <img
                  src={charity.logo_url}
                  alt={charity.name}
                  width={48}
                  height={48}
                  className="rounded-md"
                />
              )}
              <div>
                <h3 className="font-semibold">{charity.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {charity.description}
                </p>
                {charity.is_featured && (
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={saveCharityChoice} disabled={loading} className="w-full">
        {loading ? 'Saving...' : 'Confirm Selection'}
      </Button>
    </div>
  )
}