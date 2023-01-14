const endpoint = 'https://pumped-debt-production.up.railway.app/'

interface LoginBody {
  username: string;
  password: string
}

export const login = async(body: LoginBody) => {
  const raw = JSON.stringify({
    username: body.username,
    password: body.password
  })

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

  return await response.json();
}