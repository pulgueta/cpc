import { render } from "@react-email/components";

import WelcomeEmail from "@/emails/WelcomeEmail";
import ResetPassword from "@/emails/ResetPassword";
import LocalPurchaseInvoice from "@/emails/LocalPurchaseInvoice";
import OTP from "@/emails/OTP";
import type { NewUser } from "@/db/schemas";
import { resend } from "./config";
import { env } from "@/env/server";
import { env as client } from "@/env/client";

export const sendWelcomeEmail = async (userData: Pick<NewUser, "email" | "name">, url: string) => {
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
  url: string,
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

export const sendOtpEmail = async (userData: Pick<NewUser, "email" | "name">, otp: string) => {
  const { data, error } = await resend.emails.send({
    from: `Centro Popular Comercial <${env.FROM_EMAIL}>`,
    to: userData.email,
    subject: "Tu código de verificación",
    html: await render(<OTP name={userData.name} otp={otp} />, {
      pretty: true,
      plainText: true,
    }),
    react: OTP({ name: userData.name, otp }),
  });

  if (error) {
    return error;
  }

  return data?.id;
};

export const sendInvoiceEmail = async (
  to: string,
  name: string,
  purchaseDate: Date,
  items: { id: string; productName: string; quantity: number; price: number }[],
) => {
  const { data, error } = await resend.emails.send({
    from: `Centro Popular Comercial <${env.FROM_EMAIL}>`,
    to,
    subject: "Factura de compra",
    html: await render(
      <LocalPurchaseInvoice name={name} purchaseDate={purchaseDate} items={items} />,
      {
        pretty: true,
        plainText: true,
      },
    ),
    react: LocalPurchaseInvoice({ name, purchaseDate, items }),
  });

  if (error) {
    return error;
  }

  return data?.id;
};
