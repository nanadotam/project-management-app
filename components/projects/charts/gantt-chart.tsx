"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useEffect } from 'react';

const data = [
  { task: "Research", start: 0, duration: 3 },
  { task: "Design", start: 3, duration: 4 },
  { task: "Development", start: 7, duration: 6 },
  { task: "Testing", start: 13, duration: 3 },
  { task: "Deployment", start: 16, duration: 2 },
]

export function GanttChart({ projectId }: { projectId: number }) {
  useEffect(() => {
    // Fetch project-specific Gantt chart data using projectId
    // For now, we'll use the mock data
  }, [projectId])
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" barSize={20}>
        <XAxis type="number" />
        <YAxis dataKey="task" type="category" />
        <Tooltip />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

