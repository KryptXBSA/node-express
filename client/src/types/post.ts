import { z } from "zod";
export const NewPost = z.string();

export type NewPost = z.infer<typeof NewPost>;



export type Post = { post_id: string, user_id: string, username: string, profileImageUrl: string, content?: string, imageUrl?: string, likes: { user_id: string, like_date: number }[], comments: { user_id: string, content: string, comment_date: number }[], post_date: number }

export type Comment = {
    comment_id: string;
    user_id: string;
    username: string;
    profileImageUrl: string;
    content: string;
    comment_date: number;
}


