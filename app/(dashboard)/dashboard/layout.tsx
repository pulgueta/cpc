import type { FC, PropsWithChildren } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/sidebar/user/user-sidebar";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <UserSidebar />
    <main className="min-h-dvh w-full border p-4">
      <header className="mb-4 flex shrink-0 items-center gap-2 border-b pb-4">
        <SidebarTrigger className="size-4" />
      </header>
      {children}
    </main>
  </SidebarProvider>
);

export default DashboardLayout;
