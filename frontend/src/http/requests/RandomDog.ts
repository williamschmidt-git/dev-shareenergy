const RANDOM_DOG_URI = "https://random.dog/woof.json"

export default async function getRandomDog ()  {
  const response = await fetch(`${RANDOM_DOG_URI}`, {
    method: 'GET',
    // mode: "no-cors",
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });

  const result  = await response.json()
  console.log(await result)
}