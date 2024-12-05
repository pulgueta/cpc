"use server";

import { redirect } from "next/navigation";

import { registerSchema } from "@/schemas/user";
import { handleAction } from "../handle-action";
import { registerUser } from "@/lib/database/user";

export const registerAction = async (_prev: unknown, e: FormData) => {
  const user = await handleAction(registerSchema, e, false);

  if ("error" in user) {
    return {
      error: user.error,
      defaultValues: user.defaultValues,
    };
  }

  const newUser = await registerUser(user);

  if (newUser.error) {
    return {
      error: newUser.error,
      defaultValues: user,
    };
  }

  return redirect("/login");
};
