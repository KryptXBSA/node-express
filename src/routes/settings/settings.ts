import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { findOne, insertOne, updateOne } from '../../mongo/mongo'
import { JWT_SECRET, USER_COLLECTION } from '../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { SettingsUser, User } from '../../types/user';
import { verifyUser } from '../../utils/verify-user';

const app = express();

export const settingsRoute = app.post('/settings', async (req, res) => {
    let { error, message, token, user: newUser }: { error: boolean, message?: string, token?: User, user?: User } = await verifyUser(req)
    if (error) return sendFailedResponse(res, 400, message)
    let user: SettingsUser
    try {
        user = SettingsUser.parse(req.body);
    } catch (e) {
        console.log('userParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }


    if (user.newPassword) {
        const correctPassword = await bcrypt.compare(user.currentPassword, newUser.password);
        if (!correctPassword) return sendFailedResponse(res, 400, { message: 'Incorrect Password' })
        newUser.password = await bcrypt.hash(user.newPassword, 11);
    }
    if (user.username) newUser.username = user.username
console.log('new',newUser);

    let updateResult = await updateOne(USER_COLLECTION, { user_id: newUser.user_id }, { $set: newUser })
    console.log(updateResult);

    // let newUser: User = await findOne(USER_COLLECTION, { user_id: token.user_id })
    // console.log(newUser);
    const newToken = jwt.sign(newUser, JWT_SECRET);
    return sendSuccessRespose(res, 200, { token: newToken })

})