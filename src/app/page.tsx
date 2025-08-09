'use client'

import TrainingModeSelector from '@/components/training/TrainingModeSelector'
import SlotBuilder from '@/components/training/SlotBuilder'
import BodyVisualizer from '@/components/training/BodyVisualizer'
import { WorkoutProvider, useWorkout } from '@/context/WorkoutContext'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import LoginPage from '@/components/auth/LoginPage'
import UserProfile from '@/components/auth/UserProfile'

function MainContent() {
  const { loading, exercises } = useWorkout()
  const { user, loading: authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage onLogin={() => {}} />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading exercises from database...</p>
          <p className="text-sm text-muted-foreground mt-2">Connected to Supabase! 🚀</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <UserProfile />
      <TrainingModeSelector />
      <BodyVisualizer />
      <SlotBuilder />
      <div className="text-center text-sm text-muted-foreground mt-8">
        <p>✅ Connected to Supabase! {exercises.length} exercises loaded from database</p>
        <p>👤 Welcome back, {user.user_metadata?.full_name || user.email}!</p>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <main className="min-h-screen">
          <header className="mx-auto max-w-6xl px-4 pt-12 pb-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Adaptive Strength Trainer
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Build powerful, balanced strength with a flexible slot-based system, 
              smart exercise swaps, and a live muscle coverage heat map.
            </p>
          </header>
          <section className="mx-auto max-w-6xl px-4 pb-20 w-full">
            <div className="space-y-6 w-full max-w-full">
              <MainContent />
            </div>
          </section>
        </main>
      </WorkoutProvider>
    </AuthProvider>
  )
}