import Link from "next/link";

import { getCurrentSession } from "@/lib/auth/session";
import { LogoutButton } from "../auth/logout-button";
import { ThemeSwitcher } from "../theme-switch";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "../ui/button";
import { authRoutes, noAuthRoutes } from "@/constants/routes";

export const Navbar = async () => {
  const { user, session } = await getCurrentSession();

  return (
    <header className="w-full p-4 bg-neutral-200 dark:bg-neutral-900 flex items-center justify-between md:justify-around border-b shadow">
      <Link href="/" className="text-3xl tracking-tighter font-bold">
        <span className="block sm:hidden">CPC</span>
        <span className="hidden sm:block">Centro Popular Comercial</span>
      </Link>
      <nav className="flex items-center gap-x-4">
        <ul className="hidden font-medium lg:flex lg:items-center gap-x-4 lg:text-sm">
          {!!session
            ? authRoutes.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))
            : noAuthRoutes.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
        </ul>
        {user ? (
          <LogoutButton />
        ) : (
          <div className="hidden md:block">
            <AuthButtons />
          </div>
        )}

        <ThemeSwitcher />
        <MobileNav user={user} />
      </nav>
    </header>
  );
};

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Link href="/login" className={buttonVariants({ size: "sm" })}>
        Iniciar sesión
      </Link>
      <Link
        href="/register"
        className={buttonVariants({ size: "sm", variant: "secondary" })}
      >
        Registrarme
      </Link>
    </div>
  );
};
