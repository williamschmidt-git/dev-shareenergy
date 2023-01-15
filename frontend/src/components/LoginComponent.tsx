import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/user/index';
import login from '../http/requests/Login';

export default function LoginComponent() {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const { state, setState: setGlobalState } = useContext(Context);

  function validateToken(): void {
    const tokenValidator = document.cookie.split('=')[1];
    if (tokenValidator) {
      setIsTokenValid(true);
      navigate('/main');
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  function createSessionExpireDate(accessToken: string) {
    const now = new Date();
    now.setDate(now.getDate() + 7);

    document.cookie = `token=${accessToken}; expires=${now.toUTCString()}`;
  }

  async function toNavigate(accessToken: string) {
    if (isLoginSuccessful && isChecked) {
      createSessionExpireDate(accessToken);
      navigate('/main');
    }

    if (isLoginSuccessful) {
      navigate('/main');
    }
  }

  useEffect(() => {
    toNavigate(token);
  }, [isLoginSuccessful]);

  function onChangeCheckbox(e: any) {
    setIsChecked(e.target.checked);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGlobalState({
      username,
      password,
    });

    // eslint-disable-next-line camelcase
    const response = await login({ username, password });
    const accessToken = response.access_token;

    if (accessToken) {
      setToken(accessToken);
      setIsLoginSuccessful(true);
    }

    toNavigate(accessToken);
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
                className="block border rounded w-full py-1 px-2"
                placeholder="admin"
                name="username"
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
            <input type="checkbox" className="m-1 " onChange={onChangeCheckbox} />
            <div
              className="text-base text-gray-600"
            >
              Remember me
            </div>
          </div>
          <button
            className="bg-indigo-600 px-4 py-2 rounded-lg text-white font-medium w-1/2 mx-auto flex align-middle justify-center"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
