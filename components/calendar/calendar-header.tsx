"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { NewEventDialog } from "./new-event-dialog"

export function CalendarHeader() {
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button onClick={() => setIsNewEventDialogOpen(true)}>
        <CalendarIcon className="mr-2 h-4 w-4" /> New Event
      </Button>
      <NewEventDialog
        isOpen={isNewEventDialogOpen}
        onClose={() => setIsNewEventDialogOpen(false)}
      />
    </div>
  )
}

