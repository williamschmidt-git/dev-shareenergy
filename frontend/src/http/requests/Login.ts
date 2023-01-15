import { api } from './Customers';

interface LoginBody {
  username: string;
  password: string
}

// const BACKEND_URI = 'https://teal-wheel-production.up.railway.app'

export default async function login(body: LoginBody) {
  const raw = JSON.stringify({
    username: body.username,
    password: body.password,
  });

  const response = await fetch(`${api.backend_url}/auth/login`, {
    method: 'POST',
    body: raw,
    mode: 'no-cors',
    redirect: 'follow',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });

  const tokenResponse = await response.json();
  return tokenResponse;
}
