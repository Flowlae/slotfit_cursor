'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'
import { EXERCISES, SLOT_TEMPLATES, recommendSets, filterExercisesByMuscles } from '@/data/exercises'
import { Exercise, MuscleGroup, WorkoutType } from '@/lib/supabase'

export interface SlotState {
  id: string
  label: string
  alternatives: Exercise[]
  currentExercise: Exercise
  recommendedSets: number
}

export interface WorkoutState {
  type: WorkoutType
  duration: number
  equipment: string[]
  slots: SlotState[]
  muscleHeat: Record<MuscleGroup, number>
}

interface WorkoutContextValue extends WorkoutState {
  setType: (t: WorkoutType) => void
  setDuration: (d: number) => void
  setEquipment: (eq: string[]) => void
  regenerate: () => void
  chooseExercise: (slotId: string, exerciseId: string) => void
}
const DEFAULT_TYPE: WorkoutType = 'full'
const DEFAULT_DURATION = 60

const DEFAULT_HEAT: Record<MuscleGroup, number> = {
  chest: 0,
  back: 0,
  shoulders: 0,
  biceps: 0,
  triceps: 0,
  quads: 0,
  hamstrings: 0,
  glutes: 0,
  calves: 0,
  core: 0,
}

const WorkoutContext = createContext<WorkoutContextValue | null>(null)

function computeHeat(slots: SlotState[]): Record<MuscleGroup, number> {
  const heat: Record<MuscleGroup, number> = { ...DEFAULT_HEAT }
  slots.forEach((s) => {
    const ex = s.currentExercise
    ex.primary_muscles.forEach((m) => {
      heat[m] = Math.min(1, (heat[m] || 0) + 0.35)
    })
    ;(ex.secondary_muscles || []).forEach((m) => {
      heat[m] = Math.min(1, (heat[m] || 0) + 0.15)
    })
  })
  return heat}

function buildSlots(type: WorkoutType, duration: number, equipment: string[]): SlotState[] {
  const template = SLOT_TEMPLATES[type]
  const baseSlots = [...template]
  const extra = duration >= 85 ? 2 : duration >= 70 ? 1 : 0
  const expanded = baseSlots.concat(baseSlots.slice(0, extra))

  const recSets = recommendSets(duration)
  return expanded.map((t, i) => {
    const alternatives = filterExercisesByMuscles(t.muscles, equipment).sort(
      (a, b) => (b.preference_default || 0) - (a.preference_default || 0)
    )
    const currentExercise = alternatives[0] || EXERCISES[0]
    return {
      id: `${t.id}_${i}`,
      label: t.label,
      alternatives,
      currentExercise,
      recommendedSets: recSets,
    }
  })
}

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [type, setType] = useState<WorkoutType>(DEFAULT_TYPE)
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION)
  const [equipment, setEquipment] = useState<string[]>([])
  const [slots, setSlots] = useState<SlotState[]>(() => buildSlots(type, duration, equipment))
  const muscleHeat = useMemo(() => computeHeat(slots), [slots])

  const regenerate = () => setSlots(buildSlots(type, duration, equipment))

  const chooseExercise = (slotId: string, exerciseId: string) => {
    setSlots((prev) => prev.map((s) => {
      if (s.id !== slotId) return s
      const chosen = s.alternatives.find(a => a.id === exerciseId) || s.currentExercise
      return { ...s, currentExercise: chosen }
    }))
  }

  const value: WorkoutContextValue = {
    type,
    duration,
    equipment,
    slots,
    muscleHeat,
    setType,
    setDuration,
    setEquipment,
    regenerate,
    chooseExercise,
  }

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}

export function useWorkout() {
  const ctx = useContext(WorkoutContext)
  if (!ctx) throw new Error('useWorkout must be used within WorkoutProvider')
  return ctx
}