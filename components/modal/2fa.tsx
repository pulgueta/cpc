"use client";

import type { FC } from "react";

import { parseAsBoolean, useQueryStates } from "nuqs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Enable2FA } from "../form/auth/enable-2fa";
import { Disable2FA } from "../form/auth/disable-2fa";
import { Button } from "../ui/button";

interface TwoFADialogProps {
  is2FAEnabled: boolean;
  isEmailVerified: boolean;
}

export const TwoFADialog: FC<TwoFADialogProps> = ({ is2FAEnabled, isEmailVerified }) => {
  const [modals, setModals] = useQueryStates(
    {
      twofaDisabled: parseAsBoolean.withDefault(false),
      twofaEnabled: parseAsBoolean.withDefault(false),
    },
    { clearOnDefault: true },
  );

  const isOpen = modals.twofaDisabled || modals.twofaEnabled;

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setModals({ twofaDisabled: false, twofaEnabled: false });
    }
  };

  const handleButtonClick = () => {
    setModals({
      twofaDisabled: is2FAEnabled,
      twofaEnabled: !is2FAEnabled,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          disabled={!isEmailVerified}
          variant={is2FAEnabled ? "destructive" : "outline"}
          onClick={handleButtonClick}
        >
          {is2FAEnabled ? "Desactivar" : "Activar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xs rounded md:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {is2FAEnabled ? "Desactivar" : "Activar"} doble factor de autenticación
          </DialogTitle>
          <DialogDescription>
            Debes introducir tu contraseña para {is2FAEnabled ? "desactivar" : "activar"} el doble
            factor de autenticación.
          </DialogDescription>
        </DialogHeader>

        {is2FAEnabled ? <Disable2FA /> : <Enable2FA />}
      </DialogContent>
    </Dialog>
  );
};
