"use client";

import { useState } from "react";

import { usePathname } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import type { RegisterSchema } from "@/schemas/user";
import { registerSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const RegisterForm = () => {
  const [show, setShow] = useState<boolean>(false);

  const loginHref = usePathname().includes("stores")
    ? "/stores/login"
    : "/login";

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <Form {...form}>
        <section className="space-y-4">
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormComponent
              name="name"
              label="Nombre completo"
              render={({ field }) => (
                <Input
                  autoComplete="given-name"
                  autoFocus
                  aria-disabled={form.formState.isSubmitting}
                  placeholder="Sebastian Rojas"
                  className="shadow"
                  {...field}
                />
              )}
            />

            <FormComponent
              name="email"
              label="Correo"
              render={({ field }) => (
                <Input
                  type="email"
                  autoComplete="email"
                  aria-disabled={form.formState.isSubmitting}
                  placeholder="correo@miempresa.com"
                  className="shadow"
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
                    {...field}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    className="absolute top-0 right-0"
                    onClick={() => setShow(!show)}
                    aria-label={
                      show ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </Button>
                </div>
              )}
            />

            <Button className="w-full" disabled={form.formState.isSubmitting}>
              Crear cuenta
            </Button>
          </form>
        </section>
      </Form>

      <p className="text-center text-muted-foreground text-sm mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link
          href={loginHref}
          className="mt-2 font-medium text-black dark:text-white text-sm underline-offset-4 hover:underline"
        >
          Ingresa aquí
        </Link>
      </p>
    </>
  );
};
