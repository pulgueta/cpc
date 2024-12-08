"use client";

import type { FC } from "react";
import { useActionState } from "react";

import Form from "next/form";

import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "./action";

interface LogoutButtonProps {
  fullWidth?: boolean;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ fullWidth = false }) => {
  const [, formAction] = useActionState(logout, undefined);

  return (
    <Form action={formAction}>
      <Button
        variant="destructive"
        leftIcon={<LogOutIcon size={16} />}
        className={cn({
          "w-full": fullWidth,
        })}
      >
        Cerrar sesión
      </Button>
    </Form>
  );
};
