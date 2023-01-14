interface LoginBody {
  username: string;
  password: string
}

export const login = async(body: LoginBody) => {
  const raw = JSON.stringify({
    username: body.username,
    password: body.password
  })

  const response = await fetch(`${process.env.VITE_BACKEND_REQUEST}/auth/login`, {
    
    method: 'POST',
    body: raw,
    mode: "cors",
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });

  console.log(process.env.VITE_BACKEND_REQUEST)
  return await response.json();
}