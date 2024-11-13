"use server";

import { generate2FAQr } from "@/schemas/user";
import { handleAction } from "../handle-action";
import { generateQrCode } from "@/lib/database/user";

export const validateAndGenerateQrCode = async (_prev: unknown, e: FormData) => {
  const user = await handleAction(generate2FAQr, e);

  if ("error" in user) {
    return { error: user.error };
  }

  const { message, verification } = await generateQrCode(user.password ?? "");

  return {
    message: message,
    verification,
  };
};
