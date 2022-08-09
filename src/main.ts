import express from 'express';
import { getImages } from './test';
const app = express()
const port = process.env.PORT || 7002
app.get('/', async (req, res) => {
  console.log(await getImages);

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})