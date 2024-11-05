"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Settings, Sparkle } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSession } from "@/lib/auth.client";
import { Skeleton } from "./ui/skeleton";
import { Paragraph } from "./ui/typography";
import { Separator } from "./ui/separator";
import { LogoutButton } from "./auth/logout-button";

export const DashboardBreadcrumbs = () => {
  const pathname = usePathname();

  const session = useSession();

  const paths = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((p) => p.charAt(0).toUpperCase().concat(p.slice(1)));

  return (
    <nav className="flex w-full items-center justify-between gap-x-4">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          {paths.map((path, index) => {
            if (index === paths.length - 1) {
              return (
                <BreadcrumbItem key={path}>
                  <BreadcrumbPage>{path}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }

            return (
              <div key={path} className="flex items-center gap-x-1">
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${path.toLowerCase()}`}>{path}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <Popover>
        <PopoverTrigger asChild>
          {session.isPending ? (
            <Skeleton className="size-10 rounded-full" />
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarImage src={session.data.user.image} alt={session.data.user.name} />
              <AvatarFallback className="text-sm">
                {session.data.user.name.charAt(0).toUpperCase()}
                {session.data.user.name.charAt(1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </PopoverTrigger>
        <PopoverContent>
          {session.isPending ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <div>
              <Paragraph variant="body" weight="bold">
                {session.data.user.name}
              </Paragraph>
              <Separator className="mt-2 mb-4" />
              <div className="space-y-2">
                {session.data.user.plan === "free" && (
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
              </div>

              <Separator className="my-4" />
              <LogoutButton fullWidth />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </nav>
  );
};
