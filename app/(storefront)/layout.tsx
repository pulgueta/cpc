import type { FC, PropsWithChildren } from "react";

import { Navbar } from "@/components/navbar/navbar";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default AppLayout;
