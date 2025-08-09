'use client'

import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { SLOT_TEMPLATES, recommendSets, filterExercisesByMuscles } from '@/data/exercises'
import { Exercise, MuscleGroup, WorkoutType } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'

export interface SelectedExercise {
  exercise: Exercise
  sets: number
}

export interface SlotState {
  id: string
  label: string
  alternatives: Exercise[]
  selectedExercises: SelectedExercise[]
  recommendedSets: number
  totalSets: number
}

export interface WorkoutState {
  type: WorkoutType
  duration: number
  equipment: string[]
  slots: SlotState[]
  muscleHeat: Record<MuscleGroup, number>
  exercises: Exercise[]
  loading: boolean
}

interface WorkoutContextValue extends WorkoutState {
  setType: (t: WorkoutType) => void
  setDuration: (d: number) => void
  setEquipment: (eq: string[]) => void
  regenerate: () => void
  chooseExercise: (slotId: string, exerciseId: string) => void
  addExercise: (slotId: string, exerciseId: string) => void
  removeExercise: (slotId: string, exerciseId: string) => void
  updateExerciseSets: (slotId: string, exerciseId: string, sets: number) => void
  saveUserPreference: (exerciseId: string, rating: number) => Promise<void>
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
    s.selectedExercises.forEach((selected) => {
      const ex = selected.exercise
      const intensity = Math.min(1, selected.sets * 0.1) // More sets = more intensity
      ex.primary_muscles.forEach((m) => {
        heat[m] = Math.min(1, (heat[m] || 0) + (0.35 * intensity))
      })
      ;(ex.secondary_muscles || []).forEach((m) => {
        heat[m] = Math.min(1, (heat[m] || 0) + (0.15 * intensity))
      })
    })
  })
  return heat
}

function buildSlots(type: WorkoutType, duration: number, equipment: string[], exercises: Exercise[]): SlotState[] {
  const template = SLOT_TEMPLATES[type]
  const baseSlots = [...template]
  const extra = duration >= 85 ? 2 : duration >= 70 ? 1 : 0
  const expanded = baseSlots.concat(baseSlots.slice(0, extra))

  const recSets = recommendSets(duration)
  return expanded.map((t, i) => {
    const alternatives = filterExercisesByMuscles(t.muscles, equipment, exercises).sort(
      (a, b) => (b.preference_default || 0) - (a.preference_default || 0)
    )
    // Start with empty muscle groups - no default exercise
    const selectedExercises: SelectedExercise[] = []
    
    return {
      id: `${t.id}_${i}`,
      label: t.label,
      alternatives,
      selectedExercises,
      recommendedSets: recSets,
      totalSets: selectedExercises.reduce((sum, selected) => sum + selected.sets, 0),
    }
  })
}

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [type, setType] = useState<WorkoutType>(DEFAULT_TYPE)
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION)
  const [equipment, setEquipment] = useState<string[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [slots, setSlots] = useState<SlotState[]>([])
  const muscleHeat = useMemo(() => computeHeat(slots), [slots])

  // Load exercises from Supabase
  useEffect(() => {
    async function loadExercises() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('exercises')
          .select('*')
          .order('name')
        
        if (error) {
          console.error('Error loading exercises:', error)
          return
        }
        
        setExercises(data || [])
      } catch (err) {
        console.error('Failed to load exercises:', err)
      } finally {
        setLoading(false)
      }
    }

    loadExercises()
  }, [])

  // Rebuild slots when exercises or settings change
  useEffect(() => {
    if (exercises.length > 0) {
      setSlots(buildSlots(type, duration, equipment, exercises))
    }
  }, [exercises, type, duration, equipment])

  const regenerate = () => {
    if (exercises.length > 0) {
      setSlots(buildSlots(type, duration, equipment, exercises))
    }
  }

  const chooseExercise = (slotId: string, exerciseId: string) => {
    setSlots((prev) => prev.map((s) => {
      if (s.id !== slotId) return s
      const chosen = s.alternatives.find(a => a.id === exerciseId)
      if (!chosen) return s
      
      // Replace all selected exercises with just this one
      const selectedExercises = [{ exercise: chosen, sets: s.recommendedSets }]
      return { 
        ...s, 
        selectedExercises,
        totalSets: selectedExercises.reduce((sum, selected) => sum + selected.sets, 0)
      }
    }))
  }

  const addExercise = (slotId: string, exerciseId: string) => {
    setSlots((prev) => prev.map((s) => {
      if (s.id !== slotId) return s
      const exercise = s.alternatives.find(a => a.id === exerciseId)
      if (!exercise) return s
      
      // Check if exercise is already selected
      const isAlreadySelected = s.selectedExercises.some(selected => selected.exercise.id === exerciseId)
      if (isAlreadySelected) return s
      
      const newSelectedExercise = { exercise, sets: s.recommendedSets }
      const selectedExercises = [...s.selectedExercises, newSelectedExercise]
      return { 
        ...s, 
        selectedExercises,
        totalSets: selectedExercises.reduce((sum, selected) => sum + selected.sets, 0)
      }
    }))
  }

  const removeExercise = (slotId: string, exerciseId: string) => {
    setSlots((prev) => prev.map((s) => {
      if (s.id !== slotId) return s
      const selectedExercises = s.selectedExercises.filter(selected => selected.exercise.id !== exerciseId)
      
      // Allow completely empty muscle groups - no default exercise added
      return { 
        ...s, 
        selectedExercises,
        totalSets: selectedExercises.reduce((sum, selected) => sum + selected.sets, 0)
      }
    }))
  }

  const updateExerciseSets = (slotId: string, exerciseId: string, sets: number) => {
    setSlots((prev) => prev.map((s) => {
      if (s.id !== slotId) return s
      const selectedExercises = s.selectedExercises.map(selected => 
        selected.exercise.id === exerciseId 
          ? { ...selected, sets: Math.max(1, Math.min(5, sets)) } // Clamp between 1-5
          : selected
      )
      return { 
        ...s, 
        selectedExercises,
        totalSets: selectedExercises.reduce((sum, selected) => sum + selected.sets, 0)
      }
    }))
  }

  const saveUserPreference = async (exerciseId: string, rating: number) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.log('No user logged in, skipping preference save')
        return
      }

      // Save to user_preferences table
      const { error } = await supabase
        .from('user_preferences')
        .upsert({ 
          user_id: user.id,
          exercise_id: exerciseId, 
          rating,
          updated_at: new Date().toISOString()
        })
      
      if (error) {
        console.error('Error saving preference:', error)
      } else {
        console.log(`✅ Saved preference: Exercise ${exerciseId} rated ${rating}/10`)
      }
      
    } catch (err) {
      console.error('Failed to save preference:', err)
    }
  }

  const value: WorkoutContextValue = {
    type,
    duration,
    equipment,
    slots,
    muscleHeat,
    exercises,
    loading,
    setType,
    setDuration,
    setEquipment,
    regenerate,
    chooseExercise,
    addExercise,
    removeExercise,
    updateExerciseSets,
    saveUserPreference,
  }

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}

export function useWorkout() {
  const ctx = useContext(WorkoutContext)
  if (!ctx) throw new Error('useWorkout must be used within WorkoutProvider')
  return ctx
}