import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { birad: "b1", accuracy: 60, fill: "var(--color-b1)" },
  { birad: "b3", accuracy: 20, fill: "var(--color-b3)" },
  { birad: "b4", accuracy: 10, fill: "var(--color-b4)" },
  { birad: "b5", accuracy: 10, fill: "var(--color-b5)" },
];

const chartConfig = {
  accuracy: {
    label: "Accuracy (%)",
  },
  b1: {
    label: "Birads 1",
    color: "hsl(var(--chart-1))",
  },
  b3: {
    label: "Birads 3",
    color: "hsl(var(--chart-2))",
  },
  b4: {
    label: "Birads 4",
    color: "hsl(var(--chart-3))",
  },
  b5: {
    label: "Birads 5",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function PieChartComponent() {
  return (
    <div className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie
            data={chartData}
            dataKey="accuracy"
            nameKey="birad"
            innerRadius={60}
            strokeWidth={5}
            activeIndex={0}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector {...props} outerRadius={outerRadius + 10} />
            )}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        60%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Image 1
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
