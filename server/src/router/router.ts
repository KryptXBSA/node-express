
import { t } from "../trpc/trpc";
import { z } from "zod";
export const userRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: "Bilbo" };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req) => {
      // use your ORM of choice
      return "hiii from mutation";
      // return await UserModel.create({
      //   data: req.input,
      // });
    }),
});

export const appRouter = t.router({
  user: userRouter,
});
export type AppRouter = typeof appRouter;
