import { upload } from "./r2.config";
import { folders, maxFileSize } from "@/constants/bucket-folders";

export const uploadProfilePicture = async (file: File, ownerId: string | undefined) => {
  if (!file.type.includes("image") && file.size > maxFileSize.profilePictures) {
    return;
  }

  const uploaded = await upload(file, folders("profilePictures", ownerId));

  return uploaded;
};

export const uploadProductImage = async (file: File, ownerId: string | undefined) => {
  if (!file.type.includes("image") && file.size > maxFileSize.products) {
    return;
  }

  const uploaded = await upload(file, folders("products", ownerId));

  return uploaded;
};
