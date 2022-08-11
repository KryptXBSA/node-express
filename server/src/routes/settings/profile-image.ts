import { POINTS_PER_POST } from '../../../config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid'
import multer from 'multer'
import bcrypt from 'bcrypt'

import { findOne, insertOne, updateOne } from '../../mongo/mongo'
import { JWT_SECRET, LEADERBOARD_COLLECTION, POST_COLLECTION, USER_COLLECTION } from '../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { SettingsUser, User } from '../../types/user';
import { NewPost, Post } from '../../types/post';
import { verifyUser } from '../../utils/verify-user';

const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
 
        cb(null, 'images')
    },
    filename: function (req, file, cb) {

        cb(null, nanoid() + '.png')
    },

})

const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];
const upload = multer({
    storage: storage, limits: {
        fileSize: 6275000,

    }, fileFilter: function (_req, file, cb) {
       
        
        checkFileType(file, cb);
    }
})
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
        return cb(null, true);
    } else {
        cb(null, false);
    }
}
export const profileImageRoute = app.post('/profile', upload.single('image'), async (req, res) => {
        
    let file = req.file ? req.file : null
    let filename = ''
    file ? filename = file.filename : filename = '';

    if (file) {
        let accepted = ACCEPTED_MIME_TYPES.includes(file.mimetype)
        if (!accepted) return sendFailedResponse(res, 400, { message: 'Invalid file type' })
    }

    let { error, message, user: newUser }: { error: boolean, message?: string, user?: User, token?: User } = await verifyUser(req)
    if (error) return sendFailedResponse(res, 400, message)
    let user: SettingsUser
    try {
        user = SettingsUser.parse(req.body);
    } catch (e) {
        console.log('userParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }



    newUser.imageUrl = filename
  if (user.currentPassword) {
        const correctPassword = await bcrypt.compare(user.currentPassword, newUser!.password!);
        if (!correctPassword) return sendFailedResponse(res, 400, { message: 'Incorrect Password' })
    }
    if (user.newPassword) {
        const correctPassword = await bcrypt.compare(user.currentPassword, newUser!.password!);
        if (!correctPassword) return sendFailedResponse(res, 400, { message: 'Incorrect Password' })
        newUser!.password = await bcrypt.hash(user.newPassword, 11);
    }
    if (user.username) newUser!.username = user.username

    let updateResult = await updateOne(USER_COLLECTION, { user_id: newUser!.user_id }, { $set: newUser })

    const token = jwt.sign(newUser!, JWT_SECRET);
    return sendSuccessRespose(res, 200, { token })
})