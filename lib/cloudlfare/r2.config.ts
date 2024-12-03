import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { env } from "@/env/client";

const client = new S3Client({
  region: "auto",
  endpoint: env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

export const upload = async (data: File, path: string) => {
  if (!data) {
    throw new Error("No data provided");
  }

  if (!data.type.includes("image")) {
    throw new Error("Invalid file type");
  }

  const buffer = await data.arrayBuffer();
  const name = `${Date.now()}-${data.name.replace(/\s/g, "-")}`;
  const key = `${path}/${name}`;

  const cmd = new PutObjectCommand({
    Bucket: env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: data.type,
    ACL: "public-read",
  });

  try {
    await client.send(cmd);

    return `${env.NEXT_PUBLIC_CLOUDFLARE_R2}/${key}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error uploading file", error);
    }
  }
};

export const cfDelete = async (key: string) => {
  const cmd = new DeleteObjectCommand({
    Bucket: env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET,
    Key: key,
  });

  try {
    await client.send(cmd);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error deleting file", error);
    }
  }
};
