import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/context';
import { login } from '../http/requests/Login';

export default function LoginComponent() {
  const[username, setUserName] = useState<string>("");
  const[password, setPassword] = useState<string>("");
  const[isChecked, setIsChecked] = useState<boolean>(false);
  const[isLoginSuccessful, setIsLoginSuccessful] = useState<boolean>(false);
  const[token, setToken] = useState<string>("");

  const navigate = useNavigate();

  const { state, setState: setGlobalState } = useContext(Context);

  function onChangeCheckbox(e: any) {
    setIsChecked(e.target.checked)
  }

  useEffect(() => {
    toNavigate(token)
  }, [isLoginSuccessful])
  
  function createSessionExpireDate(token: string) {
    // document.cookie = "username=Max Brown; expires=Wed, 05 Aug 2020 23:00:00 UTC";
    const now = new Date();
    now.setDate(now.getDate() + 7)

    document.cookie = `token=${token}; expires=${now.toUTCString()}`
  }

  async function toNavigate(token: string) {
    if(isLoginSuccessful && isChecked) {
      createSessionExpireDate(token)
      navigate('/main')
    }

    if(isLoginSuccessful) {
      navigate('/main')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalState({
      username,
      password
    })

    const { access_token } = await login({ username, password });

    // console.log(access_token)

    if (access_token) {
      setToken(access_token)
      setIsLoginSuccessful(true)
    }

    toNavigate(access_token)

    // if(isLoginSuccessful) {
    //   navigate('/main')
    // }

    // console.log(`
    // LOGINSUCESSFUL ${isLoginSuccessful}
    // ISCHEKED ${isChecked}
    // ` )
  }

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
            <input type="checkbox" className="m-1 " onChange={onChangeCheckbox}/>
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