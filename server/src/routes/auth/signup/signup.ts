import { Leaderboard } from '../../../types/leaderboard';
import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid'


import { findOne, insertOne } from '../../../mongo/mongo'
import { JWT_SECRET, LEADERBOARD_COLLECTION, USER_COLLECTION } from '../../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../../utils/response'
import { AuthUser, User } from '../../../types/user';

const app = express();

export const signupRoute = app.post('/signup', async (req, res) => {
    let user: AuthUser
    try {
        user = AuthUser.parse(req.body);

    } catch (e) {
        console.log('userParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }
    user.password = await bcrypt.hash(user.password, 11);
    let findResult: any = await findOne(USER_COLLECTION, { username: user.username })
    if (findResult) {
        return sendFailedResponse(res, 400, { message: 'already registered' })
    }
    let newUser: User = { ...user, user_id: nanoid(), imageUrl: 'default' }
    let insertResult
    if (!findResult) {
        insertResult = await insertOne(USER_COLLECTION, newUser);

        let leaderboard: Leaderboard = { user_id: newUser.user_id, points: 0, captchaSolved: 0, posts: 0, comments: 0, likes: 0, commentsReceived: 0, likesReceived: 0 }
        insertResult = await insertOne(LEADERBOARD_COLLECTION, leaderboard);
        const token = jwt.sign(newUser, JWT_SECRET);
        return sendSuccessRespose(res, 200, { token })
    }

})