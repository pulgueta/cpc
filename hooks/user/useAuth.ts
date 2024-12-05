import { toast } from "sonner";

import { passkey, signIn, forgetPassword, resetPassword } from "@/lib/auth.client";

export const useAuth = () => {
  const onPasskeyLogin = async () => {
    const data = await signIn.passkey();

    return [data?.data, data?.error];
  };

  const onPasskeyRegister = async () => {
    const data = await passkey.addPasskey();

    return [data?.data, data?.error];
  };

  const onForgetPassword = async (email: string) => {
    const data = await forgetPassword(
      {
        email,
        redirectTo: "/forgot-password/update",
      },
      {
        onError: (ctx) => {
          if (ctx.error.status === 404) {
            toast.error("No se encontró una cuenta con ese correo electrónico");
          }
        },
      },
    );

    return data;
  };

  const onUpdatePassword = async (password: string) => {
    const data = await resetPassword({ newPassword: password });

    return data;
  };

  return {
    onPasskeyLogin,
    onPasskeyRegister,
    onForgetPassword,
    onUpdatePassword,
  };
};
