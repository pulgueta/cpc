"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button as B } from "@/components/ui/button";
import { logout } from "./action";

export const LogoutButton = () => {
  const [_, action] = useFormState(logout, { error: "" });

  return (
    <form action={action}>
      <Button />
    </form>
  );
};

const Button = () => {
  const { pending } = useFormStatus();

  return (
    <B loading={pending} variant="destructive" size="sm">
      Cerar sesión
    </B>
  );
};
