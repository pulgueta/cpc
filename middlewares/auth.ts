import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { authRoutes } from "@/constants";

export const AuthMiddleware =
  (md: NextMiddleware) => async (req: NextRequest, e: NextFetchEvent) => {
    if (req.method === "GET") {
      const response = NextResponse.next();

      const token = req.cookies.get("session")?.value ?? null;

      if (token && authRoutes.has(req.nextUrl.pathname)) {
        return Response.redirect(new URL("/", req.nextUrl).toString());
      }

      if (token !== null) {
        response.cookies.set("session", token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
          sameSite: "lax",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
      }

      return response;
    }

    const originHeader = req.headers.get("Origin");
    const hostHeader = req.headers.get("X-Forwarded-Host");

    if (originHeader === null || hostHeader === null) {
      return new NextResponse(null, {
        status: 403,
      });
    }

    let origin: URL;

    try {
      origin = new URL(originHeader);
    } catch {
      return new NextResponse(null, {
        status: 403,
      });
    }

    if (origin.host !== hostHeader) {
      return new NextResponse(null, {
        status: 403,
      });
    }

    return md(req, e);
  };
