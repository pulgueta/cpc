import { cookies } from "next/headers";

import { generateState, generateCodeVerifier } from "arctic";

import { google } from "@/lib/auth/oauth";

export const GET = () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["openid", "profile"],
  });

  cookies().set("google_oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600 * 10,
    sameSite: "lax",
  });
  cookies().set("google_code_verifier", codeVerifier, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600 * 10,
    sameSite: "lax",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};
