"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, FingerprintIcon } from "lucide-react";
import type { BuiltInProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";
import { signIn as passkeyLogin } from "next-auth/webauthn";

import type { LoginSchema } from "@/schemas/user";
import { loginSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/components/icons/google";
import { FacebookIcon } from "@/components/icons/facebook";
import { CREATE_USER } from "@/constants";

export const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false);

  const registerHref = usePathname().includes("stores")
    ? "/stores/register"
    : "/register";

  const isStorePath = usePathname().includes("stores");

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  const providerLogin = (provider: BuiltInProviderType) => async () => {
    await signIn(provider);
  };

  return (
    <>
      <Form {...form}>
        <section className="space-y-4">
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormComponent
              name="email"
              label="Correo"
              render={({ field }) => (
                <Input
                  type="email"
                  autoComplete="email"
                  autoFocus
                  aria-disabled={form.formState.isSubmitting}
                  placeholder="correo@miempresa.com"
                  className="shadow"
                  minLength={CREATE_USER.email.minLength.value}
                  maxLength={CREATE_USER.email.maxLength.value}
                  {...field}
                />
              )}
            />

            <FormComponent
              name="password"
              label="Contraseña"
              render={({ field }) => (
                <div className="relative w-full">
                  <Input
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    aria-disabled={form.formState.isSubmitting}
                    placeholder="********"
                    className="shadow"
                    minLength={CREATE_USER.password.minLength.value}
                    maxLength={CREATE_USER.password.maxLength.value}
                    {...field}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    className="absolute top-0 right-0"
                    aria-label={
                      show ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </Button>
                </div>
              )}
            />

            <Button className="w-full" loading={form.formState.isSubmitting}>
              Ingresar
            </Button>
          </form>

          {!isStorePath && (
            <>
              <div className="relative py-4">
                <span className="absolute left-1/2 top-1.5 -translate-x-1/2 bg-white dark:bg-neutral-900 px-2.5 text-sm font-medium text-muted-foreground">
                  O inicia sesión con:
                </span>
                <Separator />
              </div>

              <section className="grid gap-2 grid-cols-2">
                <Button
                  className="w-full"
                  variant="outline"
                  aria-label="Iniciar sesión con Google"
                  onClick={providerLogin("google")}
                >
                  <GoogleIcon className="mr-2 size-5" />
                  Google
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  aria-label="Iniciar sesión con Facebook"
                  onClick={providerLogin("facebook")}
                >
                  <FacebookIcon className="mr-2 size-5" />
                  Facebook
                </Button>

                <Button
                  className="w-full col-span-2"
                  variant="outline"
                  aria-label="Iniciar sesión con datos biométricos"
                  onClick={() => passkeyLogin("passkey")}
                >
                  <FingerprintIcon className="mr-2 size-4" />
                  Biometría
                </Button>
              </section>
            </>
          )}
        </section>
      </Form>

      <p className="text-center text-muted-foreground text-sm mt-4">
        ¿No tienes cuenta?{" "}
        <Link
          href={registerHref}
          className="mt-2 font-medium text-black dark:text-white text-sm underline-offset-4 hover:underline"
        >
          Regístrate
        </Link>
      </p>

      <p className="text-center text-muted-foreground text-sm mt-2">
        <Link
          href="/forgot-password"
          className="mt-2 font-medium text-black dark:text-white text-sm underline-offset-4 hover:underline"
        >
          Olvidé mi contraseña
        </Link>
      </p>
    </>
  );
};
