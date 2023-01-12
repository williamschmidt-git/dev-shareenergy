import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import getRandomUser from "../http/requests/RandomUsers";

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

  const navigate = useNavigate();

  useEffect(() => {
    if(users.length === 0) requestApi();
  })

  const requestApi = async () => {
    const response = await getRandomUser(9)
    setUsers(response);
  }

  const filterUsers = (users: FormattedRandomUser[]) => {
    return users.filter((user) => {
      if(searchBar.includes('@')) {
        return user.email.toLowerCase().includes(searchBar.toLowerCase())
      }
      
      if(/\d/.test(searchBar.toLocaleLowerCase())) {
        return user.username.toLowerCase().includes(searchBar.toLowerCase())
      }

      return user.fullName.toLowerCase().includes(searchBar.toLowerCase())
    });
  }

  const handleClick = (e: React.MouseEvent) => {
    switch(e.currentTarget.textContent) {
      case 'RANDOM USER': 
        return navigate('/main');

      case 'HTTP CAT': 
        return navigate('/httpcats');

      case 'RANDOM DOG': 
        return navigate('/random-dog');

      case 'CUSTOMERS': 
        return navigate('/customers');

      default:
        return navigate(window.location.pathname)
    }
  }

  return (
    <div className="bg-gray-200 h-screen flex flex-col align-middle justify-items-center">
      <ul className="flex bg-indigo-600">
        <li>
          <button
          className="text-white font-roboto text-xl p-4 hover:scale-[1.02] transition ease-in-out"
          onClick={handleClick}
          >RANDOM USER</button>
        </li>

        <li>
        <button
        className="text-white font-roboto text-xl p-4 hover:scale-[1.02] transition ease-in-out"
        onClick={handleClick}
        >HTTP CAT</button>
        </li>

        <li>
        <button
        className="text-white font-roboto text-xl p-4 hover:scale-[1.02] transition ease-in-out"
        onClick={handleClick}
        >RANDOM DOG</button>
        </li>

        <li>
        <button
        className="text-white font-roboto text-xl p-4 hover:scale-[1.02] transition ease-in-out"
        onClick={handleClick}
        >CUSTOMERS</button>
        </li>
      </ul>
      <h1 className="font-roboto text-center text-4xl pt-14 text-gray-700 mb-4">RANDOM USER GENERATOR</h1>

      <div className="flex justify-center rounded-lg">
        <label htmlFor="search-bar">
          <input placeholder="email, username or name" className=" rounded-md mb-2 text-center"
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