"use server";

import { redirect } from "next/navigation";

import { deleteSessionTokenCookie } from "@/lib/auth/cookies";
import { getCurrentSession, invalidateSession } from "@/lib/auth/session";

export const logout = async () => {
  const { session } = await getCurrentSession();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await invalidateSession(session.id);

  deleteSessionTokenCookie();

  return redirect("/login");
};
