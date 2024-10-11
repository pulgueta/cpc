import type { FC, PropsWithChildren } from "react";

import { ReCAPTCHAProvider } from "@/providers/auth-captcha";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <ReCAPTCHAProvider>
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-white p-4 dark:bg-neutral-900">
      <section className="w-full max-w-sm">{children}</section>
    </main>
  </ReCAPTCHAProvider>
);

export default AuthLayout;
