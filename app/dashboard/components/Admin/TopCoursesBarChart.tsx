"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, Cell } from "recharts";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";


interface ChartProps {
    data: {
        code: string;
        noteCount: number;
    }[];
}

// const chartData = [
//   { month: "January", desktop: 342 },
//   { month: "February", desktop: 876 },
//   { month: "March", desktop: 512 },
//   { month: "April", desktop: 629 },
//   { month: "May", desktop: 458 },
//   { month: "June", desktop: 781 },
//   { month: "July", desktop: 394 },
//   { month: "August", desktop: 925 },
//   { month: "September", desktop: 647 },
//   { month: "October", desktop: 532 },
//   { month: "November", desktop: 803 },
//   { month: "December", desktop: 271 },
// ];

const chartConfig = {
  noteCount: {
    label: "Notes",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function TopCoursesBarChart({ data }: ChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const activeData = React.useMemo(() => {
    if (activeIndex === null) return null;
    return data[activeIndex];
  }, [activeIndex]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Top courses
          <Badge
            variant="outline"
            className="text-green-500 bg-green-500/10 border-none ml-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>5.2%</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          {activeData
            ? `${activeData.code.toUpperCase()}: ${activeData.noteCount}`
            : "Top Courses by number of notes"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="85%"
              fill="url(#highlighted-pattern-dots)"
            />
            <defs>
              <DottedBackgroundPattern />
            </defs>
            <XAxis
              dataKey="code"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value: string) => value.slice(0, 8).toUpperCase()}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="noteCount" radius={4} fill="var(--color-chart-2)">
              {data.map((_, index) => (
                <Cell
                  className="duration-200"
                  key={`cell-${index}`}
                  fillOpacity={
                    activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
                  }
                  stroke={activeIndex === index ? "var(--color-chart-5)" : ""}
                  onMouseEnter={() => setActiveIndex(index)}
                  
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const DottedBackgroundPattern = () => {
  return (
    <pattern
      id="highlighted-pattern-dots"
      x="0"
      y="0"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
    >
      <circle
        className="text-muted"
        cx="2"
        cy="2"
        r="1"
        fill="currentColor"
      />
    </pattern>
  );
};
