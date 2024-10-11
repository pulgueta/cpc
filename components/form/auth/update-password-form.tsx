"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ResetPasswordSchema } from "@/schemas/user";
import { resetPasswordSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CREATE_USER } from "@/constants";

export const UpdatePasswordForm = () => {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <header className="mb-4">
        <h1 className="text-3xl tracking-tighter text-balance font-bold text-center">
          Actualizar contraseña
        </h1>
        <p className="text-center text-muted-foreground mt-2 text-pretty text-sm">
          Ingresa el código de recuperación que te enviamos a tu correo
        </p>
      </header>

      <Form {...form}>
        <section className="space-y-4">
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormComponent
              name="password"
              label="Nueva contraseña"
              render={({ field }) => (
                <Input
                  type="password"
                  autoComplete="new-password"
                  aria-disabled={form.formState.isSubmitting}
                  placeholder="********"
                  className="shadow"
                  minLength={CREATE_USER.email.minLength.value}
                  maxLength={CREATE_USER.email.maxLength.value}
                  {...field}
                />
              )}
            />

            <Button className="w-full" loading={form.formState.isSubmitting}>
              Actualizar contraseña
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
