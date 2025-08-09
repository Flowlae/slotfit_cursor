import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Exercise = {
  id: string
  name: string
  movement_pattern: MovementPattern
  primary_muscles: MuscleGroup[]
  secondary_muscles?: MuscleGroup[]
  equipment_needed: string[]
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  instruction_text: string
  preference_default?: number
}

export type UserPreference = {
  user_id: string
  exercise_id: string
  rating: number
}

export type WorkoutType = 'upper' | 'lower' | 'full'

export type MovementPattern =
  | 'horizontal_push'
  | 'vertical_push'
  | 'horizontal_pull'  | 'vertical_pull'
  | 'elbow_flexion'
  | 'elbow_extension'
  | 'squat'
  | 'hinge'
  | 'single_leg'
  | 'calves'
  | 'core'

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'core'
