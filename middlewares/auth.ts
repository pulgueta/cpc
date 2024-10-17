import { NextResponse } from "next/server";

import { authRoutes } from "@/constants";
import { authMiddleware } from "better-auth/next-js";

export default authMiddleware({
  customRedirect: async (session, request) => {
    const baseURL = request.nextUrl.origin;

    console.log(session);

    if (authRoutes.has(request.nextUrl.pathname) && session) {
      return NextResponse.redirect(new URL("/dashboard", baseURL));
    }

    if (request.nextUrl.pathname === "/dashboard" && !session) {
      return NextResponse.redirect(new URL("/login", baseURL));
    }

    return NextResponse.next();
  },
});
