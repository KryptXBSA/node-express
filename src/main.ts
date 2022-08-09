import express from 'express';
import { router } from './../routes/index';
import 'dotenv/config'
const app = express()
const port = process.env.PORT || 7002
app.use(router)
app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})