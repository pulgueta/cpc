"use client";

import { useActionState, useEffect, useId, useState } from "react";

import Form from "next/form";
import { useRouter, useSearchParams } from "next/navigation";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_USER } from "@/constants";
import { Label } from "@/components/ui/label";
import { updatePasswordAction } from "@/actions/user/update-password";
import { FormErros } from "../form-alert-errors";

export const UpdatePasswordForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [state, formAction, pending] = useActionState(updatePasswordAction, undefined);
  const password = useId();

  const token = useSearchParams().get("token") as string;
  const { push } = useRouter();

  useEffect(() => {
    if (state?.message) {
      push("/login");
    }
  }, [state]);

  return (
    <Form action={formAction} className="space-y-2">
      <input defaultValue={token} type="hidden" className="hidden" />

      <div className="space-y-1">
        <Label htmlFor={password}>Contraseña</Label>
        <div className="relative w-full">
          <Input
            type="password"
            autoComplete="new-password"
            autoFocus
            aria-disabled={pending}
            placeholder="Nueva contraseña"
            className="shadow"
            minLength={CREATE_USER.password.minLength.value}
            maxLength={CREATE_USER.password.maxLength.value}
          />
          <button
            type="button"
            className={buttonVariants({
              className: "absolute top-1 right-1",
              size: "icon",
              variant: "ghost",
            })}
            onClick={() => setShow(!show)}
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>
      </div>

      <FormErros error={state?.error} />

      <Button className="w-full">Actualizar contraseña</Button>
    </Form>
  );
};
