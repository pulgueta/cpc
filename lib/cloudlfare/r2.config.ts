import { S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";

import { env } from "@/env/client";

export const r2 = new S3Client({
  endpoint: env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET,
  region: "auto",
  credentials: {
    accountId: env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID,
    accessKeyId: env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

const getDownloadUrl = (obj: string) =>
  getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: env.NEXT_PUBLIC_CLOUDFLARE_BUCKET,
      Key: obj,
    }),
    { expiresIn: 3600 },
  );

export const uploadToR2 = async (file: File, path: string) => {
  if (file.size > 1024 * 1024 * 10) {
    return;
  }

  const Key = `uploads/${path}/${Date.now().toString()}-${file.name.replace(/ /g, "-")}`;

  const cmd = new Upload({
    client: r2,
    params: {
      Bucket: env.NEXT_PUBLIC_CLOUDFLARE_BUCKET,
      Key,
      Body: file.stream(),
      ContentType: file.type,
    },
    queueSize: 4,
    leavePartsOnError: false,
  });

  await cmd.done();

  const uploadUrl = getDownloadUrl(Key);

  return {
    url: uploadUrl,
  };
};

export const getFileUrl = async (key: string) => {
  const url = await getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: env.NEXT_PUBLIC_CLOUDFLARE_BUCKET,
      Key: key,
    }),
    { expiresIn: 3600 },
  );

  return url;
};
