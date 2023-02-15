import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/router/router";
export const trpc = createTRPCReact<AppRouter>();
