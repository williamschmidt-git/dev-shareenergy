import { BACKEND_URI } from "./Customers";

interface LoginBody {
  username: string;
  password: string
}

export const login = async(body: LoginBody) => {
  const raw = JSON.stringify({
    username: body.username,
    password: body.password
  })

  const response = await fetch(`${BACKEND_URI}auth/login`, {
    
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