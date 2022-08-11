import express from 'express';
import { router } from './routes/routes';
import 'dotenv/config'
var cors = require('cors')
var path = require('path');

const app = express()

var dir = path.join(__dirname, '..', 'images');

app.use('/images', express.static(dir));
app.options('*', cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

  next();
});
const port = process.env.PORT || 7002
app.use(express.json())
app.use(router)

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})