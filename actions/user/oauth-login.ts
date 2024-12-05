"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const googleLoginAction = async (_prev: unknown, _e: FormData) => {
  const oauth = await auth.api.signInSocial({
    body: {
      callbackURL: "/dashboard",
      provider: "google",
    },
  });

  redirect(oauth.url);
};
