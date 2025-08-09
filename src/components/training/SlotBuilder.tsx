'use client'

import { useWorkout } from '@/context/WorkoutContext'
import ExerciseCard from './ExerciseCard'

export default function SlotBuilder() {
  const { slots, chooseExercise } = useWorkout()

  return (
    <section className="space-y-6 sm:space-y-8 w-full max-w-full">
      {slots.map((slot) => (
        <div key={slot.id} className="w-full">
          <ExerciseCard 
            slot={slot} 
            onChoose={(id) => chooseExercise(slot.id, id)} 
          />
        </div>
      ))}
    </section>
  )
}