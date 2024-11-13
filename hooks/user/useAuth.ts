import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  passkey,
  signIn,
  signUp,
  forgetPassword,
  resetPassword,
  linkSocial,
  useSession,
} from "@/lib/auth.client";
import { urlToRedirect } from "@/constants/routes";
import type { User } from "@/db/schemas/user";
import { env } from "@/env/client";

export const useAuth = () => {
  const { push } = useRouter();

  const { data, isPending } = useSession();

  const role = isPending ? "user" : data?.user?.role;

  const onGoogleLogin = async () => {
    const [{ data, error }] = await Promise.all([
      await signIn.social({
        provider: "google",
        callbackURL: urlToRedirect(role),
      }),
      await linkSocial({
        provider: "google",
      }),
    ]);

    if (error) {
      return toast.error(error.message);
    }

    if (data.redirect) {
      toast.info("Redirigiendo...");
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
      },
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
    const data = await signIn.email(
      {
        email,
        password,
        callbackURL: urlToRedirect(role, env.NEXT_PUBLIC_SITE_URL),
        rememberMe: remember,
      },
      {
        onSuccess: async (ctx) => {
          console.log({ ctx: ctx.data });
        },
        onError: (ctx) => {
          switch (ctx.error.status) {
            case 404:
              toast.error("No se encontró una cuenta con ese correo electrónico");
              break;

            case 401:
              toast.error("Credenciales incorrectas");
              break;

            case 500:
              toast.error("Ha ocurrido un error. Por favor, intenta nuevamente más tarde.");
              break;
          }
        },
      },
    );

    return data;
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
    const base64 = btoa(email);

    await signUp.email(
      {
        email,
        password,
        name,
        role: roleToCreate,
        callbackURL: `/settings?q=${base64}`,
      },
      {
        onSuccess: () => {
          toast.success("Cuenta creada exitosamente");
        },
        onError: (ctx) => {
          if (ctx.error.status === 422) {
            toast.error("El correo electrónico ya está en uso");
          }
        },
      },
    );
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
