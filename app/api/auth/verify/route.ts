import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { handleRequest } from "@/lib/requests";
import { OTPCodeSchema, otpCodeSchema } from "@/schemas/otp-code";
import { deleteCode, verifyUserCode } from "@/lib/database/otp";
import { verifyEmail } from "@/lib/database/user";
import type { VerifyUserResponse } from "@/types/VerifyUserResponse";

export const POST = async (req: NextRequest) => {
  const { data, exceeded, success } = await handleRequest<OTPCodeSchema>(req, otpCodeSchema);

  if (exceeded) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes, intenta más tarde" },
      { status: 429 },
    );
  }

  if (!success) {
    return NextResponse.json({ message: "Error verificando usuario" }, { status: 400 });
  }

  const isValidCode = await verifyUserCode(data.email, data.code);

  if (!isValidCode) {
    return NextResponse.json({ message: "Código inválido" }, { status: 400 });
  }

  const [, user] = await Promise.all([deleteCode(data.email, data.code), verifyEmail(data.email)]);

  return NextResponse.json<VerifyUserResponse>(user, { status: 200 });
};
