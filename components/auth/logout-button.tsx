"use client";

import type { FC } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth.client";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  fullWidth?: boolean;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ fullWidth = false }) => {
  const { push } = useRouter();

  const { isPending, isRefetching } = useSession();

  const onSignOut = async () => {
    await signOut({ fetchOptions: { onSuccess: () => push("/login") } });
  };

  return (
    <Button
      variant="destructive"
      size={isPending || isRefetching ? "icon" : "sm"}
      loading={isPending || isRefetching}
      onClick={onSignOut}
      className={cn({
        "w-full": fullWidth,
      })}
    >
      {(!isPending || !isRefetching) && "Cerrar sesión"}
    </Button>
  );
};
