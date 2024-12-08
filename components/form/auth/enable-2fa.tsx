"use client";

import { useActionState, useEffect, useId, useState } from "react";

import Form from "next/form";

import { toast } from "sonner";
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { CREATE_USER } from "@/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { QRCodeBackup } from "@/components/modal/qr-code-with-backup";
import { validateAndGenerateQrCode } from "@/actions/user/generate-qr";

export const Enable2FA = () => {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const passwordId = useId();

  const [state, action] = useActionState(validateAndGenerateQrCode, undefined);

  const [, _setValue] = useQueryState("twofaEnabled", parseAsBoolean.withDefault(false));

  useEffect(() => {
    if (state?.message) {
      toast.info(state.message, { id: crypto.randomUUID() });
      setOpen((prev) => !prev);
    }
  }, [state]);

  return (
    <Form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Contraseña</Label>
        <div className="relative w-full">
          <Input
            type={show ? "text" : "password"}
            autoComplete="current-password"
            placeholder="********"
            className="shadow"
            id={passwordId}
            name="password"
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

      {state?.verification && (
        <QRCodeBackup
          open={open}
          backupCodes={state.verification.backupCodes}
          totpURI={state.verification.totpURI}
        />
      )}

      {Array.isArray(state?.error)
        ? state.error.map((err, idx) => (
            <Alert variant="destructive" className="my-4" key={idx}>
              <AlertCircle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{err || "Error desconocido"}</AlertDescription>
            </Alert>
          ))
        : state?.error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error ?? "Error desconocido"}</AlertDescription>
            </Alert>
          )}

      <Button className="mt-4 w-full">Generar código QR</Button>
    </Form>
  );
};
