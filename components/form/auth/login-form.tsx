"use client";

import { useActionState, useEffect, useId, useState } from "react";

import Form from "next/form";
import Link from "next/link";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

// import { useAuth } from "@/hooks/user/useAuth";
import { loginAction } from "@/actions/user/login";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { GoogleIcon } from "@/components/icons/google";
import { CREATE_USER } from "@/constants";
import { FormErros } from "../form-alert-errors";
// import { googleLoginAction } from "@/actions/user/oauth-login";

export const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(loginAction, undefined);
  // const [, googleLogin, googlePending] = useActionState(googleLoginAction, undefined);

  const [email, password, remember] = [useId(), useId(), useId()];

  // const { onPasskeyLogin } = useAuth();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <>
      <Form action={formAction} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor={email}>Correo electrónico</Label>
          <Input
            type="email"
            autoComplete="email"
            name="email"
            aria-disabled={isPending}
            id={email}
            placeholder="correo@miempresa.com"
            className="shadow"
            defaultValue={state?.defaultValues?.email}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor={password}>Contraseña</Label>
          <div className="relative w-full">
            <Input
              type={show ? "text" : "password"}
              autoComplete="current-password"
              name="password"
              aria-disabled={isPending}
              placeholder="********"
              className="shadow"
              minLength={CREATE_USER.password.minLength.value}
              maxLength={CREATE_USER.password.maxLength.value}
            />
            <button
              type="button"
              className={buttonVariants({
                className: "absolute top-1 right-1",
                size: "icon",
                variant: "ghost",
              })}
              onClick={() => setShow(!show)}
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <Checkbox name="remember" id={remember} />
          <Label htmlFor={remember} id={remember} className="text-muted-foreground">
            Recordarme
          </Label>
        </div>

        <Button className="w-full">Ingresar</Button>
      </Form>

      <FormErros error={state?.error} />

      {/* <div className="relative my-4 py-4">
        <span className="-translate-x-1/2 absolute top-1.5 left-1/2 bg-white px-2.5 font-medium text-muted-foreground text-sm dark:bg-neutral-900">
          O inicia sesión con:
        </span>
        <Separator />
      </div>

      <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Form action={googleLogin}>
          <Button
            aria-label="Iniciar sesión con Google"
            variant="outline"
            disabled={isPending || googlePending}
            className="w-full"
          >
            <GoogleIcon className="mr-2 size-[18px]" />
            Google
          </Button>
        </Form>

        <Button
          aria-label="Iniciar sesión con Google"
          variant="outline"
          onClick={onPasskeyLogin}
          disabled={isPending}
          className="w-full"
        >
          <FingerprintIcon className="mr-2" size={16} />
          Biometría
        </Button>
      </section> */}

      <p className="mt-4 text-center text-muted-foreground text-sm">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
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
