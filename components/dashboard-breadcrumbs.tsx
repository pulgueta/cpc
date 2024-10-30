"use client";

import { Fragment } from "react";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const DashboardBreadcrumbs = () => {
  const pathname = usePathname();

  const paths = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((p) => p.charAt(0).toUpperCase().concat(p.slice(1)));

  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList>
        {paths.map((path, index) => {
          if (index === paths.length - 1) {
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbPage>{path}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${path.toLowerCase()}`}>
                  {path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
