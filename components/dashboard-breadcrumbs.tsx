import type { FC } from "react";

import { Plus } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "./ui/button";
import type { CurrentSession } from "@/constants/db-types";
import { BreadcrumbsProfile } from "./breadcrumbs-profile";

interface DashboardBreadcrumbsProps extends CurrentSession {
  pathname: string | undefined;
}

export const DashboardBreadcrumbs: FC<DashboardBreadcrumbsProps> = ({ pathname, user }) => {
  const paths = pathname
    ?.split("/")
    .filter((path) => path !== "")
    .map((p) => p.charAt(0).toUpperCase().concat(p.slice(1)));

  return (
    <nav className="flex w-full items-center justify-between gap-x-4">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          {paths &&
            paths.map((path, index) => {
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
      <div className="flex items-center gap-4">
        <Button variant="outline" leftIcon={<Plus size={16} />} className="hidden md:inline-flex">
          Agregar local
        </Button>
        <BreadcrumbsProfile user={user} />
      </div>
    </nav>
  );
};
