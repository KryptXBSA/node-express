import { generateSlug } from "random-word-slugs";
import axios from 'axios';
import * as fs from 'fs';
import { nanoid } from 'nanoid'

function generateWord() {
  return generateSlug(1, { format: 'camel', categories: { adjective: ["color"] } });
}
async function getImages(word: string) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=29161262-ff5f47457344f802f65c945ad&q=${word}&image_type=photo&pretty=true`);
    return response.data.hits[0].largeImageURL
  } catch (e) {
    return { word, message: e, error: true }
  }
}
async function getImage(): Promise<any> {
  let word: any = generateWord()
  let data = await getImages(word)
  if (data.error) {
    return await getImage()
  }
  return { image: data, word }
}

export async function generateCaptcha() {
  let captchas: Captchas = []

  while (captchas.length < 4) {
    let { image, word } = await getImage()
    captchas.push({ image, captcha_id: nanoid(), word })
  }
  let captchaWord = captchas[Math.floor(Math.random() * 4)].word
  return { captchas, captchaWord }

}

export type Captchas = {
  captcha_id: string
  image: string;
  word?: string
}[]
type Answers = string[]

