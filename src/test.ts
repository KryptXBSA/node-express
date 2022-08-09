import { generateSlug } from "random-word-slugs";
import axios from 'axios';


function generateWord() {
  return generateSlug(1, { format: 'camel', categories: { adjective: ["color"] } });
}
getImages(generateWord())
export async function getImages(word: string) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=29161262-ff5f47457344f802f65c945ad&q=${word}&image_type=photo&pretty=true`);
    console.log(response.data.hits[0]);
  } catch (error) {
    console.error(error);
  }
  console.log(word);
}