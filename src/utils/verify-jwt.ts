import express from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from './../../config';

export async function verifyJwt(req: express.Request) {
    try {
        let validToken: any = jwt.verify(req.headers.authorization, JWT_SECRET)
        return { error: false, token: validToken }
    } catch (e) {
        return { error: true, token: null }
    }
}