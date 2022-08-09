import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { findOne, insertOne } from '../../../mongo/mongo'
import { JWT_SECRET, USER_COLLECTION } from '../../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../../utils/response'
import { AuthUser, User } from '../../../types/user';
const app = express();

export const loginRoute = app.post('/login', async (req, res) => {
    let user: AuthUser
    try {
        user = AuthUser.parse(req.body);
    } catch (e) {
        console.log('userParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }

    let findResult:  User= await findOne(USER_COLLECTION, { username: user.username })
    if (!findResult) {
        return sendFailedResponse(res, 400, { message: 'user not found' })
    }
    if (findResult) {
        const correctPassword = await bcrypt.compare(user.password, findResult.password);
        console.log(findResult);
        if (correctPassword) {
            const token = jwt.sign(findResult, JWT_SECRET);
            return sendSuccessRespose(res, 200, { token })
        }
    }

})