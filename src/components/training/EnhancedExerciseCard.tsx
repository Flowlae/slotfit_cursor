'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SlotState, SelectedExercise } from '@/context/WorkoutContext'
import { Info, Plus, Minus, Plus as PlusIcon } from 'lucide-react'

interface Props {
  slot: SlotState
  onChoose: (exerciseId: string) => void
  onAdd: (exerciseId: string) => void
  onRemove: (exerciseId: string) => void
  onUpdateSets: (exerciseId: string, sets: number) => void
}

export default function EnhancedExerciseCard({ slot, onChoose, onAdd, onRemove, onUpdateSets }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    dragFree: true, 
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    align: 'start'
  })

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const isExerciseSelected = (exerciseId: string) => {
    return slot.selectedExercises.some(selected => selected.exercise.id === exerciseId)
  }

  const getSelectedExercise = (exerciseId: string): SelectedExercise | undefined => {
    return slot.selectedExercises.find(selected => selected.exercise.id === exerciseId)
  }

  return (
    <div className="w-full max-w-full">
      {/* Category Header with Summary */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{slot.label}</h3>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {slot.selectedExercises.length > 0 
              ? `${slot.selectedExercises.length} selected • ${slot.totalSets} sets`
              : `${slot.alternatives.length} options available`
            }
          </div>
        </div>
      </div>
      
      {/* Summary View of Selected Exercises */}
      {slot.selectedExercises.length > 0 ? (
        <div className="mb-4 bg-blue-50 rounded-lg p-4 transition-all duration-300">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Exercises:</h4>
          <div className="space-y-1">
            {slot.selectedExercises.map((selected) => (
              <div key={selected.exercise.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-800">{selected.exercise.name}</span>
                <span className="text-blue-600 font-semibold">{selected.sets} sets</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-blue-200">
            <div className="flex justify-between text-sm font-semibold">
              <span>Total:</span>
              <span className="text-blue-700">{slot.selectedExercises.length} exercises • {slot.totalSets} sets</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 bg-gray-50 rounded-lg p-4 transition-all duration-300">
          <div className="text-center text-sm text-gray-600">
            <p>No exercises selected for {slot.label}</p>
            <p className="text-xs mt-1">Click on exercises below to add them to your workout</p>
          </div>
        </div>
      )}
      
      {/* Exercise Selection Carousel */}
      <div className="relative bg-gray-100/50 rounded-2xl p-4 sm:p-6 overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 sm:gap-4 px-1 sm:px-2">
            {slot.alternatives.map((ex) => {
              const isSelected = isExerciseSelected(ex.id)
              const selectedExercise = getSelectedExercise(ex.id)
              
              return (
                <div
                  key={ex.id}
                  className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] rounded-[14px] transition-all duration-300 ease-in-out cursor-pointer p-4 sm:p-5 relative ${
                    isSelected 
                      ? 'bg-white shadow-2xl' 
                      : 'bg-white/80 hover:bg-white shadow-md hover:shadow-xl'
                  }`}
                  onClick={() => isSelected ? onRemove(ex.id) : onAdd(ex.id)}
                >
                  {isSelected && (
                    <div 
                      className="absolute inset-0 rounded-[14px] pointer-events-none"
                      style={{
                        background: 'transparent',
                        border: '2.5px solid #dc2626',
                        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                      }}
                    />
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-sm sm:text-base leading-tight pr-2">{ex.name}</div>
                    <Info className="text-gray-400 h-4 w-4 flex-shrink-0 opacity-60" />
                  </div>
                  <div className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {ex.instruction_text}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {ex.primary_muscles.map((m) => (
                        <span key={m} className="text-[10px] sm:text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium capitalize">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Set Selector for Individual Exercise */}
                  {isSelected ? (
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            onUpdateSets(ex.id, selectedExercise!.sets - 1)
                          }}
                          disabled={selectedExercise!.sets <= 1}
                          className="h-7 w-7 p-0 border-gray-300 hover:border-red-300 hover:bg-red-50"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium min-w-[3rem] text-center text-red-600 transition-all duration-200">
                          {selectedExercise!.sets} sets
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            onUpdateSets(ex.id, selectedExercise!.sets + 1)
                          }}
                          disabled={selectedExercise!.sets >= 5}
                          className="h-7 w-7 p-0 border-gray-300 hover:border-red-300 hover:bg-red-50"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-red-600 font-medium">
                        Click to remove
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex justify-center">
                      <div className="text-xs text-gray-500 font-medium">
                        Click to add
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Fade edges like iPhone camera */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-100/50 via-gray-100/30 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-100/50 via-gray-100/30 to-transparent" />
      </div>
    </div>
  )
}
