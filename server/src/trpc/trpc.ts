import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { OpenApiMeta } from "trpc-openapi";
import * as trpcExpress from "@trpc/server/adapters/express";

type CreateContextOptions = {
  session: { id: string };
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    // prisma,
  };
};

export const createContext = async (
  opts: trpcExpress.CreateExpressContextOptions
) => {
  // const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  // const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session: { id: "hi" },
  });
};

export const t = initTRPC
  .context<typeof createContext>()
  .meta<OpenApiMeta>()
  .create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });


