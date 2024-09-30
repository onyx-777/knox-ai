import { useAuth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
   
export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .onUploadComplete(() => {}),
    domain: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .onUploadComplete(() => {}),
    chatbot: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;