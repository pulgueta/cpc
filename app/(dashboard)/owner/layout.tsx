import type { FC, PropsWithChildren } from "react";

import { cookies } from "next/headers";

import { StoreOwnerSidebar } from "@/components/sidebar/owner/store-owner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SalesProvider } from "@/providers/sales-provider";
import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";
import { Separator } from "@/components/ui/separator";

const OwnerLayout: FC<PropsWithChildren> = async ({ children }) => {
  const sidebarState = (await cookies()).get("sidebar:state");

  let defaultOpen = true;

  if (sidebarState) {
    defaultOpen = sidebarState.value === "true";
  }

  return (
    <SidebarProvider defaultOpen={!defaultOpen}>
      <StoreOwnerSidebar />
      <main className="min-h-dvh w-full p-4">
        <header className="flex shrink-0 items-center gap-2 border-b px-4 pb-4">
          <SidebarTrigger className="size-4" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <DashboardBreadcrumbs />
        </header>
        <SalesProvider>{children}</SalesProvider>
      </main>
    </SidebarProvider>
  );
};
export default OwnerLayout;
