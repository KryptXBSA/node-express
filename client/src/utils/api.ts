// pages/index.tsx
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import { createTRPCNext } from '@trpc/next';

import superjson from "superjson";
import { AppRouter } from "../../../server/src/trpc/trpc";
export const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:7002/trpc",
    }),
  ],
});
