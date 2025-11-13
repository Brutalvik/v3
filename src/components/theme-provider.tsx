"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Infer the props directly from the component instead of importing from /dist
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
