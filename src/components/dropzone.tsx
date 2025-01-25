import { Image } from "lucide-react";
import DropzoneComponent from "react-dropzone";
import MamoImages from "./images";

export default function Dropzone() {
  return (
    <div className="space-y-3">
      <DropzoneComponent>
        {({ getRootProps, getInputProps }) => (
          <section className="grid place-items-center border-2 rounded-lg border-dashed h-64">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center text-muted-foreground gap-4">
                <Image size={48} strokeWidth={1} />
                <p>Click to upload or drag &amp; drop</p>
              </div>
            </div>
          </section>
        )}
      </DropzoneComponent>
      <MamoImages />
    </div>
  );
}
