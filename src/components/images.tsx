import { Label } from "./ui/label";

export default function MamoImages() {
  return (
    <div className="flex gap-2">
      {Array(4)
        .fill(null)
        .map((d, i) => (
          <div key={i} className="basis-full">
            <div className="w-full bg-muted h-48 rounded-lg"></div>
            <Label className="text-sm text-muted-foreground">
              Image {i + 1}
            </Label>
          </div>
        ))}
    </div>
  );
}
