import { z } from "zod";
export const NewPost = z.object({
    content: z.string().max(9),
    image: z.string().max(9),
}).strict()
export type NewPost = z.infer<typeof NewPost>;



export type Post = { post_id: string, user_id: string, content?: string, image?: string, likes: { user_id: string, like_date: number }[], comments: { user_id: string, content: string, comment_date: number }[], post_date: number }
