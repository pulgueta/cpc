import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const AuthMiddleware =
  (md: NextMiddleware) => async (req: NextRequest, e: NextFetchEvent) => {
    if (req.method === "GET") {
      const response = NextResponse.next();
      const token = req.cookies.get("session")?.value ?? null;

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

    return md(req, e);
  };
