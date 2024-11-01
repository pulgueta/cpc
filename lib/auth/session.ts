import { cache } from "react";

import { headers } from "next/headers";

import { auth } from "../auth";

export const getCurrentSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export const checkOptimisticSession = (headers: Headers) => {
  const guessIsSignIn =
    headers.get("cookie")?.includes("better-auth.session") ||
    headers.get("cookie")?.includes("__Secure-better-auth.session-token");

  return !!guessIsSignIn;
};
