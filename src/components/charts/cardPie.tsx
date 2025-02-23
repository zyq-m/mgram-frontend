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
import { Bookmark, Loader2, RotateCcw } from "lucide-react";
import { Birads } from "@/lib/type";

export default function CardPie({
  onAgain,
  action = false,
  data,
  onSave,
  loading = false,
}: {
  onAgain?: () => void;
  action?: boolean;
  data?: Birads[];
  onSave?: () => void;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>Prediction of mammogram images</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
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
          <Button type="submit" disabled={loading} onClick={onSave}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              <>
                <Bookmark />
                Save result
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
