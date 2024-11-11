"use client";

import type { FC } from "react";

import { useRouter } from "next/navigation";

import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth.client";

interface LogoutButtonProps {
  fullWidth?: boolean;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ fullWidth = false }) => {
  const { push } = useRouter();

  const { isPending } = useSession();

  return (
    <Button
      variant="destructive"
      loading={isPending}
      leftIcon={<LogOutIcon size={16} />}
      onClick={() => signOut({ fetchOptions: { onSuccess: () => push("/login") } })}
      className={cn({
        "w-full": fullWidth,
      })}
    >
      Cerrar sesión
    </Button>
  );
};
