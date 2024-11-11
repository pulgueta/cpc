import { NextResponse } from "next/server";

import { env } from "@/env/server";
import type { CurrentSession } from "@/constants/db-types";
import { authRoutes } from "@/constants";
import { urlToRedirect } from "@/constants/routes";

const OWNER_URL_PREFIX = "/owner" as const;
const ADMIN_URL_PREFIX = "/admin" as const;
const USER_URL_PREFIX = "/dashboard" as const;

const isAuthRoute = (pathname: string) => authRoutes.some((route) => pathname.startsWith(route));

export default async function middleware(request: Request) {
  const headers = new Headers(request.headers);

  headers.set("x-url", request.url);

  const req = await fetch(`${env.BETTER_AUTH_URL}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const session = (await req.json()) as CurrentSession | null;

  const url = new URL(request.url);
  const currentURL = url.searchParams.get("currentURL");
  const decodedURL = currentURL ? new URL(decodeURIComponent(currentURL)) : new URL(request.url);

  const pathname = decodedURL?.pathname;

  if (typeof session === null) {
    if (!isAuthRoute(pathname)) {
      return NextResponse.redirect("/login");
    }

    return NextResponse.next();
  }

  const userRole = session?.user.role ?? "";
  const correctBasePath = urlToRedirect(userRole);

  if (session && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  if (pathname.startsWith(OWNER_URL_PREFIX) && userRole !== "storeOwner") {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  if (pathname.startsWith(ADMIN_URL_PREFIX) && userRole !== "admin") {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  if (pathname.startsWith(USER_URL_PREFIX) && userRole !== "user") {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
