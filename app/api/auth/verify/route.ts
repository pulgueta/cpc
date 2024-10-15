import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { handleRequest } from "@/lib/requests";
import { otpCodeSchema } from "@/schemas/otp-code";
import { deleteCode, verifyUserCode } from "@/lib/database/otp";
import { verifyEmail } from "@/lib/database/user";
import type { VerifyUserResponse } from "@/types/VerifyUserResponse";

export const POST = async (req: NextRequest) => {
  const request = await handleRequest(req, otpCodeSchema);

  if (request.exceeded) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes, intenta más tarde" },
      { status: 429 },
    );
  }

  if (!request.success) {
    return NextResponse.json({ message: "Error verificando usuario" }, { status: 400 });
  }

  const { data } = request;

  const email = req.nextUrl.searchParams.get("email") as string;

  const isValidCode = await verifyUserCode(email, data.code);

  if (!isValidCode) {
    return NextResponse.json({ message: "Código inválido" }, { status: 400 });
  }

  const [, user] = await Promise.all([deleteCode(email, data.code), verifyEmail(email)]);

  return NextResponse.json<VerifyUserResponse>(user, { status: 200 });
};
