import express from 'express';
import { signupRoute } from './signup/signup';
import { loginRoute } from './login/login';
export const router = express()
router.use(signupRoute)
router.use(loginRoute)