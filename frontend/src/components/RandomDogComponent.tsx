import getRandomDog from "../http/requests/RandomDog";
import HeaderComponent from "./HeaderComponent";

export default function RandomDogComponent() {
  getRandomDog()
  return (
    <div>
      <HeaderComponent />
      {/* <img src="https://random.dog/woof.json"></img> */}
    </div>
  )
}