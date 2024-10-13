import { hash, verify } from "@node-rs/argon2";

import { env } from "@/env/server";

export const hashValue = async (pwd: string) =>
  await hash(pwd, {
    memoryCost: 21000,
    outputLen: 64,
    parallelism: 3,
    secret: Buffer.from(env.ARGON2_SECRET),
  });

export const verifyValue = async (hash: string, pwd: string) =>
  await verify(hash, pwd, {
    memoryCost: 21000,
    outputLen: 64,
    parallelism: 3,
    secret: Buffer.from(env.ARGON2_SECRET),
  });
