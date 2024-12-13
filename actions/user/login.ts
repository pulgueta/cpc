"use server";

import { redirect } from "next/navigation";

import { loginSchema } from "@/schemas/user";
import { handleAction } from "../handle-action";
import { signInUser } from "@/lib/database/user";

export const loginAction = async (_prev: unknown, e: FormData) => {
  const user = await handleAction(loginSchema, e, false);

  if ("error" in user) {
    return {
      error: user.error,
      defaultValues: user.defaultValues,
    };
  }

  const loggedUser = await signInUser(user);

  if (loggedUser?.error) {
    return {
      error: loggedUser.error,
      defaultValues: user,
    };
  }

  return redirect("/dashboard");
};
