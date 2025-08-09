'use client'

import { useWorkout } from '@/context/WorkoutContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export default function TrainingModeSelector() {
  const { type, setType, duration, setDuration, regenerate } = useWorkout()

  return (
    <Card className="border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <CardHeader>
        <CardTitle className="text-xl">What are you planning to train today?</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="split">Split</Label>
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger id="split" aria-label="Workout split">
              <SelectValue placeholder="Select split" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upper">Upper Body</SelectItem>
              <SelectItem value="lower">Lower Body</SelectItem>
              <SelectItem value="full">Full Body</SelectItem>
            </SelectContent>
          </Select>
        </div>        <div className="grid gap-2">
          <Label>Duration (min)</Label>
          <div className="px-1">
            <Slider value={[duration]} min={30} max={90} step={15} onValueChange={(v) => setDuration(v[0])} />
          </div>
          <div className="text-sm text-muted-foreground">{duration} minutes</div>
        </div>
        <div className="flex items-end">
          <Button onClick={regenerate} variant="hero" size="lg" className="w-full">Generate Session</Button>
        </div>
      </CardContent>
    </Card>
  )
}