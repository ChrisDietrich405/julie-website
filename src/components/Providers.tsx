"use client";

import {ThemeProvider} from "@mui/material";
import {UserContextProvider} from "@/app/context/userContext";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {theme} from "@/theme";
import {dehydrate, HydrationBoundary, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarContextProvider} from "@/app/context";
import {useState} from "react";

export const Providers = ({children}: { children: React.ReactNode }) => {

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ThemeProvider theme={theme}>
          <UserContextProvider>
            <AppRouterCacheProvider options={{speedy: true}}>
              <SnackbarContextProvider>
                {children}
              </SnackbarContextProvider>
            </AppRouterCacheProvider>
          </UserContextProvider>
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
