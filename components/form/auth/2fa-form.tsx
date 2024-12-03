"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form, FormComponent } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import type { TwoFactor } from "@/schemas/otp";
import { twoFactorSchema } from "@/schemas/otp";
import { twoFactor } from "@/lib/auth.client";
import { Checkbox } from "@/components/ui/checkbox";

export const TwoFAForm = () => {
  const form = useForm<TwoFactor>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
      trustDevice: false,
    },
  });

  const onSubmit = form.handleSubmit(async ({ code, trustDevice }) => {
    await twoFactor.verifyTotp({
      code,
      trustDevice,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Verificación exitosa");
        },
        onError: ({ error }) => {
          switch (error.status) {
            case 401:
              toast.error("Código de verificación incorrecto");
              break;

            default:
              toast.error(error.message);
          }
        },
      },
    });
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormComponent
          name="code"
          label="Código de verificación"
          className="flex flex-col items-center gap-1 text-center"
          render={({ field }) => (
            <InputOTP maxLength={6} autoComplete="one-time-code" {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        <FormComponent
          name="trustDevice"
          description="Confía en este dispositivo para no solicitar un código de verificación en el futuro."
          render={({ field }) => (
            <div className="mt-4 flex items-center space-x-2">
              <Checkbox id="trustDevice" checked={field.value} onCheckedChange={field.onChange} />
              <label
                htmlFor="trustDevice"
                className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Confío en este dispositivo
              </label>
            </div>
          )}
        />

        <Button className="mx-auto w-full max-w-xs" loading={form.formState.isSubmitting}>
          Validar
        </Button>
      </form>
    </Form>
  );
};
