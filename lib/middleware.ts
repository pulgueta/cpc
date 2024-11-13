import type { NextRequest } from "next/server";
import type { Geo } from "@vercel/functions";
import { geolocation, ipAddress } from "@vercel/functions";

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
