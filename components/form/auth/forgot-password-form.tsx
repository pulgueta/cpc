"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { toast } from "sonner";

import type { ForgotPasswordSchema } from "@/schemas/user";
import { forgotPasswordSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CREATE_USER } from "@/constants";
import { useAuth } from "@/hooks/user/useAuth";

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { onForgetPassword } = useAuth();

  const onSubmit = form.handleSubmit(async ({ email }) => {
    const vals = await onForgetPassword(email);

    if (vals?.error) {
      return toast.error("No se pudo enviar el enlace de recuperación.");
    }

    toast.success("Enlace de recuperación enviado.");

    return form.reset();
  });

  return (
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
            leftIcon={<Mail size={16} className="hidden sm:block" />}
            loading={form.formState.isSubmitting}
            className="w-full"
          >
            Enviar enlace de recuperación
          </Button>
        </form>
      </section>
    </Form>
  );
};
