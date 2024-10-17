import { render } from "@react-email/components";

import WelcomeEmail from "@/emails/WelcomeEmail";
import ResetPassword from "@/emails/ResetPassword";
import type { NewUser } from "@/db/schemas";
import { resend } from "./config";
import { env } from "@/env/server";

export const sendWelcomeEmail = async (
  userData: Pick<NewUser, "email" | "name">,
  url: string
) => {
  const { data, error } = await resend.emails.send({
    from: `Centro Popular Comercial <${env.FROM_EMAIL}>`,
    to: userData.email,
    subject: "Bienvenido al Centro Popular Comercial",
    html: await render(<WelcomeEmail url={url} name={userData.name} />, {
      pretty: true,
      plainText: true,
    }),
    react: WelcomeEmail({ url, name: userData.name }),
  });

  if (error) {
    return error;
  }

  return data?.id;
};

export const sendPasswordResetEmail = async (
  userData: Pick<NewUser, "email" | "name">,
  url: string
) => {
  const { data, error } = await resend.emails.send({
    from: `Centro Popular Comercial <${env.FROM_EMAIL}>`,
    to: userData.email,
    subject: "Actualiza tu contraseña",
    html: await render(<ResetPassword url={url} name={userData.name} />, {
      pretty: true,
      plainText: true,
    }),
    react: ResetPassword({ url, name: userData.name }),
  });

  if (error) {
    return error;
  }

  return data?.id;
};
