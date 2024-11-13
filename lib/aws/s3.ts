import { bucketFolders } from "@/constants/bucket-folders";
import { uploadToS3 } from "./s3.config";

export const uploadProfilePicture = async (file: File, path?: string) => {
  const pathToSave = `${bucketFolders.profilePictures}/${path || Date.now().toString()}`;

  const uploaded = await uploadToS3(file, pathToSave);

  return uploaded;
};

export const uploadProductImage = async (file: File, path?: string) => {
  const pathToSave = `${bucketFolders.products}/${path || Date.now().toString()}`;

  const uploaded = await uploadToS3(file, pathToSave);

  return uploaded;
};
