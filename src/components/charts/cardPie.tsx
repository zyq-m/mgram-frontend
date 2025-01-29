import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PieChartComponent from "./pie";
import { Button } from "../ui/button";
import { Bookmark, RotateCcw } from "lucide-react";
import { Birads } from "@/lib/type";

export default function CardPie({
  onAgain,
  action = false,
  data,
}: {
  onAgain?: () => void;
  action?: boolean;
  data: Birads[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>Prediction of mammogram images</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-w justify-evenly">
        {data?.map((d, i) => (
          <PieChartComponent chartData={d} key={i} imgIdx={i + 1} />
        ))}
      </CardContent>
      {action && (
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={onAgain}>
            <RotateCcw />
            Try again
          </Button>
          <Button>
            <Bookmark />
            Save result
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
