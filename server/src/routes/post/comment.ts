import { POINTS_PER_COMMENT } from '../../../config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid'
import { z } from "zod";

import { findOne, insertOne, updateOne } from '../../mongo/mongo'
import { JWT_SECRET, LEADERBOARD_COLLECTION, POST_COLLECTION, USER_COLLECTION } from '../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { User } from '../../types/user';
import { Post } from '../../types/post';
import { verifyUser } from '../../utils/verify-user';

const app = express();

const Comment = z.object({
    post_id: z.string().max(37),
    content: z.string().max(9),
})
type Comment = z.infer<typeof Comment>;

export const commentRoute = app.post('/comment', async (req, res) => {
    let { error, message, user }: { error: boolean, message?: string, user?: User, token?: User } = await verifyUser(req)
    if (error) return sendFailedResponse(res, 400, message)

    let comment: Comment
    try {
        let data = { post_id: req.query.post_id, content: req.body.content }
        comment = Comment.parse(data);
    } catch (e) {
        console.log('commentParseError', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }

    let post: Post = await findOne(POST_COLLECTION, { post_id: comment.post_id })
    if (!post) return sendFailedResponse(res, 400, { message: 'Post not found' })
    console.log(post);


    let updateResult = await updateOne(POST_COLLECTION, { post_id: comment.post_id }, { $push: { comments: { comment_id: nanoid(), user_id: user!.user_id, content: comment.content, comment_date: Date.now() } } })
    await updateOne(LEADERBOARD_COLLECTION, { user_id: user.user_id }, { $inc: { comments: 1, points: POINTS_PER_COMMENT } })
    await updateOne(LEADERBOARD_COLLECTION, { user_id: post.user_id }, { $inc: { commentsReceived: 1, points: POINTS_PER_COMMENT } })


    return sendSuccessRespose(res, 200, { message: "success" })
})