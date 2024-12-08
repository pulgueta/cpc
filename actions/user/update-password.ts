"use server";

import { resetPasswordSchema } from "@/schemas/user";
import { handleAction } from "../handle-action";
import { resetPassword } from "@/lib/database/user";

export const updatePasswordAction = async (_prev: unknown, e: FormData) => {
  const user = await handleAction(resetPasswordSchema, e, false);

  if ("error" in user) {
    return {
      error: user.error,
      defaultValues: user.defaultValues,
    };
  }

  const update = await resetPassword(user);

  if (update.error) {
    return {
      error: update.error,
      defaultValues: user,
    };
  }

  return {
    message: update.message,
  };
};
