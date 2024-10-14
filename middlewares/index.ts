import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

type Middleware = (md: NextMiddleware) => NextMiddleware;

export const MiddlewareFactory = (fns: Middleware[], idx = 0): NextMiddleware => {
  const curr = fns[idx];

  if (curr) {
    const next = MiddlewareFactory(fns, idx + 1);

    return curr(next);
  }

  return () => NextResponse.next();
};
