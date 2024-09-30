"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/utils/uploadthing";
import { UseFormSetValue, FieldValues } from "react-hook-form";

interface Props {
  endpoint: "domain" | "imageUploader" | "chatbot";
  setValue: UseFormSetValue<FieldValues>;
}

export default function FileUpload({ endpoint, setValue }: Props) {
  return (
    <main className="flex min-h-32 flex-col items-center justify-between">
      <UploadDropzone appearance={{"button" : "bg-orange", "label" : "text-orange"}}
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            console.log(res[0].url);
            setValue("icon", res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          console.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

// ever remember to make /api/uploadthing public accessable in middlware.ts
