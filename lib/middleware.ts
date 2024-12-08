import type { NextRequest } from "next/server";
import type { Geo } from "@vercel/functions";
import { geolocation, ipAddress } from "@vercel/functions";
import { authRoutes } from "@/constants";

export const getUserInformation = (req: NextRequest) => {
  const geo = geolocation(req);
  const ip = ipAddress(req) ?? "localhost";

  return [geo, ip] as const;
};

export const parseGeo = (geo: string) => {
  if (!geo) {
    return JSON.parse("{}") as Geo;
  }

  const parsed = JSON.parse(geo) as Geo;

  return parsed;
};

export const OWNER_URL_PREFIX = /^\/[^/]+\/owner/;
export const ADMIN_URL_PREFIX = "/admin" as const;
export const USER_URL_PREFIX = "/dashboard" as const;
export const SELLER_URL_PREFIX = "/settings/seller" as const;

export const isAuthRoute = (pathname: string) =>
  authRoutes.some((route) => pathname.startsWith(route));

export const isProtectedRoute = (pathname: string) =>
  pathname.match(OWNER_URL_PREFIX) ||
  pathname.startsWith(ADMIN_URL_PREFIX) ||
  pathname.startsWith(USER_URL_PREFIX) ||
  pathname.startsWith(SELLER_URL_PREFIX);
