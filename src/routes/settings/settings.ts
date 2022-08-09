import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { findOne, insertOne, updateOne } from '../../mongo/mongo'
import { JWT_SECRET, USER_COLLECTION } from '../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { SettingsUser as User } from '../../types/user';
import { verifyJwt } from '../../utils/verify-jwt';

const app = express();


export const settings = app.post('/settings', async (req, res) => {
    let { error, token }: { error: boolean, token: User } = await verifyJwt(req)
    if (error) return sendFailedResponse(res, 400, 'Invalid Token')
    let user: User
    try {
        user = User.parse(req.body);
    } catch (e) {
        console.log('userParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }
    
    let findResult: User = await findOne(USER_COLLECTION, { username: token.username })
    if (!findResult) return sendFailedResponse(res, 400, { message: 'user not found' })

    if (findResult) {
        if (user.password) user.password = await bcrypt.hash(user.password, 11);
        let updateResult = await updateOne(USER_COLLECTION, { username: findResult.username }, { $set: user })
        if (true) {
            let newUser: User = await findOne(USER_COLLECTION, { username: user.username })
            const token = jwt.sign(newUser, JWT_SECRET);
            return sendSuccessRespose(res, 200, { token })
        }
    }

})