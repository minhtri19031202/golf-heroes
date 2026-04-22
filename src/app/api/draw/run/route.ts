import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

function generateNumbers(): number[] {
  const nums = new Set<number>()
  while (nums.size < 5) nums.add(Math.floor(Math.random() * 45) + 1)
  return Array.from(nums).sort((a, b) => a - b)
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  // Check admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { drawMonth, drawType } = await req.json()

  // Calculate pool from active subscribers
  const { count: activeCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active')

  const totalPool = (activeCount || 0) * 20 * 0.5 // $20 avg, 50% to pool
  
  const winningNumbers = generateNumbers()

  const { data: draw, error } = await supabase
    .from('draws')
    .insert({
      draw_month: drawMonth,
      draw_type: drawType,
      winning_numbers: winningNumbers,
      is_simulation: true,
      total_pool: totalPool,
      match_5_pool: totalPool * 0.4,
      match_4_pool: totalPool * 0.35,
      match_3_pool: totalPool * 0.25,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  return NextResponse.json({ draw })
}