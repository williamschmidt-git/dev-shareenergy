import { api } from "./Customers";

interface LoginBody {
  username: string;
  password: string
}

// const BACKEND_URI = 'https://teal-wheel-production.up.railway.app'

export const login = async(body: LoginBody) => {
  const raw = JSON.stringify({
    username: body.username,
    password: body.password
  })

  const response = await fetch(`${api.backend_url}/auth/login`, {
    method: 'POST',
    body: raw,
    mode: "cors",
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });

  return await response.json();
}