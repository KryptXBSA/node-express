import express from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid'
import { z } from "zod";

import { findOne, insertOne, updateOne } from '../../mongo/mongo'
import { JWT_SECRET, POST_COLLECTION, USER_COLLECTION } from '../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { User } from '../../types/user';
import { NewPost, Post } from './../../types/post';
import { verifyUser } from '../../utils/verify-user';

const app = express();

const PostId = z.string();
type PostId = z.infer<typeof PostId>;

export const likePostRoute = app.post('/like', async (req, res) => {
    let { error, message, user }: { error: boolean, message?: string, user?: User, token?: User } = await verifyUser(req)
    if (error) return sendFailedResponse(res, 400, message)

    let post_id: PostId
    try {
        post_id = PostId.parse(req.query.post_id);
    } catch (e) {
        console.log('likeParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }

    let post: Post = await findOne(POST_COLLECTION, { post_id: post_id })
    if (!post) return sendFailedResponse(res, 400, { message: 'Post not found' })


    if (req.query.unlike) {
        if (!post.likes.find(p => p.user_id === user!.user_id )) return sendFailedResponse(res, 400, { message: 'Not liked' })
        await updateOne(POST_COLLECTION, { post_id: post_id }, { $pull: { likes: { user_id: user!.user_id } } })
    } else {
        if (post.likes.find(p => p.user_id === user!.user_id)) return sendFailedResponse(res, 400, { message: 'Already liked' })
        await updateOne(POST_COLLECTION, { post_id: post_id }, { $push: { likes: { like_id: nanoid(), user_id: user!.user_id, like_date: Date.now() } } })
    }

    return sendSuccessRespose(res, 200, { message: "success" })
})