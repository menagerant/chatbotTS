"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview() {
  const [usersChart, setUsersChart] = useState([
    {
      name: "0/0",
      total: 0,
    },
    {
      name: "0/0",
      total: 0,
    },
    {
      name: "0/0",
      total: 0,
    },
    {
      name: "0/0",
      total: 0,
    },
    {
      name: "0/0",
      total: 0,
    },
    {
      name: "0/0",
      total: 0,
    },
    {
      name: "0/0",
      total: 0,
    },
  ]);

  useEffect(() => {
    const initializedData = async () => {
      // users chart
      const usersChart = await fetch("/api/chat/data/userschart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new Date()),
      });
      const usersChartData = await usersChart.json();
      setUsersChart(usersChartData);
    };
    initializedData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={usersChart}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="black"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `+${value}`}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
