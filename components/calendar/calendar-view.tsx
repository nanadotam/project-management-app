"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for events
const events = [
  { id: 1, name: "Team Meeting", date: "2023-07-15", time: "10:00" },
  { id: 2, name: "Project Deadline", date: "2023-07-20", time: "18:00" },
  { id: 3, name: "Client Presentation", date: "2023-07-25", time: "14:00" },
]

export function CalendarView() {
  const [currentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
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
                  {event.name} - {event.time}
                </div>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

