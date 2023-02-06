import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../../server/src/trpc/trpc";
export const trpc = createTRPCReact<AppRouter>();
