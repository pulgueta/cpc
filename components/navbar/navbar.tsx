import Link from "next/link";

import { getCurrentSession } from "@/lib/auth/session";
import { LogoutButton } from "../auth/logout-button";
import { ThemeSwitcher } from "../theme-switch";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "../ui/button-variants";
import { authRoutes, noAuthRoutes } from "@/constants/routes";

export const Navbar = async () => {
  const sessionData = await getCurrentSession();

  return (
    <header className="flex w-full items-center justify-between border-b bg-neutral-200 p-4 shadow md:justify-around dark:bg-neutral-900">
      <Link href="/" className="font-bold text-3xl tracking-tighter">
        <span className="block sm:hidden">CPC</span>
        <span className="hidden sm:block">Centro Popular Comercial</span>
      </Link>
      <nav className="flex items-center gap-x-4">
        <ul className="hidden gap-x-4 font-medium lg:flex lg:items-center lg:text-sm">
          {!!sessionData?.session
            ? authRoutes.map(({ href, label }) => (
                <li key={href}>
                  <Link className={buttonVariants({ size: "sm", variant: "link" })} href={href}>
                    {label}
                  </Link>
                </li>
              ))
            : noAuthRoutes.map(({ href, label }) => (
                <li key={href}>
                  <Link className={buttonVariants({ size: "sm", variant: "link" })} href={href}>
                    {label}
                  </Link>
                </li>
              ))}
        </ul>
        {sessionData?.user ? (
          <LogoutButton />
        ) : (
          <div className="hidden md:block">
            <AuthButtons />
          </div>
        )}

        <ThemeSwitcher />
        <MobileNav user={sessionData?.user} />
      </nav>
    </header>
  );
};

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-x-4">
      <Link href="/login" className={buttonVariants({ size: "sm" })}>
        Iniciar sesión
      </Link>
      <Link href="/register" className={buttonVariants({ size: "sm", variant: "secondary" })}>
        Registrarme
      </Link>
    </div>
  );
};
