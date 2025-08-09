'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SlotState } from '@/context/WorkoutContext'
import { Info } from 'lucide-react'

interface Props {
  slot: SlotState
  onChoose: (exerciseId: string) => void
}

export default function ExerciseCard({ slot, onChoose }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' })

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">{slot.label}</CardTitle>
        <div className="text-xs text-muted-foreground">
          {slot.recommendedSets} sets • {slot.alternatives.length} options
        </div>
      </CardHeader>
      <CardContent>        <p className="mb-3 text-sm text-muted-foreground">
          Choose one {slot.label} exercise ({slot.alternatives.length} options)
        </p>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {slot.alternatives.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => onChoose(ex.id)}
                  className={`shrink-0 w-[260px] rounded-lg border p-4 text-left transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    ex.id === slot.currentExercise.id ? 'ring-2 ring-ring' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-medium">{ex.name}</div>
                    <Info className="text-muted-foreground h-4 w-4" aria-hidden aria-label="Exercise info" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {ex.instruction_text}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1 text-[10px] text-muted-foreground">
                    {ex.primary_muscles.map((m) => (
                      <span key={m} className="rounded-full border px-2 py-0.5">{m}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
        </div>
        <div className="mt-3 flex justify-between">
          <Button variant="secondary" size="sm" onClick={scrollPrev}>
            Prev
          </Button>
          <Button variant="secondary" size="sm" onClick={scrollNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}