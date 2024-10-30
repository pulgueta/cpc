import type { FC, PropsWithChildren } from "react";

import { StoreOwnerSidebar } from "@/components/sidebar/owner/store-owner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SalesProvider } from "@/providers/sales-provider";
import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";

const OwnerLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <StoreOwnerSidebar />
      <main className="min-h-dvh w-full p-4">
        <SidebarTrigger className="size-6" />
        <DashboardBreadcrumbs />
        <SalesProvider>{children}</SalesProvider>
      </main>
    </SidebarProvider>
  );
};
export default OwnerLayout;
