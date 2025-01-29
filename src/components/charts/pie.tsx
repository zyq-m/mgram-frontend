import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Birads } from "@/lib/type";
import { useEffect, useState } from "react";

const chartConfig = {
  accuracy: {
    label: "Accuracy (%)",
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

export default function PieChartComponent({
  chartData,
  imgIdx,
}: {
  chartData: Birads;
  imgIdx: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Find the index with the highest accuracy
    const maxIndex = chartData.prediction.reduce(
      (maxIdx, current, idx, array) =>
        current.accuracy > array[maxIdx].accuracy ? idx : maxIdx,
      0,
    );

    setActiveIndex(maxIndex);
  }, []);

  return (
    <div className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie
            data={chartData?.prediction.map((d, i) => ({
              ...d,
              fill: `hsl(var(--chart-${i + 1}))`,
            }))}
            dataKey="accuracy"
            nameKey="birad"
            innerRadius={60}
            strokeWidth={5}
            activeIndex={activeIndex}
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
                        className="fill-foreground text-xl font-bold capitalize"
                      >
                        {chartData?.highest}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Image {imgIdx}
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
