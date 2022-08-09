import { z } from "zod";
export const NewPost = z.object({
    content: z.string().max(9),
    image: z.string().max(9),
}).strict()
export type NewPost = z.infer<typeof NewPost>;



export type Post = { user_id: string, content?: string, image?: string, likes: [], comments: [] }
