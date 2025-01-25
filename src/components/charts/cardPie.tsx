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

export default function CardPie({
  onAgain,
  action = false,
}: {
  onAgain?: () => void;
  action?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>Prediction of mammogram images</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-w justify-evenly">
        {Array(4)
          .fill(null)
          .map((d, i) => (
            <PieChartComponent key={i} />
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
