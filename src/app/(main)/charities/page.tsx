import { createClient } from '@/lib/supabase/server'
import { CharitySelector } from '@/components/charity/CharitySelector'

export default async function CharitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .order('is_featured', { ascending: false })

  const { data: profile } = await supabase
    .from('profiles')
    .select('charity_id, charity_percentage')
    .eq('id', user?.id)
    .single()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support a Charity</h1>
      <p className="text-muted-foreground">
        Choose a charity to support. Minimum 10% of your subscription goes to your selected cause.
      </p>
      <CharitySelector 
        charities={charities || []} 
        currentCharityId={profile?.charity_id}
        currentPercentage={profile?.charity_percentage || 10}
      />
    </div>
  )
}