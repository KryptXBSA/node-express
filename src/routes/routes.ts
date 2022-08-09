import express from 'express';
import { signupRoute } from './signup/signup';
import { loginRoute } from './login/login';
import { settings } from './settings/settings';
export const router = express()
router.use(signupRoute)
router.use(loginRoute)
router.use(settings)