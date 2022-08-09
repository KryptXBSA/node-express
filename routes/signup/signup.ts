import express from 'express';
const app = express();
export const signupRoute = app.post('/signup', async (req, res) => {
    res.send('signup')
})