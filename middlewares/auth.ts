import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { Session } from "@/lib/auth";
import { authRoutes } from "@/constants";

const _OWNER_URL_PREFIX = "/owner";
const _ADMIN_URL_PREFIX = "/admin";

export const AuthMiddleware = async (request: NextRequest) => {
  const _session = (await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  }).then((res) => res.json())) as Session;

  // if (
  //   !session &&
  //   (request.nextUrl.pathname.startsWith(OWNER_URL_PREFIX) ||
  //     request.nextUrl.pathname.startsWith(ADMIN_URL_PREFIX))
  // ) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  //   const pathToRedirect = (role: string) => {
  //     switch (role) {
  //       case "storeOwner":
  //         return "/owner/sales";
  //       case "admin":
  //         return "/admin";
  //       case "user":
  //       default:
  //         return "/dashboard";
  //     }
  //   };

  //   if (session && authRoutes.includes(request.nextUrl.pathname)) {
  //     return NextResponse.redirect(
  //       new URL(pathToRedirect(session.user.role), request.url)
  //     );
  //   }

  //   if (
  //     request.nextUrl.pathname.startsWith("/owner") &&
  //     !request.nextUrl.pathname.startsWith("/owner") &&
  //     session.user.role !== "storeOwner"
  //   ) {
  //     return NextResponse.redirect(
  //       new URL(pathToRedirect(session.user.role), request.url)
  //     );
  //   }

  //   if (
  //     request.nextUrl.pathname.startsWith("/admin") &&
  //     !request.nextUrl.pathname.startsWith("/admin") &&
  //     session.user.role !== "admin"
  //   ) {
  //     return NextResponse.redirect(
  //       new URL(pathToRedirect(session.user.role), request.url)
  //     );
  //   }
};
