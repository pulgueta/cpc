import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { NewUser } from "@/db/schemas";
import { registerSchema } from "@/schemas/user";
import { handleRequest } from "@/lib/requests";
import { createUser } from "@/lib/database/user";
import { generateOTPCode } from "@/lib/generate-code";
import { sendWelcomeEmail } from "@/lib/email";
import type { CreateUserResponse } from "@/types/CreateUserResponse";

export const POST = async (req: NextRequest) => {
  const request = await handleRequest<NewUser>(req, registerSchema);

  if (request.exceeded) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes, intenta más tarde" },
      { status: 429 },
    );
  }

  if (!request.success) {
    return NextResponse.json({ message: "Error creando usuario" }, { status: 400 });
  }

  const user = await createUser(request.data);

  if (!user) {
    return NextResponse.json(
      {
        message: "El correo electrónico ya está tomado, intenta con uno nuevo",
      },
      { status: 400 },
    );
  }

  const code = await generateOTPCode(user.id);
  const email = await sendWelcomeEmail(user, code);

  if (email instanceof Error) {
    return NextResponse.json({ message: email.message }, { status: 500 });
  }

  return NextResponse.json<CreateUserResponse>({ ...user, code }, { status: 201 });
};
