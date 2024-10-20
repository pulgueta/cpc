import { hash, verify } from "@node-rs/argon2";

export const hashValue = async (pwd: string) =>
  await hash(pwd, {
    memoryCost: 21000,
    outputLen: 64,
    parallelism: 3,
    secret: Buffer.from(process.env.ARGON2_SECRET ?? ""),
  });

export const verifyValue = async (hash: string, pwd: string) =>
  await verify(hash, pwd, {
    memoryCost: 21000,
    outputLen: 64,
    parallelism: 3,
    secret: Buffer.from(process.env.ARGON2_SECRET ?? ""),
  });
