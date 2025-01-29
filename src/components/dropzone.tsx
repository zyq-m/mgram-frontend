import { Image } from "lucide-react";
import DropzoneComponent from "react-dropzone";
import MamoImages from "./images";
import { useEffect, useState } from "react";
import { UploadFiles } from "@/lib/type";

export default function Dropzone({
  sendFiles,
}: {
  sendFiles: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<(File & UploadFiles)[] | []>([]);

  useEffect(() => {
    if (files.length) {
      sendFiles(files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <DropzoneComponent
      accept={{ "image/jpeg": [".jpeg", ".jpg"] }}
      onDrop={(acceptedFiles) => {
        setFiles((prev) => [
          ...prev,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        ]);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="space-y-3">
          <section className="grid place-items-center border-2 rounded-lg border-dashed h-64">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center text-muted-foreground gap-4">
                <Image size={48} strokeWidth={1} />
                <p>Click to upload or drag &amp; drop</p>
              </div>
            </div>
          </section>
          <MamoImages files={files} />
        </div>
      )}
    </DropzoneComponent>
  );
}
