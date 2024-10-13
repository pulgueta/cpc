import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { NewUser } from "@/db/schemas";
import type { CreateUserResponse } from "@/types/CreateUserResponse";

export const useCreateUser = () => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (data: NewUser) => {
      const q = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const res = await q.json();

      if (!q.ok) {
        return {
          message: res.message as string,
        };
      }

      return res as CreateUserResponse;
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ["users"] }),
  });

  return mutation;
};
