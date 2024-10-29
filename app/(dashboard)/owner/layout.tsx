import type { FC, PropsWithChildren } from "react";

import { StoreOwnerSidebar } from "@/components/sidebar/owner/store-owner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SalesProvider } from "@/providers/sales-provider";

const OwnerLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <StoreOwnerSidebar />
      <main className="min-h-dvh w-full p-4">
        <SidebarTrigger className="size-6" />
        <SalesProvider>{children}</SalesProvider>
      </main>
    </SidebarProvider>
  );
};
export default OwnerLayout;
