import { useEffect, useState } from "react"
import { getRandomUser } from "../http/requests/RandomUsers";

export interface FormattedRandomUser {
  picture: string
  fullName: string;
  email: string;
  username: string;
  age: number;
}

export default function MainComponent() {
  const [users, setUsers] = useState<FormattedRandomUser[]>([])
  const [mounted, setMounted] = useState<boolean>(true);

  const requestApi = async () => {
    const response = await getRandomUser(5)
    setUsers(response);
  }

  useEffect(() => {
    if(users.length < 1) requestApi();
  })

  // useEffect(() => {
  //   getRandomUser(5).then(items => {
  //     if(mounted) setUsers(items)
  //   })

  //   return () => setMounted(false)
  // }, [users])

  return (
    <div className="bg-gray-200 h-max">
      <h1 className="font-roboto text-center text-4xl pt-14 text-gray-700 mb-4">RANDOM USER GENERATOR</h1>

      <div className="flex justify-center rounded-lg">
        <label htmlFor="search-bar">
          <input placeholder="email, username or name" className=" rounded-md mb-2 text-center"></input>
        </label>
      </div>

      <div className="flex flex-col flex-wrap">
      {users.map((e) => {
        return (
        <div className="bg-slate-50 w-1/4 rounded-lg mb-2 shadow-sm px-3 py-2 mx-auto ">
          <div
          className="font-extrabold text-2xl text-gray-700 pb-1"
          key={ e.username }>
            { e.username }
          </div>

          <img src={e.picture}  className="rounded-full pb-1" />

          <div
          className="font-medium text-gray-700 pb-1"
          key={ e.fullName }>
            { e.fullName }
          </div>

          <div
          className="font-medium text-gray-700 pb-1"
          key={ e.age }>
            { `${e.age} years`}
          </div>

          <div
          className="font-extralight text-gray-700"
          key={ e.email }>
            { `${e.email}`}
          </div>
        </div>)
      })}
      </div>
      
    </div>
  )
}