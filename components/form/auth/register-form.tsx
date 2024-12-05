"use client";

import { useActionState, useId, useState } from "react";

import Form from "next/form";
import Link from "next/link";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/actions/user/register";
import { Label } from "@/components/ui/label";
import { FormErros } from "../form-alert-errors";

export const RegisterForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(registerAction, undefined);
  const [name, email, password] = [useId(), useId(), useId()];

  return (
    <>
      <Form action={formAction} className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor={name}>Nombre completo</Label>
          <Input
            autoComplete="given-name"
            autoFocus
            name="name"
            aria-disabled={isPending}
            id={name}
            placeholder="Sebastian Rojas"
            className="shadow"
            defaultValue={state?.defaultValues?.name}
          />
        </div>

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
              aria-disabled={isPending}
              name="password"
              id={password}
              placeholder="********"
              className="shadow"
              defaultValue={state?.defaultValues?.password}
            />
            <Button
              size="icon"
              variant="ghost"
              type="button"
              className="absolute top-1 right-1"
              onClick={() => setShow(!show)}
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </Button>
          </div>
        </div>

        <Button className="w-full" loading={isPending}>
          Crear cuenta
        </Button>

        <FormErros error={state?.error} />
      </Form>

      <p className="mt-4 text-center text-muted-foreground text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="mt-2 font-medium text-black text-sm underline-offset-4 hover:underline dark:text-white"
        >
          Ingresa aquí
        </Link>
      </p>
    </>
  );
};
