import { User } from '../types/user';
import { findOne } from '../mongo/mongo';
import express from 'express';
import jwt from 'jsonwebtoken';


import { JWT_SECRET, USER_COLLECTION } from '../../config';

export async function verifyUser(req: express.Request) {
    try {
        let validToken: any = jwt.verify(req.headers.authorization!, JWT_SECRET)
        let findResult = await findOne(USER_COLLECTION, { user_id: validToken.user_id })
        if (!findResult) return { error: true, message: 'User not found' }
        let validToken1 = verifyObjects(validToken, findResult)
        if (!validToken1) return { error: true, message: 'Invalid token0' }
        return { error: false, token: validToken, user: findResult, }
    } catch (e) {
        console.log(e);

        return { error: true, message: 'Invalid token1' }

    }
}
function verifyObjects(o1: User, o2: User) {
    if (o1.password !== o2.password) return false
    if (o1.username !== o2.username) return false
    return true
};