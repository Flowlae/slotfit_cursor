'use client'

import { useWorkout } from '@/context/WorkoutContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function heatToColor(value: number) {
  // Map 0..1 => 120 (green) to 0 (red) with brighter yellow and true orange
  const hue = Math.max(0, Math.min(120, 120 - Math.round(value * 120)))
  const saturation = 95
  const lightness = hue >= 45 && hue <= 70 ? 60 : 52
  return `hsl(${hue} ${saturation}% ${lightness}%)`
}

export default function BodyVisualizer() {
  const { muscleHeat } = useWorkout()

  const groups: { key: keyof typeof muscleHeat; label: string }[] = [
    { key: 'chest', label: 'Chest' },
    { key: 'back', label: 'Back' },
    { key: 'shoulders', label: 'Shoulders' },
    { key: 'biceps', label: 'Biceps' },
    { key: 'triceps', label: 'Triceps' },
    { key: 'quads', label: 'Quads' },
    { key: 'hamstrings', label: 'Hamstrings' },
    { key: 'glutes', label: 'Glutes' },
    { key: 'calves', label: 'Calves' },
    { key: 'core', label: 'Core' },
  ]
  return (
    <Card className="border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <CardHeader>
        <CardTitle className="text-xl">Muscle Coverage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {groups.map(({ key, label }) => (
            <div key={key} className="rounded-lg border p-3">
              <div className="mb-2 text-sm text-muted-foreground">{label}</div>
              <div
                className="h-3 w-full rounded-full"
                aria-label={`${label} heat ${(muscleHeat[key] * 100).toFixed(0)}%`}
                style={{ backgroundColor: heatToColor(muscleHeat[key]) }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}