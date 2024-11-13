import type { ElementRef, FC, FormEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";

import Form from "next/form";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import QRCode from "react-qr-code";
import { Copy } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Paragraph } from "../ui/typography";
import { useIsMobile } from "@/hooks/use-mobile";
import { twoFactor } from "@/lib/auth.client";

interface QRCodeBackupProps {
  totpURI: string;
  backupCodes: string[];
  open: boolean;
}

export const QRCodeBackup: FC<QRCodeBackupProps> = ({ backupCodes, totpURI, open }) => {
  const [code, setCode] = useState<string>("");

  const otpId = useId();

  const formRef = useRef<ElementRef<typeof Form>>(null);

  const { refresh } = useRouter();

  const [isOpen, setValue] = useQueryState("twofaEnabled", parseAsBoolean.withDefault(false));

  const isMobile = useIsMobile();

  const onSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await twoFactor.verifyTotp({
      code,
    });

    if (data) {
      refresh();
      toast.success("¡Doble factor de autenticación activado!");
      setValue(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    toast.success("Códigos copiados al portapapeles");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        formRef.current?.requestSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AlertDialog open={open || isOpen}>
      <AlertDialogContent className="w-full max-w-xs rounded md:max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Tu código QR</AlertDialogTitle>
          <AlertDialogDescription>
            Escanea el código QR en tu app de autenticación ya sea Google Authenticator, Authy, etc.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="max-h-[440px] min-h-full w-full sm:max-h-full md:max-h-full">
          <div className="flex flex-col gap-2">
            <QRCode value={totpURI} className="mx-auto w-full" size={isMobile ? 128 : 196} />

            <div>
              <Paragraph center>Códigos de respaldo:</Paragraph>
              <Paragraph muted center>
                Asegúrate de guardar estos códigos en un lugar seguro. Puedes usar estos códigos si
                pierdes acceso a tu aplicación de autenticación.
              </Paragraph>
            </div>

            <div className="mb-2 flex flex-col gap-2">
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                {backupCodes.map((code) => (
                  <p key={code} className="text-center text-gray-500 text-sm">
                    {code}
                  </p>
                ))}
              </div>

              <Button
                className="mx-auto mt-4 mb-2 w-full max-w-xs"
                leftIcon={<Copy size={16} />}
                onClick={onCopy}
              >
                Copiar códigos
              </Button>
            </div>

            <form onSubmit={onSumbit} className="space-y-2">
              <Label htmlFor={otpId}>
                Escribe el código de verificación que generó la aplicación
              </Label>
              <Input
                placeholder="123456"
                name="otp"
                id={otpId}
                required
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="number"
              />
              <Button className="w-full">Validar</Button>
            </form>
          </div>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};
