import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { Post } from '../../types/post';
import { findPagination, findMany, findOne, insertOne } from '../../mongo/mongo'
import { JWT_SECRET, LEADERBOARD_COLLECTION, POST_COLLECTION, USER_COLLECTION } from '../../../config';
import { Leaderboard } from './../../types/leaderboard';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { AuthUser, User } from '../../types/user';
const app = express();

export const getLeaderBoardRoute = app.post('/get-leaderboard', async (req, res) => {

    let skip: any = req.query.skip
    let user_id: any = req.query.user_id
    if (!skip) return sendFailedResponse(res, 400, { message: 'Invalid skip0' })
    skip = parseInt(skip, 10)
    if (skip < 0) return sendFailedResponse(res, 400, { message: 'Invalid skip1' })
    if (isNaN(skip)) return sendFailedResponse(res, 400, { message: 'Invalid skip2' })

    let user
    if (user_id) {
        user = await findOne(LEADERBOARD_COLLECTION, { user_id: user_id })
    }
    let findResult: Leaderboard[] = await findPagination(LEADERBOARD_COLLECTION, skip, 100, { points: -1 })
    if (!findResult) {
        return sendFailedResponse(res, 400, { message: 'no posts found' })
    }

    if (findResult) {
        return sendSuccessRespose(res, 200, {  user,leaderboard: findResult })
    }

})