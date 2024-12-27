"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", progress: 0 },
  { name: "Feb", progress: 10 },
  { name: "Mar", progress: 25 },
  { name: "Apr", progress: 40 },
  { name: "May", progress: 60 },
  { name: "Jun", progress: 75 },
  { name: "Jul", progress: 100 },
]

export function TimelineView() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="progress" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

