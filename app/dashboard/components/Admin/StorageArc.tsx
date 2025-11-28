// "use client";

// import { RadialBar, RadialBarChart } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// const chartData = [
//   { storage: "usage", visitors: 275, fill: "var(--color-chrome)" },
// //   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
// //   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
// //   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
// //   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
// //   chrome: {
// //     label: "Chrome",
// //     color: "var(--chart-1)",
// //   },
// //   safari: {
// //     label: "Safari",
// //     color: "var(--chart-2)",
// //   },
// //   firefox: {
// //     label: "Firefox",
// //     color: "var(--chart-3)",
// //   },
// //   edge: {
// //     label: "Edge",
// //     color: "var(--chart-4)",
// //   },
// //   other: {
// //     label: "Other",
// //     color: "var(--chart-5)",
// //   },
// } satisfies ChartConfig;

// export function DefaultRadialChart() {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Radial Chart</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel nameKey="browser" />}
//             />
//             <RadialBar
//               cornerRadius={10}
//               dataKey="visitors"
//               background
//               className="drop-shadow-lg"
//             />
//           </RadialBarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { RadialBarChart, RadialBar } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type Props = { storage: number };

export function StorageArc({ storage }: Props) {
  const used = Math.max(0, Math.min(100, storage));
  const free = 100; // inner ring always full (background)

  const chartData = [
    { name: "Background", value: free },
    { name: "Used", value: used },
  ];

  return (
    <Card className="rounded-3xl relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold">Storage</CardTitle>
        <CardDescription>Used vs Free</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center relative">
        <RadialBarChart
          width={260}
          height={260}
          innerRadius={70}
          outerRadius={120}
          barSize={28}
          startAngle={90}
          endAngle={-270}
          data={chartData}
        >
             <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#highlighted-pattern-dots)"
            />
            <defs>
              <DottedBackgroundPattern />
            </defs>
          {/* Inner ring: full circle, subtle muted color */}
          <RadialBar
            dataKey="value"
            cornerRadius={20}
            background={false}
            fill="var(--color-chart-2)" // subtle grey-blue
          />

          {/* Outer ring: percentage used */}
          <RadialBar
            dataKey="value"
            cornerRadius={20}
            background={false}
            fill="var(--color-chart-2)" // main blue color
          />
        </RadialBarChart>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-4xl font-bold">{used}%</p>
          <p className="text-sm text-muted-foreground">Used</p>
        </div>
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
