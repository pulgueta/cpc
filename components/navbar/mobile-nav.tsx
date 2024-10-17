import type { FC } from "react";

import Link from "next/link";

import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "../ui/button";
import type { User } from "@/db/schemas/user";
import { authRoutes, noAuthRoutes } from "@/constants/routes";
import { LogoutButton } from "../auth/logout-button";

interface MobileNavProps {
  user: User | null;
}

export const MobileNav: FC<MobileNavProps> = ({ user }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          aria-label="Abrir menú móvil"
          className="inline-flex lg:hidden"
        >
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="tracking-tight">
            {user
              ? `¡Hola otra vez, ${user.name}!`
              : "Centro Popular Comercial"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <ul className="font-medium flex flex-col items-start gap-y-4">
            {user
              ? authRoutes.map(({ href, label }) => (
                  <li key={href}>
                    <SheetClose>
                      <Link href={href}>{label}</Link>
                    </SheetClose>
                  </li>
                ))
              : noAuthRoutes.map(({ href, label }) => (
                  <li key={href}>
                    <SheetClose>
                      <Link href={href}>{label}</Link>
                    </SheetClose>
                  </li>
                ))}

            {user ? (
              <li className="w-full hidden md:block">
                <LogoutButton />
              </li>
            ) : (
              <li className="w-full block md:hidden">
                <AuthButtons />
              </li>
            )}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const AuthButtons = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 w-full">
      <SheetClose className="w-full">
        <Link
          href="/login"
          className={buttonVariants({ size: "sm", className: "w-full" })}
        >
          Iniciar sesión
        </Link>
      </SheetClose>
      <SheetClose className="w-full">
        <Link
          href="/register"
          className={buttonVariants({
            size: "sm",
            variant: "secondary",
            className: "w-full",
          })}
        >
          Registrarme
        </Link>
      </SheetClose>
    </div>
  );
};
