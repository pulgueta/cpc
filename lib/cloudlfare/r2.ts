import { uploadToR2 } from "./r2.config";
import { bucketFolders } from "@/constants/bucket-folders";

export const uploadProfilePicture = async (file: File, path?: string) => {
  if (!file.type.includes("image")) {
    return;
  }

  const pathToSave = `${bucketFolders.profilePictures}/${path || Date.now().toString()}`;

  return await uploadToR2(file, pathToSave);
};

export const uploadProductImage = async (file: File, path?: string) => {
  if (!file.type.includes("image")) {
    return;
  }

  const pathToSave = `${bucketFolders.products}/${path || Date.now().toString()}`;

  return await uploadToR2(file, pathToSave);
};
