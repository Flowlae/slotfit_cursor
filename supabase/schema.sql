-- SlotFit Database Schema
-- Run this in your Supabase SQL editor

-- Create exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  movement_pattern TEXT,
  primary_muscles TEXT[],
  secondary_muscles TEXT[],
  equipment_needed TEXT[],
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  instruction_text TEXT,
  preference_default INTEGER DEFAULT 5 CHECK (preference_default >= 0 AND preference_default <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  exercise_id TEXT REFERENCES exercises(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 0 AND rating <= 10),
  last_performed TIMESTAMP WITH TIME ZONE,
  times_performed INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, exercise_id)
);
-- Create workout_sessions table for tracking
CREATE TABLE IF NOT EXISTS workout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  workout_type TEXT CHECK (workout_type IN ('upper', 'lower', 'full')),
  duration_minutes INTEGER,
  exercises_completed JSONB,
  muscle_coverage JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_exercises_movement_pattern ON exercises(movement_pattern);
CREATE INDEX idx_exercises_primary_muscles ON exercises USING GIN(primary_muscles);
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_workout_sessions_user_id ON workout_sessions(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for exercises (public read)
CREATE POLICY "Exercises are viewable by everyone" ON exercises
  FOR SELECT USING (true);

-- Policies for user_preferences (users can only see/edit their own)
CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences" ON user_preferences
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for workout_sessions
CREATE POLICY "Users can view own sessions" ON workout_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON workout_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample exercises
INSERT INTO exercises (id, name, movement_pattern, primary_muscles, secondary_muscles, equipment_needed, difficulty_level, instruction_text, preference_default)
VALUES 
  -- Chest exercises
  ('bench_press', 'Barbell Bench Press', 'horizontal_push', ARRAY['chest','triceps','shoulders'], NULL, ARRAY['barbell','bench'], 'intermediate', 'Feet planted, shoulder blades retracted, bar to mid-chest, press to lockout.', 8),
  ('db_incline_press', 'DB Incline Press', 'horizontal_push', ARRAY['chest','shoulders','triceps'], NULL, ARRAY['dumbbells','bench'], 'beginner', 'Set bench 30°. Dumbbells to upper chest, press up and in.', 7),
  ('push_up', 'Push-Up', 'horizontal_push', ARRAY['chest','triceps','shoulders'], NULL, ARRAY[]::TEXT[], 'beginner', 'Body in a straight line, chest to floor, press up without flaring.', 7),
  
  -- Back exercises
  ('pull_up', 'Pull-Up', 'vertical_pull', ARRAY['back','biceps'], NULL, ARRAY['pullup_bar'], 'intermediate', 'Full hang. Drive elbows to ribs, chest to bar if possible.', 8),
  ('lat_pulldown', 'Lat Pulldown', 'vertical_pull', ARRAY['back','biceps'], NULL, ARRAY['machine'], 'beginner', 'Lean slightly back, pull to upper chest with elbows to pockets.', 7),
  ('barbell_row', 'Barbell Row', 'horizontal_pull', ARRAY['back','biceps'], NULL, ARRAY['barbell'], 'intermediate', 'Hinge to 45°, pull bar to lower ribs keeping spine neutral.', 7),
  
  -- Shoulder exercises
  ('ohp', 'Barbell Overhead Press', 'vertical_push', ARRAY['shoulders','triceps'], ARRAY['core'], ARRAY['barbell'], 'intermediate', 'Glutes tight, ribs down. Press overhead stacking wrist over elbow.', 7),
  ('db_shoulder_press', 'DB Shoulder Press', 'vertical_push', ARRAY['shoulders','triceps'], NULL, ARRAY['dumbbells','bench'], 'beginner', 'Neutral spine, press up without flaring ribs.', 6),
  ('lateral_raise', 'DB Lateral Raise', 'vertical_push', ARRAY['shoulders'], NULL, ARRAY['dumbbells'], 'beginner', 'Soft elbows, raise to shoulder height, lead with elbows.', 6)ON CONFLICT (id) DO NOTHING;

-- Add more exercises as needed...
-- You can expand this with the full exercise list from the original data