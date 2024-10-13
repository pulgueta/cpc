import type { NextRequest } from "next/server";

import type { AnyZodObject } from "zod";

import { checkRateLimit } from "./ratelimiter";

export const handleRequest = async <const TData extends object>(
  req: NextRequest,
  schema: AnyZodObject
) => {
  const exc = await checkRateLimit(req.ip ?? "localhost");

  const _body = await req.json();

  const body = schema.safeParse(_body);

  return {
    success: body.success,
    exceeded: exc.exceeded,
    data: body.data as TData,
  };
};
