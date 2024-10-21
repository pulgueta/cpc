"use client";

import { useSession, useListPasskeys, passkey } from "@/lib/auth.client";
import { Button } from "../ui/button";

export const Client = () => {
  const { data, isPending, isRefetching } = useSession();

  const { data: passkeys } = useListPasskeys();

  return (
    <div>
      {isPending || isRefetching ? (
        <p>Loading...</p>
      ) : (
        data && <pre>{JSON.stringify(data.user, null, 2)}</pre>
      )}

      <h2>Passkeys</h2>
      {data?.session && passkeys && passkeys.length > 0 ? (
        passkeys.map((ps) => (
          <div className="flex items-center gap-x-2">
            <p className="my-2" key={ps.id}>
              * {ps.id}
            </p>
            <Button variant="destructive" onClick={() => passkey.deletePasskey({ id: ps.id })}>
              Eliminar
            </Button>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">No passkeys to show</p>
      )}

      {data?.session && <Button onClick={() => passkey.addPasskey()}>Create passkey</Button>}
    </div>
  );
};
