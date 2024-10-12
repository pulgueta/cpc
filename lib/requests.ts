import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { AnyZodObject } from "zod";

export const handleIncomingRequest = async (
  req: NextRequest,
  schema: AnyZodObject,
) => {
  const _body = await req.json();

  const body = schema.safeParse(_body);

  if (!body.success) {
    return NextResponse.json(
      { message: body.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  return body.data;
};
