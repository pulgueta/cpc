import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { handleRequest } from "@/lib/requests";
import { loginSchema } from "@/schemas/user";
import { getUserByEmail, isEmailVerified } from "@/lib/database/user";
import { createSession, generateSessionToken } from "@/lib/auth/session";
import { setSessionTokenCookie } from "@/lib/auth/cookies";
import { verifyValue } from "@/lib/crypto";

export const POST = async (req: NextRequest) => {
  const request = await handleRequest(req, loginSchema);

  if (request.exceeded) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes, intenta más tarde" },
      { status: 429 }
    );
  }

  if (!request.success) {
    return NextResponse.json(
      { message: "Error creando usuario" },
      { status: 400 }
    );
  }

  const { data: user } = request;

  const isVerified = await isEmailVerified(user.email);

  if (!isVerified) {
    return NextResponse.json(
      { message: "Debes verificar tu correo para poder iniciar sesión" },
      { status: 401 }
    );
  }

  const dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    return NextResponse.json(
      { message: "El usuario no existe" },
      { status: 404 }
    );
  }

  const isValidPassword = await verifyValue(dbUser.password, user.password);

  if (!isValidPassword) {
    return NextResponse.json(
      { message: "Contraseña incorrecta" },
      { status: 401 }
    );
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, dbUser?.id as string);

  setSessionTokenCookie(sessionToken, session.expiresAt);

  return NextResponse.json({}, { status: 200 });
};
