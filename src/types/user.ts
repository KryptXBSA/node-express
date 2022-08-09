import { z } from "zod";
export const User = z.object({
    username: z.string().max(9),
    password: z.string().max(9),
});
export type User = z.infer<typeof User>;