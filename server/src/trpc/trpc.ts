import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
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

export const createTRPCContext = async (
  opts: trpcExpress.CreateExpressContextOptions
) => {
  // const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  // const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session: { id: "hi" },
  });
};

const t = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createTRPCContext>()
  .create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });

export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: "Bilbo" };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .query(async (req) => {
      // use your ORM of choice
      return "hi";
      // return await UserModel.create({
      //   data: req.input,
      // });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
