"use client";

import type { FC, PropsWithChildren } from "react";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { env } from "@/env/client";

export const ReCAPTCHAProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
      scriptProps={{ defer: true }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};
