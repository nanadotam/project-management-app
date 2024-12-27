"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { task: "Task 1", start: 0, duration: 3 },
  { task: "Task 2", start: 2, duration: 4 },
  { task: "Task 3", start: 5, duration: 2 },
  { task: "Task 4", start: 7, duration: 3 },
]

export function GanttChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" barSize={20}>
        <XAxis type="number" />
        <YAxis dataKey="task" type="category" />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

