"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import type { ForgotPasswordSchema } from "@/schemas/user";
import { forgotPasswordSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CREATE_USER } from "@/constants";

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <header className="mb-4">
        <h1 className="text-3xl tracking-tighter text-balance font-bold text-center">
          Recuperar mi contraseña
        </h1>
        <p className="text-center text-muted-foreground mt-2 text-pretty text-sm">
          Ingresa tu correo electrónico para enviarte un enlace de recuperación de contraseña.
        </p>
      </header>

      <Form {...form}>
        <section className="space-y-4">
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormComponent
              name="email"
              label="Correo registrado"
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

            <Button
              leftIcon={<Mail size={16} />}
              loading={form.formState.isSubmitting}
              className="w-full"
            >
              Enviar enlace de recuperación
            </Button>
          </form>
        </section>
      </Form>

      <p className="text-center text-muted-foreground text-sm mt-4">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="mt-2 font-medium text-black dark:text-white text-sm underline-offset-4 hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </>
  );
};
