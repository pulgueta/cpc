"use client";

import type { FC } from "react";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);
