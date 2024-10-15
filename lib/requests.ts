import type { NextRequest } from "next/server";

import type { AnyZodObject, TypeOf } from "zod";

import { checkRateLimit } from "./ratelimiter";

type RequestResult<T> =
  | {
      success: true;
      data: T;
      exceeded: boolean;
    }
  | {
      success: false;
      error: {
        [x: PropertyKey]: string[] | undefined;
      };
      exceeded: boolean;
    };

export const handleRequest = async <T extends AnyZodObject>(
  req: NextRequest,
  schema: T,
): Promise<RequestResult<TypeOf<T>>> => {
  const exc = await checkRateLimit(req.ip ?? "localhost");

  const _body = await req.json();
  const result = await schema.safeParseAsync(_body);

  if (result.success) {
    return {
      success: true,
      data: result.data,
      exceeded: exc.exceeded,
    };
  } else {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
      exceeded: exc.exceeded,
    };
  }
};
