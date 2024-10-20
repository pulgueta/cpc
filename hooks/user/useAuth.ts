import { usePathname, useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  passkey,
  signIn,
  signUp,
  forgetPassword,
  resetPassword,
} from "@/lib/auth.client";

export const useAuth = () => {
  const { push } = useRouter();
  const isStorePath = usePathname().includes("stores");

  const onGoogleLogin = async () => {
    const { data, error } = await signIn.social({
      provider: "google",
      callbackURL: isStorePath ? "/stores" : "/",
    });

    if (error) {
      return toast.error(error.message);
    }

    if (data.redirect) {
      toast.loading("Redirigiendo...");
      return push(data.url);
    }
  };

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
      }
    );

    return data;
  };

  const onUpdatePassword = async (password: string) => {
    const data = await resetPassword({ newPassword: password });

    return data;
  };

  const onEmailLogin = async ({
    email,
    password,
    remember,
  }: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    const { data, error } = await signIn.email(
      {
        email,
        password,
        callbackURL: isStorePath ? "/stores" : "/",
        dontRememberMe: !remember,
      },
      {
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            toast.error("Debes verificar tu correo electrónico");
          }
        },
      }
    );

    if (error) {
      return toast.error(error.message ?? error.statusText);
    }

    return toast.success(`¡Bienvenido de vuelta, ${data?.user.name}!`);
  };

  const onRegister = async ({
    email,
    password,
    roleToCreate,
    name,
  }: {
    email: string;
    password: string;
    name: string;
    roleToCreate: "storeOwner" | "user";
  }) => {
    const { data, error } = await signUp.email({
      email,
      password,
      name,
      role: roleToCreate,
      callbackURL: isStorePath ? "/stores" : "/",
    });

    if (error) {
      return toast.error(error.message);
    }

    if (data) {
      return toast.success("Cuenta creada exitosamente");
    }
  };

  return {
    onGoogleLogin,
    onPasskeyLogin,
    onEmailLogin,
    onRegister,
    onPasskeyRegister,
    onForgetPassword,
    onUpdatePassword,
  };
};
