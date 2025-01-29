import { UploadFiles } from "@/lib/type";
import { Label } from "./ui/label";

export default function MamoImages({ files }: { files: UploadFiles[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files?.map((d, i) => (
        <div key={i} className="">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={d.preview}
              onLoad={() => URL.revokeObjectURL(d.preview ?? "")}
            />
          </div>
          <Label className="text-sm text-muted-foreground">
            Image {i + 1}: {d.name}
          </Label>
        </div>
      ))}
    </div>
  );
}
