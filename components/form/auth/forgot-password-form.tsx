"use client";

import { useActionState, useEffect, useId } from "react";

import Form from "next/form";

import { Mail } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CREATE_USER } from "@/constants";
import { Label } from "@/components/ui/label";
import { forgotPasswordAction } from "@/actions/user/forgot-password";
import { FormErros } from "../form-alert-errors";

export const ForgotPasswordForm = () => {
  const email = useId();
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message, { id: crypto.randomUUID() });
    }
  }, [state]);

  return (
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
          minLength={CREATE_USER.email.minLength.value}
          maxLength={CREATE_USER.email.maxLength.value}
        />
      </div>

      <FormErros error={state?.error} />

      <Button leftIcon={<Mail size={16} className="hidden sm:block" />} className="w-full">
        Enviar enlace de recuperación
      </Button>
    </Form>
  );
};
