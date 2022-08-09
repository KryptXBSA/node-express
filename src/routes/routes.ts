import { newPostRoute } from './post/new';
import express from 'express';
import { signupRoute } from './auth/signup/signup';
import { loginRoute } from './auth/login/login';
import { settingsRoute } from './settings/settings';
export const router = express()
router.use(signupRoute)
router.use(loginRoute)
router.use(settingsRoute)
router.use('/post', newPostRoute)