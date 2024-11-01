import type { ReactNode } from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { NuqsAdapter } from "nuqs/adapters/react";

import { ThemeProvider } from "@/providers/theme-provider";
import { TanstackProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env/server";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: {
    template: "Centro Popular Comercial - %s",
    default:
      "Centro Popular Comercial - El Centro Comercial de todos los Barramejos",
  },
  description: "Adquiere los mejores productos en el Centro Popular Comercial",
  metadataBase: new URL(env.SITE_URL),
  alternates: {
    canonical: "./",
  },
  applicationName: "Centro Popular Comercial",
  openGraph: {
    type: "website",
    description:
      "Adquiere los mejores productos en el Centro Popular Comercial",
    siteName: "Centro Popular Comercial",
    title:
      "Centro Popular Comercial - El Centro Comercial de todos los Barramejos",
    url: new URL(env.SITE_URL),
  },
  twitter: {
    card: "summary",
  },
} satisfies Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableColorScheme
          enableSystem
        >
          <TanstackProvider>
            <Toaster
              richColors
              position="top-center"
              pauseWhenPageIsHidden
              duration={1500}
            />
            <NuqsAdapter>{children}</NuqsAdapter>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
