import type { ReactNode } from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: {
    template: "Centro Popular Comercial - %s",
    default: "Centro Popular Comercial - El Centro Comercial de todos los Barramejos",
  },
  description: "Adquiere los mejores productos en el Centro Popular Comercial",
} satisfies Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableColorScheme enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
