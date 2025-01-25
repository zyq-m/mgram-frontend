import Dropzone from "@/components/dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import CardPie from "@/components/charts/cardPie";

export default function Predict() {
  const [showResult, setShow] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  function onPredict() {
    setShow(true);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="space-y-8">
      <div className={showResult ? "block" : "hidden"}>
        <CardPie action={true} onAgain={() => setShow(false)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prediction</CardTitle>
          <CardDescription>
            Upload images of mammogram to start your prediction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dropzone />
          <div>
            <Label htmlFor="icNo">IC No.</Label>
            <Input id="icNo" placeholder="0123456789" />
          </div>
        </CardContent>
        <CardFooter className="gap-2 justify-end">
          <Button variant="outline">Clear</Button>
          <Button onClick={onPredict}>Predict</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
