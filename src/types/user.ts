import { z } from "zod";
export const AuthUser = z.object({
    username: z.string().max(9),
    password: z.string().max(9),
});
export type AuthUser = z.infer<typeof AuthUser>;

export type User = { username: string, password: string, _id: string }


export const SettingsUser = z.object({
    username: z.string().max(9).optional(),
    password: z.string().max(9).optional(),
}).refine(({ username, password }) =>
    username !== undefined || password !== undefined,
    { message: "One of the fields must be defined" })
export type SettingsUser = z.infer<typeof SettingsUser>;