"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ResetPasswordSchema } from "@/schemas/user";
import { resetPasswordSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const VerifyOTP = () => {
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
    <Form {...form}>
      <section className="space-y-4">
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormComponent
            name="password"
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
