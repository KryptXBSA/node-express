import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { Post } from './../../types/post';
import { findPagination, findMany, findOne, insertOne } from '../../mongo/mongo'
import { JWT_SECRET, POST_COLLECTION, USER_COLLECTION } from '../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { AuthUser, User } from '../../types/user';
const app = express();

export const getPostsRoute = app.post('/get-posts', async (req, res) => {

    let skip: any = req.query.skip
    if (!skip ) return sendFailedResponse(res, 400, { message: 'Invalid skip' })
    skip = parseInt(skip,10)
    if (skip < 0) return sendFailedResponse(res, 400, { message: 'Invalid skip' })
    if(isNaN(skip))return sendFailedResponse(res, 400, { message: 'Invalid skip' })
    
    let findResult: Post[] = await findPagination(POST_COLLECTION, skip, 10, {post_date:-1})
    if (!findResult) {
        return sendFailedResponse(res, 400, { message: 'no posts found' })
    }

    if (findResult) {
        return sendSuccessRespose(res, 200, findResult)
    }

})