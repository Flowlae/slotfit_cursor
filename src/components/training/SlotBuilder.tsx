'use client'

import { useWorkout } from '@/context/WorkoutContext'
import EnhancedExerciseCard from './EnhancedExerciseCard'

export default function SlotBuilder() {
  const { slots, chooseExercise, addExercise, removeExercise, updateExerciseSets } = useWorkout()

  return (
    <section className="space-y-6 sm:space-y-8 w-full max-w-full">
      {slots.map((slot) => (
        <div key={slot.id} className="w-full">
          <EnhancedExerciseCard 
            slot={slot} 
            onChoose={(id) => chooseExercise(slot.id, id)} 
            onAdd={(id) => addExercise(slot.id, id)}
            onRemove={(id) => removeExercise(slot.id, id)}
            onUpdateSets={(id, sets) => updateExerciseSets(slot.id, id, sets)}
          />
        </div>
      ))}
    </section>
  )
}