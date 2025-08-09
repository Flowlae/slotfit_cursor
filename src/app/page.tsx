'use client'

import TrainingModeSelector from '@/components/training/TrainingModeSelector'
import SlotBuilder from '@/components/training/SlotBuilder'
import BodyVisualizer from '@/components/training/BodyVisualizer'
import { WorkoutProvider } from '@/context/WorkoutContext'

export default function Home() {
  return (
    <WorkoutProvider>
      <main className="min-h-screen">
        <header className="mx-auto max-w-6xl px-4 pt-12 pb-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Adaptive Strength Trainer
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Build powerful, balanced strength with a flexible slot-based system, 
            smart exercise swaps, and a live muscle coverage heat map.
          </p>
        </header>
        <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-20">
          <TrainingModeSelector />
          <BodyVisualizer />
          <SlotBuilder />
        </section>
      </main>
    </WorkoutProvider>
  )
}