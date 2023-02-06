import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { ProgramWrapper } from "../contexts/programContextProvider";
import { ThemeProvider } from "next-themes";
import "animate.css";
import { NotifierContextProvider } from "react-headless-notifier";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";

import superjson from "superjson";
function MyApp({ Component, pageProps }: any) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: "http://localhost:7002/trpc",
          // optional
          // headers() {
          //   return {
          //     // authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    })
  );

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ProgramWrapper>
        <NotifierContextProvider
          // All props are optional, those are the values by default
          config={{
            max: null, // Max number of notiication simultaneously, `null` will result in no maximum
            duration: 5000, // Duration by notification in milliseconds
            position: "bottomRight", // Default position for all the notification if it's not specify when using `notify()`, valid positions are 'top', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'bottom'.
          }}
        >
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </trpc.Provider>
        </NotifierContextProvider>
      </ProgramWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
// export default api.withTRPC(MyApp);
