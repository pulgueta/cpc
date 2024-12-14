import type { NextPage } from "next";
import Link from "next/link";

import { AlertCircle, Menu, ShoppingBagIcon, User2Icon } from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { StoresSettingsDropdown } from "@/components/owner/stores-settings-dropdown";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { ThemeSwitcher } from "@/components/theme-switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heading } from "@/components/ui/typography";
import { getCurrentSession } from "@/lib/auth/session";
import { getUserByEmail } from "@/lib/database/user";

interface SettingsProps {
  searchParams: Promise<{ q: string }>;
}

const Settings: NextPage<SettingsProps> = async ({ searchParams }) => {
  const { q } = await searchParams;

  let user = null;

  if (q) {
    user = await getUserByEmail(atob(decodeURIComponent(q)));
  }

  const session = await getCurrentSession();

  const userInfo = {
    imageSrc: session?.user.image ?? user?.image,
    name: session?.user.name ?? user?.name,
    email: session?.user.email ?? user?.email,
    isEmailVerified: session?.user.emailVerified ?? user?.emailVerified,
    is2FAEnabled: session?.user.twoFactorEnabled ?? user?.twoFactorEnabled,
  };

  const NavContent = () => (
    <nav className="flex h-full flex-col items-start justify-between p-0 md:p-4">
      <div className="flex w-full flex-col items-start gap-4">
        <Link
          href="/settings"
          className={buttonVariants({
            variant: "link",
          })}
        >
          <User2Icon className="mr-2" size={16} />
          Perfil
        </Link>

        {session && !user && (
          <>
            {session.user.role === "user" && (
              <Link
                href="/settings/seller"
                className={buttonVariants({
                  variant: "shine",
                  className:
                    "w-full animate-shine bg-[length:400%_100%] bg-gradient-to-r from-violet-600 via-violet-400 to-emerald-600 text-white",
                })}
              >
                <ShoppingBagIcon className="mr-2" size={16} />
                Quiero vender
              </Link>
            )}

            {session?.user.role === "storeOwner" && <StoresSettingsDropdown />}

            <Separator className="m-4 w-full" />

            <LogoutButton fullWidth />
          </>
        )}
      </div>

      <ThemeSwitcher />
    </nav>
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between border-b p-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu size={16} />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <NavContent />
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <NavContent />
        </aside>

        <main className="flex-1 p-4">
          <div className="mx-auto max-w-2xl">
            {!userInfo.isEmailVerified && (
              <Alert variant="info" className="mb-4 md:mb-6">
                <AlertCircle className="size-4" />
                <AlertTitle>¡Atención!</AlertTitle>
                <AlertDescription>
                  Debes verificar tu correo electrónico para acceder tu panel
                </AlertDescription>
              </Alert>
            )}

            {!session && (
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "link",
                  className: "mb-4 w-full",
                })}
              >
                Iniciar sesión
              </Link>
            )}

            <Heading as="h2" className="mb-4">
              Ajustes del perfl
            </Heading>

            <ProfileSettings userInfo={userInfo} saveDisabled={session === null} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
