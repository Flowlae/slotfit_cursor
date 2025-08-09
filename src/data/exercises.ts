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

  // Quad exercises
  { id: 'squat', name: 'Barbell Squat', movement_pattern: 'squat', primary_muscles: ['quads'], secondary_muscles: ['glutes', 'hamstrings', 'core'], equipment_needed: ['barbell'], difficulty_level: 'intermediate', instruction_text: 'Feet shoulder-width, bar on upper back, squat down until thighs are parallel to ground.', preference_default: 9 },
  { id: 'leg_press', name: 'Leg Press', movement_pattern: 'squat', primary_muscles: ['quads'], secondary_muscles: ['glutes', 'hamstrings'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Feet shoulder-width on platform, press through heels, don\'t lock knees at top.', preference_default: 7 },
  { id: 'leg_extension', name: 'Leg Extension', movement_pattern: 'squat', primary_muscles: ['quads'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Sit with back against pad, extend knees to lift weight, squeeze quads at top.', preference_default: 6 },

  // Core exercises
  { id: 'plank', name: 'Plank', movement_pattern: 'core', primary_muscles: ['core'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'Hold body in straight line from head to heels, engage core muscles.', preference_default: 6 },
  { id: 'crunches', name: 'Crunches', movement_pattern: 'core', primary_muscles: ['core'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'Lie on back, knees bent, lift shoulders off ground using core muscles.', preference_default: 5 },
  { id: 'russian_twist', name: 'Russian Twist', movement_pattern: 'core', primary_muscles: ['core'], equipment_needed: [], difficulty_level: 'intermediate', instruction_text: 'Sit with knees bent, lean back, rotate torso side to side while keeping core engaged.', preference_default: 6 },
  { id: 'mountain_climber', name: 'Mountain Climber', movement_pattern: 'core', primary_muscles: ['core'], secondary_muscles: ['shoulders'], equipment_needed: [], difficulty_level: 'intermediate', instruction_text: 'Start in plank position, drive knees alternately toward chest while maintaining core stability.', preference_default: 6 },
  { id: 'dead_bug', name: 'Dead Bug', movement_pattern: 'core', primary_muscles: ['core'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'Lie on back, arms and legs up, slowly extend opposite arm and leg while keeping core tight.', preference_default: 5 },

  // Glutes exercises
  { id: 'hip_thrust', name: 'Hip Thrust', movement_pattern: 'hinge', primary_muscles: ['glutes'], secondary_muscles: ['hamstrings'], equipment_needed: ['barbell', 'bench'], difficulty_level: 'intermediate', instruction_text: 'Sit on ground with back against bench, bar on hips, drive hips up to full extension.', preference_default: 8 },
  { id: 'glute_bridge', name: 'Glute Bridge', movement_pattern: 'hinge', primary_muscles: ['glutes'], secondary_muscles: ['hamstrings'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'Lie on back, knees bent, feet flat, drive hips up while squeezing glutes.', preference_default: 6 },
  { id: 'donkey_kick', name: 'Donkey Kick', movement_pattern: 'hinge', primary_muscles: ['glutes'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'On hands and knees, kick one leg up and back, focusing on glute contraction.', preference_default: 5 },
  { id: 'fire_hydrant', name: 'Fire Hydrant', movement_pattern: 'hinge', primary_muscles: ['glutes'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'On hands and knees, lift one leg out to the side, keeping knee bent at 90 degrees.', preference_default: 5 },
  { id: 'clamshell', name: 'Clamshell', movement_pattern: 'hinge', primary_muscles: ['glutes'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'Lie on side, knees bent, open top knee like a clamshell while keeping feet together.', preference_default: 4 },

  // Calves exercises
  { id: 'standing_calf_raise', name: 'Standing Calf Raise', movement_pattern: 'calves', primary_muscles: ['calves'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Stand on platform, lower heels below level, then raise up on toes as high as possible.', preference_default: 6 },
  { id: 'seated_calf_raise', name: 'Seated Calf Raise', movement_pattern: 'calves', primary_muscles: ['calves'], equipment_needed: ['machine'], difficulty_level: 'beginner', instruction_text: 'Sit with weight on knees, raise heels up and down through full range of motion.', preference_default: 6 },
  { id: 'donkey_calf_raise', name: 'Donkey Calf Raise', movement_pattern: 'calves', primary_muscles: ['calves'], equipment_needed: ['machine'], difficulty_level: 'intermediate', instruction_text: 'Bend forward at hips, weight on lower back, raise heels up and down.', preference_default: 7 },
  { id: 'single_leg_calf_raise', name: 'Single Leg Calf Raise', movement_pattern: 'calves', primary_muscles: ['calves'], equipment_needed: [], difficulty_level: 'intermediate', instruction_text: 'Stand on one leg, raise heel up and down, focus on full range of motion.', preference_default: 6 },
  { id: 'jump_rope', name: 'Jump Rope', movement_pattern: 'calves', primary_muscles: ['calves'], secondary_muscles: ['core'], equipment_needed: ['jump_rope'], difficulty_level: 'beginner', instruction_text: 'Bounce on balls of feet, keep jumps small and controlled, maintain rhythm.', preference_default: 5 },

  // Additional Quad exercises
  { id: 'front_squat', name: 'Front Squat', movement_pattern: 'squat', primary_muscles: ['quads'], secondary_muscles: ['glutes', 'core'], equipment_needed: ['barbell'], difficulty_level: 'advanced', instruction_text: 'Bar on front of shoulders, elbows up, squat down keeping chest upright.', preference_default: 8 },
  { id: 'goblet_squat', name: 'Goblet Squat', movement_pattern: 'squat', primary_muscles: ['quads'], secondary_muscles: ['glutes', 'core'], equipment_needed: ['dumbbells'], difficulty_level: 'beginner', instruction_text: 'Hold dumbbell at chest, squat down keeping elbows close to body.', preference_default: 7 },
  { id: 'split_squat', name: 'Split Squat', movement_pattern: 'squat', primary_muscles: ['quads'], secondary_muscles: ['glutes', 'hamstrings'], equipment_needed: ['dumbbells'], difficulty_level: 'intermediate', instruction_text: 'One foot forward, one back, squat down keeping torso upright.', preference_default: 7 },
  { id: 'step_up', name: 'Step Up', movement_pattern: 'squat', primary_muscles: ['quads'], secondary_muscles: ['glutes'], equipment_needed: ['dumbbells', 'bench'], difficulty_level: 'beginner', instruction_text: 'Step up onto bench with one leg, drive through heel to stand up.', preference_default: 6 },
  { id: 'wall_sit', name: 'Wall Sit', movement_pattern: 'squat', primary_muscles: ['quads'], secondary_muscles: ['glutes'], equipment_needed: [], difficulty_level: 'beginner', instruction_text: 'Back against wall, slide down to sitting position, hold with thighs parallel to ground.', preference_default: 5 },

  // Additional Hamstring exercises
  { id: 'good_morning', name: 'Good Morning', movement_pattern: 'hinge', primary_muscles: ['hamstrings'], secondary_muscles: ['glutes', 'back'], equipment_needed: ['barbell'], difficulty_level: 'intermediate', instruction_text: 'Bar on upper back, hinge at hips, lower torso until parallel to ground.', preference_default: 7 },
  { id: 'single_leg_deadlift', name: 'Single Leg Deadlift', movement_pattern: 'hinge', primary_muscles: ['hamstrings'], secondary_muscles: ['glutes'], equipment_needed: ['dumbbells'], difficulty_level: 'intermediate', instruction_text: 'Stand on one leg, hinge at hip, lower dumbbell toward ground while lifting other leg.', preference_default: 7 },
  { id: 'glute_ham_raise', name: 'Glute Ham Raise', movement_pattern: 'hinge', primary_muscles: ['hamstrings'], secondary_muscles: ['glutes'], equipment_needed: ['machine'], difficulty_level: 'advanced', instruction_text: 'Kneel on machine, lower body forward, then pull back up using hamstrings.', preference_default: 8 },
  { id: 'nordic_curl', name: 'Nordic Curl', movement_pattern: 'hinge', primary_muscles: ['hamstrings'], equipment_needed: [], difficulty_level: 'advanced', instruction_text: 'Kneel with feet secured, lower body forward, then pull back up using hamstrings.', preference_default: 8 },
  { id: 'swiss_ball_curl', name: 'Swiss Ball Curl', movement_pattern: 'hinge', primary_muscles: ['hamstrings'], secondary_muscles: ['glutes'], equipment_needed: ['swiss_ball'], difficulty_level: 'intermediate', instruction_text: 'Lie on back, feet on ball, bridge hips up, curl ball toward body.', preference_default: 6 },
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
export function filterExercisesByMuscles(muscles: MuscleGroup[], equipment: string[] = [], exercises: Exercise[] = EXERCISES): Exercise[] {
  const primary = exercises.filter(e => e.primary_muscles.some(m => muscles.includes(m)))
  const secondary = exercises.filter(e => !primary.includes(e) && (e.secondary_muscles || []).some(m => muscles.includes(m)))
  const list = [...primary, ...secondary]
  if (!equipment.length) return list
  return list.filter(e => e.equipment_needed.every(eq => equipment.includes(eq) || eq === 'machine'))
}