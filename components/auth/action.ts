"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const logout = async () => {
  const out = await auth.api.signOut();

  if (!out) {
    return {
      error: "Failed to sign out",
    };
  }

  revalidatePath("/");

  return redirect("/login");
};
