"use client";

import type { FC, PropsWithChildren } from "react";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const TanstackProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            gcTime: 1000 * 5,
            retryDelay: (idx) => Math.min(1000 * 2 ** idx, 1000 * 30),
          },
          mutations: {
            retryDelay: (idx) => Math.min(1000 * 2 ** idx, 1000 * 30),
            retry: 3,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
