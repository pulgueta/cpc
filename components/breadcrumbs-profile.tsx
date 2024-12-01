import type { FC } from "react";

import Link from "next/link";

import { Plus, Settings, Sparkle } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Paragraph } from "./ui/typography";
import { Separator } from "./ui/separator";
import { LogoutButton } from "./auth/logout-button";
import type { Session } from "@/lib/auth";

interface BreadcrumbsProfileProps {
  user: Session["user"];
}

export const BreadcrumbsProfile: FC<BreadcrumbsProfileProps> = ({ user }) => {
  const separatedName = user.name.split(" ");

  const initials = [separatedName[0].charAt(0), separatedName[1] ? separatedName[1].charAt(0) : ""];

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipContent>
          <p>Abrir menú</p>
        </TooltipContent>
        <Popover>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.image ?? ""} alt={user.name} />
                <AvatarFallback className="text-sm">{initials}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
          </TooltipTrigger>
          <PopoverContent>
            <div>
              <Paragraph variant="body" weight="bold">
                {user.name}
              </Paragraph>
              <Separator className="mt-2 mb-4" />
              <div className="space-y-4">
                {user.plan === "free" && (
                  <Link
                    href="/"
                    className="flex items-center hover:underline hover:underline-offset-4"
                  >
                    <Sparkle size={16} className="mr-2" />
                    Actualizar a Pro
                  </Link>
                )}
                <Link
                  href="/settings"
                  className="flex items-center hover:underline hover:underline-offset-4"
                >
                  <Settings size={16} className="mr-2" />
                  Ajustes
                </Link>

                {user.plan !== "free" && (
                  <>
                    <Separator className="block md:hidden" />
                    <Button
                      variant="outline"
                      leftIcon={<Plus size={16} />}
                      className="inline-flex w-full md:hidden"
                    >
                      Agregar local
                    </Button>
                  </>
                )}
              </div>

              <Separator className="my-4" />
              <LogoutButton fullWidth />
            </div>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
};
