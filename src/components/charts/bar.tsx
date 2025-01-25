import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
const chartData = [
  { birads: "Birad 1", prediction: 6, fill: "var(--color-birads1)" },
  { birads: "Birad 3", prediction: 2, fill: "var(--color-birads3)" },
  { birads: "Birad 4", prediction: 6, fill: "var(--color-birads4)" },
  { birads: "Birad 5", prediction: 6, fill: "var(--color-birads5)" },
];

const chartConfig = {
  prediction: {
    label: "Prediction",
  },
  birads1: {
    label: "Birads 1",
    color: "hsl(var(--chart-1))",
  },
  birads3: {
    label: "Birads 3",
    color: "hsl(var(--chart-2))",
  },
  birads4: {
    label: "Birads 4",
    color: "hsl(var(--chart-3))",
  },
  birads5: {
    label: "Birads 5",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function BarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No. of Predictions</CardTitle>
        <CardDescription>Last 24 Hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="birads"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              dataKey="prediction"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="prediction" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
