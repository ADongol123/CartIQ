"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function AdminActivityChart() {
  // Sample data for the chart
  const data = [
    { name: "Mon", users: 400, interactions: 2400 },
    { name: "Tue", users: 300, interactions: 1398 },
    { name: "Wed", users: 500, interactions: 3800 },
    { name: "Thu", users: 450, interactions: 3908 },
    { name: "Fri", users: 470, interactions: 4800 },
    { name: "Sat", users: 200, interactions: 1800 },
    { name: "Sun", users: 180, interactions: 1500 },
  ]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="interactions" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
