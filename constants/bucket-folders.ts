export const bucketFolders = {
  profilePictures: "profpics",
  products: "stores/products",
} as const;

const baseMb = 1024 * 1024;

export const maxFileSize = {
  profilePictures: baseMb * 3, // 3MB
  products: baseMb * 5, // 5MB
  banners: baseMb * 7, // 7MB
} as const;
