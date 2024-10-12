import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { registerSchema } from "@/schemas/user";
import { checkRateLimit } from "@/lib/ratelimiter";
import { handleIncomingRequest } from "@/lib/requests";

export const POST = async (req: NextRequest) => {
  const [body] = await Promise.all([
    handleIncomingRequest(req, registerSchema),
    checkRateLimit(req.ip ?? "localhost"),
  ]);

  return NextResponse.json({ message: "Hello World" });
};
