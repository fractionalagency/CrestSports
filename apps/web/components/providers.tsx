"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CartProvider } from "@/contexts/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      enableColorScheme={false}
    >
      <CartProvider>{children}</CartProvider>
    </NextThemesProvider>
  );
}
