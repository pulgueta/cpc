import { env } from "@/env/client";
import { R2UploadService } from "./r2.config";
import { bucketFolders, maxFileSize } from "@/constants/bucket-folders";

const r2 = new R2UploadService({
  accessKeyId: env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID,
  bucketName: env.NEXT_PUBLIC_CLOUDFLARE_BUCKET,
  secretAccessKey: env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY,
  publicUrl: env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT,
});

export const uploadProfilePicture = async (file: File, path?: string) => {
  if (!file.type.includes("image") && file.size > maxFileSize.profilePictures) {
    return;
  }

  const pathToSave = `${bucketFolders.profilePictures}/${path || Date.now().toString()}`;

  const uploaded = await r2.upload(file, pathToSave);

  return uploaded;
};

export const uploadProductImage = async (file: File, path?: string) => {
  if (!file.type.includes("image") && file.size > maxFileSize.products) {
    return;
  }

  const pathToSave = `${bucketFolders.products}/${path || Date.now().toString()}`;

  const uploaded = await r2.upload(file, pathToSave);

  return uploaded;
};
