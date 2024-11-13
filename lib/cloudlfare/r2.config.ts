import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { lookup } from "mime-types";
import { extname } from "path";

import { env } from "@/env/client";

interface R2Config {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
}

interface UploadResult {
  success: boolean;
  url: string | null;
  error?: string;
}

type UploadInput = {
  file: Buffer | Blob | ArrayBuffer | { arrayBuffer(): Promise<ArrayBuffer> };
  fileName?: string;
  contentType?: string;
};

export class R2UploadService {
  private client: S3Client;
  private config: R2Config;

  constructor(config: R2Config) {
    this.config = config;
    this.client = new S3Client({
      region: "auto",
      endpoint: env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  private async toBuffer(input: UploadInput["file"]): Promise<Buffer> {
    if (Buffer.isBuffer(input)) return input;

    if (input instanceof ArrayBuffer) return Buffer.from(input);

    if ("arrayBuffer" in input && typeof input.arrayBuffer === "function") {
      return Buffer.from(await input.arrayBuffer());
    }

    throw new Error("Unsupported file type");
  }

  private getFileDetails(input: UploadInput): {
    uniqueFileName: string;
    contentType: string;
  } {
    const timestamp = Date.now();
    const fileName = input.fileName || `file-${timestamp}`;
    const extension = extname(fileName);

    return {
      uniqueFileName: `${timestamp}-${fileName}`,
      contentType: input.contentType || lookup(extension) || "application/octet-stream",
    };
  }

  async upload(input: UploadInput | UploadInput["file"], path: string): Promise<UploadResult> {
    try {
      const normalizedInput: UploadInput = "file" in input ? input : { file: input };

      const { uniqueFileName, contentType } = this.getFileDetails(normalizedInput);

      const buffer = await this.toBuffer(normalizedInput.file);

      const Key = `uploads/${path}/${Date.now().toString()}-${uniqueFileName}`;

      await this.client.send(
        new PutObjectCommand({
          Bucket: this.config.bucketName,
          Key,
          Body: buffer,
          ContentType: contentType,
          CacheControl: "public, max-age=31536000",
        }),
      );

      return {
        success: true,
        url: `${this.config.publicUrl}/${uniqueFileName}`,
      };
    } catch (error) {
      console.error("Error uploading to R2:", error);
      return {
        success: false,
        url: null,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
