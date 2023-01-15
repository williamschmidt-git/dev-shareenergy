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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    requestApi();
  }, [])

  const requestApi = async () => {
    setIsLoading(true);
    if(users.length !== 0) setUsers([]);
    setUsers(await getRandomUser(9));
    setIsLoading(false)
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

  const handleSubmit = async () => {
    await requestApi()  
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
        onClick={handleSubmit}
        type="button">update users</button>
      </div>

      <div className="flex flex-wrap w-auto justify-center">
      {isLoading ? (
      <div role="status" className="flex justify-center">
      {/* https://flowbite.com/docs/components/spinner/ */}
      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    <span className="sr-only">Loading...</span>
    </div>
      ) : (
        <div className="flex flex-wrap w-auto justify-center">
          {users.length !== 0 && filterUsers(users).map((e) => {
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
      )}
      </div>
    </div>
  )
}