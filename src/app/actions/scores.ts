'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addScore(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Unauthorized')

  const score = parseInt(formData.get('score') as string)
  const scoreDate = formData.get('score_date') as string

  if (score < 1 || score > 45) throw new Error('Score must be between 1-45')

  const { data: existing } = await supabase
    .from('scores')
    .select('id')
    .eq('user_id', user.id)
    .eq('score_date', scoreDate)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('scores')
      .update({ score })
      .eq('id', existing.id)
    
    if (error) throw error
  } else {
    const { error } = await supabase
      .from('scores')
      .insert({ user_id: user.id, score, score_date: scoreDate })
    
    if (error) throw error
  }

  revalidatePath('/scores')
  revalidatePath('/dashboard')
}

export async function getMyScores() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('score_date', { ascending: false })
    .limit(5)

  if (error) throw error
  return data || []
}