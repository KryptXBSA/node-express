import { User } from './../src/types/user';
import { SOCKET_PORT, SOCKET_CLIENT_SERVER, LEADERBOARD_COLLECTION, POINTS_PER_CAPTCHA } from './../config';
import { createServer } from "http";
import { Server } from "socket.io";
import { Captchas, generateCaptcha } from './captcha';

import { connect, findMany, findOne, insertOne, updateOne } from '../src/mongo/mongo';
import { verifyUser } from '../src/utils/verify-user';
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        allowedHeaders: ["authorization"],
        credentials: true
    }
});

    let currentCaptchas: Captchas = []
io.on("connection", async (socket) => {
    let { error, message, user }: { error: boolean, message?: string, user?: User, token?: User } = await verifyUser(socket.request)
    if (error) socket.disconnect(true)
    socket.on("newCaptcha", async (data: any) => {

        let captcha = await generateCaptcha()
        currentCaptchas = captcha.captchas
        socket.emit("captcha", captcha)
    });

    socket.on("captchaAnswer", async (answer: any) => {

        let captcha = currentCaptchas.find(c => c.captcha_id === answer.captcha_id)

        let correctAnswer = captcha?.word === answer.word
        let result = { captcha: captcha?.captcha_id, correctAnswer }

        if (correctAnswer) {
            await updateOne(LEADERBOARD_COLLECTION, { user_id: user!.user_id }, { $inc: { captchaSolved: 1, points: POINTS_PER_CAPTCHA } })

            socket.emit("captchaResult", result)
        } else {
            socket.emit("captchaResult", result)
        }
    });
});



httpServer.listen(SOCKET_PORT);
