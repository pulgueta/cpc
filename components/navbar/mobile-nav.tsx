import type { FC } from "react";

import Link from "next/link";

import type { User } from "better-auth";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button-variants";
import { authRoutes, noAuthRoutes } from "@/constants/routes";
import { LogoutButton } from "../auth/logout-button";

interface MobileNavProps {
  user: User | undefined;
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
            {user ? `¡Hola otra vez, ${user.name}!` : "Centro Popular Comercial"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <div className="flex flex-col items-start gap-y-4 font-medium">
            {user
              ? authRoutes.map(({ href, label }) => (
                  <SheetClose asChild key={href}>
                    <Link href={href}>{label}</Link>
                  </SheetClose>
                ))
              : noAuthRoutes.map(({ href, label }) => (
                  <SheetClose asChild key={href}>
                    <Link href={href}>{label}</Link>
                  </SheetClose>
                ))}

            {user ? (
              <div className="hidden w-full lg:block">
                <LogoutButton />
              </div>
            ) : (
              <div className="block w-full md:hidden">
                <AuthButtons />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const AuthButtons = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <SheetClose className="w-full">
        <Link href="/login" className={buttonVariants({ size: "sm", className: "w-full" })}>
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
