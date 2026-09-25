"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { LangProvider } from "@/lib/lang";
import { LanguageProvider } from "@/lib/i18n";
import { ChatWidget } from "@/components/chat/chat-widget";

function ThemedToaster() {
  // Sonner solo conoce light/dark: el modo accesible usa el claro.
  const { theme } = useTheme();
  return <Toaster richColors position="top-center" theme={theme === "dark" ? "dark" : "light"} />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LangProvider>
          <QueryClientProvider client={client}>
            {children}
            <ChatWidget />
            <ThemedToaster />
          </QueryClientProvider>
        </LangProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
