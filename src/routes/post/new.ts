import express from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid'

import { findOne, insertOne, updateOne } from '../../mongo/mongo'
import { JWT_SECRET, POST_COLLECTION, USER_COLLECTION } from '../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { User } from '../../types/user';
import { NewPost, Post } from './../../types/post';
import { verifyUser } from '../../utils/verify-user';

const app = express();
export const newPostRoute = app.post('/new', async (req, res) => {
    let { error, message, user }: { error: boolean, message?: string, user?: User, token?: User } = await verifyUser(req)
    if (error) return sendFailedResponse(res, 400, message)

    let newPost: NewPost
    try {
        newPost = NewPost.parse(req.body);
    } catch (e) {
        console.log('userParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }

    let post: Post = { post_id:nanoid(),user_id: user.user_id, ...newPost, likes: [], comments: [] }
    let insertResult
    insertResult = await insertOne(POST_COLLECTION, post);
    const token = jwt.sign(user, JWT_SECRET);
    return sendSuccessRespose(res, 200, { token, post: post })
})