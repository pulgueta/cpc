import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth/session";

export const LogoutButton = () => {
  return (
    <form action={logout}>
      <Button variant="destructive" size="sm">
        Cerrar sesión
      </Button>
    </form>
  );
};
