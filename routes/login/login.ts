import express from 'express';
import { z } from "zod";
import bcrypt from 'bcrypt'
var jwt = require('jsonwebtoken');

import { findOne, insertOne } from '../../mongo/mongo'
import { JWT_SECRET, MAIN_COLLECTION } from '../../config';

const app = express();

const User = z.object({
    username: z.string().max(9),
    password: z.string().max(9),
});
type User = z.infer<typeof User>;

export const loginRoute = app.post('/login', async (req, res) => {
    let user: User
    try {
        user = User.parse(req.body);
    } catch (e) {
        console.log('userParseErrror', e);
        res.send(e.issues[0].message)
        return
    }

    let findResult: User = await findOne(MAIN_COLLECTION, { username: user.username })
    if (!findResult) {
        res.send('user not found')
        return
    }
    if (findResult) {
        const correctPassword = await bcrypt.compare(user.password, findResult.password);
        console.log(findResult);
        if (correctPassword) {
            const token = jwt.sign(findResult, JWT_SECRET);
            res.send({ token })
            return
        }
    }

})