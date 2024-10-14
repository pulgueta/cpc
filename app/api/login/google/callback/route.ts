import { cookies } from "next/headers";

import { generateSessionToken, createSession } from "@/lib/auth/session";
import { google } from "@/lib/auth/oauth";
import { setSessionTokenCookie } from "@/lib/auth/cookies";
import { getAccountByGoogleId } from "@/lib/database/account";
import { createUser, getUserByEmail } from "@/lib/database/user";

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);

    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const googleUser: GoogleUser = await response.json();

    const existingUser = await getAccountByGoogleId(googleUser.sub);

    const userExists = await getUserByEmail(googleUser.email);

    if (existingUser) {
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, existingUser.id);

      setSessionTokenCookie(sessionToken, session.expiresAt);

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const user = userExists
      ? userExists
      : await createUser({
          email: googleUser.email,
          name: googleUser.name,
          password: "",
        });

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user?.id as string);

    setSessionTokenCookie(sessionToken, session.expiresAt);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(null, {
      status: 400,
    });
  }
};
