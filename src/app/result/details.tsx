import CardPie from "@/components/charts/cardPie";
import MamoImages from "@/components/images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PredictionResultDetail } from "@/lib/type";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ResultDetails() {
  const [result, setResult] = useState<PredictionResultDetail | null>(null);
  const { id } = useParams() as { id: string };

  useEffect(() => {
    api.get(`/predict/${id}`).then((res) => {
      setResult(res.data);
    });
  }, [id]);

  return (
    <div className="space-y-4">
      <CardPie data={result?.images} />
      <Card>
        <CardHeader>
          <CardTitle>Prediction Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="block">
              IC Number:
              <span className="text-muted-foreground ml-2">{result?.icNo}</span>
            </Label>
            <Label className="block">
              Timestamp:
              <span className="text-muted-foreground ml-2">
                {result?.timestamp}
              </span>
            </Label>
          </div>
          <div className="space-y-2">
            <Label>Images</Label>
            <MamoImages
              files={result?.images?.map((d) => ({
                name: d.name,
                preview: `${import.meta.env.VITE_API}/images/${d.name}`,
              }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
