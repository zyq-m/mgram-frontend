import CardPie from "@/components/charts/cardPie";
import MamoImages from "@/components/images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";

export default function ResultDetails() {
  return (
    <div className="space-y-4">
      <CardPie />
      <Card>
        <CardHeader>
          <CardTitle>Prediction Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="block">
              IC Number:
              <span className="text-muted-foreground ml-2">12345678901</span>
            </Label>
            <Label className="block">
              Timestamp:
              <span className="text-muted-foreground ml-2">
                {dayjs().toString()}
              </span>
            </Label>
          </div>
          <div className="space-y-2">
            <Label>Images</Label>
            <MamoImages />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
