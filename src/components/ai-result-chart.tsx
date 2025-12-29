"use client";

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export function AiResultChart({ score, color }: { score: number; color: string }) {
  const percentage = score * 100;

  return (
    <div className="relative h-48 w-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          barSize={12}
          data={[{ value: percentage }]}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background={{ fill: "hsl(var(--muted))" }}
            dataKey="value"
            cornerRadius={10}
            fill={color}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold font-headline text-foreground">
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
