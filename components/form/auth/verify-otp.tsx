"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form, FormComponent } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import type { OTPCodeSchema } from "@/schemas/otp-code";
import { otpCodeSchema } from "@/schemas/otp-code";

export const VerifyOTP = () => {
  const form = useForm<OTPCodeSchema>({
    resolver: zodResolver(otpCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const params = useSearchParams();
  const { push } = useRouter();

  const onSubmit = form.handleSubmit(async (data) => {
    const { signal } = new AbortController();

    const decodedEmail = atob(params.get("email") ?? "");

    const req = await fetch(`/api/auth/verify?email=${decodedEmail}`, {
      method: "POST",
      body: JSON.stringify(data),
      signal,
    });

    const res = await req.json();

    if (!req.ok) {
      return toast.error(res.message);
    }

    toast.success(
      "Se ha verificado tu correo con éxito, ya puedes iniciar sesión"
    );

    return push("/login");
  });

  return (
    <Form {...form}>
      <section className="space-y-4">
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormComponent
            name="code"
            render={({ field }) => (
              <div className="mx-auto w-max">
                <InputOTP maxLength={6} {...field} autoComplete="one-time-code">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )}
          />

          <Button className="w-full" loading={form.formState.isSubmitting}>
            Validar código
          </Button>
        </form>
      </section>
    </Form>
  );
};
