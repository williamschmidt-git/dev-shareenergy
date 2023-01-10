const endpoint = 'http://localhost:3000/'

interface LoginBody {
  username: string;
  password: string
}

export const login = async(body: LoginBody) => {
  const raw = JSON.stringify({
    username: body.username,
    password: body.password
  })

  let requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch(`${endpoint}auth/login`, {
    method: 'POST',
    body: raw,
    mode: "cors",
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });

  return response.json();
}