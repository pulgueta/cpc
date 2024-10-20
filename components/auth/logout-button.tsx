"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth.client";

export const LogoutButton = () => {
  const { refresh } = useRouter();

  const { isPending, isRefetching } = useSession();

  return (
    <Button
      variant="destructive"
      size={isPending || isRefetching ? "icon" : "sm"}
      loading={isPending || isRefetching}
      onClick={async () => await signOut({ fetchOptions: { onSuccess: () => refresh() } })}
    >
      {(!isPending || !isRefetching) && "Cerrar sesión"}
    </Button>
  );
};
