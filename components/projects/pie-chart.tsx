"use client"

import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Completed", value: 400 },
  { name: "In Progress", value: 300 },
  { name: "Not Started", value: 300 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function PieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </RechartsChart>
    </ResponsiveContainer>
  )
}

