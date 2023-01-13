import { useEffect, useState } from "react";
import getRandomDog from "../http/requests/RandomDog";
import HeaderComponent from "./HeaderComponent";

export default function RandomDogComponent() {
  const[url, setUrl] = useState<string>('')

  useEffect(() => {
    getDogUrl();
  }, [])

  const getDogUrl = async () => {
    setUrl(await getRandomDog())
  }

  return (
    <div className="bg-gray-200 h-screen flex flex-col align-middle justify-items-center">
      <HeaderComponent />
      <div>
        <h1 className="font-roboto text-center text-4xl pt-14 text-gray-700 mb-4">RANDOM DOG</h1>

        <button onClick={() => getDogUrl()}
        className="bg-indigo-600 px-4 py-2 rounded-lg text-white font-medium w-1/5 mx-auto flex align-middle justify-center mb-2"
        >Random Dog</button>
        <img src={url} className="rounded-lg object-scale-down w-full h-72"></img>
      </div>
    </div>
  )
}