import { render } from "@react-email/components";

import WelcomeEmail from "@/emails/WelcomeEmail";
import type { NewUser } from "@/db/schemas";
import { resend } from "./config";
import { env } from "@/env/server";

export const sendWelcomeEmail = async (
  userData: Pick<NewUser, "email" | "name">,
  code: string
) => {
  const { data, error } = await resend.emails.send({
    from: `Centro Popular Comercial <${env.FROM_EMAIL}>`,
    to: userData.email,
    subject: "Bienvenido al Centro Popular Comercial",
    html: await render(
      <WelcomeEmail code={code} name={userData.name} email={userData.email} />,
      {
        pretty: true,
        plainText: true,
      }
    ),
    react: WelcomeEmail({ code, name: userData.name, email: userData.email }),
  });

  if (error) {
    return error;
  }

  return data?.id;
};
