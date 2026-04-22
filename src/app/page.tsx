import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Trophy, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Heart className="h-6 w-6 text-primary" />
            Golf Heroes
          </Link>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
              <Heart className="mr-1 h-3 w-3" /> Golf for Good
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Play Better. <span className="text-primary">Give Back.</span> Win Big.
            </h1>
            <p className="mx-auto max-w-175 text-muted-foreground md:text-xl">
              Track your golf scores, support charities you love, and enter monthly draws with life-changing prizes.
            </p>
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg" className="h-11 px-8">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Track Scores</h3>
              <p className="text-muted-foreground">Enter your last 5 Stableford scores. We handle the rest.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Support Charities</h3>
              <p className="text-muted-foreground">10% (or more) of every subscription goes to your chosen cause.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Win Monthly</h3>
              <p className="text-muted-foreground">Matched score draws every month. Jackpot rolls over if unclaimed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}