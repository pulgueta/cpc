"use server";

import { forgotPasswordSchema } from "@/schemas/user";
import { handleAction } from "../handle-action";
import { forgotPassword } from "@/lib/database/user";

export const forgotPasswordAction = async (_prev: unknown, e: FormData) => {
  const user = await handleAction(forgotPasswordSchema, e, false);

  if ("error" in user) {
    return {
      error: user.error,
      defaultValues: user.defaultValues,
    };
  }

  const forgot = await forgotPassword(user);

  if (forgot.error) {
    return {
      error: forgot.error,
      defaultValues: user,
    };
  }

  return {
    message: forgot.message,
  };
};
