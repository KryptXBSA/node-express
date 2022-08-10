import { z } from "zod";
export const AuthUser = z.object({
    username: z.string().max(9),
    password: z.string().max(9),
});
export type AuthUser = z.infer<typeof AuthUser>;

export type User = { user_id: string, username?: string, imageUrl: string, password?: string }


export const SettingsUser = z.object({
    username: z.string().max(9).optional(),
    currentPassword: z.string().max(9),
    newPassword: z.string().max(9).optional(),
}).refine(({ username, newPassword }) =>
    username !== undefined || newPassword !== undefined,
    { message: "One of the fields must be defined" })
export type SettingsUser = z.infer<typeof SettingsUser>;