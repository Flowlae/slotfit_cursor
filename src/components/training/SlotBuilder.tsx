'use client'

import { useWorkout } from '@/context/WorkoutContext'
import ExerciseCard from './ExerciseCard'

export default function SlotBuilder() {
  const { slots, chooseExercise } = useWorkout()

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {slots.map((slot) => (
        <ExerciseCard 
          key={slot.id} 
          slot={slot} 
          onChoose={(id) => chooseExercise(slot.id, id)} 
        />
      ))}
    </section>
  )
}