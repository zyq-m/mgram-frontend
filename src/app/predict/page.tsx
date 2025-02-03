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
import { api } from "@/utils/axios";
import { Birads } from "@/lib/type";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Predict() {
  const [showResult, setShow] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [images, setImages] = useState<File[] | []>([]);
  const [icNo, setIcNo] = useState<string>("");
  const [pieData, setData] = useState<Birads[] | []>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onPredict() {
    try {
      setLoading(true);

      const fd = new FormData();
      images.forEach((img) => {
        fd.append(`birad_images`, img);
      });
      fd.append("ic_no", icNo);

      const res = await api.post("/predict", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(res.data);
      setShow(true);
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function onSave() {
    try {
      const fd = new FormData();
      images.forEach((img) => {
        fd.append(`birad_images`, img);
      });
      fd.append("ic_no", icNo);

      await api.post("/predict/save", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Success",
        description: "Prediction result was successfully saved",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-8">
      <div className={showResult ? "block" : "hidden"}>
        <CardPie
          data={pieData}
          action={true}
          onAgain={() => setShow(false)}
          onSave={onSave}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prediction</CardTitle>
          <CardDescription>
            Upload images of mammogram to start your prediction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dropzone sendFiles={(files) => setImages(files)} />
          <div>
            <Label htmlFor="icNo">IC No.</Label>
            <Input
              id="icNo"
              placeholder="0123456789"
              value={icNo}
              onChange={(e) => setIcNo(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="gap-2 justify-end">
          <Button variant="outline">Clear</Button>
          <Button onClick={onPredict} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Predict"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
