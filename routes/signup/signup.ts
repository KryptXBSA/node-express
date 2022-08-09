import express from 'express';
const app = express();
import { z } from "zod";
import bcrypt from 'bcrypt'

const User = z.object({
    username: z.string().max(9),
    password: z.string().max(9),
});
type User = z.infer<typeof User>;

export const signupRoute = app.post('/signup', async (req, res) => {
    let user: User
    let hashedPassword: string
    try {
        user = User.parse(req.body);
        console.log(user);
    } catch (e) {
        console.log('userParseErrror', e);
        res.send(e.issues[0].message)
    }
    hashedPassword = await bcrypt.hash(user.password, 11);

    const match = await bcrypt.compare(user.password, hashedPassword);
    console.log(match);

    res.send(user)
})