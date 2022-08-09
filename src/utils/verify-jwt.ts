import { findOne } from '../mongo/mongo';
import express from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, USER_COLLECTION } from './../../config';

export async function verifyUser(req: express.Request) {
    try {
        let validToken: any = jwt.verify(req.headers.authorization, JWT_SECRET)
        let findResult = await findOne(USER_COLLECTION, { username: validToken.username })
        if (!findResult) return { error: true, message: 'User not found' }
        return { error: false, token: validToken, user: findResult, }
    } catch (e) {
        return { error: true, message: 'Invalid token' }
    }
}