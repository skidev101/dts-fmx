import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function StorageUsageChart({ used, limit }: { used: number; limit: number }) {
  const percent = Math.round((used / limit) * 100);

  const data = [
    {
      name: "Storage",
      percent,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={data}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="percent" fill="#6366f1" animationDuration={200} />
      </BarChart>
    </ResponsiveContainer>
  );
}
