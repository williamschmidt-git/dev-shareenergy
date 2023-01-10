import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/context';

export default function LoginComponent() {
  const[username, setUserName] = useState<string>("");
  const[password, setPassword] = useState<string>("");
  const navigate = useNavigate()

  const { state, setState: setGlobalState } = useContext(Context)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalState({
      username,
      password
    })

    navigate('/main')
  }

  console.log(state)

  return (
    <div className="bg-gray-200 h-screen">
      <div className="pt-44 mb-8">
        <h1 className="text-center text-3xl font-bold text-gray-700">Sign in to your account</h1>
      </div>
      

      <div className="bg-white max-w-lg rounded-lg mx-auto p-10 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="text-sm text-gray-600">
              Username:
              <input
                type="text"
                className="block border rounded w-full py-1 px-2" placeholder="admin"
                name='username'
                onChange={(e) => setUserName(e.target.value)}
                />
            </label>
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="text-sm text-gray-600">
                Password:
                <input
                type="password"
                className="block border rounded w-full py-1 px-2"
                onChange={(e) => setPassword(e.target.value)}
                />
              </label>
          </div>

          <div className="mb-7">
            <input type="checkbox" className="m-1 "/>
            <label htmlFor="remember-me" className="text-base text-gray-600">
                Remember me
              </label>
          </div>

            <button className="bg-indigo-600 px-4 py-2 rounded-lg text-white font-medium w-1/2 mx-auto flex align-middle justify-center"
            type="submit">
              Sign in
            </button>
        </form>
      </div>
    </div>
  )
}