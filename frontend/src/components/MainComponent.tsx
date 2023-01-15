import { useEffect, useState } from "react"
import getRandomUser from "../http/requests/RandomUsers";
import HeaderComponent from "./HeaderComponent";

export interface FormattedRandomUser {
  picture: string
  fullName: string;
  email: string;
  username: string;
  age: number;
}

export default function MainComponent() {
  const [users, setUsers] = useState<FormattedRandomUser[]>([]);
  const [searchBar, setSearchBar] = useState<string>("");


  useEffect(() => {
    if(users.length === 0) requestApi();
  })

  const requestApi = async () => {
    const response = await getRandomUser(9)
    setUsers(response);
  }

  const filterUsers = (users: FormattedRandomUser[]) => {
    return users.filter((user) => {
      if(searchBar.includes('@') || user.email.toLowerCase().includes(searchBar.toLowerCase())) {
        return user.email.toLowerCase().includes(searchBar.toLowerCase())
      }
      
      if(/\d/.test(searchBar.toLocaleLowerCase()) || user.username.toLowerCase().includes(searchBar.toLowerCase())) {
        return user.username.toLowerCase().includes(searchBar.toLowerCase())
      }

      return user.fullName.toLowerCase().includes(searchBar.toLowerCase())
    });
  }


  return (
    <div className="bg-gray-200 h-screen flex flex-col align-middle justify-items-center">
      <HeaderComponent />
      <h1 className="font-roboto text-center text-4xl pt-14 text-gray-700 mb-4">RANDOM USER GENERATOR</h1>

      <div className="flex justify-center rounded-lg">
        <label htmlFor="search-bar">
          <input placeholder="email, username or name" className="rounded-md mb-2 text-center"
          type='search'
          value={searchBar}
          name="searchBar"
          onChange={(e) => {
            setSearchBar(e.target.value)
          }}
          ></input>
        </label>
        <button className=" ml-1 bg-indigo-600 px-3 h-6 rounded-lg text-white font-medium shadow-md"
        // onClick={handleClick}
        type="button">search</button>
      </div>

      <div className="flex flex-wrap w-auto justify-center">
      {filterUsers(users).map((e) => {
        return (
        <div key={ e.username } className="bg-slate-50 w-1/4 rounded-lg mb-2 shadow-sm px-3 py-2 mx-1">

          <img src={e.picture}  className="rounded-full pb-1 mx-auto" />

          <div
          className="font-extrabold text-2xl text-gray-700 pb-1 text-center"
          key={ e.username }>
            { e.username }
          </div>

          <div
          className="font-medium text-gray-700 pb-1 text-center"
          key={ e.fullName }>
            { e.fullName }
          </div>

          <div
          className="font-medium text-gray-700 pb-1 text-center"
          key={ e.age }>
            { `${e.age} years`}
          </div>

          <div
          className="font-extralight text-gray-700 text-center"
          key={ e.email }>
            { `${e.email}`}
          </div>
        </div>)
      })}
      </div>
    </div>
  )
}