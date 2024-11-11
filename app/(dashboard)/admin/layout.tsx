import type { FC, PropsWithChildren } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      {/* <StoreOwnerSidebar /> */}
      <main className="min-h-dvh p-4">
        <SidebarTrigger className="size-6" />
        {children}
      </main>
    </SidebarProvider>
  );
};
export default AdminLayout;
