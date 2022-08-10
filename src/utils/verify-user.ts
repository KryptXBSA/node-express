import { findOne } from '../mongo/mongo';
import express from 'express';
import jwt from 'jsonwebtoken';


import { JWT_SECRET, USER_COLLECTION } from '../../config';

export async function verifyUser(req: express.Request) {
    try {
        let validToken: any = jwt.verify(req.headers.authorization, JWT_SECRET)
        let findResult = await findOne(USER_COLLECTION, { user_id: validToken.user_id })
        delete findResult['_id']
        delete validToken['_id']
        delete validToken['iat']
        if (!findResult) return { error: true, message: 'User not found' }
        let validToken1 = verifyObjects(validToken, findResult)
        if (!validToken1) return { error: true, message: 'Invalid token' }
        return { error: false, token: validToken, user: findResult, }
    } catch (e) {
        console.log(e);

        return { error: true, message: 'Invalid token' }

    }
}
function verifyObjects(o1: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, o2: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
    for (let p in o1) {
        if (o1.hasOwnProperty(p)) {
            if (o1[p] !== o2[p]) {
                return false;
            }
        }
    }
    for (let p in o2) {
        if (o2.hasOwnProperty(p)) {
            if (o1[p] !== o2[p]) {
                return false;
            }
        }
    }
    return true;
};