# SlotFit - Adaptive Hypertrophy Trainer

A modern, flexible hypertrophy training app built with Next.js 14, TypeScript, and Supabase.

## 🚀 Features

- **Slot-Based Training System**: RPG-inspired exercise selection
- **Real-Time Muscle Coverage**: Visual heat map showing targeted muscles
- **Smart Exercise Swapping**: Preference-based alternatives
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Dark/Light Mode**: Adapts to system preferences

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Database**: Supabase
- **State Management**: React Context
- **Carousel**: Embla Carousel
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/slotfit.git
cd slotfit
```
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🗄 Database Setup (Supabase)

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run this SQL in the SQL editor:

```sql
-- Create exercises table
CREATE TABLE exercises (
  id TEXT PRIMARY KEY,  name TEXT NOT NULL,
  movement_pattern TEXT,
  primary_muscles TEXT[],
  secondary_muscles TEXT[],
  equipment_needed TEXT[],
  difficulty_level TEXT,
  instruction_text TEXT,
  preference_default INTEGER DEFAULT 5
);

-- Create user preferences table (for future features)
CREATE TABLE user_preferences (
  user_id UUID REFERENCES auth.users,
  exercise_id TEXT REFERENCES exercises(id),
  rating INTEGER CHECK (rating >= 0 AND rating <= 10),
  PRIMARY KEY (user_id, exercise_id)
);

-- Insert sample exercises (optional)
INSERT INTO exercises (id, name, movement_pattern, primary_muscles, equipment_needed, difficulty_level, instruction_text, preference_default)
VALUES 
  ('bench_press', 'Barbell Bench Press', 'horizontal_push', ARRAY['chest','triceps','shoulders'], ARRAY['barbell','bench'], 'intermediate', 'Feet planted, shoulder blades retracted, bar to mid-chest, press to lockout.', 8),
  ('pull_up', 'Pull-Up', 'vertical_pull', ARRAY['back','biceps'], ARRAY['pullup_bar'], 'intermediate', 'Full hang. Drive elbows to ribs, chest to bar if possible.', 8);
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel:
```bash
npx vercel
```

3. Add environment variables in Vercel dashboard

4. Deploy:
```bash
vercel --prod
```

## 📝 Project Structure

```
src/
├── app/              # Next.js app router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── ui/          # Shadcn/ui components
│   └── training/    # Training-specific components
├── context/         # React context providers
├── data/            # Static data and types
└── lib/             # Utilities and configs
```

## 🎨 Design System

- **Colors**: Deep red primary with orange accents
- **Typography**: System font stack with clear hierarchy
- **Spacing**: Consistent Tailwind scale
- **Components**: Shadcn/ui for consistency
## 🔧 Development

### Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding Components

Use shadcn/ui CLI to add components:
```bash
npx shadcn-ui@latest add [component-name]
```

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## 💬 Support

For questions and support, please open an issue on GitHub.

---

Built with ❤️ for the fitness community