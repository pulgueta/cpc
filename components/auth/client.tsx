"use client";

import { useSession } from "@/lib/auth.client";

export const Client = () => {
  const { data, isPending, isRefetching } = useSession();

  return (
    <div>
      {isPending || isRefetching ? (
        <p>Loading...</p>
      ) : (
        data && <pre>{JSON.stringify(data.user, null, 2)}</pre>
      )}
    </div>
  );
};
