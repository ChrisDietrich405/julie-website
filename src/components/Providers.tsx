"use client";

import {ThemeProvider} from "@mui/material";
import {CartContextProvider} from "@/app/context/cartContext";
import {UserContextProvider} from "@/app/context/userContext";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {theme} from "@/theme";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const Providers = ({children}: { children: React.ReactNode }) => {

  const queryClient = new QueryClient()

  return (
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <UserContextProvider>
            <CartContextProvider>
              {children}
            </CartContextProvider>
          </UserContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
