import express from 'express';
import { z } from "zod";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { findOne, insertOne } from '../../mongo/mongo'
import { JWT_SECRET, MAIN_COLLECTION } from '../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
const app = express();

const User = z.object({
    username: z.string().max(9),
    password: z.string().max(9),
});
type User = z.infer<typeof User>;

export const signupRoute = app.post('/signup', async (req, res) => {
    let user: User
    try {
        user = User.parse(req.body);
    } catch (e) {
        console.log('userParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }
    user.password = await bcrypt.hash(user.password, 11);
    let findResult: any = await findOne(MAIN_COLLECTION, { username: user.username })
    let insertResult
    if (findResult) {
        return sendFailedResponse(res, 400, { message: 'already registered' })
    }
    if (!findResult) insertResult = await insertOne(MAIN_COLLECTION, user);

    if (findResult) {
        const token = jwt.sign(user, JWT_SECRET);
        return sendSuccessRespose(res, 200, { token })
    }
})