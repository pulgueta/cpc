"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { ResetPasswordSchema } from "@/schemas/user";
import { resetPasswordSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_USER } from "@/constants";
import { useAuth } from "@/hooks/user/useAuth";

export const UpdatePasswordForm = () => {
  const { push } = useRouter();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { onUpdatePassword } = useAuth();

  const onSubmit = form.handleSubmit(async ({ password }) => {
    if (!password || !password.length) return;

    const res = await onUpdatePassword(password);

    if (res.error !== null) {
      return toast.error(res.error.message);
    }

    toast.success("Tu contraseña ha sido actualizada.");
    form.reset();

    return push("/login");
  });

  return (
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
                autoFocus
                aria-disabled={form.formState.isSubmitting}
                placeholder="Nueva contraseña"
                className="shadow"
                minLength={CREATE_USER.password.minLength.value}
                maxLength={CREATE_USER.password.maxLength.value}
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
  );
};
