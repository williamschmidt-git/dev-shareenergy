import axios from "axios"

const RANDOM_DOG_URI = "https://random.dog/"

export default async function getRandomDog ()  {
  const response = await axios.get(`${RANDOM_DOG_URI}woof.json?filter=mp4,webm,gif`)

  const teste = await response.data
  return teste.url;
}