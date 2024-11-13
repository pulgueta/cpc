"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { twoFactor } from "@/lib/auth.client";
import { useForm } from "react-hook-form";
import type { TwoFactorDisable } from "@/schemas/otp";
import { twoFactorDisableSchema } from "@/schemas/otp";
import { Form, FormComponent } from "@/components/ui/form";

export const Disable2FA = () => {
  const [show, setShow] = useState<boolean>(false);

  const { refresh } = useRouter();

  const [, setValue] = useQueryState("twofaDisabled", parseAsBoolean.withDefault(false));

  const form = useForm<TwoFactorDisable>({
    resolver: zodResolver(twoFactorDisableSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (ctx) => {
    const { data } = await twoFactor.disable({
      password: ctx.password,
    });

    if (data) {
      refresh();
      toast.success("2FA desactivado correctamente");
      setValue(false);
    }
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormComponent
          name="password"
          label="Contraseña"
          render={({ field }) => (
            <div className="relative w-full">
              <Input
                type={show ? "text" : "password"}
                autoComplete="current-password"
                placeholder="********"
                className="shadow"
                disabled={form.formState.isSubmitting}
                {...field}
              />
              <Button
                size="icon"
                variant="ghost"
                type="button"
                className="absolute top-1 right-1"
                disabled={form.formState.isSubmitting}
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </Button>
            </div>
          )}
        />

        <Button loading={form.formState.isSubmitting} className="mt-4 w-full">
          Desactivar 2FA
        </Button>
      </form>
    </Form>
  );
};
