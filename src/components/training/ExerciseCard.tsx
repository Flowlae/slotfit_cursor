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
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    dragFree: true, 
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    align: 'start'
  })

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className="w-full max-w-full">
      {/* Category Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{slot.label}</h3>
        <div className="text-xs sm:text-sm text-muted-foreground">
          {slot.recommendedSets} sets • {slot.alternatives.length} options
        </div>
      </div>
      
      {/* iPhone-style Carousel */}
      <div className="relative bg-gray-100/50 rounded-2xl p-4 sm:p-6 overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 sm:gap-4 px-1 sm:px-2">
            {slot.alternatives.map((ex) => (
              <button
                key={ex.id}
                onClick={() => onChoose(ex.id)}
                className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] rounded-xl p-4 sm:p-5 text-left transition-all duration-300 ease-out transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  slot.selectedExercises.some(selected => selected.exercise.id === ex.id)
                    ? 'bg-white shadow-xl border-2 border-blue-500 scale-[1.02] shadow-blue-100/50' 
                    : 'bg-white/80 hover:bg-white shadow-md hover:shadow-lg border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-sm sm:text-base leading-tight pr-2">{ex.name}</div>
                  <Info className="text-gray-400 h-4 w-4 flex-shrink-0 opacity-60" />
                </div>
                <div className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                  {ex.instruction_text}
                </div>
                <div className="flex flex-wrap gap-1">
                  {ex.primary_muscles.map((m) => (
                    <span key={m} className="text-[10px] sm:text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium capitalize">
                      {m}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Fade edges like iPhone camera */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-100/50 via-gray-100/30 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-100/50 via-gray-100/30 to-transparent" />
      </div>
    </div>
  )
}