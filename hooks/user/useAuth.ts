import { usePathname, useRouter } from "next/navigation";

import { toast } from "sonner";

import { passkey, signIn, signUp } from "@/lib/auth.client";

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

    if (data?.error) {
      return toast.error(
        data.error.message ?? `${data.error.status} ${data.error.statusText}`
      );
    }
  };

  const onPasskeyRegister = async () => {
    const data = await passkey.addPasskey();

    if (data?.error) {
      return toast.error(
        data.error.message ?? `${data.error.status} ${data.error.statusText}`
      );
    }
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
    const { data, error } = await signIn.email({
      email,
      password,
      callbackURL: isStorePath ? "/stores" : "/",
      dontRememberMe: !remember,
    });

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
  };
};
