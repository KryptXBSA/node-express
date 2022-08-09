import express from 'express';
import { router } from './routes/routes';
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 7002
app.use(express.json())
app.use(router)

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})