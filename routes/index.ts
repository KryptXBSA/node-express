import express from 'express';
import { signupRoute } from './signup/signup';
export const router = express()
router.use(signupRoute)