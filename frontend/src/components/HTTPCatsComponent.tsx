/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import HttpStatusCode from '../utils/httpCodes/httpCodes';
import HeaderComponent from './HeaderComponent';

export default function HTTPCatsComponent() {
  const [statusCode, setStatusCode] = useState<string>('');
  const [formatedStatusCode, setFormatedStatusCode] = useState<string>('');
  const [isCodeValid, setIsCodeValid] = useState<boolean>();
  const [isRendered, setIsRendered] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const allCodes = Object.entries(HttpStatusCode).map(([key, value]) => ({
    key, value,
  })).slice(0, 74);

  const checkIfCodeExists = () => {
    const check = allCodes.some((code) => code.key === statusCode);

    if (check) {
      setIsCodeValid(true);
    } else {
      setIsCodeValid(false);
    }
  };

  useEffect(() => {
    const doLoad = async () => {
      // setIsLoading(true);
      checkIfCodeExists();
    };
    doLoad();
    // setIsLoading(false);
  }, [statusCode]);

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    setStatusCode(formatedStatusCode);
    setIsRendered(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) setFormatedStatusCode(e.target.value);
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-col align-middle justify-items-center">

      <HeaderComponent />

      <h1 className="font-roboto text-center text-4xl pt-14 text-gray-700 mb-4">HTTP CATS</h1>

      <form onSubmit={handleSubmit} className="bg-white max-w-lg w-1/2 rounded-lg mx-auto p-10 shadow-lg">
        <label className="text-sm text-gray-600" htmlFor="httpCode">
          HTTP CODE
          <input onChange={handleChange} type="text" className="block border rounded w-full py-1 px-2 mb-5" placeholder="ex: 200" />
          <button type="submit" className="bg-indigo-600 px-4 py-2 rounded-lg text-white font-medium w-1/5 mx-auto flex align-middle justify-center mb-2">Send</button>
        </label>

        {isCodeValid ? (
          <img src={`https://http.cat/${statusCode}`} className="rounded-lg " alt="cat" />
        ) : null}
        {
          isRendered === true && !isCodeValid ? (<img src="https://http.cat/404" className="rounded-lg" alt="not-found" />) : null
        }
      </form>

    </div>
  );
}
