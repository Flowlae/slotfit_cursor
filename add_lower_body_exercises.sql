-- Add comprehensive lower body exercises to SlotFit database
-- Run this in your Supabase SQL editor

-- Core exercises
INSERT INTO exercises (id, name, movement_pattern, primary_muscles, secondary_muscles, equipment_needed, difficulty_level, instruction_text, preference_default)
VALUES 
  ('russian_twist', 'Russian Twist', 'core', ARRAY['core'], NULL, ARRAY[]::TEXT[], 'intermediate', 'Sit with knees bent, lean back, rotate torso side to side while keeping core engaged.', 6),
  ('mountain_climber', 'Mountain Climber', 'core', ARRAY['core'], ARRAY['shoulders'], ARRAY[]::TEXT[], 'intermediate', 'Start in plank position, drive knees alternately toward chest while maintaining core stability.', 6),
  ('dead_bug', 'Dead Bug', 'core', ARRAY['core'], NULL, ARRAY[]::TEXT[], 'beginner', 'Lie on back, arms and legs up, slowly extend opposite arm and leg while keeping core tight.', 5)
ON CONFLICT (id) DO NOTHING;

-- Glutes exercises
INSERT INTO exercises (id, name, movement_pattern, primary_muscles, secondary_muscles, equipment_needed, difficulty_level, instruction_text, preference_default)
VALUES 
  ('hip_thrust', 'Hip Thrust', 'hinge', ARRAY['glutes'], ARRAY['hamstrings'], ARRAY['barbell', 'bench'], 'intermediate', 'Sit on ground with back against bench, bar on hips, drive hips up to full extension.', 8),
  ('glute_bridge', 'Glute Bridge', 'hinge', ARRAY['glutes'], ARRAY['hamstrings'], ARRAY[]::TEXT[], 'beginner', 'Lie on back, knees bent, feet flat, drive hips up while squeezing glutes.', 6),
  ('donkey_kick', 'Donkey Kick', 'hinge', ARRAY['glutes'], NULL, ARRAY[]::TEXT[], 'beginner', 'On hands and knees, kick one leg up and back, focusing on glute contraction.', 5),
  ('fire_hydrant', 'Fire Hydrant', 'hinge', ARRAY['glutes'], NULL, ARRAY[]::TEXT[], 'beginner', 'On hands and knees, lift one leg out to the side, keeping knee bent at 90 degrees.', 5),
  ('clamshell', 'Clamshell', 'hinge', ARRAY['glutes'], NULL, ARRAY[]::TEXT[], 'beginner', 'Lie on side, knees bent, open top knee like a clamshell while keeping feet together.', 4)
ON CONFLICT (id) DO NOTHING;

-- Calves exercises
INSERT INTO exercises (id, name, movement_pattern, primary_muscles, secondary_muscles, equipment_needed, difficulty_level, instruction_text, preference_default)
VALUES 
  ('standing_calf_raise', 'Standing Calf Raise', 'calves', ARRAY['calves'], NULL, ARRAY['machine'], 'beginner', 'Stand on platform, lower heels below level, then raise up on toes as high as possible.', 6),
  ('seated_calf_raise', 'Seated Calf Raise', 'calves', ARRAY['calves'], NULL, ARRAY['machine'], 'beginner', 'Sit with weight on knees, raise heels up and down through full range of motion.', 6),
  ('donkey_calf_raise', 'Donkey Calf Raise', 'calves', ARRAY['calves'], NULL, ARRAY['machine'], 'intermediate', 'Bend forward at hips, weight on lower back, raise heels up and down.', 7),
  ('single_leg_calf_raise', 'Single Leg Calf Raise', 'calves', ARRAY['calves'], NULL, ARRAY[]::TEXT[], 'intermediate', 'Stand on one leg, raise heel up and down, focus on full range of motion.', 6),
  ('jump_rope', 'Jump Rope', 'calves', ARRAY['calves'], ARRAY['core'], ARRAY['jump_rope'], 'beginner', 'Bounce on balls of feet, keep jumps small and controlled, maintain rhythm.', 5)
ON CONFLICT (id) DO NOTHING;

-- Additional Quad exercises
INSERT INTO exercises (id, name, movement_pattern, primary_muscles, secondary_muscles, equipment_needed, difficulty_level, instruction_text, preference_default)
VALUES 
  ('front_squat', 'Front Squat', 'squat', ARRAY['quads'], ARRAY['glutes', 'core'], ARRAY['barbell'], 'advanced', 'Bar on front of shoulders, elbows up, squat down keeping chest upright.', 8),
  ('goblet_squat', 'Goblet Squat', 'squat', ARRAY['quads'], ARRAY['glutes', 'core'], ARRAY['dumbbells'], 'beginner', 'Hold dumbbell at chest, squat down keeping elbows close to body.', 7),
  ('split_squat', 'Split Squat', 'squat', ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['dumbbells'], 'intermediate', 'One foot forward, one back, squat down keeping torso upright.', 7),
  ('step_up', 'Step Up', 'squat', ARRAY['quads'], ARRAY['glutes'], ARRAY['dumbbells', 'bench'], 'beginner', 'Step up onto bench with one leg, drive through heel to stand up.', 6),
  ('wall_sit', 'Wall Sit', 'squat', ARRAY['quads'], ARRAY['glutes'], ARRAY[]::TEXT[], 'beginner', 'Back against wall, slide down to sitting position, hold with thighs parallel to ground.', 5)
ON CONFLICT (id) DO NOTHING;

-- Additional Hamstring exercises
INSERT INTO exercises (id, name, movement_pattern, primary_muscles, secondary_muscles, equipment_needed, difficulty_level, instruction_text, preference_default)
VALUES 
  ('good_morning', 'Good Morning', 'hinge', ARRAY['hamstrings'], ARRAY['glutes', 'back'], ARRAY['barbell'], 'intermediate', 'Bar on upper back, hinge at hips, lower torso until parallel to ground.', 7),
  ('single_leg_deadlift', 'Single Leg Deadlift', 'hinge', ARRAY['hamstrings'], ARRAY['glutes'], ARRAY['dumbbells'], 'intermediate', 'Stand on one leg, hinge at hip, lower dumbbell toward ground while lifting other leg.', 7),
  ('glute_ham_raise', 'Glute Ham Raise', 'hinge', ARRAY['hamstrings'], ARRAY['glutes'], ARRAY['machine'], 'advanced', 'Kneel on machine, lower body forward, then pull back up using hamstrings.', 8),
  ('nordic_curl', 'Nordic Curl', 'hinge', ARRAY['hamstrings'], NULL, ARRAY[]::TEXT[], 'advanced', 'Kneel with feet secured, lower body forward, then pull back up using hamstrings.', 8),
  ('swiss_ball_curl', 'Swiss Ball Curl', 'hinge', ARRAY['hamstrings'], ARRAY['glutes'], ARRAY['swiss_ball'], 'intermediate', 'Lie on back, feet on ball, bridge hips up, curl ball toward body.', 6)
ON CONFLICT (id) DO NOTHING;
