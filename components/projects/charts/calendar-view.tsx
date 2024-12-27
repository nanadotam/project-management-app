"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const events = [
  { id: 1, name: "Project Kickoff", date: "2023-07-15" },
  { id: 2, name: "Design Review", date: "2023-07-20" },
  { id: 3, name: "Development Sprint", date: "2023-07-25" },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold p-2">{day}</div>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="p-2"></div>
        ))}
        {days.map(day => (
          <Card key={day} className="p-2">
            <CardContent className="p-0">
              <div className="font-semibold">{day}</div>
              {events
                .filter(event => new Date(event.date).getDate() === day)
                .map(event => (
                  <div key={event.id} className="text-xs mt-1 bg-primary/10 p-1 rounded">
                    {event.name}
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

