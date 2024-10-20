"use client";

import { useId, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, FingerprintIcon } from "lucide-react";

import type { LoginSchema } from "@/schemas/user";
import { loginSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/components/icons/google";
import { CREATE_USER } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/user/useAuth";

export const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);

  const rememberId = useId();

  const registerHref = usePathname().includes("stores") ? "/stores/register" : "/register";
  const isStorePath = usePathname().includes("stores");

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { onEmailLogin, onGoogleLogin, onPasskeyLogin } = useAuth();

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    await onEmailLogin({ email, password: password ?? "", remember });
  });

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
                    aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
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

          <div className="flex items-center gap-x-2">
            <Checkbox
              checked={remember}
              onCheckedChange={() => setRemember((prev) => !prev)}
              id={rememberId}
            />
            <Label htmlFor={rememberId} id={rememberId} className="text-muted-foreground">
              Recordar mi usuario
            </Label>
          </div>

          {!isStorePath && (
            <>
              <div className="relative py-2 pb-4">
                <span className="-translate-x-1/2 absolute top-1.5 left-1/2 bg-white px-2.5 font-medium text-muted-foreground text-sm dark:bg-neutral-900">
                  O inicia sesión con:
                </span>
                <Separator />
              </div>

              <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <Button
                  aria-label="Iniciar sesión con Google"
                  variant="outline"
                  onClick={onGoogleLogin}
                >
                  <GoogleIcon className="mr-2 size-[18px]" />
                  Google
                </Button>
                <Button
                  aria-label="Iniciar sesión con Google"
                  variant="outline"
                  onClick={onPasskeyLogin}
                >
                  <FingerprintIcon className="mr-2" size={16} />
                  Biometría
                </Button>
              </section>
            </>
          )}
        </section>
      </Form>

      <p className="mt-4 text-center text-muted-foreground text-sm">
        ¿No tienes cuenta?{" "}
        <Link
          href={registerHref}
          className="mt-2 font-medium text-black text-sm underline-offset-4 hover:underline dark:text-white"
        >
          Regístrate
        </Link>
      </p>

      <p className="mt-2 text-center text-muted-foreground text-sm">
        <Link
          href="/forgot-password"
          className="mt-2 font-medium text-black text-sm underline-offset-4 hover:underline dark:text-white"
        >
          Olvidé mi contraseña
        </Link>
      </p>
    </>
  );
};
