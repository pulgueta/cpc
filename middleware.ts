import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// import type { Session } from "@/lib/auth";
// import { authRoutes } from "@/constants";

// const OWNER_URL_PREFIX = "/owner";
// const ADMIN_URL_PREFIX = "/admin";

export const middleware = async (_request: NextRequest) => {};

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
