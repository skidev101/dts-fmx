"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export function RadialGauge({
  percent,
  size = 180,
  strokeWidth = 32,
  color = "#4a54e2", // indigo-500
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const data = [
    { name: "Used", value: percent },
    { name: "Free", value: 100 - percent },
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius={size / 2 - strokeWidth}
            outerRadius={size / 2}
            paddingAngle={2}
            dataKey="value"
          >
            <Cell fill={color} />
            <Cell fill="#ced0d4" /> {/* tailwind gray-200 */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text */}
      <span className="absolute text-2xl font-semibold">
        {Math.round(percent)}%
      </span>
    </div>
  );
}
