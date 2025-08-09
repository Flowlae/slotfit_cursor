import { Exercise, MuscleGroup, MovementPattern, WorkoutType } from '@/lib/supabase'

export const EXERCISES: Exercise[] = [
  // Chest
  { id: 'bench_press', name: 'Barbell Bench Press', movement_pattern: 'horizontal_push', primary_muscles: ['chest','triceps','shoulders'], equipment_needed: ['barbell','bench'], difficulty_level: 'intermediate', instruction_text: 'Feet planted, shoulder blades retracted, bar to mid-chest, press to lockout.', preference_default: 8 },
  { id: 'db_incline_press', name: 'DB Incline Press', movement_pattern: 'horizontal_push', primary_muscles: ['chest','shoulders','triceps'], equipment_needed: ['dumbbells','bench'], difficulty_level: 'beginner', instruction_text: 'Set bench 30°. Dumbbells to upper chest, press up and in.', preference_default: 7 },
  { id: 'push_up', name: 'Push-Up', movement_pattern: 'horizontal_push', primary_muscles: ['chest','triceps','shoulders'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'Body in a straight line, chest to floor, press up without flaring.', preference_default: 7 },
  { id: 'dips', name: 'Dips', movement_pattern: 'vertical_push', primary_muscles: ['chest','triceps'], secondary_muscles: ['shoulders'], equipment_needed: ['machine'], difficulty_level: 'intermediate', instruction_text: 'Slight forward lean, elbows track back, full depth with control.', preference_default: 6 },
  { id: 'cable_fly', name: 'Cable Fly', movement_pattern: 'horizontal_push', primary_muscles: ['chest'], secondary_muscles: ['shoulders'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Slight elbow bend, arc hands together at chest height.', preference_default: 6 },

  // Back
  { id: 'pull_up', name: 'Pull-Up', movement_pattern: 'vertical_pull', primary_muscles: ['back','biceps'], equipment_needed: ['pullup_bar'], difficulty_level: 'intermediate', instruction_text: 'Full hang. Drive elbows to ribs, chest to bar if possible.', preference_default: 8 },
  { id: 'lat_pulldown', name: 'Lat Pulldown', movement_pattern: 'vertical_pull', primary_muscles: ['back','biceps'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Lean slightly back, pull to upper chest with elbows to pockets.', preference_default: 7 },
  { id: 'barbell_row', name: 'Barbell Row', movement_pattern: 'horizontal_pull', primary_muscles: ['back','biceps'], equipment_needed: ['barbell'], difficulty_level: 'intermediate', instruction_text: 'Hinge to 45°, pull bar to lower ribs keeping spine neutral.', preference_default: 7 },
  { id: 'seated_row', name: 'Seated Cable Row', movement_pattern: 'horizontal_pull', primary_muscles: ['back','biceps'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Chest tall, pull handle to navel, squeeze shoulder blades.', preference_default: 7 },
  { id: 'one_arm_row', name: 'One-Arm DB Row', movement_pattern: 'horizontal_pull', primary_muscles: ['back','biceps'], equipment_needed: ['dumbbells','bench'], difficulty_level: 'beginner', instruction_text: 'Knee and hand on bench, pull dumbbell to hip, squeeze lats.', preference_default: 6 },

  // Shoulders
  { id: 'ohp', name: 'Barbell Overhead Press', movement_pattern: 'vertical_push', primary_muscles: ['shoulders','triceps'], secondary_muscles: ['core'], equipment_needed: ['barbell'], difficulty_level: 'intermediate', instruction_text: 'Glutes tight, ribs down. Press overhead stacking wrist over elbow.', preference_default: 7 },
  { id: 'db_shoulder_press', name: 'DB Shoulder Press', movement_pattern: 'vertical_push', primary_muscles: ['shoulders','triceps'], equipment_needed: ['dumbbells','bench'], difficulty_level: 'beginner', instruction_text: 'Neutral spine, press up without flaring ribs.', preference_default: 6 },
  { id: 'lateral_raise', name: 'DB Lateral Raise', movement_pattern: 'vertical_push', primary_muscles: ['shoulders'], equipment_needed: ['dumbbells'], difficulty_level: 'beginner', instruction_text: 'Soft elbows, raise to shoulder height, lead with elbows.', preference_default: 6 },
  { id: 'rear_delt_fly', name: 'Rear Delt Fly', movement_pattern: 'horizontal_pull', primary_muscles: ['shoulders','back'], equipment_needed: ['dumbbells'], difficulty_level: 'beginner', instruction_text: 'Hinge forward, open arms wide, squeeze rear delts.', preference_default: 6 },
  { id: 'arnold_press', name: 'Arnold Press', movement_pattern: 'vertical_push', primary_muscles: ['shoulders'], secondary_muscles: ['triceps'], equipment_needed: ['dumbbells'], difficulty_level: 'intermediate', instruction_text: 'Rotate palms from facing you to away as you press.', preference_default: 6 },

  // Hamstrings
  { id: 'seated_leg_curl', name: 'Seated Leg Curl', movement_pattern: 'elbow_flexion', primary_muscles: ['hamstrings'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Sit with back against pad, curl weight by bending knees, squeeze hamstrings at peak contraction.', preference_default: 7 },
  { id: 'lying_leg_curl', name: 'Lying Leg Curl', movement_pattern: 'elbow_flexion', primary_muscles: ['hamstrings'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Lie face down, curl weight by bending knees, keep hips pressed into bench throughout movement.', preference_default: 7 },
  { id: 'romanian_deadlift', name: 'Romanian Deadlift', movement_pattern: 'hinge', primary_muscles: ['hamstrings'], secondary_muscles: ['glutes', 'back'], equipment_needed: ['barbell'], difficulty_level: 'intermediate', instruction_text: 'Hinge at hips, slide bar down legs, feel stretch in hamstrings, drive hips forward to stand.', preference_default: 8 },
]

export const SLOT_TEMPLATES: Record<WorkoutType, { id: string; label: string; muscles: MuscleGroup[] }[]> = {
  upper: [
    { id: 'chest', label: 'Chest', muscles: ['chest'] },
    { id: 'back', label: 'Back', muscles: ['back'] },    { id: 'shoulders', label: 'Shoulders', muscles: ['shoulders'] },
    { id: 'biceps', label: 'Biceps', muscles: ['biceps'] },
    { id: 'triceps', label: 'Triceps', muscles: ['triceps'] },
  ],
  lower: [
    { id: 'quads', label: 'Quads', muscles: ['quads'] },
    { id: 'hamstrings', label: 'Hamstrings', muscles: ['hamstrings'] },
    { id: 'glutes', label: 'Glutes', muscles: ['glutes'] },
    { id: 'calves', label: 'Calves', muscles: ['calves'] },
    { id: 'core', label: 'Core', muscles: ['core'] },
  ],
  full: [
    { id: 'chest', label: 'Chest', muscles: ['chest'] },
    { id: 'back', label: 'Back', muscles: ['back'] },
    { id: 'shoulders', label: 'Shoulders', muscles: ['shoulders'] },
    { id: 'biceps', label: 'Biceps', muscles: ['biceps'] },
    { id: 'triceps', label: 'Triceps', muscles: ['triceps'] },
    { id: 'quads', label: 'Quads', muscles: ['quads'] },
    { id: 'hamstrings', label: 'Hamstrings', muscles: ['hamstrings'] },
    { id: 'glutes', label: 'Glutes', muscles: ['glutes'] },
    { id: 'calves', label: 'Calves', muscles: ['calves'] },
    { id: 'core', label: 'Core', muscles: ['core'] },
  ],
}

export const recommendSets = (duration: number) => {
  if (duration >= 85) return 4
  if (duration >= 60) return 3
  return 2
}
export function filterExercisesByMuscles(muscles: MuscleGroup[], equipment: string[] = []): Exercise[] {
  const primary = EXERCISES.filter(e => e.primary_muscles.some(m => muscles.includes(m)))
  const secondary = EXERCISES.filter(e => !primary.includes(e) && (e.secondary_muscles || []).some(m => muscles.includes(m)))
  const list = [...primary, ...secondary]
  if (!equipment.length) return list
  return list.filter(e => e.equipment_needed.every(eq => equipment.includes(eq) || eq === 'machine'))
}