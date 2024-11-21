"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const logout = async (_prev: unknown, _e: FormData) => {
  await auth.api.signOut({ headers: await headers() });

  return redirect("/login");
};
