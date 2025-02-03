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
import { BarBirads } from "@/lib/type";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";

const chartConfig = {
  count: {
    label: "Prediction",
  },
  BIRADS1: {
    label: "Birads 1",
  },
  BIRADS3: {
    label: "Birads 3",
  },
  BIRADS4: {
    label: "Birads 4",
  },
  BIRADS5: {
    label: "Birads 5",
  },
} satisfies ChartConfig;

export default function BarChartComponent() {
  const [chartData, setChartData] = useState<BarBirads[] | []>([]);

  useEffect(() => {
    api
      .get("/predict/chart")
      .then((res) => {
        setChartData(
          res.data.map((d: BarBirads, i: number) => ({
            ...d,
            fill: `hsl(var(--chart-${i}))`,
          })),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>No. of Predictions</CardTitle>
        <CardDescription>Last 24 Hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] max-h-96 w-full"
        >
          <BarChart barSize={100} accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="birads"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              dataKey="count"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
