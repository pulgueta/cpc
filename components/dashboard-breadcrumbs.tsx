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
    .filter((p) => p !== "")
    .map((p) => p.charAt(0).toUpperCase().concat(p.slice(1)));

  const storeName = paths?.[0];
  const storeIndex = paths?.indexOf(storeName ?? "");
  const result = storeIndex !== -1 ? paths?.slice(storeIndex! + 1) : [];

  return (
    <nav className="flex w-full items-center justify-between gap-x-4">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          {result &&
            result.map((path, index) => {
              if (index === result.length - 1) {
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
        {user.plan !== "free" && (
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            className="hidden md:inline-flex"
            disabled={user.plan === "free"}
          >
            Agregar local
          </Button>
        )}
        <BreadcrumbsProfile user={user} />
      </div>
    </nav>
  );
};
