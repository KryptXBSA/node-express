import { generateSlug } from "random-word-slugs";
import axios from 'axios';
import * as fs from 'fs';
import { nanoid } from 'nanoid'

type Captcha = {
  imageUrl: string;
  word: string
}[]
type Answers = string[]


let captcha: Captcha = [];
let answers: Answers = []
let words = []
function getCorrentAnswers() {
  let correctAnswers = 0
  captcha.map((c, i) => {
    if (c.word === answers[i]) correctAnswers++
  });
  return correctAnswers
}


// (async () => {
//   let i = 0
//   for (let int = 0; int < 5; int++) {

//     let image = await generateAndSaveImage()
//     captcha.push({ imageUrl: image.imageURL, word: image.word })
//     words.push(image.word)
//   }
//   console.log(captcha);
//   let correctAnswers = getCorrentAnswers()
//   console.log(correctAnswers);

// }
// )()

function generateWord() {
  return generateSlug(1, { format: 'camel', categories: { adjective: ["color"] } });
}
async function getImages(word: string) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=29161262-ff5f47457344f802f65c945ad&q=${word}&image_type=photo&pretty=true`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}


const download_image = (url: any, image_path: fs.PathLike) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise<void>((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', (e: any) => reject(e));
      }),
  );
export async function generateAndSaveImage() {
  let word = generateWord()
  let image = await getImages(word)
  let imageURL = `${nanoid()}.png`
  if (image.hits.length === 0) {
    return { word, message: "Bad word", error: true }
  }
  await download_image(image.hits[0].largeImageURL, `./images/${imageURL}`);
  return { imageURL, word }
}

