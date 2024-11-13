import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { Camera, User2Icon, Menu, AlertCircle } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/theme-switch";
import { Heading, Paragraph } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentSession } from "@/lib/auth/session";
import { LogoutButton } from "@/components/auth/logout-button";
import { getUserByEmail } from "@/lib/database/user";
import { TwoFADialog } from "@/components/modal/2fa";
import type { User } from "@/constants/db-types";

interface SettingsProps {
  searchParams: Promise<{ q: string }>;
}

const Settings: NextPage<SettingsProps> = async ({ searchParams }) => {
  const { q } = await searchParams;

  let user: User | null = null;

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
      <div className="w-full space-y-4">
        <Link
          href="/settings"
          className={buttonVariants({
            variant: "link",
          })}
        >
          <User2Icon className="mr-2" size={16} />
          Perfil
        </Link>

        <Separator className="my-4 w-full" />

        {session && !user && <LogoutButton fullWidth />}
      </div>

      <ThemeSwitcher />
    </nav>
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between border-b p-4 md:hidden">
        <Heading>Ajustes</Heading>
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
                  className: "mb-4",
                })}
              >
                Iniciar sesión
              </Link>
            )}

            <Heading as="h2" className="mb-4">
              Ajustes del perfl
            </Heading>
            <form className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="relative">
                  {userInfo.imageSrc && userInfo.name ? (
                    <Image
                      src={userInfo.imageSrc}
                      alt={userInfo.name}
                      width={128}
                      height={128}
                      className="rounded-full"
                    />
                  ) : (
                    <Skeleton className="size-32 rounded-full" />
                  )}

                  <TooltipProvider>
                    <Tooltip delayDuration={150}>
                      <TooltipTrigger asChild>
                        <label
                          htmlFor="profile-upload"
                          className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-primary p-2 text-primary-foreground"
                        >
                          <Camera size={16} />
                          <span className="sr-only">Subir nueva foto</span>
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Subir nueva foto</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <input id="profile-upload" type="file" accept="image/*" className="hidden" />
                </div>
                <div className="text-center sm:text-left">
                  <Paragraph variant="body" weight="bold">
                    Correo electrónico
                  </Paragraph>
                  <Paragraph>{userInfo.email}</Paragraph>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder={userInfo.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder={userInfo.email} />
              </div>

              <div className="space-y-2">
                <Label>Documento de identidad</Label>
                <RadioGroup
                  defaultValue="CC"
                  name="documentType"
                  className="my-1 flex gap-4"
                  required
                >
                  {["CC", "CE", "TI", "NIT"].map((document) => (
                    <div className="flex flex-row items-center space-x-2" key={document}>
                      <RadioGroupItem value={document} id={document} />
                      <Label htmlFor={document}>{document}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Input placeholder="647281291" type="number" name="document" required />
              </div>

              <div className="space-y-4">
                <Heading as="h3">Configuración de cuenta</Heading>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Recibir notificaciones por correo</Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="activate2FA">Autenticación de dos factores</Label>
                  <TwoFADialog
                    is2FAEnabled={userInfo.is2FAEnabled ?? false}
                    isEmailVerified={userInfo.isEmailVerified ?? false}
                  />
                </div>
              </div>

              <Button className="w-full">Guardar cambios</Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
